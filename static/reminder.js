const params = new URLSearchParams(window.location.search);
const taskId = Number(params.get("task")) || 0;
const kind = params.get("kind") === "advance" ? "advance" : "on";
const time = params.get("time") || "";

const bridge = window.chrome?.webview || null;
const el = {
  bar: document.getElementById("bar"),
  eyebrow: document.getElementById("eyebrow"),
  title: document.getElementById("title"),
  sub: document.getElementById("sub"),
  confirm: document.getElementById("confirm"),
  swipeHint: document.getElementById("swipe-hint"),
};

let confirmed = false;
let busy = false;
let dragging = null;

function minutesOf(value) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value || "");
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function describe(task) {
  el.eyebrow.textContent = `${kind === "advance" ? "提前提醒" : "日程提醒"} · ${time}`;
  el.title.textContent = task?.title || "任务提醒";
  const due = task?.due_time || "";
  if (kind === "advance" && due) {
    const diff = minutesOf(due) - minutesOf(time);
    el.sub.textContent = Number.isFinite(diff) && diff > 0
      ? `任务时间 ${due} · 提前 ${diff} 分钟`
      : `任务时间 ${due}`;
  } else {
    el.sub.textContent = due ? `任务时间 ${due}` : "";
  }
  el.bar.dataset.due = due;
}

function markConfirmed() {
  confirmed = true;
  el.confirm.classList.add("checked");
  el.confirm.setAttribute("aria-checked", "true");
  el.bar.classList.add("confirmed");
  el.swipeHint.textContent = "已确认 · 右划关闭";
}

async function loadTask() {
  if (!taskId) {
    describe(null);
    return;
  }
  try {
    const response = await fetch(`/api/tasks/${taskId}`);
    if (!response.ok) throw new Error("任务不存在");
    const task = await response.json();
    describe(task);
    if (task.status === "done") {
      markConfirmed();
      el.swipeHint.textContent = "已完成 · 右划关闭";
    }
  } catch (error) {
    describe(null);
    el.sub.textContent = "任务信息读取失败";
  }
}

async function confirmTask() {
  if (busy || confirmed) return;
  busy = true;
  el.confirm.classList.add("busy");
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "done" }),
    });
    if (!response.ok) {
      let message = "同步失败，请重试";
      try {
        const data = await response.json();
        if (data && data.error) message = data.error;
      } catch {
        /* ignore */
      }
      throw new Error(message);
    }
    markConfirmed();
    bridge?.postMessage({ action: "reminder-confirmed" });
  } catch (error) {
    el.swipeHint.textContent = error.message || "同步失败，请重试";
  } finally {
    busy = false;
    el.confirm.classList.remove("busy");
  }
}

el.confirm.addEventListener("click", confirmTask);

el.bar.addEventListener("pointerdown", (event) => {
  if (!confirmed || event.target.closest(".confirm")) return;
  dragging = { startX: event.clientX, dx: 0, pointerId: event.pointerId };
  el.bar.setPointerCapture(event.pointerId);
  el.bar.classList.add("dragging");
  event.preventDefault();
});

el.bar.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  dragging.dx = Math.max(0, event.clientX - dragging.startX);
  el.bar.style.transform = `translateX(${dragging.dx}px)`;
  el.bar.style.opacity = String(1 - Math.min(dragging.dx / 520, 0.5));
  if (dragging.dx > 108) el.swipeHint.textContent = "松手关闭";
});

function endDrag() {
  if (!dragging) return;
  const dx = dragging.dx;
  dragging = null;
  el.bar.classList.remove("dragging");
  if (dx > 108) {
    el.bar.classList.add("slide-out");
    el.bar.style.transform = "translateX(118%)";
    el.bar.style.opacity = "0";
    setTimeout(() => bridge?.postMessage({ action: "reminder-close" }), 230);
    return;
  }
  el.bar.style.transform = "translateX(0)";
  el.bar.style.opacity = "1";
  el.swipeHint.textContent = confirmed ? "已确认 · 右划关闭" : "勾选确认";
}

el.bar.addEventListener("pointerup", endDrag);
el.bar.addEventListener("pointercancel", endDrag);

loadTask();
