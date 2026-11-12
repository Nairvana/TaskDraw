const WEBVIEW = window.chrome?.webview;
const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const ICON_EDIT = '<svg viewBox="0 0 20 20" fill="none"><path d="M4 16h3l8.2-8.2a1.8 1.8 0 0 0-2.6-2.6L4.4 13.4 4 16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
const ICON_EMPTY = '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="9" stroke="currentColor" stroke-width="1.6"/><path d="M17.5 24.5l5 5 10-10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_ERROR = '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="9" stroke="currentColor" stroke-width="1.6"/><path d="M24 15v11M24 32v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

const el = {
  dateLabel: document.getElementById("date-label"),
  summary: document.getElementById("summary-text"),
  sync: document.getElementById("sync-text"),
  progress: document.getElementById("progress-bar"),
  form: document.getElementById("add-form"),
  input: document.getElementById("new-title"),
  addBtn: document.querySelector(".add-btn"),
  list: document.getElementById("task-list"),
  dragHead: document.getElementById("drag-head"),
  openMain: document.getElementById("open-main"),
  collapseBtn: document.getElementById("collapse-drawer"),
  closeApp: document.getElementById("close-app"),
  ratioBadge: document.getElementById("ratio-badge"),
  collapsedTab: document.getElementById("collapsed-tab"),
  collapsedRatio: document.getElementById("collapsed-ratio"),
  collapsedBar: document.getElementById("collapsed-bar"),
};

const state = {
  date: "",
  tasks: [],
  plans: [],
  loaded: false,
  error: "",
  token: 0,
  pending: new Set(),
  pendingPlans: new Set(),
  lastFetch: 0,
  plansAt: 0,
  justDoneId: null,
  lastIds: "",
  lastSignature: "",
  lastRate: -1,
  wasAllDone: null,
  renderedOnce: false,
  celebrateTimer: null,
  bumpTimer: null,
};

function pad2(value) {
  return String(value).padStart(2, "0");
}

function toISO(dateObj) {
  return `${dateObj.getFullYear()}-${pad2(dateObj.getMonth() + 1)}-${pad2(dateObj.getDate())}`;
}

function todayISO() {
  return toISO(new Date());
}

function localStamp() {
  const now = new Date();
  return `${toISO(now)}T${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
}

function post(action, payload = {}) {
  if (WEBVIEW) {
    WEBVIEW.postMessage({ action, ...payload });
    return;
  }
  if (action === "open-main") window.open("/", "_blank");
  else if (action === "quit") window.close();
  else if (action === "collapse-drawer") window.taskdrawSetCollapsed(true);
  else if (action === "expand-drawer") window.taskdrawSetCollapsed(false);
}

function updateDateLabel() {
  const dateObj = new Date();
  const date = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日 · ${WEEKDAYS[dateObj.getDay()]}`;
  el.dateLabel.textContent = date;
}

async function api(path, options = {}) {
  const config = { ...options, headers: { "Content-Type": "application/json" } };
  const response = await fetch(path, config);
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  if (!response.ok) {
    throw new Error((data && data.error) || "请求失败");
  }
  return data;
}

function dailyPlans() {
  return state.plans
    .filter((plan) => plan.child_count === 0 && plan.task_id == null && plan.plan_date === state.date)
    .sort((a, b) => a.position - b.position || a.id - b.id);
}

function render() {
  updateDateLabel();
  const openTasks = state.tasks.filter((task) => task.status === "open");
  const doneTasks = state.tasks.filter((task) => task.status === "done");
  const plans = dailyPlans();
  const openPlans = plans.filter((plan) => !plan.done);
  const donePlans = plans.filter((plan) => plan.done);
  const openTotal = openTasks.length + openPlans.length;
  const doneTotal = doneTasks.length + donePlans.length;
  const total = openTotal + doneTotal;
  const rate = total ? Math.round((doneTotal / total) * 100) : 0;
  const ratio = `${doneTotal}/${total}`;
  const allDone = total > 0 && openTotal === 0;

  el.progress.style.width = `${rate}%`;
  el.ratioBadge.textContent = ratio;
  el.ratioBadge.classList.toggle("complete", allDone);
  el.ratioBadge.classList.toggle("empty", total === 0);
  document.body.classList.toggle("all-done", allDone);

  if (state.lastRate !== -1 && rate !== state.lastRate) {
    el.ratioBadge.classList.remove("bump");
    void el.ratioBadge.offsetWidth;
    el.ratioBadge.classList.add("bump");
    clearTimeout(state.bumpTimer);
    state.bumpTimer = setTimeout(() => el.ratioBadge.classList.remove("bump"), 460);
  }
  state.lastRate = rate;

  if (state.renderedOnce && state.wasAllDone === false && allDone) {
    celebrate();
  }
  state.wasAllDone = allDone;

  el.collapsedRatio.textContent = ratio;
  el.collapsedRatio.classList.toggle("complete", allDone);
  el.collapsedRatio.classList.toggle("empty", total === 0);
  el.collapsedBar.style.height = `${rate}%`;
  el.collapsedTab.title = total ? `展开挂起列表 · 已完成 ${ratio}` : "展开挂起列表";
  el.collapsedTab.setAttribute("aria-label", el.collapsedTab.title);

  if (!state.loaded) {
    el.summary.textContent = "正在载入…";
  } else if (!total) {
    el.summary.textContent = "今天还没有任务";
  } else if (allDone) {
    el.summary.textContent = plans.length
      ? `全部完成 · 共 ${total} 项 · 含 ${plans.length} 项计划`
      : `全部完成 · 共 ${total} 项`;
  } else {
    const summary = `${openTotal} 项待办 · ${doneTotal} 项完成`;
    el.summary.textContent = plans.length ? `${summary} · 含 ${plans.length} 项计划` : summary;
  }

  const idsKey = [
    ...state.tasks.map((task) => `t${task.id}`),
    ...plans.map((plan) => `p${plan.id}`),
  ].join(",");
  const animateList = state.loaded && idsKey !== state.lastIds;
  state.lastIds = idsKey;

  el.list.replaceChildren();
  if (!state.loaded) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    skeleton.innerHTML = "<span></span><span></span><span></span>";
    el.list.appendChild(skeleton);
    return;
  }

  if (state.loaded) state.renderedOnce = true;

  if (state.error && !total) {
    el.list.appendChild(errorState());
    return;
  }

  if (!total) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.innerHTML = `${ICON_EMPTY}<p>今天还没有任务</p><small>从上面的输入框添加，或打开主窗口安排一天</small>`;
    el.list.appendChild(empty);
    return;
  }

  if (openTasks.length) {
    el.list.appendChild(buildSection("待办", openTasks, { animate: animateList, start: 0 }));
  }
  if (doneTasks.length) {
    el.list.appendChild(buildSection("已完成", doneTasks, {
      animate: animateList,
      start: openTasks.length,
      done: true,
    }));
  }
  if (plans.length) {
    el.list.appendChild(buildPlanSection(plans, openTasks.length + doneTasks.length, animateList));
  }
}

function buildPlanSection(plans, start, animate) {
  const section = document.createElement("section");
  const heading = document.createElement("p");
  heading.className = "section-label";
  heading.textContent = `长期计划 · ${plans.length}`;
  section.appendChild(heading);
  plans.forEach((plan, index) => section.appendChild(buildPlan(plan, start + index, animate)));
  return section;
}

function buildPlan(plan, index = 0, animate = false) {
  const row = document.createElement("div");
  row.className = plan.done ? "task plan-task done" : "task plan-task";
  row.dataset.planId = String(plan.id);
  row.setAttribute("role", "listitem");

  const check = document.createElement("button");
  check.type = "button";
  check.className = "check";
  check.dataset.action = "plan-toggle";
  check.setAttribute("aria-label", plan.done ? "标记为未完成" : "标记为完成");
  check.setAttribute("aria-pressed", String(plan.done));
  const checkFill = document.createElement("span");
  checkFill.className = "check-fill";
  checkFill.setAttribute("aria-hidden", "true");
  check.appendChild(checkFill);

  const body = document.createElement("div");
  body.className = "task-body";
  const title = document.createElement("p");
  title.className = "task-title";
  title.textContent = plan.title;
  const badge = document.createElement("span");
  badge.className = "plan-badge";
  badge.textContent = "计划";
  badge.setAttribute("aria-hidden", "true");
  title.appendChild(badge);
  body.appendChild(title);

  row.append(check, body);
  if (animate) {
    row.classList.add("enter");
    row.style.animationDelay = `${Math.min(index * 24, 240)}ms`;
  }
  return row;
}

function celebrate() {
  document.body.classList.remove("celebrate");
  void document.body.offsetWidth;
  document.body.classList.add("celebrate");
  clearTimeout(state.celebrateTimer);
  state.celebrateTimer = setTimeout(() => document.body.classList.remove("celebrate"), 1400);
}

function errorState() {
  const wrap = document.createElement("div");
  wrap.className = "error";
  wrap.innerHTML = `${ICON_ERROR}<p>无法连接到 TaskDraw 服务</p><small>${state.error}</small><button class="retry" type="button" data-action="retry">重试</button>`;
  return wrap;
}

function buildSection(label, tasks, options = {}) {
  const section = document.createElement("section");
  const heading = document.createElement("p");
  heading.className = options.done ? "section-label done" : "section-label";
  heading.textContent = `${label} · ${tasks.length}`;
  section.appendChild(heading);
  const start = options.start || 0;
  tasks.forEach((task, index) => section.appendChild(buildTask(task, start + index, options.animate)));
  return section;
}

function buildTask(task, index = 0, animate = false) {
  const isDone = task.status === "done";
  const row = document.createElement("div");
  row.className = isDone ? "task done" : "task";
  row.dataset.id = String(task.id);
  row.setAttribute("role", "listitem");
  row.style.setProperty("--task-progress", `${Number(task.progress) || 0}%`);

  const check = document.createElement("button");
  check.type = "button";
  check.className = "check";
  check.dataset.action = "toggle";
  check.setAttribute("aria-label", isDone ? "标记为未完成" : "标记为完成");
  check.setAttribute("aria-pressed", String(isDone));

  const checkFill = document.createElement("span");
  checkFill.className = "check-fill";
  checkFill.setAttribute("aria-hidden", "true");
  check.appendChild(checkFill);

  const body = document.createElement("div");
  body.className = "task-body";

  const title = document.createElement("p");
  title.className = "task-title";
  title.textContent = task.title;
  if (task.due_time) {
    const time = document.createElement("span");
    time.className = task.remind ? "task-time is-remind" : "task-time";
    time.textContent = task.due_time;
    time.title = task.remind ? "已设置到点提醒" : "任务时间";
    title.appendChild(time);
  }
  body.appendChild(title);

  if (task.notes) {
    const notes = document.createElement("p");
    notes.className = "task-notes";
    notes.textContent = task.notes;
    notes.title = task.notes;
    body.appendChild(notes);
  }

  const edit = document.createElement("button");
  edit.type = "button";
  edit.className = "task-edit";
  edit.dataset.action = "edit";
  edit.title = "在主窗口中编辑";
  edit.setAttribute("aria-label", "在主窗口中编辑");
  edit.innerHTML = ICON_EDIT;

  row.append(check, body, edit);

  if (animate) {
    row.classList.add("enter");
    row.style.animationDelay = `${Math.min(index * 24, 240)}ms`;
  }
  if (task.id === state.justDoneId) row.classList.add("just-done");
  return row;
}

async function refresh(options = {}) {
  const force = options.force === true;
  const now = Date.now();
  if (!force && now - state.lastFetch < 1200) return;
  state.lastFetch = now;
  const today = todayISO();
  const planDue = force || today !== state.date || now - state.plansAt > 60000;
  state.date = today;

  const token = (state.token += 1);
  if (!state.loaded) render();
  el.sync.textContent = "同步中";

  try {
    const [taskData, planData] = await Promise.all([
      api(`/api/tasks?date=${state.date}`),
      planDue ? api("/api/plans").catch(() => null) : Promise.resolve(null),
    ]);
    if (token !== state.token) return;
    state.tasks = taskData.tasks || [];
    if (planData) {
      state.plans = planData.plans || [];
      state.plansAt = Date.now();
    }
    state.loaded = true;
    state.error = "";
    const signature = JSON.stringify([
      state.date,
      state.tasks.map((task) => [task.id, task.title, task.status, task.progress, task.due_time, task.remind]),
      dailyPlans().map((plan) => [plan.id, plan.title, plan.done]),
    ]);
    if (signature !== state.lastSignature) {
      state.lastSignature = signature;
      render();
    }
    const time = new Date();
    el.sync.textContent = `${pad2(time.getHours())}:${pad2(time.getMinutes())} 已同步`;
    el.sync.style.color = "";
  } catch (error) {
    if (token !== state.token) return;
    state.loaded = true;
    state.error = error.message;
    render();
    el.sync.textContent = "同步失败";
    el.sync.style.color = "var(--red)";
  }
}

async function addTask(event) {
  event.preventDefault();
  const title = el.input.value.trim();
  if (!title) {
    el.input.focus();
    return;
  }

  el.addBtn.disabled = true;
  try {
    await api("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, notes: "", task_date: todayISO() }),
    });
    el.input.value = "";
    post("refresh-reminders");
    await refresh({ force: true });
    el.input.focus();
  } catch (error) {
    state.error = error.message;
    render();
    el.sync.textContent = "添加失败";
    el.sync.style.color = "var(--red)";
  } finally {
    el.addBtn.disabled = false;
  }
}

async function toggleTask(id) {
  if (state.pending.has(id)) return;
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;

  const previous = { ...task };
  const nextStatus = task.status === "done" ? "open" : "done";
  state.pending.add(id);
  state.token += 1;

  task.status = nextStatus;
  task.completed_at = nextStatus === "done" ? localStamp() : null;
  task.progress = nextStatus === "done" ? 100 : 0;
  state.justDoneId = nextStatus === "done" ? id : null;
  render();

  try {
    const updated = await api(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: nextStatus }),
    });
    state.token += 1;
    const index = state.tasks.findIndex((item) => item.id === id);
    if (index !== -1) state.tasks[index] = updated;
    render();
    state.justDoneId = null;
    post("refresh-reminders");
    el.sync.textContent = "刚刚已同步";
    el.sync.style.color = "";
  } catch (error) {
    state.token += 1;
    state.justDoneId = null;
    Object.assign(task, previous);
    render();
    el.sync.textContent = "更新失败";
    el.sync.style.color = "var(--red)";
  } finally {
    state.pending.delete(id);
  }
}

async function togglePlan(id) {
  if (state.pendingPlans.has(id)) return;
  const plan = state.plans.find((item) => item.id === id);
  if (!plan) return;

  const previous = plan.done;
  state.pendingPlans.add(id);
  state.token += 1;
  plan.done = !previous;
  render();

  try {
    const updated = await api(`/api/plans/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ done: plan.done }),
    });
    state.token += 1;
    const index = state.plans.findIndex((item) => item.id === id);
    if (index !== -1) state.plans[index] = updated;
    render();
    el.sync.textContent = "刚刚已同步";
    el.sync.style.color = "";
  } catch (error) {
    state.token += 1;
    plan.done = previous;
    render();
    el.sync.textContent = "更新失败";
    el.sync.style.color = "var(--red)";
  } finally {
    state.pendingPlans.delete(id);
  }
}

el.list.addEventListener("click", (event) => {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;

  const action = actionElement.dataset.action;
  if (action === "retry") {
    refresh({ force: true });
    return;
  }

  const row = event.target.closest(".task");
  if (!row) return;
  if (action === "plan-toggle") {
    togglePlan(Number(row.dataset.planId));
    return;
  }
  const id = Number(row.dataset.id);
  if (action === "toggle") toggleTask(id);
  else if (action === "edit") post("open-main");
});

el.form.addEventListener("submit", addTask);

el.input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.isComposing) {
    event.preventDefault();
    el.form.requestSubmit();
  }
});

el.openMain.addEventListener("click", () => post("open-main"));
el.collapseBtn.addEventListener("click", () => post("collapse-drawer"));
el.closeApp.addEventListener("click", () => post("quit"));
el.collapsedTab.addEventListener("click", () => post("expand-drawer"));

el.dragHead.addEventListener("mousedown", (event) => {
  if (event.button !== 0) return;
  if (event.target.closest("button, input, textarea, a")) return;
  post("drag");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (document.body.classList.contains("is-collapsed")) {
    post("expand-drawer");
  } else {
    post("collapse-drawer");
  }
});

window.taskdrawSetCollapsed = (collapsed) => {
  const isCollapsed = Boolean(collapsed);
  document.body.classList.toggle("is-collapsed", isCollapsed);
  if (isCollapsed && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  render();
};

window.addEventListener("focus", () => refresh());
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) refresh();
});

window.taskdrawRefresh = () => refresh({ force: true });

setInterval(() => {
  if (!document.hidden) refresh();
}, 20000);

state.date = todayISO();
render();
refresh({ force: true });
