from __future__ import annotations

import argparse
import json
import os
import re
import sqlite3
import threading
import traceback
import webbrowser
from contextlib import contextmanager
from datetime import date, datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
DB_PATH = BASE_DIR / "data" / "tasks.db"
MAX_BODY_BYTES = 128 * 1024
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
TIME_RE = re.compile(r"^([01]\d|2[0-3]):[0-5]\d$")

SCHEMA = """
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    task_date TEXT NOT NULL,
    due_time TEXT,
    advance_time TEXT,
    remind INTEGER NOT NULL DEFAULT 1 CHECK (remind IN (0, 1)),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'done')),
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    position INTEGER NOT NULL DEFAULT 0,
    completed_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_tasks_date ON tasks(task_date);
CREATE TABLE IF NOT EXISTS plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    task_id INTEGER,
    title TEXT NOT NULL,
    plan_date TEXT,
    done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1)),
    position INTEGER NOT NULL DEFAULT 0,
    completed_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_plans_parent ON plans(parent_id);
"""

CONTENT_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
}


class ApiError(Exception):
    def __init__(self, status: int, message: str):
        super().__init__(message)
        self.status = status
        self.message = message


def local_now() -> str:
    return datetime.now().strftime("%Y-%m-%dT%H:%M:%S")


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.execute("PRAGMA journal_mode = WAL")
        conn.executescript(SCHEMA)
        columns = {row[1] for row in conn.execute("PRAGMA table_info(tasks)")}
        if "progress" not in columns:
            conn.execute("ALTER TABLE tasks ADD COLUMN progress INTEGER NOT NULL DEFAULT 0")
        if "due_time" not in columns:
            conn.execute("ALTER TABLE tasks ADD COLUMN due_time TEXT")
        if "advance_time" not in columns:
            conn.execute("ALTER TABLE tasks ADD COLUMN advance_time TEXT")
        if "remind" not in columns:
            conn.execute("ALTER TABLE tasks ADD COLUMN remind INTEGER NOT NULL DEFAULT 1")
        plan_columns = {row[1] for row in conn.execute("PRAGMA table_info(plans)")}
        if "task_id" not in plan_columns:
            conn.execute("ALTER TABLE plans ADD COLUMN task_id INTEGER")
        conn.execute(
            "CREATE UNIQUE INDEX IF NOT EXISTS idx_plans_task ON plans(task_id) WHERE task_id IS NOT NULL"
        )
        conn.execute("UPDATE tasks SET progress = 100 WHERE status = 'done' AND progress < 100")
        conn.commit()
    finally:
        conn.close()


@contextmanager
def db_session():
    conn = sqlite3.connect(DB_PATH, timeout=5)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def parse_date(value, field: str = "日期") -> str:
    if not isinstance(value, str) or not DATE_RE.fullmatch(value):
        raise ApiError(400, f"{field}格式应为 YYYY-MM-DD")
    try:
        date.fromisoformat(value)
    except ValueError:
        raise ApiError(400, f"{field}不是有效日期") from None
    return value


def clean_title(value) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ApiError(400, "任务内容不能为空")
    value = value.strip()
    if len(value) > 120:
        raise ApiError(400, "任务内容不能超过 120 个字符")
    return value


def clean_notes(value) -> str:
    if value is None:
        return ""
    if not isinstance(value, str):
        raise ApiError(400, "备注格式不正确")
    value = value.strip()
    if len(value) > 5000:
        raise ApiError(400, "备注不能超过 5000 个字符")
    return value


def task_dict(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "title": row["title"],
        "notes": row["notes"],
        "task_date": row["task_date"],
        "due_time": row["due_time"],
        "advance_time": row["advance_time"],
        "remind": bool(row["remind"]),
        "status": row["status"],
        "progress": row["progress"],
        "position": row["position"],
        "completed_at": row["completed_at"],
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
    }


def clean_plan_title(value) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ApiError(400, "计划名称不能为空")
    value = value.strip()
    if len(value) > 120:
        raise ApiError(400, "计划名称不能超过 120 个字符")
    return value


def parse_optional_date(value, field: str = "日期"):
    if value is None or value == "":
        return None
    return parse_date(value, field)


def parse_optional_time(value, field: str = "时间"):
    if value is None or value == "":
        return None
    if not isinstance(value, str) or not TIME_RE.fullmatch(value):
        raise ApiError(400, f"{field}格式应为 HH:MM")
    return value


def parse_bool(value, field: str = "开关") -> bool:
    if not isinstance(value, bool):
        raise ApiError(400, f"{field}格式不正确")
    return value


def plan_payload(db) -> list[dict]:
    rows = db.execute(
        """
        SELECT p.*, t.title AS linked_task_title, t.task_date AS linked_task_date,
               t.status AS linked_task_status
        FROM plans p
        LEFT JOIN tasks t ON t.id = p.task_id
        ORDER BY p.position ASC, p.id ASC
        """
    ).fetchall()
    items = []
    for row in rows:
        linked = row["task_id"] is not None and row["linked_task_status"] is not None
        items.append(
            {
                "id": row["id"],
                "parent_id": row["parent_id"],
                "task_id": row["task_id"],
                "linked_task_title": row["linked_task_title"],
                "title": row["title"],
                "plan_date": row["linked_task_date"] if linked else row["plan_date"],
                "done": (row["linked_task_status"] == "done") if linked else bool(row["done"]),
                "position": row["position"],
                "completed_at": row["completed_at"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"],
            }
        )
    children: dict[int | None, list[dict]] = {}
    for item in items:
        children.setdefault(item["parent_id"], []).append(item)
    by_id = {item["id"]: item for item in items}

    def leaf_stats(plan_id: int) -> tuple[int, int]:
        kids = children.get(plan_id, [])
        if not kids:
            return (1 if by_id[plan_id]["done"] else 0, 1)
        done = total = 0
        for kid in kids:
            kid_done, kid_total = leaf_stats(kid["id"])
            done += kid_done
            total += kid_total
        return done, total

    for item in items:
        done, total = leaf_stats(item["id"])
        item["leaf_done"] = done
        item["leaf_total"] = total
        item["percent"] = int(done * 100 / total + 0.5) if total else 0
        item["child_count"] = len(children.get(item["id"], []))
    return items


class TaskDrawHandler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    server_version = "TaskDraw/1.0"

    def log_message(self, fmt, *args):
        pass

    def do_GET(self):
        self._run(self._get)

    def do_POST(self):
        self._run(self._post)

    def do_PATCH(self):
        self._run(self._patch)

    def do_DELETE(self):
        self._run(self._delete)

    def _run(self, action):
        try:
            action()
        except ApiError as exc:
            self._send_json(exc.status, {"error": exc.message})
        except (BrokenPipeError, ConnectionResetError):
            pass
        except Exception:
            traceback.print_exc()
            self._send_json(500, {"error": "服务器内部错误"})

    def _get(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        if path in ("/", "/index.html"):
            self._send_file(STATIC_DIR / "index.html")
            return

        if path in ("/drawer", "/drawer.html"):
            self._send_file(STATIC_DIR / "drawer.html")
            return

        if path in ("/reminder", "/reminder.html"):
            self._send_file(STATIC_DIR / "reminder.html")
            return

        if path == "/api/health":
            self._send_json(200, {"ok": True, "app": "TaskDraw"})
            return

        if path.startswith("/static/"):
            rel = path[len("/static/"):]
            target = (STATIC_DIR / rel).resolve()
            static_root = STATIC_DIR.resolve()
            if not target.is_relative_to(static_root) or not target.is_file():
                raise ApiError(404, "文件不存在")
            self._send_file(target)
            return

        if path == "/api/tasks/all":
            with db_session() as db:
                rows = db.execute(
                    "SELECT * FROM tasks ORDER BY task_date ASC, position ASC, id ASC"
                ).fetchall()
            self._send_json(200, {"tasks": [task_dict(r) for r in rows]})
            return

        task_match = re.fullmatch(r"/api/tasks/(\d+)", path)
        if task_match:
            task_id = int(task_match.group(1))
            with db_session() as db:
                row = db.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
            if row is None:
                raise ApiError(404, "任务不存在")
            self._send_json(200, task_dict(row))
            return

        if path == "/api/tasks":
            day = parse_date((query.get("date") or [""])[0])
            with db_session() as db:
                rows = db.execute(
                    "SELECT * FROM tasks WHERE task_date = ? ORDER BY position ASC, id ASC",
                    (day,),
                ).fetchall()
            self._send_json(200, {"date": day, "tasks": [task_dict(r) for r in rows]})
            return

        if path == "/api/plans":
            with db_session() as db:
                items = plan_payload(db)
            self._send_json(200, {"plans": items})
            return

        if path == "/api/calendar":
            start = parse_date((query.get("start") or [""])[0], "开始日期")
            end = parse_date((query.get("end") or [""])[0], "结束日期")
            start_d = date.fromisoformat(start)
            end_d = date.fromisoformat(end)
            if end_d < start_d:
                raise ApiError(400, "结束日期不能早于开始日期")
            if (end_d - start_d).days > 62:
                raise ApiError(400, "查询范围不能超过 63 天")
            with db_session() as db:
                rows = db.execute(
                    """
                    SELECT task_date,
                           COUNT(*) AS total,
                           SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done
                    FROM tasks
                    WHERE task_date BETWEEN ? AND ?
                    GROUP BY task_date
                    """,
                    (start, end),
                ).fetchall()
            days = {}
            for row in rows:
                total = row["total"]
                done = row["done"] or 0
                days[row["task_date"]] = {"total": total, "done": done, "open": total - done}
            self._send_json(200, {"start": start, "end": end, "days": days})
            return

        if path.startswith("/api/"):
            raise ApiError(404, "接口不存在")

        self._send_file(STATIC_DIR / "index.html")

    def _post(self):
        path = urlparse(self.path).path
        if path == "/api/tasks/reorder":
            self._reorder()
            return
        if path == "/api/plans":
            self._create_plan()
            return
        if path != "/api/tasks":
            raise ApiError(404, "接口不存在")
        payload = self._read_json()
        title = clean_title(payload.get("title"))
        notes = clean_notes(payload.get("notes"))
        task_date = parse_date(payload.get("task_date"), "任务日期")
        due_time = parse_optional_time(payload.get("due_time"))
        advance_time = parse_optional_time(payload.get("advance_time"), "提前提醒时间")
        if advance_time and (not due_time or advance_time >= due_time):
            raise ApiError(400, "提前提醒时间需要早于任务时间")
        remind = parse_bool(payload.get("remind", True), "提醒开关") if due_time else False
        now = local_now()

        with db_session() as db:
            position = db.execute(
                "SELECT COALESCE(MAX(position), 0) + 1 FROM tasks WHERE task_date = ?",
                (task_date,),
            ).fetchone()[0]
            cursor = db.execute(
                """
                INSERT INTO tasks (title, notes, task_date, due_time, advance_time, remind, status, position, completed_at, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, 'open', ?, NULL, ?, ?)
                """,
                (title, notes, task_date, due_time, advance_time, 1 if remind else 0, position, now, now),
            )
            row = db.execute("SELECT * FROM tasks WHERE id = ?", (cursor.lastrowid,)).fetchone()
        self._send_json(201, task_dict(row))

    def _reorder(self):
        payload = self._read_json()
        task_date = parse_date(payload.get("task_date"), "任务日期")
        ids = payload.get("ids")
        if not isinstance(ids, list) or not ids:
            raise ApiError(400, "排序内容不能为空")
        if len(ids) > 500:
            raise ApiError(400, "排序内容过多")
        if any(not isinstance(value, int) or isinstance(value, bool) for value in ids):
            raise ApiError(400, "排序内容不正确")
        if len(set(ids)) != len(ids):
            raise ApiError(400, "排序内容包含重复任务")

        with db_session() as db:
            rows = db.execute(
                "SELECT id FROM tasks WHERE task_date = ?", (task_date,)
            ).fetchall()
            existing = {row["id"] for row in rows}
            if existing != set(ids):
                raise ApiError(409, "任务列表已变化，请刷新后重试")
            db.executemany(
                "UPDATE tasks SET position = ? WHERE id = ? AND task_date = ?",
                [(index + 1, task_id, task_date) for index, task_id in enumerate(ids)],
            )
        self._send_json(200, {"ok": True})

    def _patch(self):
        if urlparse(self.path).path.startswith("/api/plans/"):
            self._patch_plan()
            return
        match = re.fullmatch(r"/api/tasks/(\d+)", urlparse(self.path).path)
        if not match:
            raise ApiError(404, "接口不存在")
        task_id = int(match.group(1))
        payload = self._read_json()
        if not isinstance(payload, dict):
            raise ApiError(400, "请求格式不正确")

        updates = {}
        if "title" in payload:
            updates["title"] = clean_title(payload.get("title"))
        if "notes" in payload:
            updates["notes"] = clean_notes(payload.get("notes"))
        if "task_date" in payload:
            updates["task_date"] = parse_date(payload.get("task_date"), "任务日期")
        if "due_time" in payload:
            updates["due_time"] = parse_optional_time(payload.get("due_time"))
        if "advance_time" in payload:
            updates["advance_time"] = parse_optional_time(payload.get("advance_time"), "提前提醒时间")
        if "remind" in payload:
            updates["remind"] = 1 if parse_bool(payload.get("remind"), "提醒开关") else 0
        if "status" in payload:
            status = payload.get("status")
            if status not in ("open", "done"):
                raise ApiError(400, "完成状态不正确")
            updates["status"] = status
        if "progress" in payload:
            progress = payload.get("progress")
            if isinstance(progress, bool) or not isinstance(progress, int) or not 0 <= progress <= 100:
                raise ApiError(400, "完成度应为 0 到 100 的整数")
            updates["progress"] = progress
        if not updates:
            raise ApiError(400, "没有需要更新的内容")

        now = local_now()
        with db_session() as db:
            row = db.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
            if row is None:
                raise ApiError(404, "任务不存在")

            if "due_time" in updates and updates["due_time"] is None:
                updates["remind"] = 0
                updates["advance_time"] = None
            if updates.get("remind") == 1 and not updates.get("due_time", row["due_time"]):
                updates["remind"] = 0
            final_due = updates.get("due_time", row["due_time"])
            if "advance_time" in updates and updates["advance_time"] is not None:
                if not final_due or updates["advance_time"] >= final_due:
                    raise ApiError(400, "提前提醒时间需要早于任务时间")
            elif (
                "due_time" in updates
                and updates["due_time"] is not None
                and "advance_time" not in updates
                and row["advance_time"]
                and row["advance_time"] >= updates["due_time"]
            ):
                updates["advance_time"] = None

            if "task_date" in updates and updates["task_date"] != row["task_date"]:
                updates["position"] = db.execute(
                    "SELECT COALESCE(MAX(position), 0) + 1 FROM tasks WHERE task_date = ?",
                    (updates["task_date"],),
                ).fetchone()[0]

            if "status" in updates:
                updates["progress"] = 100 if updates["status"] == "done" else 0
            if "progress" in updates:
                if updates["progress"] == 100 and row["status"] != "done":
                    updates["status"] = "done"
                elif updates["progress"] < 100 and row["status"] == "done":
                    updates["status"] = "open"

            if (
                "status" in updates
                and updates["status"] != row["status"]
                and "position" not in updates
            ):
                updates["position"] = db.execute(
                    "SELECT COALESCE(MAX(position), 0) + 1 FROM tasks WHERE task_date = ?",
                    (row["task_date"],),
                ).fetchone()[0]

            sets = []
            values = []
            for key, value in updates.items():
                sets.append(f"{key} = ?")
                values.append(value)
            if "status" in updates:
                if updates["status"] == "done" and row["status"] != "done":
                    sets.append("completed_at = ?")
                    values.append(now)
                elif updates["status"] == "open":
                    sets.append("completed_at = NULL")
            sets.append("updated_at = ?")
            values.append(now)
            values.append(task_id)

            db.execute(f"UPDATE tasks SET {', '.join(sets)} WHERE id = ?", values)
            row = db.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
            linked = db.execute("SELECT id FROM plans WHERE task_id = ?", (task_id,)).fetchone()
            if linked is not None:
                db.execute(
                    "UPDATE plans SET plan_date = ?, done = ?, completed_at = ?, updated_at = ? WHERE task_id = ?",
                    (row["task_date"], 1 if row["status"] == "done" else 0, row["completed_at"], now, task_id),
                )
        self._send_json(200, task_dict(row))

    def _create_plan(self):
        payload = self._read_json()
        title = clean_plan_title(payload.get("title"))
        parent_id = payload.get("parent_id")
        if parent_id is not None and (isinstance(parent_id, bool) or not isinstance(parent_id, int)):
            raise ApiError(400, "上级计划不正确")
        task_id = payload.get("task_id")
        if task_id is not None and (isinstance(task_id, bool) or not isinstance(task_id, int)):
            raise ApiError(400, "关联任务不正确")
        plan_date = parse_optional_date(payload.get("plan_date"), "计划日期")
        now = local_now()

        with db_session() as db:
            if parent_id is not None:
                parent = db.execute("SELECT id, task_id FROM plans WHERE id = ?", (parent_id,)).fetchone()
                if parent is None:
                    raise ApiError(404, "上级计划不存在")
                if parent["task_id"] is not None:
                    raise ApiError(400, "已关联任务的计划不能再添加子计划")
            done = 0
            completed_at = None
            if task_id is not None:
                task = db.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
                if task is None:
                    raise ApiError(404, "要关联的任务不存在")
                if db.execute("SELECT 1 FROM plans WHERE task_id = ? LIMIT 1", (task_id,)).fetchone():
                    raise ApiError(409, "该任务已关联其他计划")
                plan_date = task["task_date"]
                done = 1 if task["status"] == "done" else 0
                completed_at = task["completed_at"]
            position = db.execute(
                "SELECT COALESCE(MAX(position), 0) + 1 FROM plans WHERE parent_id IS ?",
                (parent_id,),
            ).fetchone()[0]
            cursor = db.execute(
                """
                INSERT INTO plans (parent_id, task_id, title, plan_date, done, position, completed_at, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (parent_id, task_id, title, plan_date, done, position, completed_at, now, now),
            )
            plan_id = cursor.lastrowid
            plan = next((item for item in plan_payload(db) if item["id"] == plan_id), None)
        self._send_json(201, plan)

    def _patch_plan(self):
        match = re.fullmatch(r"/api/plans/(\d+)", urlparse(self.path).path)
        if not match:
            raise ApiError(404, "接口不存在")
        plan_id = int(match.group(1))
        payload = self._read_json()

        updates = {}
        if "title" in payload:
            updates["title"] = clean_plan_title(payload.get("title"))
        if "plan_date" in payload:
            updates["plan_date"] = parse_optional_date(payload.get("plan_date"), "计划日期")
        done_requested = None
        if "done" in payload:
            done = payload.get("done")
            if not isinstance(done, bool):
                raise ApiError(400, "完成状态不正确")
            done_requested = done
            updates["done"] = 1 if done else 0
        task_id_requested = "task_id" in payload
        new_task_id = payload.get("task_id") if task_id_requested else None
        if new_task_id is not None and (isinstance(new_task_id, bool) or not isinstance(new_task_id, int)):
            raise ApiError(400, "关联任务不正确")
        if not updates and not task_id_requested:
            raise ApiError(400, "没有需要更新的内容")

        now = local_now()
        with db_session() as db:
            row = db.execute("SELECT * FROM plans WHERE id = ?", (plan_id,)).fetchone()
            if row is None:
                raise ApiError(404, "计划不存在")
            has_children = db.execute(
                "SELECT 1 FROM plans WHERE parent_id = ? LIMIT 1", (plan_id,)
            ).fetchone() is not None

            if task_id_requested:
                if new_task_id is not None:
                    if has_children:
                        raise ApiError(400, "只有最末级的小计划可以关联任务")
                    if not db.execute("SELECT 1 FROM tasks WHERE id = ?", (new_task_id,)).fetchone():
                        raise ApiError(404, "要关联的任务不存在")
                    other = db.execute(
                        "SELECT id FROM plans WHERE task_id = ? AND id != ?", (new_task_id, plan_id)
                    ).fetchone()
                    if other is not None:
                        raise ApiError(409, "该任务已关联其他计划")
                updates["task_id"] = new_task_id

            effective_task_id = updates.get("task_id", row["task_id"])
            if effective_task_id is not None:
                task = db.execute("SELECT * FROM tasks WHERE id = ?", (effective_task_id,)).fetchone()
                if task is None:
                    updates["task_id"] = None
                else:
                    if done_requested is not None and not task_id_requested:
                        next_status = "done" if done_requested else "open"
                        if task["status"] != next_status:
                            position = db.execute(
                                "SELECT COALESCE(MAX(position), 0) + 1 FROM tasks WHERE task_date = ?",
                                (task["task_date"],),
                            ).fetchone()[0]
                            db.execute(
                                "UPDATE tasks SET status = ?, progress = ?, completed_at = ?, position = ?, updated_at = ? WHERE id = ?",
                                (next_status, 100 if next_status == "done" else 0,
                                 now if next_status == "done" else None, position, now, effective_task_id),
                            )
                            task = db.execute("SELECT * FROM tasks WHERE id = ?", (effective_task_id,)).fetchone()
                    updates["plan_date"] = task["task_date"]
                    updates["done"] = 1 if task["status"] == "done" else 0
                    updates["completed_at"] = task["completed_at"]

            if updates.get("done") == 1 and row["done"] != 1 and has_children:
                raise ApiError(400, "含有子计划，请完成最末级的小计划")

            sets = []
            values = []
            for key, value in updates.items():
                sets.append(f"{key} = ?")
                values.append(value)
            if "done" in updates and "completed_at" not in updates and updates["done"] != row["done"]:
                sets.append("completed_at = ?")
                values.append(now if updates["done"] else None)
            sets.append("updated_at = ?")
            values.append(now)
            values.append(plan_id)

            db.execute(f"UPDATE plans SET {', '.join(sets)} WHERE id = ?", values)
            plan = next((item for item in plan_payload(db) if item["id"] == plan_id), None)
        self._send_json(200, plan)

    def _delete(self):
        if urlparse(self.path).path.startswith("/api/plans/"):
            self._delete_plan()
            return
        match = re.fullmatch(r"/api/tasks/(\d+)", urlparse(self.path).path)
        if not match:
            raise ApiError(404, "接口不存在")
        task_id = int(match.group(1))
        with db_session() as db:
            cursor = db.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
            if cursor.rowcount == 0:
                raise ApiError(404, "任务不存在")
            db.execute(
                "UPDATE plans SET task_id = NULL, updated_at = ? WHERE task_id = ?",
                (local_now(), task_id),
            )
        self._send_json(200, {"ok": True})

    def _delete_plan(self):
        match = re.fullmatch(r"/api/plans/(\d+)", urlparse(self.path).path)
        if not match:
            raise ApiError(404, "接口不存在")
        plan_id = int(match.group(1))
        with db_session() as db:
            row = db.execute("SELECT id FROM plans WHERE id = ?", (plan_id,)).fetchone()
            if row is None:
                raise ApiError(404, "计划不存在")
            ids = db.execute(
                """
                WITH RECURSIVE sub(id) AS (
                    SELECT id FROM plans WHERE id = ?
                    UNION ALL
                    SELECT p.id FROM plans p JOIN sub s ON p.parent_id = s.id
                )
                SELECT id FROM sub
                """,
                (plan_id,),
            ).fetchall()
            db.executemany("DELETE FROM plans WHERE id = ?", [(item["id"],) for item in ids])
        self._send_json(200, {"ok": True, "deleted": len(ids)})

    def _read_json(self) -> dict:
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            raise ApiError(400, "请求长度不正确") from None
        if length <= 0:
            return {}
        if length > MAX_BODY_BYTES:
            raise ApiError(413, "请求内容过大")
        raw = self.rfile.read(length)
        try:
            data = json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            raise ApiError(400, "请求格式不是有效的 JSON") from None
        if not isinstance(data, dict):
            raise ApiError(400, "请求格式不正确")
        return data

    def _send_json(self, status: int, payload: dict):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _send_file(self, path: Path):
        if not path.is_file():
            raise ApiError(404, "文件不存在")
        body = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", CONTENT_TYPES.get(path.suffix.lower(), "application/octet-stream"))
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)


def create_server(host: str, port: int) -> ThreadingHTTPServer:
    return ThreadingHTTPServer((host, port), TaskDrawHandler)


def watch_parent(pid: int) -> None:
    """Exit when the desktop shell process disappears."""
    if os.name != "nt":
        return
    import ctypes

    synchronize = 0x00100000
    kernel32 = ctypes.windll.kernel32
    handle = kernel32.OpenProcess(synchronize, False, pid)
    if not handle:
        os._exit(0)
    try:
        kernel32.WaitForSingleObject(handle, 0xFFFFFFFF)
        os._exit(0)
    finally:
        kernel32.CloseHandle(handle)


def main() -> None:
    parser = argparse.ArgumentParser(description="TaskDraw local task calendar")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--open", action="store_true", help="open the browser after startup")
    parser.add_argument("--parent-pid", type=int, default=0, help="exit when this process exits")
    args = parser.parse_args()

    init_db()
    server = None
    for port in range(args.port, min(args.port + 20, 65536)):
        try:
            server = create_server(args.host, port)
            break
        except OSError:
            continue
    if server is None:
        print(f"Cannot start on {args.host}:{args.port} - no free port found")
        raise SystemExit(1)

    actual_port = server.server_address[1]
    if args.parent_pid:
        threading.Thread(target=watch_parent, args=(args.parent_pid,), daemon=True).start()

    url = f"http://{args.host}:{actual_port}"
    print(f"TaskDraw running at {url}", flush=True)
    print("Press Ctrl+C to stop.", flush=True)
    if args.open:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
