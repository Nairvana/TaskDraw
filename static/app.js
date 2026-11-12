const WEEKDAY_FULL = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const GRID_DAYS = 42;

const ICON_EDIT = '<svg viewBox="0 0 20 20" fill="none"><path d="M4 16h3l8.2-8.2a1.8 1.8 0 0 0-2.6-2.6L4.4 13.4 4 16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
const ICON_TRASH = '<svg viewBox="0 0 20 20" fill="none"><path d="M4.5 6h11M8 6V4.6c0-.3.3-.6.6-.6h2.8c.3 0 .6.3.6.6V6M6 6l.6 9.4c0 .3.3.6.6.6h5.6c.3 0 .6-.3.6-.6L14 6M8.5 9v4M11.5 9v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
const ICON_EMPTY = '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="11" width="32" height="29" rx="5" stroke="currentColor" stroke-width="1.6"/><path d="M8 19h32M16 7v7M32 7v7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18 29l4 4 8-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_PROGRESS = '<svg viewBox="0 0 20 20" fill="none"><rect x="3.5" y="4.5" width="13" height="11" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M7 12.5V9M10 12.5V6.5M13 12.5V8" stroke="currentColor" stroke-width="1.6"/></svg>';
const ICON_GRIP = '<svg viewBox="0 0 10 15" aria-hidden="true"><path d="M2 3.5h6M2 7.5h6M2 11.5h6" stroke="currentColor" stroke-width="1.4"/></svg>';
const ICON_FOLDER = '<svg viewBox="0 0 20 20" fill="none"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h3l1.6 1.8H15.5A1.5 1.5 0 0 1 17 8.3v6.2a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
const ICON_FOLDER_PLUS = '<svg viewBox="0 0 20 20" fill="none"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h3l1.6 1.8H15.5A1.5 1.5 0 0 1 17 8.3v6.2a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M10 9.8v4.2M7.9 11.9h4.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
const ICON_CHEVRON = '<svg viewBox="0 0 20 20" fill="none"><path d="M8 6l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_CALENDAR = '<svg viewBox="0 0 20 20" fill="none"><rect x="3.5" y="4.5" width="13" height="11" rx="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 8.5h13M7 3.2v2.4M13 3.2v2.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
const ICON_ARROW_RIGHT = '<svg viewBox="0 0 20 20" fill="none"><path d="M4.5 10h10M11 6.5l3.5 3.5-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_ARROW_LEFT = '<svg viewBox="0 0 20 20" fill="none"><path d="M15.5 10h-10M8 6.5L4.5 10 8 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_SOUND_ON = '<svg viewBox="0 0 20 20" fill="none"><path d="M4 8h2.5L10 5.5v9L6.5 12H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12.5 8a3 3 0 0 1 0 4M14.5 6a6 6 0 0 1 0 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
const ICON_SOUND_OFF = '<svg viewBox="0 0 20 20" fill="none"><path d="M4 8h2.5L10 5.5v9L6.5 12H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M13 8.5l3 3M16 8.5l-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';

const KAOMOJI_POOL = [
  "(´･ω･`)",
  "(￣▽￣)",
  "(・∀・)",
  "(¬‿¬)",
  "( ˘ω˘ )",
  "ヽ(•‿•)ノ",
  "(＾▽＾)",
  "(´-ω-`)",
  "(๑•̀ㅂ•́)",
  "(•́‿•̀)",
];
const FIREWORK_COLORS = [
  "#5c7a55",
  "#829268",
  "#a8bf9a",
  "#b28e54",
  "#d4b473",
  "#b34a32",
  "#d97b5f",
  "#8f3f2b",
  "#e9eee1",
  "#f2d7a1",
];
const SOUND_BAR_HEIGHTS = [
  10, 17, 24, 13, 7, 20, 27, 12, 19, 8, 23, 15,
  10, 25, 17, 11, 21, 14, 9, 18, 26, 13, 20, 16,
];

const el = {
  monthNav: document.querySelector(".month-nav"),
  monthLabel: document.getElementById("month-label"),
  calendarPanel: document.querySelector(".calendar-panel"),
  calendarGrid: document.getElementById("calendar-grid"),
  pickControls: document.getElementById("pick-controls"),
  pickText: document.getElementById("pick-text"),
  pickConfirm: document.getElementById("pick-confirm"),
  pickCancel: document.getElementById("pick-cancel"),
  dayBubble: document.getElementById("day-bubble"),
  dayBubbleText: document.getElementById("day-bubble-text"),
  prevMonth: document.getElementById("prev-month"),
  nextMonth: document.getElementById("next-month"),
  calendarToday: document.getElementById("calendar-today"),
  monthRate: document.getElementById("month-rate"),
  monthBar: document.getElementById("month-bar"),
  monthDetail: document.getElementById("month-detail"),
  dayHeadText: document.querySelector(".day-head-text"),
  dayEyebrow: document.getElementById("day-eyebrow"),
  dayTitle: document.getElementById("day-title"),
  daySummary: document.getElementById("day-summary"),
  dayToday: document.getElementById("day-today"),
  dayProgress: document.getElementById("day-progress"),
  dayBar: document.getElementById("day-bar"),
  dayRatio: document.getElementById("day-ratio"),
  composer: document.getElementById("composer"),
  newTitle: document.getElementById("new-title"),
  newNotes: document.getElementById("new-notes"),
  newNotesWrap: document.getElementById("new-notes-wrap"),
  notesToggle: document.getElementById("notes-toggle"),
  newTime: document.getElementById("new-time"),
  newTimeBtn: document.getElementById("new-time-btn"),
  newTimeWrap: document.getElementById("new-time-wrap"),
  newAdvance: document.getElementById("new-advance"),
  newAdvanceBtn: document.getElementById("new-advance-btn"),
  newAdvanceOn: document.getElementById("new-advance-on"),
  newAdvanceNote: document.getElementById("new-advance-note"),
  newRemind: document.getElementById("new-remind"),
  timeToggle: document.getElementById("time-toggle"),
  addBtn: document.getElementById("add-btn"),
  taskScroll: document.querySelector(".task-scroll"),
  taskList: document.getElementById("task-list"),
  editDialog: document.getElementById("edit-dialog"),
  editForm: document.getElementById("edit-form"),
  editTitle: document.getElementById("edit-title"),
  editNotes: document.getElementById("edit-notes"),
  editTime: document.getElementById("edit-time"),
  editTimeBtn: document.getElementById("edit-time-btn"),
  editAdvance: document.getElementById("edit-advance"),
  editAdvanceBtn: document.getElementById("edit-advance-btn"),
  editAdvanceOn: document.getElementById("edit-advance-on"),
  editAdvanceNote: document.getElementById("edit-advance-note"),
  editRemind: document.getElementById("edit-remind"),
  editDate: document.getElementById("edit-date"),
  editDateBtn: document.getElementById("edit-date-btn"),
  editDateText: document.getElementById("edit-date-text"),
  editDatePop: document.getElementById("edit-date-pop"),
  editDateLabel: document.getElementById("edit-date-label"),
  editDateGrid: document.getElementById("edit-date-grid"),
  editDateChips: document.getElementById("edit-date-chips"),
  editMeta: document.getElementById("edit-meta"),
  editDelete: document.getElementById("edit-delete"),
  confirmDialog: document.getElementById("confirm-dialog"),
  confirmText: document.getElementById("confirm-text"),
  confirmOk: document.getElementById("confirm-ok"),
  confirmCancel: document.getElementById("confirm-cancel"),
  toast: document.getElementById("toast"),
  suspendBtn: document.getElementById("suspend-btn"),
  dayPanel: document.querySelector(".day-panel"),
  planEntry: document.getElementById("plan-entry"),
  planPanel: document.getElementById("plan-panel"),
  planBack: document.getElementById("plan-back"),
  planComposer: document.getElementById("plan-composer"),
  planTitleInput: document.getElementById("plan-title"),
  planAddBtn: document.getElementById("plan-add-btn"),
  planList: document.getElementById("plan-list"),
  planSummary: document.getElementById("plan-summary"),
  planDetailPanel: document.getElementById("plan-detail-panel"),
  planDetailTitle: document.getElementById("plan-detail-title"),
  planDetailPct: document.getElementById("plan-detail-pct"),
  planDetailSummary: document.getElementById("plan-detail-summary"),
  planDetailMeter: document.getElementById("plan-detail-meter"),
  planDetailList: document.getElementById("plan-detail-list"),
  planDetailAdd: document.getElementById("plan-detail-add"),
  planDetailEdit: document.getElementById("plan-detail-edit"),
  planDetailBack: document.getElementById("plan-detail-back"),
  planDialog: document.getElementById("plan-dialog"),
  planEditForm: document.getElementById("plan-edit-form"),
  planEditTitle: document.getElementById("plan-edit-title"),
  planEditDate: document.getElementById("plan-edit-date"),
  planEditTask: document.getElementById("plan-edit-task"),
  planLinkHint: document.getElementById("plan-link-hint"),
  planEditMeta: document.getElementById("plan-edit-meta"),
  planEditDelete: document.getElementById("plan-edit-delete"),
  planDateField: document.getElementById("plan-date-field"),
  planDateBtn: document.getElementById("plan-date-btn"),
  planDateText: document.getElementById("plan-date-text"),
  planDatePop: document.getElementById("plan-date-pop"),
  planDateLabel: document.getElementById("plan-date-label"),
  planDateGrid: document.getElementById("plan-date-grid"),
  planEntryMark: document.getElementById("plan-entry-mark"),
  planEntryTitle: document.getElementById("plan-entry-title"),
  planEntrySub: document.getElementById("plan-entry-sub"),
  planEntryGo: document.getElementById("plan-entry-go"),
  confirmHeading: document.getElementById("confirm-heading"),
  planCompleteToast: document.getElementById("plan-complete-toast"),
  planCompleteText: document.getElementById("plan-complete-text"),
  taskRemindToast: document.getElementById("task-remind-toast"),
  taskRemindText: document.getElementById("task-remind-text"),
  taskRemindEyebrow: document.getElementById("task-remind-eyebrow"),
  timePop: document.getElementById("time-pop"),
  timePopLabel: document.getElementById("time-pop-label"),
  timePopHint: document.getElementById("time-pop-hint"),
  timeHours: document.getElementById("time-hours"),
  timeMinutes: document.getElementById("time-minutes"),
  soundToggle: document.getElementById("sound-toggle"),
};

const desktopBridge = window.chrome?.webview || null;
if (desktopBridge) {
  document.documentElement.classList.add("desktop");
  el.suspendBtn?.addEventListener("click", () => {
    desktopBridge.postMessage({ action: "show-drawer" });
  });
}

const state = {
  viewYear: 0,
  viewMonth: 0,
  selected: "",
  tasks: [],
  stats: {},
  loaded: false,
  taskToken: 0,
  monthToken: 0,
  editingId: null,
  deletingId: null,
  pendingToggles: new Set(),
  animateNext: false,
  popDate: "",
  enteringId: null,
  dragging: null,
  reordering: false,
  progressEditingId: null,
  progressTimer: null,
  lastKaomoji: "",
  planView: false,
  plans: [],
  plansLoaded: false,
  plansInitialized: false,
  plansSignature: "",
  dayPlanIndex: new Map(),
  expandedPlans: new Set(),
  pendingPlanToggles: new Set(),
  planAddParent: null,
  planDetailId: null,
  planEditingId: null,
  planDeletingId: null,
  calendarPick: null,
  remindFired: new Set(),
  reminderTasks: null,
  reminderTasksAt: 0,
};

function pad2(value) {
  return String(value).padStart(2, "0");
}

function toISO(dateObj) {
  return `${dateObj.getFullYear()}-${pad2(dateObj.getMonth() + 1)}-${pad2(dateObj.getDate())}`;
}

function fromISO(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dayDiff(a, b) {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(ay, am - 1, ad) - Date.UTC(by, bm - 1, bd)) / 86400000);
}

function fmtStamp(value) {
  if (!value) return "";
  const [datePart, timePart] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const time = timePart ? timePart.slice(0, 5) : "";
  const nowYear = new Date().getFullYear();
  if (year === nowYear) return `${month}月${day}日 ${time}`.trim();
  return `${year}年${month}月${day}日 ${time}`.trim();
}

let toastTimer = null;
let bubbleHideTimer = null;
let bubbleAnimating = false;
let planDateView = null;
let planDateHideTimer = null;
let planCompleteTimer = null;
let remindToastTimer = null;
let remindTimer = null;
let remindCheckBusy = false;
let notifyAsked = false;
let planTaskOptions = [];
let timePick = null;
let editDateView = null;
let editDateHideTimer = null;

function sfx(name) {
  window.Sfx?.play(name);
}

function syncSoundToggle() {
  if (!window.Sfx || !el.soundToggle) return;
  const muted = window.Sfx.isMuted();
  el.soundToggle.classList.toggle("is-muted", muted);
  el.soundToggle.setAttribute("aria-pressed", String(!muted));
  el.soundToggle.setAttribute("aria-label", muted ? "开启音效" : "关闭音效");
  el.soundToggle.title = muted ? "开启音效" : "关闭音效";
  el.soundToggle.innerHTML = muted ? ICON_SOUND_OFF : ICON_SOUND_ON;
}

function toast(message, type = "info") {
  el.toast.textContent = message;
  el.toast.dataset.type = type;
  el.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove("show"), 2800);
}

function showPlanCompleteToast(title) {
  sfx("plan-all-done");
  el.taskRemindToast.classList.remove("show");
  el.planCompleteText.textContent = `「${title}」的子计划已全部完成`;
  el.planCompleteToast.classList.remove("show");
  void el.planCompleteToast.offsetWidth;
  el.planCompleteToast.classList.add("show");
  clearTimeout(planCompleteTimer);
  planCompleteTimer = setTimeout(() => el.planCompleteToast.classList.remove("show"), 3800);
}

function ensureNotifyPermission() {
  if (notifyAsked) return;
  notifyAsked = true;
  if (!("Notification" in window) || Notification.permission !== "default") return;
  try {
    Notification.requestPermission().catch(() => {});
  } catch (error) {
    /* notification permission is best-effort */
  }
}

function taskReminderCandidates(task) {
  const list = [];
  if (task.due_time && task.remind) list.push({ kind: "on", time: task.due_time });
  if (task.advance_time && task.due_time && task.advance_time < task.due_time) {
    list.push({ kind: "advance", time: task.advance_time });
  }
  return list;
}

function reminderReached(time, now) {
  const [hour, minute] = time.split(":").map(Number);
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  const delta = (now.getTime() - target.getTime()) / 1000;
  return delta >= 0 && delta <= 90;
}

function showTaskReminder(task, kind, time) {
  sfx("task-remind");
  el.planCompleteToast.classList.remove("show");
  el.taskRemindEyebrow.textContent = `${kind === "advance" ? "提前提醒" : "日程提醒"} · ${time}`;
  el.taskRemindText.textContent = kind === "advance"
    ? `${task.title} · 任务时间 ${task.due_time}`
    : task.title;
  el.taskRemindToast.classList.remove("show");
  void el.taskRemindToast.offsetWidth;
  el.taskRemindToast.classList.add("show");
  clearTimeout(remindToastTimer);
  remindToastTimer = setTimeout(() => el.taskRemindToast.classList.remove("show"), 6500);
  if (document.hidden && "Notification" in window && Notification.permission === "granted") {
    try {
      new Notification(`${kind === "advance" ? "提前提醒" : "日程提醒"} · ${time}`, {
        body: task.title,
        tag: `taskdraw-${task.id}-${kind}`,
      });
    } catch (error) {
      /* fall back to the in-app toast */
    }
  }
}

async function checkTaskReminders() {
  if (!state.loaded) return;
  const now = new Date();
  if (!state.reminderTasks || Date.now() - state.reminderTasksAt > 20000) {
    if (remindCheckBusy) return;
    remindCheckBusy = true;
    try {
      const data = await api(`/api/tasks?date=${toISO(now)}`);
      state.reminderTasks = data.tasks || [];
      state.reminderTasksAt = Date.now();
    } catch (error) {
      return;
    } finally {
      remindCheckBusy = false;
    }
  }
  (state.reminderTasks || []).forEach((task) => {
    if (task.status === "done") return;
    taskReminderCandidates(task).forEach(({ kind, time }) => {
      if (!reminderReached(time, now)) return;
      const key = `${task.id}:${task.task_date}:${kind}:${time}`;
      if (state.remindFired.has(key)) return;
      state.remindFired.add(key);
      showTaskReminder(task, kind, time);
    });
  });
}

function startReminderLoop() {
  if (remindTimer) return;
  remindTimer = setInterval(checkTaskReminders, 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) checkTaskReminders();
  });
  document.addEventListener("pointerdown", ensureNotifyPermission, { once: true });
  document.addEventListener("keydown", ensureNotifyPermission, { once: true });
  setTimeout(checkTaskReminders, 1200);
}

function notifyReminderHost() {
  state.reminderTasksAt = 0;
  desktopBridge?.postMessage({ action: "refresh-reminders" });
}

window.taskdrawReminderChime = () => sfx("task-remind");
window.taskdrawRefresh = async () => {
  state.reminderTasksAt = 0;
  await refreshAll();
  await loadPlans();
};

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
    throw new Error((data && data.error) || "请求失败，请稍后再试");
  }
  return data;
}

function gridRange() {
  const first = new Date(state.viewYear, state.viewMonth, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(state.viewYear, state.viewMonth, 1 - offset);
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + GRID_DAYS - 1);
  return { start, end };
}

function renderCalendar(options = {}) {
  el.monthLabel.textContent = `${state.viewYear} 年 ${state.viewMonth + 1} 月`;
  const { start } = gridRange();
  const todayStr = toISO(new Date());
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < GRID_DAYS; i += 1) {
    const dateObj = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const iso = toISO(dateObj);
    const stat = state.stats[iso];
    const outside = dateObj.getMonth() !== state.viewMonth || dateObj.getFullYear() !== state.viewYear;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "day";
    if (outside) button.classList.add("outside");
    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) button.classList.add("weekend");
    if (iso === todayStr) button.classList.add("today");
    if (iso === state.selected) button.classList.add("selected");
    if (iso === state.popDate) button.classList.add("just-selected");
    button.dataset.date = iso;

    const labelParts = [`${dateObj.getMonth() + 1}月${dateObj.getDate()}日`, WEEKDAY_FULL[dateObj.getDay()]];
    if (stat && stat.total) {
      labelParts.push(`${stat.total} 项任务，完成 ${stat.done} 项`);
    } else {
      labelParts.push("没有任务");
    }
    const accessibleLabel = labelParts.join("，");
    button.setAttribute("aria-label", accessibleLabel);
    button.setAttribute("aria-pressed", String(iso === state.selected));
    if (iso === todayStr) button.setAttribute("aria-current", "date");
    else button.title = accessibleLabel;

    const top = document.createElement("span");
    top.className = "day-top";
    const number = document.createElement("span");
    number.className = "day-num";
    number.textContent = String(dateObj.getDate());
    top.appendChild(number);
    if (stat && stat.total) {
      const count = document.createElement("span");
      count.className = "day-count";
      count.textContent = String(stat.total);
      top.appendChild(count);
    }
    button.appendChild(top);

    if (stat && stat.total > 0) {
      const donePct = (stat.done / stat.total) * 100;
      const meter = document.createElement("span");
      meter.className = "meter";
      if (donePct > 0) {
        const done = document.createElement("span");
        done.className = "m-done";
        done.style.width = `${donePct}%`;
        meter.appendChild(done);
      }
      if (donePct < 100) {
        const open = document.createElement("span");
        open.className = "m-open";
        if (iso < todayStr) open.classList.add("is-late");
        open.style.width = `${100 - donePct}%`;
        meter.appendChild(open);
      }
      button.appendChild(meter);
    }

    fragment.appendChild(button);
  }

  el.calendarGrid.replaceChildren(fragment);
  state.popDate = "";

  if (options.slide) {
    el.calendarGrid.classList.remove("slide-next", "slide-prev");
    void el.calendarGrid.offsetWidth;
    el.calendarGrid.classList.add(options.slide > 0 ? "slide-next" : "slide-prev");
  }

  renderMonthStats();
  if (state.calendarPick) refreshCalendarPickHighlight();
}

function pulseMonth() {
  el.monthNav.classList.remove("changed");
  void el.monthNav.offsetWidth;
  el.monthNav.classList.add("changed");
}

function renderMonthStats() {
  const prefix = `${state.viewYear}-${pad2(state.viewMonth + 1)}-`;
  let total = 0;
  let done = 0;
  Object.entries(state.stats).forEach(([iso, stat]) => {
    if (iso.startsWith(prefix)) {
      total += stat.total;
      done += stat.done;
    }
  });

  if (total === 0) {
    el.monthRate.textContent = "—";
    el.monthBar.style.width = "0%";
    el.monthDetail.textContent = "本月还没有任务";
    return;
  }

  const rate = Math.round((done / total) * 100);
  el.monthRate.textContent = `${rate}%`;
  el.monthBar.style.width = `${rate}%`;
  el.monthDetail.textContent = `本月 ${total} 项任务 · 已完成 ${done} 项 · 未完成 ${total - done} 项`;
}

function currentTodayISO() {
  return toISO(new Date());
}

function isTodayComplete() {
  const today = currentTodayISO();
  if (state.selected === today && state.loaded) {
    const plans = planLeavesForDate(today);
    const total = state.tasks.length + plans.length;
    return total > 0
      && state.tasks.every((task) => task.status === "done")
      && plans.every((plan) => plan.done);
  }
  const stat = state.stats[today];
  return Boolean(stat && stat.total > 0 && stat.done === stat.total);
}

function pickKaomoji() {
  let index = Math.floor(Math.random() * KAOMOJI_POOL.length);
  if (KAOMOJI_POOL[index] === state.lastKaomoji) {
    index = (index + 1 + Math.floor(Math.random() * (KAOMOJI_POOL.length - 1))) % KAOMOJI_POOL.length;
  }
  state.lastKaomoji = KAOMOJI_POOL[index];
  return state.lastKaomoji;
}

function showDayBubble(button) {
  if (!button || bubbleAnimating) return;
  clearTimeout(bubbleHideTimer);

  const bubble = el.dayBubble;
  bubble.classList.remove("is-dissolving", "is-bursting");
  bubble.classList.toggle("is-done", isTodayComplete());
  el.dayBubbleText.textContent = pickKaomoji();
  bubble.hidden = false;

  const width = bubble.offsetWidth;
  const height = bubble.offsetHeight;
  const left = Math.max(6, Math.min(button.offsetLeft - width + 12, el.calendarPanel.clientWidth - width - 8));
  const top = Math.max(6, button.offsetTop - height - 12);
  bubble.style.left = `${left}px`;
  bubble.style.top = `${top}px`;

  bubble.style.animation = "none";
  void bubble.offsetWidth;
  bubble.style.animation = "";
}

function hideDayBubble(immediate = false) {
  if (bubbleAnimating) return;
  clearTimeout(bubbleHideTimer);
  if (immediate) {
    el.dayBubble.hidden = true;
    return;
  }
  bubbleHideTimer = setTimeout(() => {
    el.dayBubble.hidden = true;
  }, 120);
}

function finishBubbleAnimation() {
  clearTimeout(bubbleHideTimer);
  bubbleAnimating = false;
  el.dayBubble.hidden = true;
  el.dayBubble.classList.remove("is-dissolving", "is-bursting");
}

function spawnFireworks(bubble) {
  sfx("firework");
  const rect = bubble.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const ring = document.createElement("span");
  ring.className = "fw-ring";
  ring.style.left = `${cx}px`;
  ring.style.top = `${cy}px`;
  document.body.appendChild(ring);
  const ringAnim = ring.animate(
    [
      { transform: "translate(-50%, -50%) scale(0.35)", opacity: 0.85 },
      { transform: "translate(-50%, -50%) scale(3.1)", opacity: 0 },
    ],
    { duration: 430, easing: "ease-out" }
  );
  ringAnim.onfinish = () => ring.remove();

  for (let i = 0; i < 16; i += 1) {
    const angle = (Math.PI * 2 * i) / 16 + (Math.random() - 0.5) * 0.3;
    const distance = 60 + Math.random() * 68;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const duration = 600 + Math.random() * 260;
    const color = FIREWORK_COLORS[i % FIREWORK_COLORS.length];
    const angleDeg = (angle * 180) / Math.PI;

    for (let t = 0; t < 4; t += 1) {
      const spark = document.createElement("span");
      spark.className = t === 0 ? "fw-spark" : "fw-spark fw-trail";
      spark.style.left = `${cx}px`;
      spark.style.top = `${cy}px`;
      spark.style.background = color;
      if (t > 0) {
        spark.style.width = `${12 - t * 2.5}px`;
        spark.style.height = `${4 - t * 0.5}px`;
      }
      document.body.appendChild(spark);

      const shrink = 1 - t * 0.16;
      const fade = 1 - t * 0.18;
      const rot = t > 0 ? ` rotate(${angleDeg}deg)` : "";
      const anim = spark.animate(
        [
          { transform: `translate(-50%, -50%) scale(${0.9 * shrink})${rot}`, opacity: fade, offset: 0 },
          {
            transform: `translate(calc(-50% + ${dx * 0.72}px), calc(-50% + ${dy * 0.72}px)) scale(${0.7 * shrink})${rot}`,
            opacity: fade,
            offset: 0.55,
          },
          {
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 10}px)) scale(${0.25 * shrink})${rot}`,
            opacity: 0,
            offset: 1,
          },
        ],
        {
          duration,
          delay: t * 30,
          fill: "both",
          easing: "cubic-bezier(0.16, 0.7, 0.3, 1)",
        }
      );
      anim.onfinish = () => spark.remove();
    }
  }
}

function spawnDissolve(bubble) {
  sfx("dissolve");
  const rect = bubble.getBoundingClientRect();
  const colors = ["#ffffff", "#f6e5df", "#e7c3ba", "#c98a7a", "#f2e6da"];
  for (let i = 0; i < 26; i += 1) {
    const bit = document.createElement("span");
    bit.className = "dissolve-bit";
    const size = 3 + Math.random() * 5;
    bit.style.width = `${size}px`;
    bit.style.height = `${size * (0.7 + Math.random() * 0.6)}px`;
    bit.style.left = `${rect.left + Math.random() * rect.width}px`;
    bit.style.top = `${rect.top + Math.random() * rect.height}px`;
    bit.style.background = colors[i % colors.length];
    document.body.appendChild(bit);

    const dx = (Math.random() - 0.5) * 72;
    const dy = 14 + Math.random() * 48;
    const spin = (Math.random() - 0.5) * 260;
    const anim = bit.animate(
      [
        { transform: "translate(0, 0) rotate(0deg)", opacity: 0.95, offset: 0 },
        {
          transform: `translate(${dx * 0.6}px, ${dy * 0.55}px) rotate(${spin * 0.5}deg)`,
          opacity: 0.7,
          offset: 0.55,
        },
        {
          transform: `translate(${dx}px, ${dy}px) rotate(${spin}deg)`,
          opacity: 0,
          offset: 1,
        },
      ],
      { duration: 260 + Math.random() * 220, easing: "cubic-bezier(0.2, 0.6, 0.3, 1)" }
    );
    anim.onfinish = () => bit.remove();
  }
}

function animateDayBubble() {
  const bubble = el.dayBubble;
  if (bubble.hidden || bubbleAnimating) return;
  bubbleAnimating = true;
  clearTimeout(bubbleHideTimer);

  const done = bubble.classList.contains("is-done");
  if (done) {
    spawnFireworks(bubble);
    bubble.classList.add("is-bursting");
  } else {
    spawnDissolve(bubble);
    bubble.classList.add("is-dissolving");
  }
  bubbleHideTimer = setTimeout(finishBubbleAnimation, done ? 430 : 300);
}

function updateDayHeader() {
  const dateObj = fromISO(state.selected);
  el.dayTitle.textContent = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日 · ${WEEKDAY_FULL[dateObj.getDay()]}`;

  const diff = dayDiff(state.selected, toISO(new Date()));
  let eyebrow = "计划中";
  if (diff === 0) eyebrow = "今天";
  else if (diff === -1) eyebrow = "昨天";
  else if (diff === 1) eyebrow = "明天";
  else if (diff < 0) eyebrow = "历史回看";
  el.dayEyebrow.textContent = eyebrow;

  el.dayToday.classList.toggle("is-current", diff === 0);

  if (!state.loaded) {
    el.daySummary.textContent = "正在载入…";
    el.daySummary.classList.remove("is-complete");
    el.dayRatio.textContent = "0/0";
    el.dayBar.style.width = "0%";
    el.dayProgress.classList.remove("is-complete");
    el.dayProgress.classList.add("is-empty");
    return;
  }

  updateDayProgress();

  const dayPlans = planLeavesForDate(state.selected);
  const taskOpen = state.tasks.filter((task) => task.status === "open").length;
  const planOpen = dayPlans.filter((plan) => !plan.done).length;
  const open = taskOpen + planOpen;
  const total = state.tasks.length + dayPlans.length;
  const done = total - open;
  el.daySummary.classList.toggle("is-complete", total > 0 && open === 0);

  if (total === 0) {
    el.daySummary.textContent = diff < 0
      ? "这一天没有留下任务"
      : "还没有任务，先加一条";
  } else {
    let summary;
    if (open === 0) summary = `全部完成 · ${done} 项`;
    else if (diff < 0) summary = `${open} 项未完成 · ${done} 项完成`;
    else summary = `${open} 项待办 · 已完成 ${done} 项`;
    el.daySummary.textContent = dayPlans.length
      ? `${summary} · 含 ${dayPlans.length} 项计划`
      : summary;
  }
}

function updateDayProgress() {
  const plans = planLeavesForDate(state.selected);
  const total = state.tasks.length + plans.length;
  const done = state.tasks.filter((task) => task.status === "done").length
    + plans.filter((plan) => plan.done).length;
  const ratio = total ? done / total : 0;

  el.dayRatio.textContent = `${done}/${total}`;
  el.dayBar.style.width = `${Math.round(ratio * 100)}%`;
  el.dayProgress.classList.toggle("is-complete", total > 0 && done === total);
  el.dayProgress.classList.toggle("is-empty", total === 0);
  el.dayProgress.setAttribute("aria-label", `当日完成进度 ${done}/${total}`);

  if (!el.dayBubble.hidden) {
    el.dayBubble.classList.toggle("is-done", isTodayComplete());
  }
}

function pulseDayHead() {
  el.dayHeadText.classList.remove("pop");
  void el.dayHeadText.offsetWidth;
  el.dayHeadText.classList.add("pop");
}

function emptyState() {
  const wrap = document.createElement("div");
  wrap.className = "empty";
  wrap.innerHTML = `<span class="empty-art">${ICON_EMPTY}</span><p>这一天还没有任务</p><small>写下第一件事，按 <kbd>Enter</kbd> 保存</small><button class="empty-cta" type="button" data-action="empty-add">添加第一件事</button>`;
  return wrap;
}

function skeletonState() {
  const wrap = document.createElement("div");
  wrap.className = "skeleton-list";
  wrap.innerHTML = Array.from({ length: 4 }, () => (
    '<div class="sk-row"><span class="sk-check"></span><span class="sk-lines"><span class="sk-line w1"></span><span class="sk-line w2"></span></span></div>'
  )).join("");
  return wrap;
}

function refreshPlansForLinkedTask(taskId) {
  if (state.plans.some((plan) => plan.task_id === taskId)) loadPlans();
}

function comparePlanSchedule(a, b) {
  if (a.plan_date && !b.plan_date) return -1;
  if (!a.plan_date && b.plan_date) return 1;
  if (a.plan_date && b.plan_date && a.plan_date !== b.plan_date) {
    return a.plan_date < b.plan_date ? -1 : 1;
  }
  if (a.due_time && !b.due_time) return -1;
  if (!a.due_time && b.due_time) return 1;
  if (a.due_time && b.due_time && a.due_time !== b.due_time) {
    return a.due_time < b.due_time ? -1 : 1;
  }
  return a.position - b.position || a.id - b.id;
}

function rebuildDayPlanIndex() {
  const index = new Map();
  state.plans.forEach((plan) => {
    if (plan.child_count !== 0 || plan.task_id != null || !plan.plan_date) return;
    if (!index.has(plan.plan_date)) index.set(plan.plan_date, []);
    index.get(plan.plan_date).push(plan);
  });
  index.forEach((plans) => {
    plans.sort((a, b) => Number(a.done) - Number(b.done) || comparePlanSchedule(a, b));
  });
  state.dayPlanIndex = index;
}

function planLeavesForDate(iso) {
  return state.dayPlanIndex.get(iso) || [];
}

function buildPlanDaySection(plans) {
  const section = document.createElement("section");
  section.className = "task-section plan-day-section";
  const heading = document.createElement("p");
  heading.className = "section-label";
  heading.textContent = `长期计划 · ${plans.length}`;
  section.appendChild(heading);
  plans.forEach((plan) => section.appendChild(buildPlanDayRow(plan)));
  return section;
}

function buildPlanDayRow(plan) {
  const article = document.createElement("article");
  article.className = plan.done ? "task plan-task done" : "task plan-task";
  article.dataset.planId = String(plan.id);

  const check = document.createElement("button");
  check.type = "button";
  check.className = "check";
  check.dataset.planDayToggle = "1";
  check.setAttribute("aria-pressed", String(plan.done));
  check.setAttribute("aria-label", plan.done ? "标记为未完成" : "标记为完成");
  const fill = document.createElement("span");
  fill.className = "check-fill";
  fill.setAttribute("aria-hidden", "true");
  check.appendChild(fill);

  const main = document.createElement("div");
  main.className = "task-main";
  const title = document.createElement("p");
  title.className = "task-title";
  title.textContent = plan.title;
  const badge = document.createElement("span");
  badge.className = "plan-badge";
  badge.textContent = "计划";
  badge.setAttribute("aria-hidden", "true");
  title.appendChild(badge);
  const meta = document.createElement("p");
  meta.className = "task-meta";
  const parent = plan.parent_id != null
    ? state.plans.find((item) => item.id === plan.parent_id)
    : null;
  meta.textContent = parent ? `来自「${parent.title}」` : "来自长期计划";
  main.append(title, meta);

  const go = document.createElement("button");
  go.type = "button";
  go.className = "icon-btn plan-task-go";
  go.dataset.planDayOpen = "1";
  go.title = "在计划中查看";
  go.setAttribute("aria-label", "在计划中查看");
  go.innerHTML = ICON_ARROW_RIGHT;

  article.append(check, main, go);
  return article;
}

function openPlanFromDay(id) {
  const plan = state.plans.find((item) => item.id === id);
  if (!plan) return;
  enterPlanView();
  const parent = plan.parent_id != null
    ? state.plans.find((item) => item.id === plan.parent_id)
    : null;
  if (parent && parent.child_count > 0) openPlanDetail(parent.id, "in", { silent: true });
}

function buildSection(label, tasks, options = {}) {
  const section = document.createElement("section");
  section.className = options.doneSection ? "task-section done-section" : "task-section";

  const heading = document.createElement("p");
  heading.className = "section-label";
  heading.textContent = `${label} · ${tasks.length}`;
  section.appendChild(heading);

  const start = options.start || 0;
  tasks.forEach((task, index) => section.appendChild(buildTask(task, start + index, options.animate, options.enteringId)));
  return section;
}

function buildTask(task, index = 0, animate = false, enteringId = null) {
  const todayStr = toISO(new Date());
  const isDone = task.status === "done";

  const article = document.createElement("article");
  article.className = isDone ? "task done" : "task";
  article.dataset.id = String(task.id);
  article.style.setProperty("--task-progress", `${Number(task.progress) || 0}%`);

  const handle = document.createElement("span");
  handle.className = isDone ? "drag-handle disabled" : "drag-handle";
  handle.setAttribute("aria-hidden", "true");
  if (!isDone) handle.title = "拖动调整顺序";
  handle.innerHTML = ICON_GRIP;

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

  const main = document.createElement("div");
  main.className = "task-main";

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
  const linkedPlan = state.plans.find((plan) => plan.task_id === task.id);
  if (linkedPlan) {
    const planBadge = document.createElement("span");
    planBadge.className = "task-plan-link";
    planBadge.textContent = "计划";
    planBadge.title = `关联计划：${linkedPlan.title}`;
    title.appendChild(planBadge);
  }
  if (!isDone && task.task_date < todayStr) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = "未完成";
    title.appendChild(badge);
  }
  main.appendChild(title);

  if (task.notes) {
    const notes = document.createElement("p");
    notes.className = "task-notes";
    notes.dataset.action = "expand";
    notes.title = "点击展开或收起备注";
    notes.textContent = task.notes;
    main.appendChild(notes);
  }

  const meta = document.createElement("p");
  meta.className = "task-meta";
  if (isDone && task.completed_at) {
    meta.textContent = `完成于 ${fmtStamp(task.completed_at)}`;
  } else {
    meta.textContent = `创建于 ${fmtStamp(task.created_at)}`;
  }
  main.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const progressButton = document.createElement("button");
  progressButton.type = "button";
  progressButton.className = "icon-btn" + (state.progressEditingId === task.id ? " active" : "");
  progressButton.dataset.action = "progress";
  progressButton.title = "设置完成度";
  progressButton.setAttribute("aria-label", "设置完成度");
  progressButton.innerHTML = ICON_PROGRESS;

  const edit = document.createElement("button");
  edit.type = "button";
  edit.className = "icon-btn";
  edit.dataset.action = "edit";
  edit.setAttribute("aria-label", "编辑任务");
  edit.innerHTML = ICON_EDIT;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "icon-btn danger";
  remove.dataset.action = "delete";
  remove.setAttribute("aria-label", "删除任务");
  remove.innerHTML = ICON_TRASH;

  actions.append(progressButton, edit, remove);
  article.append(handle, check, main, actions);

  if (state.progressEditingId === task.id) {
    article.classList.add("progress-editing");
    article.appendChild(buildProgressPanel(task));
  }

  if (task.id === enteringId) {
    article.classList.add("enter-right");
  } else if (animate) {
    article.classList.add("enter");
    article.style.animationDelay = `${Math.min(index * 30, 300)}ms`;
  }
  return article;
}

function createSoundBars(isDone) {
  const bars = document.createElement("span");
  bars.className = isDone ? "task-bars is-done" : "task-bars";
  bars.setAttribute("aria-hidden", "true");
  SOUND_BAR_HEIGHTS.forEach((height) => {
    const bar = document.createElement("i");
    bar.style.height = `${height}px`;
    bars.appendChild(bar);
  });
  return bars;
}

function placeSoundBars(article) {
  const section = article.parentElement;
  if (!section) return null;
  const bars = createSoundBars(article.classList.contains("done"));
  bars.style.top = `${article.offsetTop + article.offsetHeight / 2}px`;
  section.appendChild(bars);
  return bars;
}

function playSoundBarsOut(article) {
  const bars = placeSoundBars(article);
  if (!bars) return;
  const animation = bars.animate(
    [
      { clipPath: "inset(0 0 0 100%)", opacity: 0, offset: 0 },
      { clipPath: "inset(0 0 0 0%)", opacity: 1, offset: 0.22 },
      { clipPath: "inset(0 0 0 0%)", opacity: 1, offset: 0.46 },
      { clipPath: "inset(0 0 0 100%)", opacity: 0.9, offset: 1 },
    ],
    { duration: 260, easing: "linear", fill: "forwards" },
  );
  animation.finished.then(() => bars.remove(), () => bars.remove());
}

function animateSoundBarsIn(bars) {
  const animation = bars.animate(
    [
      { clipPath: "inset(0 0 0 100%)", opacity: 0, offset: 0 },
      { clipPath: "inset(0 0 0 0%)", opacity: 1, offset: 0.34 },
      { clipPath: "inset(0 0 0 0%)", opacity: 1, offset: 0.72 },
      { clipPath: "inset(0 0 0 0%)", opacity: 0, offset: 1 },
    ],
    { duration: 460, easing: "linear", fill: "forwards" },
  );
  animation.finished.then(() => bars.remove(), () => bars.remove());
}

function playSoundBarsIn(article) {
  const bars = placeSoundBars(article);
  if (!bars) return;
  animateSoundBarsIn(bars);
}

function playPlanSoundBarsIn(row, isDone) {
  const item = row?.closest(".plan-item");
  if (!item) return;
  const bars = createSoundBars(isDone);
  bars.classList.add("plan-bars");
  bars.style.top = `${row.offsetTop + row.offsetHeight / 2}px`;
  item.appendChild(bars);
  animateSoundBarsIn(bars);
}

function playTaskExit(article) {
  if (!article || !article.isConnected) return Promise.resolve();
  const height = article.getBoundingClientRect().height;
  if (!height) return Promise.resolve();
  playSoundBarsOut(article);
  article.style.overflow = "hidden";
  article.style.pointerEvents = "none";
  const animation = article.animate(
    [
      { height: `${height}px`, paddingTop: "12px", paddingBottom: "12px", borderBottomWidth: "1px", opacity: 1, transform: "translateX(0px)" },
      { height: `${height * 0.5}px`, paddingTop: "6px", paddingBottom: "6px", borderBottomWidth: "1px", opacity: 0.5, transform: "translateX(46px)", offset: 0.5 },
      { height: "0px", paddingTop: "0px", paddingBottom: "0px", borderBottomWidth: "0px", opacity: 0, transform: "translateX(88px)" },
    ],
    { duration: 260, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" },
  );
  return animation.finished.then(() => undefined, () => undefined);
}

function buildProgressPanel(task) {
  const value = Number(task.progress) || 0;
  const panel = document.createElement("div");
  panel.className = "task-progress";
  const ticks = [0, 25, 50, 75, 100]
    .map((point) => `<span class="tp-tick" style="left:${point}%"></span>`)
    .join("");
  panel.innerHTML = `
    <div class="tp-track" role="slider" tabindex="0" aria-label="完成度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}">
      ${ticks}
      <span class="tp-fill" style="width:${value}%"></span>
      <span class="tp-thumb" style="left:${value}%"></span>
    </div>
    <span class="tp-value">${value}%</span>
  `;
  const track = panel.querySelector(".tp-track");
  track.dataset.saved = String(value);
  track.addEventListener("pointerdown", (event) => beginProgressDrag(event, task, track));
  track.addEventListener("keydown", (event) => onProgressKey(event, task, track));
  return panel;
}

function applyProgressVisual(track, value) {
  const panel = track.closest(".task-progress");
  track.querySelector(".tp-fill").style.width = `${value}%`;
  track.querySelector(".tp-thumb").style.left = `${value}%`;
  track.setAttribute("aria-valuenow", String(value));
  panel.querySelector(".tp-value").textContent = `${value}%`;
  const article = track.closest(".task");
  if (article) article.style.setProperty("--task-progress", `${value}%`);
}

function beginProgressDrag(event, task, track) {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();

  const previous = Number(track.dataset.saved) || 0;
  try {
    track.setPointerCapture(event.pointerId);
  } catch {
    // Pointer capture is best-effort.
  }
  document.body.classList.add("is-progressing");

  const update = (clientX) => {
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const value = Math.max(0, Math.min(100, Math.round(ratio * 100)));
    task.progress = value;
    applyProgressVisual(track, value);
  };
  update(event.clientX);

  const move = (moveEvent) => update(moveEvent.clientX);
  const finish = async () => {
    track.removeEventListener("pointermove", move);
    track.removeEventListener("pointerup", finish);
    track.removeEventListener("pointercancel", finish);
    document.body.classList.remove("is-progressing");
    await persistProgress(task.id, task.progress, previous);
  };
  track.addEventListener("pointermove", move);
  track.addEventListener("pointerup", finish);
  track.addEventListener("pointercancel", finish);
}

function onProgressKey(event, task, track) {
  const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
  if (!keys.includes(event.key)) return;
  event.preventDefault();

  const current = Number(task.progress) || 0;
  let value = current;
  if (event.key === "ArrowLeft" || event.key === "ArrowDown") value = Math.max(0, current - 5);
  else if (event.key === "ArrowRight" || event.key === "ArrowUp") value = Math.min(100, current + 5);
  else if (event.key === "Home") value = 0;
  else if (event.key === "End") value = 100;
  if (value === current) return;

  task.progress = value;
  applyProgressVisual(track, value);
  clearTimeout(state.progressTimer);
  state.progressTimer = setTimeout(() => {
    persistProgress(task.id, value, Number(track.dataset.saved) || 0);
  }, 260);
}

async function persistProgress(id, value, previous) {
  if (value === previous) return;
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  const previousStatus = task.status;
  const day = state.selected;

  try {
    const updated = await api(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ progress: value }),
    });
    if (state.selected !== day) return;
    const index = state.tasks.findIndex((item) => item.id === id);
    if (index === -1) return;

    if (updated.status !== previousStatus) {
      await playTaskExit(el.taskList.querySelector(`.task[data-id="${id}"]`));
      if (state.selected !== day) return;
      const movedIndex = state.tasks.findIndex((item) => item.id === id);
      if (movedIndex === -1) return;
      state.tasks.splice(movedIndex, 1);
      state.tasks.push(updated);
      state.progressEditingId = null;
      state.enteringId = id;
      renderTasks();
      updateDayHeader();
      loadMonth();
      refreshPlansForLinkedTask(id);
      notifyReminderHost();
      return;
    }

    state.tasks[index] = updated;
    renderTasks();
    updateDayHeader();
    loadMonth();
    refreshPlansForLinkedTask(id);
    notifyReminderHost();
    if (state.progressEditingId === id) {
      requestAnimationFrame(() => {
        el.taskList.querySelector(`.task[data-id="${id}"] .tp-track`)?.focus();
      });
    }
  } catch (error) {
    const current = state.tasks.find((item) => item.id === id);
    if (current) current.progress = previous;
    renderTasks();
    updateDayHeader();
    toast(error.message, "error");
  }
}

function toggleProgressEditor(id) {
  state.progressEditingId = state.progressEditingId === id ? null : id;
  renderTasks();
  if (state.progressEditingId === id) {
    requestAnimationFrame(() => {
      el.taskList.querySelector(`.task[data-id="${id}"] .tp-track`)?.focus();
    });
  }
}

function renderTasks(animate = false) {
  const enteringId = state.enteringId;
  state.enteringId = null;
  el.taskList.replaceChildren();
  if (!state.loaded) {
    el.taskList.appendChild(skeletonState());
    return;
  }

  if (state.progressEditingId != null && !state.tasks.some((task) => task.id === state.progressEditingId)) {
    state.progressEditingId = null;
  }

  const dayPlans = planLeavesForDate(state.selected);
  if (state.tasks.length === 0 && dayPlans.length === 0) {
    el.taskList.appendChild(emptyState());
    return;
  }

  const todayStr = toISO(new Date());
  const past = state.selected < todayStr;
  const open = state.tasks.filter((task) => task.status === "open");
  const done = state.tasks.filter((task) => task.status === "done");

  if (open.length) {
    el.taskList.appendChild(buildSection(past ? "未完成" : "待办", open, { start: 0, animate, enteringId }));
  }
  if (done.length) {
    el.taskList.appendChild(buildSection("已完成", done, {
      start: open.length,
      animate,
      enteringId,
      doneSection: true,
    }));
  }
  if (dayPlans.length) {
    el.taskList.appendChild(buildPlanDaySection(dayPlans));
  }

  if (enteringId != null) {
    const entering = el.taskList.querySelector(`.task[data-id="${enteringId}"]`);
    if (entering) playSoundBarsIn(entering);
  }
}

async function loadMonth() {
  const { start, end } = gridRange();
  const token = (state.monthToken += 1);
  try {
    const data = await api(`/api/calendar?start=${toISO(start)}&end=${toISO(end)}`);
    if (token !== state.monthToken) return;
    state.stats = data.days || {};
    renderCalendar();
  } catch (error) {
    if (token === state.monthToken) toast(error.message, "error");
  }
}

async function loadTasks() {
  const token = (state.taskToken += 1);
  const animate = state.animateNext;
  state.animateNext = false;
  try {
    const data = await api(`/api/tasks?date=${state.selected}`);
    if (token !== state.taskToken) return;
    state.tasks = data.tasks || [];
    state.loaded = true;
    renderTasks(animate);
    updateDayHeader();
  } catch (error) {
    if (token === state.taskToken) {
      state.loaded = true;
      renderTasks();
      updateDayHeader();
      toast(error.message, "error");
    }
  }
}

async function refreshAll() {
  await Promise.all([loadTasks(), loadMonth()]);
}

/* ---------- Long-term plans ---------- */

function fmtPlanDate(value) {
  const d = fromISO(value);
  const now = new Date();
  const prefix = d.getFullYear() === now.getFullYear() ? "" : `${d.getFullYear()}年`;
  return `${prefix}${d.getMonth() + 1}月${d.getDate()}日 · ${WEEKDAY_FULL[d.getDay()]}`;
}

function planScheduleMeta(plan) {
  if (plan.task_id != null) {
    const when = plan.plan_date
      ? `${fmtPlanDate(plan.plan_date)}${plan.due_time ? ` · ${plan.due_time}` : ""}`
      : "";
    return when ? `关联任务 · ${when}` : "已关联任务";
  }
  return plan.plan_date ? fmtPlanDate(plan.plan_date) : "未安排日期";
}

function linkedTaskIdSet(exceptPlanId = null) {
  return new Set(
    state.plans
      .filter((plan) => plan.task_id != null && plan.id !== exceptPlanId)
      .map((plan) => plan.task_id),
  );
}

function fillTaskSelect(select, tasks, selectedId, excluded) {
  select.replaceChildren(new Option("不关联已有任务", ""));
  const available = tasks.filter(
    (task) => !excluded.has(task.id) || String(task.id) === String(selectedId),
  );
  if (!available.length) return;
  let group = null;
  let dateKey = "";
  available.forEach((task) => {
    if (task.task_date !== dateKey) {
      dateKey = task.task_date;
      group = document.createElement("optgroup");
      group.label = fmtPlanDate(task.task_date);
      select.appendChild(group);
    }
    const suffix = task.status === "done" ? " · 已完成" : "";
    group.appendChild(new Option(`${task.title}${suffix}`, String(task.id)));
  });
  select.value = selectedId != null ? String(selectedId) : "";
}

async function populateChildTaskSelect(form) {
  const select = form.querySelector('select[name="task_id"]');
  if (!select) return;
  select.disabled = true;
  select.replaceChildren(new Option("正在加载任务…", ""));
  try {
    const data = await api("/api/tasks/all");
    if (!form.isConnected) return;
    form._taskOptions = data.tasks || [];
    fillTaskSelect(select, form._taskOptions, null, linkedTaskIdSet());
    select.disabled = false;
  } catch (error) {
    if (!form.isConnected) return;
    select.replaceChildren(new Option("任务加载失败", ""));
    select.disabled = true;
  }
}

function applyTaskLinkToForm(form, task) {
  const parts = planChildDateParts(form);
  if (task) {
    parts.input.value = task.task_date;
    syncChildDateField(form);
    parts.button.disabled = true;
  } else {
    parts.button.disabled = false;
    syncChildDateField(form);
  }
}

function setPlanDateDisabled(disabled) {
  el.planDateBtn.disabled = disabled;
  el.planDateField.classList.toggle("is-disabled", disabled);
  if (disabled) closePlanDatePopover();
}

async function populatePlanEditTaskOptions(plan) {
  el.planEditTask.replaceChildren(new Option("正在加载任务…", ""));
  el.planEditTask.disabled = true;
  el.planEditTask.dataset.ready = "0";
  if (plan.child_count > 0) {
    el.planEditTask.replaceChildren(new Option("仅最末级小计划可关联任务", ""));
    el.planLinkHint.textContent = "只有最末级的小计划可以关联已有任务。";
    return;
  }
  try {
    const data = await api("/api/tasks/all");
    if (state.planEditingId !== plan.id || !el.planDialog.open) return;
    planTaskOptions = data.tasks || [];
    fillTaskSelect(el.planEditTask, planTaskOptions, plan.task_id, linkedTaskIdSet(plan.id));
    el.planEditTask.disabled = false;
    el.planEditTask.dataset.ready = "1";
    if (plan.task_id != null) {
      setPlanDateDisabled(true);
      const linked = planTaskOptions.find((task) => task.id === plan.task_id);
      el.planLinkHint.textContent = linked
        ? `关联「${linked.title}」，日期与完成状态跟随该任务。`
        : "完成状态与关联任务同步。";
    }
  } catch (error) {
    if (state.planEditingId !== plan.id) return;
    el.planEditTask.replaceChildren(new Option("任务加载失败", ""));
    el.planEditTask.disabled = true;
    toast(error.message, "error");
  }
}

function planEmptyState() {
  const wrap = document.createElement("div");
  wrap.className = "empty plan-empty";
  wrap.innerHTML = `<span class="empty-art">${ICON_FOLDER}</span><p>还没有长期计划</p><small>先建一个大计划，再把小计划安排到不同日期</small><button class="empty-cta" type="button" data-plan-empty-add>新建大计划</button>`;
  return wrap;
}

function updatePlanSummary(roots) {
  let done = 0;
  let total = 0;
  roots.forEach((plan) => {
    done += plan.leaf_done;
    total += plan.leaf_total;
  });
  const percent = total ? Math.round((done * 100) / total) : 0;
  el.planSummary.textContent = roots.length
    ? `${roots.length} 个大计划 · 总体完成 ${percent}%`
    : "还没有长期计划，先建一个大计划";
}

function buildPlanChildForm(depth) {
  const form = document.createElement("form");
  form.className = "plan-child-form";
  form.dataset.planChildForm = "1";
  form.style.setProperty("--depth", String(depth));
  form.innerHTML = `
    <input type="text" name="title" maxlength="120" placeholder="子计划名称" aria-label="子计划名称" required>
    <div class="date-field plan-child-date">
      <button class="date-field-btn" type="button" data-child-date-btn aria-expanded="false">
        <svg class="date-field-calendar" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3.5" y="4.5" width="13" height="11" rx="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 8.5h13M7 3.2v2.4M13 3.2v2.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        <span data-child-date-text class="is-empty">日期（可选）</span>
        <svg class="date-field-caret" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6.5 8l3.5 3.5L13.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <input type="hidden" name="plan_date" value="">
    </div>
    <select name="task_id" class="plan-child-task" aria-label="关联已有任务">
      <option value="">不关联已有任务</option>
    </select>
    <button type="submit">添加</button>
    <button type="button" class="plan-form-cancel" data-plan-cancel="1">取消</button>
  `;
  form.querySelector("[data-child-date-btn]").addEventListener("click", () => startCalendarPick(form));
  form.querySelector('select[name="task_id"]').addEventListener("change", (event) => {
    const task = (form._taskOptions || []).find(
      (item) => String(item.id) === event.target.value,
    );
    applyTaskLinkToForm(form, task || null);
  });
  populateChildTaskSelect(form);
  return form;
}

function planChildDateParts(form) {
  return {
    input: form.querySelector('input[name="plan_date"]'),
    text: form.querySelector("[data-child-date-text]"),
    button: form.querySelector("[data-child-date-btn]"),
  };
}

function syncChildDateField(form) {
  const { input, text } = planChildDateParts(form);
  if (state.calendarPick && state.calendarPick.form === form) {
    text.textContent = "在左侧点选";
    text.classList.add("is-empty");
    return;
  }
  text.textContent = input.value ? fmtPlanDate(input.value) : "日期（可选）";
  text.classList.toggle("is-empty", !input.value);
}

function fmtPickDate(iso) {
  const d = fromISO(iso);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function renderPickControls() {
  const pending = state.calendarPick?.pending || "";
  el.pickText.textContent = pending ? fmtPickDate(pending) : "点选日期";
  el.pickConfirm.hidden = !pending;
  el.pickControls.classList.toggle("is-pending", Boolean(pending));
}

function refreshCalendarPickHighlight() {
  el.calendarGrid
    .querySelectorAll(".day.is-pick-target, .day.is-pick-pending")
    .forEach((day) => day.classList.remove("is-pick-target", "is-pick-pending"));
  if (!state.calendarPick) return;
  const { input } = planChildDateParts(state.calendarPick.form);
  if (input.value) {
    el.calendarGrid.querySelector(`.day[data-date="${input.value}"]`)?.classList.add("is-pick-target");
  }
  if (state.calendarPick.pending) {
    el.calendarGrid.querySelector(`.day[data-date="${state.calendarPick.pending}"]`)?.classList.add("is-pick-pending");
  }
}

function startCalendarPick(form) {
  if (!form) return;
  if (state.calendarPick && state.calendarPick.form === form) {
    cancelCalendarPick();
    return;
  }
  cancelCalendarPick();
  state.calendarPick = { form, pending: null };
  const { button } = planChildDateParts(form);
  button.setAttribute("aria-expanded", "true");
  form.classList.add("is-picking-date");
  el.calendarPanel.classList.add("is-picking");
  el.pickControls.hidden = false;
  hideDayBubble();
  syncChildDateField(form);
  renderPickControls();
  refreshCalendarPickHighlight();
}

function cancelCalendarPick() {
  if (!state.calendarPick) return;
  const { form } = state.calendarPick;
  state.calendarPick = null;
  form.classList.remove("is-picking-date");
  planChildDateParts(form).button.setAttribute("aria-expanded", "false");
  el.calendarPanel.classList.remove("is-picking");
  el.pickControls.hidden = true;
  el.calendarGrid
    .querySelectorAll(".day.is-pick-target, .day.is-pick-pending")
    .forEach((day) => day.classList.remove("is-pick-target", "is-pick-pending"));
  syncChildDateField(form);
}

function selectCalendarPickDay(iso) {
  if (!state.calendarPick) return;
  state.calendarPick.pending = iso;
  renderPickControls();
  refreshCalendarPickHighlight();
}

function clearCalendarPickPending() {
  if (!state.calendarPick || !state.calendarPick.pending) return;
  state.calendarPick.pending = null;
  renderPickControls();
  refreshCalendarPickHighlight();
}

function applyCalendarPick(iso) {
  if (!state.calendarPick) return;
  sfx("date-confirm");
  const form = state.calendarPick.form;
  planChildDateParts(form).input.value = iso;
  cancelCalendarPick();
  const day = el.calendarGrid.querySelector(`.day[data-date="${iso}"]`);
  if (day) {
    day.classList.add("is-picked");
    setTimeout(() => day.classList.remove("is-picked"), 650);
  }
  form.querySelector('input[name="title"]')?.focus();
}

function appendPlanNode(fragment, plan, depth, children) {
  const kids = children.get(plan.id) || [];
  const hasKids = kids.length > 0;
  const expanded = hasKids && state.expandedPlans.has(plan.id);

  const item = document.createElement("div");
  item.className = "plan-item";
  item.dataset.id = String(plan.id);
  item.style.setProperty("--depth", String(depth));
  if (hasKids) item.classList.add("is-folder");
  if (depth > 0) item.classList.add("is-nested");
  if (!hasKids && plan.done) item.classList.add("is-done");
  item.style.setProperty("--line-pct", `${hasKids ? plan.percent : plan.done ? 100 : 0}%`);

  const row = document.createElement("div");
  row.className = "plan-row";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = hasKids ? "plan-toggle" : "plan-toggle is-leaf";
  if (hasKids) {
    toggle.dataset.planToggle = "1";
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", expanded ? "收起子计划" : "展开子计划");
    toggle.innerHTML = ICON_CHEVRON;
  } else {
    toggle.tabIndex = -1;
    toggle.setAttribute("aria-hidden", "true");
  }

  let mark;
  if (hasKids) {
    mark = document.createElement("span");
    mark.className = "plan-folder";
    mark.innerHTML = ICON_FOLDER;
  } else {
    mark = document.createElement("button");
    mark.type = "button";
    mark.className = "plan-check";
    mark.dataset.planToggleDone = "1";
    mark.setAttribute("aria-pressed", String(plan.done));
    mark.setAttribute("aria-label", plan.done ? "标记为未完成" : "标记为完成");
  }

  const main = document.createElement("div");
  main.className = "plan-main";
  const name = document.createElement("p");
  name.className = "plan-name";
  name.textContent = plan.title;
  main.appendChild(name);
  const meta = document.createElement("p");
  meta.className = "plan-meta";
  if (hasKids) {
    meta.textContent = `${kids.length} 个子计划${plan.plan_date ? ` · ${fmtPlanDate(plan.plan_date)}` : ""}`;
  } else {
    meta.textContent = planScheduleMeta(plan);
  }
  main.appendChild(meta);

  const score = document.createElement("div");
  score.className = "plan-score";
  if (hasKids) {
    score.innerHTML = `<strong>${plan.percent}%</strong><i style="--pct:${plan.percent}%"></i>`;
  } else {
    score.classList.add("is-empty");
  }

  const actions = document.createElement("div");
  actions.className = "plan-actions";
  actions.innerHTML = `
    ${plan.task_id == null ? `<button type="button" class="icon-btn" data-plan-action="add" title="添加子计划" aria-label="添加子计划">${ICON_FOLDER_PLUS}</button>` : ""}
    <button type="button" class="icon-btn" data-plan-action="edit" title="编辑计划" aria-label="编辑计划">${ICON_EDIT}</button>
    <button type="button" class="icon-btn danger" data-plan-action="delete" title="删除计划" aria-label="删除计划">${ICON_TRASH}</button>
  `;

  row.append(toggle, mark, main, score, actions);
  item.appendChild(row);
  if (state.planAddParent === plan.id) {
    const form = buildPlanChildForm(depth);
    form.dataset.parentId = String(plan.id);
    item.appendChild(form);
  }
  fragment.appendChild(item);

  if (expanded) kids.forEach((kid) => appendPlanNode(fragment, kid, depth + 1, children));
}

function renderPlans() {
  if (state.calendarPick) cancelCalendarPick();
  el.planList.replaceChildren();
  if (!state.plansLoaded) {
    el.planList.appendChild(skeletonState());
    return;
  }
  if (state.plans.length === 0) {
    el.planList.appendChild(planEmptyState());
    updatePlanSummary([]);
    return;
  }

  const children = new Map();
  state.plans.forEach((plan) => {
    const key = plan.parent_id == null ? 0 : plan.parent_id;
    if (!children.has(key)) children.set(key, []);
    children.get(key).push(plan);
  });
  children.forEach((list) => list.sort(comparePlanSchedule));
  const roots = children.get(0) || [];
  const fragment = document.createDocumentFragment();
  roots.forEach((plan) => appendPlanNode(fragment, plan, 0, children));
  el.planList.appendChild(fragment);
  updatePlanSummary(roots);

  if (state.planAddParent != null) {
    el.planList
      .querySelector(`.plan-item[data-id="${state.planAddParent}"] .plan-child-form input[name="title"]`)
      ?.focus();
  }
}

function planDirectChildren(id) {
  return state.plans
    .filter((plan) => plan.parent_id === id)
    .sort(comparePlanSchedule);
}

function buildPlanDetailRow(plan) {
  const hasKids = plan.child_count > 0;
  const item = document.createElement("div");
  item.className = "plan-item plan-detail-item";
  item.dataset.id = String(plan.id);
  if (hasKids) item.classList.add("is-folder");
  else if (plan.done) item.classList.add("is-done");

  const row = document.createElement("div");
  row.className = "plan-row";
  if (hasKids) row.dataset.planOpen = "1";

  let mark;
  if (hasKids) {
    mark = document.createElement("span");
    mark.className = "plan-folder";
    mark.innerHTML = ICON_FOLDER;
  } else {
    mark = document.createElement("button");
    mark.type = "button";
    mark.className = "plan-check";
    mark.dataset.planToggleDone = "1";
    mark.setAttribute("aria-pressed", String(plan.done));
    mark.setAttribute("aria-label", plan.done ? "标记为未完成" : "标记为完成");
  }

  const main = document.createElement("div");
  main.className = "plan-main";
  const name = document.createElement("p");
  name.className = "plan-name";
  name.textContent = plan.title;
  const meta = document.createElement("p");
  meta.className = "plan-meta";
  if (hasKids) {
    meta.textContent = `${plan.child_count} 个子计划${plan.plan_date ? ` · ${fmtPlanDate(plan.plan_date)}` : ""}`;
  } else {
    meta.textContent = planScheduleMeta(plan);
  }
  main.append(name, meta);

  const score = document.createElement("div");
  score.className = "plan-score";
  if (hasKids) {
    score.innerHTML = `<strong>${plan.percent}%</strong><i style="--pct:${plan.percent}%"></i>`;
  } else {
    score.classList.add("is-empty");
  }

  const actions = document.createElement("div");
  actions.className = "plan-actions";
  actions.innerHTML = `
    ${plan.task_id == null ? `<button type="button" class="icon-btn" data-plan-action="add" title="添加子计划" aria-label="添加子计划">${ICON_FOLDER_PLUS}</button>` : ""}
    <button type="button" class="icon-btn" data-plan-action="edit" title="编辑计划" aria-label="编辑计划">${ICON_EDIT}</button>
    <button type="button" class="icon-btn danger" data-plan-action="delete" title="删除计划" aria-label="删除计划">${ICON_TRASH}</button>
  `;

  row.append(mark, main, score, actions);
  item.appendChild(row);
  if (state.planAddParent === plan.id) {
    const form = buildPlanChildForm(0);
    form.dataset.parentId = String(plan.id);
    item.appendChild(form);
  }
  return item;
}

function renderPlanDetail() {
  const plan = state.plans.find((item) => item.id === state.planDetailId);
  if (!plan) {
    closePlanDetail();
    return;
  }
  if (state.calendarPick) cancelCalendarPick();
  const kids = planDirectChildren(plan.id);
  el.planDetailTitle.textContent = plan.title;
  el.planDetailPct.textContent = `${plan.percent}%`;
  el.planDetailMeter.style.width = `${plan.percent}%`;
  const summary = [`${plan.child_count} 个子计划`];
  if (plan.task_id != null) {
    summary.push(plan.linked_task_title ? `关联「${plan.linked_task_title}」` : "已关联任务");
  } else if (plan.plan_date) {
    summary.push(fmtPlanDate(plan.plan_date));
  }
  summary.push(`已完成 ${plan.leaf_done}/${plan.leaf_total}`);
  el.planDetailSummary.textContent = summary.join(" · ");

  el.planDetailList.replaceChildren();
  if (state.planAddParent === plan.id) {
    const form = buildPlanChildForm(0);
    form.dataset.parentId = String(plan.id);
    el.planDetailList.appendChild(form);
  }
  if (!kids.length) {
    const empty = document.createElement("div");
    empty.className = "empty plan-empty plan-detail-empty";
    empty.innerHTML = `<span class="empty-art">${ICON_FOLDER}</span><p>这个计划还没有子计划</p><small>点上方「添加子计划」就能开始</small>`;
    el.planDetailList.appendChild(empty);
    return;
  }
  const fragment = document.createDocumentFragment();
  kids.forEach((kid) => fragment.appendChild(buildPlanDetailRow(kid)));
  el.planDetailList.appendChild(fragment);
}

function startAddChildPlanDetail(id) {
  if (id == null) return;
  if (state.calendarPick) cancelCalendarPick();
  state.planAddParent = state.planAddParent === id ? null : id;
  renderPlanDetail();
  if (state.planAddParent != null) {
    requestAnimationFrame(() => {
      const scoped = el.planDetailList.querySelector(
        `.plan-item[data-id="${id}"] .plan-child-form input[name="title"]`,
      );
      (scoped || el.planDetailList.querySelector('.plan-child-form input[name="title"]'))?.focus();
    });
  }
}

function openPlanDetail(id, direction = "in", options = {}) {
  const plan = state.plans.find((item) => item.id === id);
  if (!plan || plan.child_count === 0) return;
  if (!options.silent) sfx("page-turn");
  if (state.calendarPick) cancelCalendarPick();
  state.planAddParent = null;
  state.planDetailId = id;
  el.planPanel.hidden = true;
  el.planDetailPanel.hidden = false;
  renderPlanDetail();
  el.planDetailPanel.classList.remove("panel-in-right", "panel-in-left");
  void el.planDetailPanel.offsetWidth;
  el.planDetailPanel.classList.add(direction === "back" ? "panel-in-left" : "panel-in-right");
  el.planDetailPanel.querySelector(".plan-scroll").scrollTop = 0;
}

function planDetailBack() {
  if (state.planDetailId == null) return;
  const plan = state.plans.find((item) => item.id === state.planDetailId);
  const parent =
    plan && plan.parent_id != null
      ? state.plans.find((item) => item.id === plan.parent_id)
      : null;
  if (parent && parent.child_count > 0) openPlanDetail(parent.id, "back");
  else closePlanDetail();
}

function closePlanDetail() {
  if (state.planDetailId == null) return;
  sfx("page-turn");
  state.planDetailId = null;
  el.planDetailPanel.hidden = true;
  el.planPanel.hidden = false;
  renderPlans();
  el.planPanel.classList.remove("panel-in-left");
  void el.planPanel.offsetWidth;
  el.planPanel.classList.add("panel-in-left");
}

async function loadPlans() {
  try {
    const data = await api("/api/plans");
    state.plans = data.plans || [];
    state.plansLoaded = true;
    if (!state.plansInitialized) {
      state.plansInitialized = true;
      state.expandedPlans = new Set(
        state.plans.filter((plan) => plan.child_count > 0).map((plan) => plan.id),
      );
    }
    rebuildDayPlanIndex();
    const signature = JSON.stringify(state.plans.map((plan) => [
      plan.id, plan.parent_id, plan.title, plan.plan_date,
      plan.due_time, plan.done, plan.position, plan.child_count, plan.task_id,
    ]));
    if (signature === state.plansSignature) return;
    state.plansSignature = signature;
    renderPlans();
    if (state.planDetailId != null) renderPlanDetail();
    if (!state.planView && state.loaded) {
      renderTasks();
      updateDayHeader();
    }
  } catch (error) {
    state.plansLoaded = true;
    renderPlans();
    toast(error.message, "error");
  }
}

function syncPlanEntryMode() {
  const inPlans = state.planView;
  el.planEntry.classList.toggle("is-return", inPlans);
  el.planEntryMark.innerHTML = inPlans ? ICON_CALENDAR : ICON_FOLDER;
  el.planEntryTitle.textContent = inPlans ? "回到单日日程" : "长期计划";
  el.planEntrySub.textContent = inPlans
    ? "回到当前日期的任务列表"
    : "把分散到日期的小计划收进大计划";
  el.planEntryGo.innerHTML = inPlans ? ICON_ARROW_LEFT : ICON_ARROW_RIGHT;
}

function enterPlanView(options = {}) {
  if (state.planView) return;
  if (!options.silent) sfx("page-turn");
  state.planView = true;
  state.planDetailId = null;
  syncPlanEntryMode();
  el.dayPanel.hidden = true;
  el.planDetailPanel.hidden = true;
  el.planPanel.hidden = false;
  el.planPanel.classList.remove("panel-in-right");
  void el.planPanel.offsetWidth;
  el.planPanel.classList.add("panel-in-right");
  loadPlans();
}

function leavePlanView() {
  if (!state.planView) return;
  sfx("page-turn");
  if (state.calendarPick) cancelCalendarPick();
  state.planView = false;
  syncPlanEntryMode();
  state.planAddParent = null;
  state.planDetailId = null;
  el.planDetailPanel.hidden = true;
  el.planPanel.hidden = true;
  el.dayPanel.hidden = false;
  if (state.loaded) renderTasks();
  el.dayPanel.classList.remove("panel-in-left");
  void el.dayPanel.offsetWidth;
  el.dayPanel.classList.add("panel-in-left");
}

async function addRootPlan(event) {
  event.preventDefault();
  const title = el.planTitleInput.value.trim();
  if (!title) {
    el.planTitleInput.focus();
    return;
  }
  el.planAddBtn.disabled = true;
  try {
    await api("/api/plans", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    el.planTitleInput.value = "";
    await loadPlans();
    sfx("plan-add");
    toast("已创建大计划", "success");
    el.planTitleInput.focus();
  } catch (error) {
    toast(error.message, "error");
  } finally {
    el.planAddBtn.disabled = false;
  }
}

function startAddChildPlan(id) {
  if (state.planAddParent === id) {
    state.planAddParent = null;
    renderPlans();
    return;
  }
  state.planAddParent = id;
  state.expandedPlans.add(id);
  renderPlans();
}

async function submitChildPlan(form) {
  if (state.calendarPick) cancelCalendarPick();
  const item = form.closest(".plan-item");
  const parentId = form.dataset.parentId != null
    ? Number(form.dataset.parentId)
    : item
      ? Number(item.dataset.id)
      : NaN;
  if (!Number.isFinite(parentId)) return;
  const titleInput = form.querySelector('input[name="title"]');
  const dateInput = form.querySelector('input[name="plan_date"]');
  const taskSelect = form.querySelector('select[name="task_id"]');
  const title = titleInput.value.trim();
  if (!title) {
    titleInput.focus();
    return;
  }
  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  try {
    await api("/api/plans", {
      method: "POST",
      body: JSON.stringify({
        title,
        parent_id: parentId,
        plan_date: dateInput.value || null,
        task_id: taskSelect && taskSelect.value ? Number(taskSelect.value) : null,
      }),
    });
    state.expandedPlans.add(parentId);
    state.planAddParent = null;
    await loadPlans();
    await loadMonth();
    sfx("plan-add");
    toast("已添加子计划", "success");
  } catch (error) {
    toast(error.message, "error");
  } finally {
    submit.disabled = false;
  }
}

function openPlanDay(plan) {
  if (!plan) return;
  if (!plan.plan_date) {
    toast("这个子计划还没有安排日期");
    return;
  }
  selectDate(plan.plan_date);
}

async function togglePlanDone(id) {
  const plan = state.plans.find((item) => item.id === id);
  if (!plan || plan.child_count > 0 || state.pendingPlanToggles.has(id)) return;
  const parentBefore =
    plan.parent_id != null ? state.plans.find((item) => item.id === plan.parent_id) : null;
  const parentPercentBefore = parentBefore ? parentBefore.percent : null;
  state.pendingPlanToggles.add(id);
  try {
    await api(`/api/plans/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ done: !plan.done }),
    });
    await loadPlans();
    await loadMonth();
    if (plan.task_id != null) {
      await loadTasks();
      notifyReminderHost();
    }
    let parentJustCompleted = false;
    if (!plan.done && plan.parent_id != null) {
      const parentAfter = state.plans.find((item) => item.id === plan.parent_id);
      if (parentAfter && parentAfter.percent === 100 && parentPercentBefore !== 100) {
        parentJustCompleted = true;
        showPlanCompleteToast(parentAfter.title);
      }
    }
    if (!parentJustCompleted) sfx(plan.done ? "plan-open" : "plan-done");
    requestAnimationFrame(() => {
      const dayRow = !state.planView
        ? el.taskList.querySelector(`.plan-task[data-plan-id="${id}"]`)
        : null;
      if (dayRow) {
        playSoundBarsIn(dayRow);
      } else {
        const list = state.planDetailId != null ? el.planDetailList : el.planList;
        const row = list.querySelector(`.plan-item[data-id="${id}"] > .plan-row`);
        if (row) playPlanSoundBarsIn(row, !plan.done);
      }
      const check = !state.planView
        ? dayRow?.querySelector(".check")
        : (state.planDetailId != null ? el.planDetailList : el.planList)
            .querySelector(`.plan-item[data-id="${id}"] .plan-check`);
      check?.focus();
    });
  } catch (error) {
    toast(error.message, "error");
  } finally {
    state.pendingPlanToggles.delete(id);
  }
}

function togglePlanExpanded(id) {
  if (state.expandedPlans.has(id)) state.expandedPlans.delete(id);
  else state.expandedPlans.add(id);
  renderPlans();
}

function openPlanEdit(id) {
  if (state.calendarPick) cancelCalendarPick();
  const plan = state.plans.find((item) => item.id === id);
  if (!plan) return;
  state.planEditingId = id;
  el.planEditTitle.value = plan.title;
  el.planEditDate.value = plan.plan_date || "";
  syncPlanDateField();
  closePlanDatePopover();
  setPlanDateDisabled(false);
  el.planEditTask.dataset.ready = "0";
  el.planLinkHint.textContent = "关联后完成状态与任务同步，不再单独出现在日程中。";
  el.planEditMeta.textContent = plan.child_count
    ? `含 ${plan.child_count} 个子计划 · 当前完成度 ${plan.percent}%`
    : "安排日期可留空，小计划会显示在计划树里";
  populatePlanEditTaskOptions(plan);
  if (!el.planDialog.open) el.planDialog.showModal();
  requestAnimationFrame(() => {
    el.planEditTitle.focus();
    el.planEditTitle.select();
  });
}

async function savePlanEdit(event) {
  event.preventDefault();
  if (state.planEditingId == null) return;
  const title = el.planEditTitle.value.trim();
  if (!title) {
    el.planEditTitle.focus();
    return;
  }
  const submit = el.planEditForm.querySelector('button[type="submit"]');
  submit.disabled = true;
  try {
    const payload = {
      title,
      plan_date: el.planEditDate.value || null,
    };
    if (el.planEditTask.dataset.ready === "1") {
      payload.task_id = el.planEditTask.value ? Number(el.planEditTask.value) : null;
    }
    await api(`/api/plans/${state.planEditingId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    el.planDialog.close();
    await loadPlans();
    await loadMonth();
    toast("计划已更新", "success");
  } catch (error) {
    toast(error.message, "error");
  } finally {
    submit.disabled = false;
  }
}

function openPlanDelete(id) {
  const plan = state.plans.find((item) => item.id === id);
  if (!plan) return;
  state.planDeletingId = id;
  el.confirmHeading.textContent = "删除这个计划？";
  el.confirmText.textContent = plan.child_count
    ? `「${plan.title}」及其全部子计划都会被移除，无法恢复。`
    : `「${plan.title}」删除后无法恢复。`;
  if (!el.confirmDialog.open) el.confirmDialog.showModal();
}

function syncPlanDateField() {
  const value = el.planEditDate.value;
  el.planDateText.textContent = value ? fmtPlanDate(value) : "未安排日期";
  el.planDateText.classList.toggle("is-empty", !value);
}

function closePlanDatePopover() {
  clearTimeout(planDateHideTimer);
  el.planDialog.classList.remove("date-pop-open");
  if (el.planDatePop.hidden) return;
  el.planDatePop.classList.remove("is-open");
  el.planDateBtn.setAttribute("aria-expanded", "false");
  planDateHideTimer = setTimeout(() => {
    if (!el.planDatePop.classList.contains("is-open")) el.planDatePop.hidden = true;
  }, 260);
}

function renderPlanDatePopover() {
  const { year, month } = planDateView;
  el.planDateLabel.textContent = `${year}年${month + 1}月`;
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  const selected = el.planEditDate.value;
  const today = toISO(new Date());
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < GRID_DAYS; i += 1) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const iso = toISO(d);
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.datePick = iso;
    button.textContent = String(d.getDate());
    if (d.getMonth() !== month) button.classList.add("is-outside");
    if (iso === today) button.classList.add("is-today");
    if (iso === selected) button.classList.add("is-selected");
    fragment.appendChild(button);
  }
  el.planDateGrid.replaceChildren(fragment);
}

function openPlanDatePopover() {
  const anchor = el.planEditDate.value ? fromISO(el.planEditDate.value) : new Date();
  planDateView = { year: anchor.getFullYear(), month: anchor.getMonth() };
  renderPlanDatePopover();
  clearTimeout(planDateHideTimer);
  el.planDatePop.hidden = false;
  void el.planDatePop.offsetWidth;
  el.planDatePop.classList.add("is-open");
  el.planDateBtn.setAttribute("aria-expanded", "true");
  el.planDialog.classList.add("date-pop-open");
}

function setPlanDate(iso) {
  el.planEditDate.value = iso || "";
  syncPlanDateField();
  closePlanDatePopover();
}

function selectDate(iso) {
  if (!iso) return;
  if (state.calendarPick) cancelCalendarPick();
  if (state.planView) {
    leavePlanView();
    if (iso === state.selected && state.loaded) return;
  }
  if (iso === state.selected && state.loaded) return;
  const dateObj = fromISO(iso);
  const monthDelta = (dateObj.getFullYear() - state.viewYear) * 12 + (dateObj.getMonth() - state.viewMonth);

  state.selected = iso;
  state.loaded = false;
  state.tasks = [];
  state.progressEditingId = null;
  state.popDate = iso;
  state.animateNext = true;

  if (monthDelta !== 0) {
    state.viewYear = dateObj.getFullYear();
    state.viewMonth = dateObj.getMonth();
  }

  renderCalendar({ slide: monthDelta });
  if (monthDelta !== 0) pulseMonth();
  pulseDayHead();
  updateDayHeader();
  renderTasks();
  loadTasks();
  if (monthDelta !== 0) loadMonth();
}

function goToday() {
  if (state.calendarPick) cancelCalendarPick();
  if (state.planView) leavePlanView();
  const now = new Date();
  const monthDelta = (now.getFullYear() - state.viewYear) * 12 + (now.getMonth() - state.viewMonth);
  if (monthDelta !== 0) sfx("page-turn");
  state.viewYear = now.getFullYear();
  state.viewMonth = now.getMonth();
  state.selected = toISO(now);
  state.loaded = false;
  state.tasks = [];
  state.progressEditingId = null;
  state.popDate = state.selected;
  state.animateNext = true;
  renderCalendar({ slide: monthDelta });
  if (monthDelta !== 0) pulseMonth();
  pulseDayHead();
  updateDayHeader();
  renderTasks();
  loadTasks();
  loadMonth();
}

function shiftMonth(delta) {
  sfx("page-turn");
  const target = new Date(state.viewYear, state.viewMonth + delta, 1);
  state.viewYear = target.getFullYear();
  state.viewMonth = target.getMonth();
  renderCalendar({ slide: delta });
  pulseMonth();
  loadMonth();
}

function parseClock(value) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value || "");
  return match ? { hour: Number(match[1]), minute: Number(match[2]) } : null;
}

function fmtClock(hour, minute) {
  return `${pad2(hour)}:${pad2(minute)}`;
}

function clockMinutes(value) {
  const parsed = parseClock(value);
  return parsed ? parsed.hour * 60 + parsed.minute : null;
}

function timeContext(mode) {
  if (mode === "new") {
    return {
      due: el.newTime,
      dueBtn: el.newTimeBtn,
      remind: el.newRemind,
      advance: el.newAdvance,
      advanceBtn: el.newAdvanceBtn,
      advanceOn: el.newAdvanceOn,
      note: el.newAdvanceNote,
    };
  }
  return {
    due: el.editTime,
    dueBtn: el.editTimeBtn,
    remind: el.editRemind,
    advance: el.editAdvance,
    advanceBtn: el.editAdvanceBtn,
    advanceOn: el.editAdvanceOn,
    note: el.editAdvanceNote,
  };
}

function updateTimeUI(mode) {
  const ctx = timeContext(mode);
  const due = ctx.due.value;
  const advance = ctx.advance.value;
  ctx.dueBtn.textContent = due || "选择时间";
  ctx.dueBtn.classList.toggle("has-value", Boolean(due));
  ctx.remind.disabled = !due;
  if (!due) ctx.remind.checked = false;
  ctx.advanceOn.disabled = !due;
  if (!due) {
    ctx.advanceOn.checked = false;
    ctx.advance.value = "";
  }
  ctx.advanceBtn.disabled = !due || !ctx.advanceOn.checked;
  ctx.advanceBtn.textContent = advance && ctx.advanceOn.checked ? advance : "选择时间";
  ctx.advanceBtn.classList.toggle("has-value", Boolean(advance) && ctx.advanceOn.checked);
  const invalid = Boolean(due && advance && ctx.advanceOn.checked && advance >= due);
  ctx.advanceBtn.classList.toggle("is-warning", invalid);
  ctx.note.classList.toggle("is-warning", invalid);
  if (ctx.advanceOn.checked && due) {
    if (!advance) {
      ctx.note.textContent = "请选择时间";
    } else if (invalid) {
      ctx.note.textContent = `需早于 ${due}`;
    } else {
      const diff = clockMinutes(due) - clockMinutes(advance);
      ctx.note.textContent = `提前 ${diff} 分钟`;
    }
  } else {
    ctx.note.textContent = "";
  }
  if (mode === "new") {
    el.timeToggle.textContent = due || "时间";
  }
}

function setDueTime(mode, value) {
  const ctx = timeContext(mode);
  const previous = ctx.due.value;
  const wasRemindDisabled = ctx.remind.disabled;
  ctx.due.value = value || "";
  if (!value) {
    ctx.advance.value = "";
    ctx.advanceOn.checked = false;
    ctx.remind.checked = false;
  } else {
    if (wasRemindDisabled) ctx.remind.checked = true;
    if (ctx.advanceOn.checked) {
      if (!ctx.advance.value || ctx.advance.value === previous || ctx.advance.value >= value) {
        ctx.advance.value = value;
      }
    }
  }
  updateTimeUI(mode);
}

function setAdvanceTime(mode, value) {
  const ctx = timeContext(mode);
  ctx.advance.value = value || "";
  ctx.advanceOn.checked = Boolean(value);
  updateTimeUI(mode);
}

function toggleAdvance(mode, checked) {
  const ctx = timeContext(mode);
  if (checked) {
    if (!ctx.due.value) {
      ctx.advanceOn.checked = false;
      updateTimeUI(mode);
      return;
    }
    if (!ctx.advance.value) ctx.advance.value = ctx.due.value;
  } else {
    ctx.advance.value = "";
  }
  updateTimeUI(mode);
}

function parkTimePicker() {
  el.timePop.classList.remove("is-open");
  el.timePop.hidden = true;
  el.editDialog.classList.remove("time-pop-open");
  document.body.appendChild(el.timePop);
}

function closeTimePicker(immediate = false) {
  el.editDialog.classList.remove("time-pop-open");
  if (!timePick) {
    if (immediate) parkTimePicker();
    return;
  }
  const anchor = timePick.anchor;
  timePick = null;
  anchor?.setAttribute("aria-expanded", "false");
  el.timePop.classList.remove("is-open");
  if (immediate) {
    parkTimePicker();
    return;
  }
  setTimeout(() => {
    if (!timePick) parkTimePicker();
  }, 170);
}

function renderTimePicker() {
  if (!timePick) return;
  const ctx = timeContext(timePick.mode);
  const dueMinutes = clockMinutes(ctx.due.value);
  const isAdvance = timePick.kind === "advance";
  const selectedMinutes = timePick.hour * 60 + timePick.minute;

  const hourFragment = document.createDocumentFragment();
  for (let hour = 0; hour < 24; hour += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = pad2(hour);
    button.dataset.hour = String(hour);
    button.classList.toggle("is-selected", hour === timePick.hour);
    button.disabled = isAdvance && dueMinutes != null && hour * 60 >= dueMinutes;
    hourFragment.appendChild(button);
  }

  const minuteFragment = document.createDocumentFragment();
  for (let minute = 0; minute < 60; minute += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = pad2(minute);
    button.dataset.minute = String(minute);
    button.classList.toggle("is-selected", minute === timePick.minute);
    button.disabled = isAdvance && dueMinutes != null && timePick.hour * 60 + minute >= dueMinutes;
    minuteFragment.appendChild(button);
  }

  el.timeHours.replaceChildren(hourFragment);
  el.timeMinutes.replaceChildren(minuteFragment);
  el.timePopHint.textContent = isAdvance
    ? (dueMinutes == null ? "请先设置任务时间" : `需早于 ${ctx.due.value}`)
    : "";
  el.timePopHint.classList.toggle(
    "is-warning",
    isAdvance && dueMinutes != null && selectedMinutes >= dueMinutes,
  );
}

function scrollTimeColumns() {
  const selectedHour = el.timeHours.querySelector("button.is-selected");
  const selectedMinute = el.timeMinutes.querySelector("button.is-selected");
  if (selectedHour) {
    el.timeHours.scrollTop = selectedHour.offsetTop - el.timeHours.clientHeight / 2 + selectedHour.offsetHeight / 2;
  }
  if (selectedMinute) {
    el.timeMinutes.scrollTop = selectedMinute.offsetTop - el.timeMinutes.clientHeight / 2 + selectedMinute.offsetHeight / 2;
  }
}

function applyTimeDraft() {
  if (!timePick) return;
  const value = fmtClock(timePick.hour, timePick.minute);
  if (timePick.kind === "advance") setAdvanceTime(timePick.mode, value);
  else setDueTime(timePick.mode, value);
}

function positionTimePicker(anchor) {
  const rect = anchor.getBoundingClientRect();
  const width = el.timePop.offsetWidth || 222;
  const height = el.timePop.offsetHeight || 300;
  let left = Math.min(rect.left, window.innerWidth - width - 8);
  left = Math.max(8, left);
  let top = rect.bottom + 8;
  if (top + height > window.innerHeight - 8) {
    top = Math.max(8, rect.top - height - 8);
  }
  el.timePop.style.left = `${left}px`;
  el.timePop.style.top = `${top}px`;
}

function openTimePicker(mode, kind, anchor) {
  if (mode === "edit") closeEditDatePopover(true);
  if (timePick && timePick.anchor === anchor) {
    closeTimePicker();
    return;
  }
  closeTimePicker(true);
  const ctx = timeContext(mode);
  const current = kind === "advance" ? (ctx.advance.value || ctx.due.value) : ctx.due.value;
  const parsed = parseClock(current) || { hour: 9, minute: 0 };
  timePick = {
    mode,
    kind,
    anchor,
    hour: parsed.hour,
    minute: parsed.minute,
  };
  el.timePopLabel.textContent = kind === "advance" ? "提前提醒时间" : "任务时间";
  if (mode === "edit") {
    el.editDialog.appendChild(el.timePop);
    el.editDialog.classList.add("time-pop-open");
  } else {
    document.body.appendChild(el.timePop);
    el.editDialog.classList.remove("time-pop-open");
  }
  el.timePop.hidden = false;
  anchor.setAttribute("aria-expanded", "true");
  renderTimePicker();
  if (mode !== "edit") positionTimePicker(anchor);
  requestAnimationFrame(() => {
    el.timePop.classList.add("is-open");
    scrollTimeColumns();
  });
}

function resetComposer() {
  el.newTitle.value = "";
  el.newNotes.value = "";
  el.newNotesWrap.hidden = true;
  el.notesToggle.setAttribute("aria-expanded", "false");
  el.newTime.value = "";
  el.newAdvance.value = "";
  el.newAdvanceOn.checked = false;
  el.newTimeWrap.hidden = true;
  el.timeToggle.setAttribute("aria-expanded", "false");
  el.newRemind.checked = true;
  el.newRemind.disabled = true;
  updateTimeUI("new");
}

async function addTask(event) {
  event.preventDefault();
  const title = el.newTitle.value.trim();
  if (!title) {
    el.composer.classList.remove("shake");
    void el.composer.offsetWidth;
    el.composer.classList.add("shake");
    el.newTitle.focus();
    return;
  }

  el.addBtn.disabled = true;
  try {
    await api("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title,
        notes: el.newNotes.value,
        task_date: state.selected,
        due_time: el.newTime.value || null,
        remind: Boolean(el.newTime.value && el.newRemind.checked),
        advance_time: el.newAdvanceOn.checked
          && el.newAdvance.value
          && el.newAdvance.value < el.newTime.value
          ? el.newAdvance.value
          : null,
      }),
    });
    resetComposer();
    state.animateNext = true;
    await refreshAll();
    notifyReminderHost();
    sfx("task-add");
    toast("已添加", "success");
    el.newTitle.focus();
  } catch (error) {
    toast(error.message, "error");
  } finally {
    el.addBtn.disabled = false;
  }
}

async function toggleTask(id) {
  if (state.pendingToggles.has(id)) return;
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;

  const nextStatus = task.status === "done" ? "open" : "done";
  const day = state.selected;
  state.pendingToggles.add(id);
  state.taskToken += 1;
  if (state.progressEditingId === id) state.progressEditingId = null;
  const exit = playTaskExit(el.taskList.querySelector(`.task[data-id="${id}"]`));

  try {
    const updated = await api(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: nextStatus }),
    });
    await exit;
    if (state.selected !== day) return;
    const index = state.tasks.findIndex((item) => item.id === id);
    if (index === -1) return;
    state.tasks.splice(index, 1);
    state.tasks.push(updated);
    state.enteringId = id;
    renderTasks();
    updateDayHeader();
    loadMonth();
    refreshPlansForLinkedTask(id);
    notifyReminderHost();
    sfx(updated.status === "done" ? "task-done" : "task-open");
  } catch (error) {
    if (state.selected === day) {
      renderTasks();
      updateDayHeader();
    }
    toast(error.message, "error");
  } finally {
    state.pendingToggles.delete(id);
  }
}

function syncEditDateField() {
  const value = el.editDate.value;
  el.editDateText.textContent = value ? fmtPlanDate(value) : "选择日期";
  el.editDateText.classList.toggle("is-empty", !value);
}

function closeEditDatePopover(immediate = false) {
  clearTimeout(editDateHideTimer);
  el.editDialog.classList.remove("date-pop-open");
  el.editDateBtn.setAttribute("aria-expanded", "false");
  if (el.editDatePop.hidden) return;
  el.editDatePop.classList.remove("is-open");
  if (immediate) {
    el.editDatePop.hidden = true;
    return;
  }
  editDateHideTimer = setTimeout(() => {
    if (!el.editDatePop.classList.contains("is-open")) el.editDatePop.hidden = true;
  }, 260);
}

function renderEditDatePopover() {
  if (!editDateView) return;
  const { year, month } = editDateView;
  el.editDateLabel.textContent = `${year}年${month + 1}月`;
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  const selected = el.editDate.value;
  const today = toISO(new Date());
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 42; i += 1) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const iso = toISO(day);
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.editDatePick = iso;
    button.textContent = String(day.getDate());
    if (day.getMonth() !== month) button.classList.add("is-outside");
    if (iso === today) button.classList.add("is-today");
    if (iso === selected) button.classList.add("is-selected");
    fragment.appendChild(button);
  }
  el.editDateGrid.replaceChildren(fragment);
}

function openEditDatePopover() {
  if (timePick) closeTimePicker(true);
  const anchor = el.editDate.value ? fromISO(el.editDate.value) : new Date();
  editDateView = { year: anchor.getFullYear(), month: anchor.getMonth() };
  renderEditDatePopover();
  clearTimeout(editDateHideTimer);
  el.editDatePop.hidden = false;
  void el.editDatePop.offsetWidth;
  el.editDatePop.classList.add("is-open");
  el.editDateBtn.setAttribute("aria-expanded", "true");
  el.editDialog.classList.add("date-pop-open");
}

function setEditDate(iso) {
  el.editDate.value = iso || "";
  syncEditDateField();
  syncDateChips();
  closeEditDatePopover();
}

function syncDateChips() {
  const selected = el.editDate.value;
  el.editDateChips.querySelectorAll("button").forEach((button) => {
    const target = new Date();
    target.setDate(target.getDate() + Number(button.dataset.days));
    button.classList.toggle("active", toISO(target) === selected);
  });
}

function openEdit(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  if (timePick) closeTimePicker(true);
  closeEditDatePopover(true);

  state.editingId = id;
  el.editTitle.value = task.title;
  el.editNotes.value = task.notes || "";
  el.editTime.value = task.due_time || "";
  el.editAdvance.value = task.advance_time || "";
  el.editAdvanceOn.checked = Boolean(task.due_time && task.advance_time);
  el.editRemind.checked = Boolean(task.due_time && task.remind);
  el.editDate.value = task.task_date;
  updateTimeUI("edit");
  syncEditDateField();
  syncDateChips();
  el.editMeta.textContent = `创建于 ${fmtStamp(task.created_at)}${task.completed_at ? ` · 完成于 ${fmtStamp(task.completed_at)}` : ""}`;

  if (!el.editDialog.open) el.editDialog.showModal();
  requestAnimationFrame(() => {
    el.editTitle.focus();
    el.editTitle.select();
  });
}

async function saveEdit(event) {
  event.preventDefault();
  if (state.editingId == null) return;

  const title = el.editTitle.value.trim();
  if (!title) {
    el.editTitle.focus();
    return;
  }
  if (!el.editDate.value) {
    toast("请选择归入日期", "error");
    return;
  }

  const submitButton = el.editForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  try {
    const updated = await api(`/api/tasks/${state.editingId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        notes: el.editNotes.value,
        task_date: el.editDate.value,
        due_time: el.editTime.value || null,
        remind: Boolean(el.editTime.value && el.editRemind.checked),
        advance_time: el.editAdvanceOn.checked
          && el.editAdvance.value
          && el.editAdvance.value < el.editTime.value
          ? el.editAdvance.value
          : null,
      }),
    });
    closeTimePicker(true);
    el.editDialog.close();
    await refreshAll();
    notifyReminderHost();
    refreshPlansForLinkedTask(state.editingId);
    if (updated.task_date !== state.selected) {
      const moved = fromISO(updated.task_date);
      toast(`已移动到 ${moved.getMonth() + 1}月${moved.getDate()}日`);
    }
  } catch (error) {
    toast(error.message, "error");
  } finally {
    submitButton.disabled = false;
  }
}

function openDelete(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  state.deletingId = id;
  state.planDeletingId = null;
  el.confirmHeading.textContent = "删除这条任务？";
  el.confirmText.textContent = `「${task.title}」删除后无法恢复。`;
  if (!el.confirmDialog.open) el.confirmDialog.showModal();
}

async function confirmDelete() {
  if (state.planDeletingId != null) {
    el.confirmOk.disabled = true;
    const deletingId = state.planDeletingId;
    try {
      await api(`/api/plans/${deletingId}`, { method: "DELETE" });
      if (state.planAddParent === deletingId) state.planAddParent = null;
      el.confirmDialog.close();
      await loadPlans();
      await loadMonth();
      sfx("plan-delete");
      toast("计划已删除", "success");
    } catch (error) {
      toast(error.message, "error");
    } finally {
      el.confirmOk.disabled = false;
    }
    return;
  }
  if (state.deletingId == null) return;
  el.confirmOk.disabled = true;
  try {
    await api(`/api/tasks/${state.deletingId}`, { method: "DELETE" });
    el.confirmDialog.close();
    await refreshAll();
    refreshPlansForLinkedTask(state.deletingId);
    notifyReminderHost();
    sfx("task-delete");
    toast("已删除", "success");
  } catch (error) {
    toast(error.message, "error");
  } finally {
    el.confirmOk.disabled = false;
  }
}

el.calendarGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".day");
  if (!button) return;
  if (state.calendarPick) {
    event.preventDefault();
    selectCalendarPickDay(button.dataset.date);
    sfx("date-click");
    return;
  }
  if (button.dataset.date === currentTodayISO()) {
    if (el.dayBubble.hidden) showDayBubble(button);
    else animateDayBubble();
  }
  if (button.dataset.date !== state.selected) sfx("date-click");
  selectDate(button.dataset.date);
});

el.calendarGrid.addEventListener("mouseover", (event) => {
  if (state.calendarPick) return;
  const button = event.target.closest(".day");
  if (!button || button.dataset.date !== currentTodayISO()) return;
  if (el.dayBubble.hidden) showDayBubble(button);
});

el.calendarGrid.addEventListener("mouseout", (event) => {
  const button = event.target.closest(".day");
  if (!button || button.dataset.date !== currentTodayISO()) return;
  const next = event.relatedTarget;
  if (next && button.contains(next)) return;
  hideDayBubble();
});

el.soundToggle?.addEventListener("click", () => {
  if (!window.Sfx) return;
  window.Sfx.toggleMuted();
  syncSoundToggle();
});

el.planEntry.addEventListener("click", () => {
  if (state.planView) leavePlanView();
  else enterPlanView();
});
el.planBack.addEventListener("click", leavePlanView);
el.pickCancel.addEventListener("click", cancelCalendarPick);
el.pickConfirm.addEventListener("click", () => {
  if (state.calendarPick?.pending) applyCalendarPick(state.calendarPick.pending);
});
el.planComposer.addEventListener("submit", addRootPlan);

el.planTitleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.isComposing) {
    event.preventDefault();
    el.planComposer.requestSubmit();
  }
});

el.planList.addEventListener("click", (event) => {
  if (event.target.closest("[data-plan-empty-add]")) {
    el.planTitleInput.focus();
    return;
  }
  if (event.target.closest("[data-plan-cancel]")) {
    state.planAddParent = null;
    renderPlans();
    return;
  }
  const item = event.target.closest(".plan-item");
  if (!item) return;
  const id = Number(item.dataset.id);

  if (event.target.closest("[data-plan-toggle-done]")) {
    togglePlanDone(id);
    return;
  }
  if (event.target.closest("[data-plan-toggle]")) {
    togglePlanExpanded(id);
    return;
  }
  const action = event.target.closest("[data-plan-action]");
  if (action) {
    const kind = action.dataset.planAction;
    if (kind === "add") startAddChildPlan(id);
    else if (kind === "edit") openPlanEdit(id);
    else if (kind === "delete") openPlanDelete(id);
    return;
  }
  if (event.target.closest(".plan-row")) {
    if (item.classList.contains("is-folder")) openPlanDetail(id);
    else openPlanDay(state.plans.find((plan) => plan.id === id));
  }
});

el.planDetailList.addEventListener("click", (event) => {
  if (event.target.closest("[data-plan-cancel]")) {
    if (state.calendarPick) cancelCalendarPick();
    state.planAddParent = null;
    renderPlanDetail();
    return;
  }
  if (event.target.closest(".plan-child-form")) return;
  const item = event.target.closest(".plan-item");
  if (!item) return;
  const id = Number(item.dataset.id);
  if (event.target.closest("[data-plan-toggle-done]")) {
    togglePlanDone(id);
    return;
  }
  const action = event.target.closest("[data-plan-action]");
  if (action) {
    const kind = action.dataset.planAction;
    if (kind === "add") startAddChildPlanDetail(id);
    else if (kind === "edit") openPlanEdit(id);
    else if (kind === "delete") openPlanDelete(id);
    return;
  }
  if (event.target.closest("[data-plan-open]")) {
    openPlanDetail(id);
    return;
  }
  const plan = state.plans.find((item) => item.id === id);
  if (plan && plan.child_count === 0) openPlanDay(plan);
});

el.planDetailList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-plan-child-form]");
  if (!form) return;
  event.preventDefault();
  submitChildPlan(form);
});

el.planDetailAdd.addEventListener("click", () => startAddChildPlanDetail(state.planDetailId));
el.planDetailEdit.addEventListener("click", () => {
  if (state.planDetailId != null) openPlanEdit(state.planDetailId);
});
el.planDetailBack.addEventListener("click", planDetailBack);

el.planList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-plan-child-form]");
  if (!form) return;
  event.preventDefault();
  submitChildPlan(form);
});

el.planEditForm.addEventListener("submit", savePlanEdit);

el.planEditTitle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.isComposing) {
    event.preventDefault();
    el.planEditForm.requestSubmit();
  }
});

el.planEditDelete.addEventListener("click", () => {
  const id = state.planEditingId;
  el.planDialog.close();
  if (id != null) openPlanDelete(id);
});

el.planEditTask.addEventListener("change", () => {
  if (el.planEditTask.dataset.ready !== "1") return;
  const task = planTaskOptions.find(
    (item) => String(item.id) === el.planEditTask.value,
  );
  if (task) {
    el.planEditDate.value = task.task_date;
    syncPlanDateField();
    setPlanDateDisabled(true);
    el.planLinkHint.textContent = `关联「${task.title}」，日期与完成状态跟随该任务。`;
  } else {
    setPlanDateDisabled(false);
    el.planLinkHint.textContent = "关联后完成状态与任务同步，不再单独出现在日程中。";
  }
});

el.planDateBtn.addEventListener("click", () => {
  if (el.planDatePop.hidden) openPlanDatePopover();
  else closePlanDatePopover();
});

el.planDatePop.addEventListener("click", (event) => {
  if (event.target.closest("[data-date-prev]")) {
    planDateView.month -= 1;
    if (planDateView.month < 0) {
      planDateView.month = 11;
      planDateView.year -= 1;
    }
    renderPlanDatePopover();
    return;
  }
  if (event.target.closest("[data-date-next]")) {
    planDateView.month += 1;
    if (planDateView.month > 11) {
      planDateView.month = 0;
      planDateView.year += 1;
    }
    renderPlanDatePopover();
    return;
  }
  if (event.target.closest("[data-date-today]")) {
    setPlanDate(toISO(new Date()));
    return;
  }
  if (event.target.closest("[data-date-clear]")) {
    setPlanDate("");
    return;
  }
  const day = event.target.closest("[data-date-pick]");
  if (day) setPlanDate(day.dataset.datePick);
});

el.taskList.addEventListener("click", (event) => {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;
  const action = actionElement.dataset.action;
  if (action === "empty-add") {
    el.newTitle.focus();
    return;
  }

  const article = event.target.closest(".task");
  if (!article) return;

  const id = Number(article.dataset.id);
  if (action === "toggle") toggleTask(id);
  else if (action === "progress") toggleProgressEditor(id);
  else if (action === "edit") openEdit(id);
  else if (action === "delete") openDelete(id);
  else if (action === "expand") article.classList.toggle("expanded");
});

el.taskList.addEventListener("click", (event) => {
  const planRow = event.target.closest(".plan-task");
  if (!planRow) return;
  const id = Number(planRow.dataset.planId);
  if (event.target.closest("[data-plan-day-toggle]")) {
    togglePlanDone(id);
    return;
  }
  openPlanFromDay(id);
});

el.taskList.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  const handle = event.target.closest(".drag-handle");
  if (!handle || handle.classList.contains("disabled")) return;
  const article = handle.closest(".task");
  if (!article || article.classList.contains("done")) return;

  event.preventDefault();

  const rect = article.getBoundingClientRect();
  const section = article.parentElement;
  const sectionRect = section.getBoundingClientRect();
  const placeholder = document.createElement("div");
  placeholder.className = "task-placeholder";
  placeholder.style.height = `${rect.height}px`;
  section.insertBefore(placeholder, article);

  article.classList.add("dragging");
  article.style.position = "absolute";
  article.style.left = `${rect.left - sectionRect.left}px`;
  article.style.top = `${rect.top - sectionRect.top}px`;
  article.style.width = `${rect.width}px`;
  article.style.height = `${rect.height}px`;
  section.classList.add("is-sorting");
  document.body.classList.add("is-dragging");
  state.dragging = {
    article,
    section,
    placeholder,
    offsetY: event.clientY - rect.top,
  };
  if (handle.setPointerCapture) {
    try {
      handle.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture is best-effort.
    }
  }
});

function translateYOf(element) {
  const transform = getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;
  try {
    return new DOMMatrixReadOnly(transform).m42;
  } catch {
    return 0;
  }
}

function shiftRowsWithFlip(section, mutate) {
  const rows = Array.from(section.querySelectorAll(".task")).filter((row) => !row.classList.contains("dragging"));
  if (!rows.length) {
    mutate();
    return;
  }
  const beforeTop = new Map();
  const beforeShift = new Map();
  rows.forEach((row) => {
    beforeTop.set(row, row.getBoundingClientRect().top);
    beforeShift.set(row, translateYOf(row));
  });
  mutate();

  const moved = [];
  rows.forEach((row) => {
    const delta = beforeTop.get(row) - row.getBoundingClientRect().top;
    if (Math.abs(delta) < 0.5) return;
    row.style.transition = "none";
    row.style.transform = `translateY(${beforeShift.get(row) + delta}px) scale(0.985)`;
    moved.push(row);
  });

  if (!moved.length) return;
  requestAnimationFrame(() => {
    moved.forEach((row) => {
      row.style.transition = "";
      row.style.transform = "";
    });
  });
}

document.addEventListener("pointermove", (event) => {
  const dragging = state.dragging;
  if (!dragging) return;
  const { article, section, placeholder, offsetY } = dragging;
  const y = event.clientY;

  const sectionRect = section.getBoundingClientRect();
  article.style.top = `${y - offsetY - sectionRect.top}px`;

  const rows = Array.from(section.querySelectorAll(".task")).filter((row) => row !== article);
  let before = null;
  for (const row of rows) {
    const rect = row.getBoundingClientRect();
    if (y < rect.top + rect.height / 2) {
      before = row;
      break;
    }
  }

  const alreadyInPlace = before
    ? placeholder.nextElementSibling === before
    : !rows.some((row) => placeholder.compareDocumentPosition(row) & Node.DOCUMENT_POSITION_FOLLOWING);

  if (!alreadyInPlace) {
    shiftRowsWithFlip(section, () => {
      if (before) section.insertBefore(placeholder, before);
      else section.appendChild(placeholder);
    });
  }

  const scroller = el.taskScroll;
  const box = scroller.getBoundingClientRect();
  if (y < box.top + 44) scroller.scrollBy({ top: -12 });
  else if (y > box.bottom - 44) scroller.scrollBy({ top: 12 });
});

async function commitTaskOrder(section) {
  if (state.reordering) return;
  const openIds = Array.from(section.querySelectorAll(".task")).map((row) => Number(row.dataset.id));
  const doneIds = state.tasks.filter((task) => task.status === "done").map((task) => task.id);
  const ids = [...openIds, ...doneIds];
  if (ids.join() === state.tasks.map((task) => task.id).join()) return;

  const byId = new Map(state.tasks.map((task) => [task.id, task]));
  state.tasks = ids.map((id) => byId.get(id)).filter(Boolean);

  state.reordering = true;
  try {
    await api("/api/tasks/reorder", {
      method: "POST",
      body: JSON.stringify({ task_date: state.selected, ids }),
    });
    toast("顺序已更新", "success");
  } catch (error) {
    toast(error.message, "error");
    await loadTasks();
  } finally {
    state.reordering = false;
  }
}

function endTaskDrag() {
  const dragging = state.dragging;
  if (!dragging) return;
  state.dragging = null;

  const { article, section, placeholder } = dragging;
  const from = article.getBoundingClientRect();

  article.classList.remove("dragging");
  article.style.position = "";
  article.style.left = "";
  article.style.top = "";
  article.style.width = "";
  article.style.height = "";
  section.insertBefore(article, placeholder);
  placeholder.remove();
  section.classList.remove("is-sorting");

  const delta = from.top - article.getBoundingClientRect().top;
  if (Math.abs(delta) > 0.5) {
    article.style.transition = "none";
    article.style.transform = `translateY(${delta}px)`;
    requestAnimationFrame(() => {
      article.style.transition = "";
      article.style.transform = "";
    });
  }

  document.body.classList.remove("is-dragging");
  commitTaskOrder(section);
}

document.addEventListener("pointerup", endTaskDrag);
document.addEventListener("pointercancel", endTaskDrag);

el.prevMonth.addEventListener("click", () => shiftMonth(-1));
el.nextMonth.addEventListener("click", () => shiftMonth(1));
el.calendarToday.addEventListener("click", () => {
  if (state.calendarPick) {
    const now = new Date();
    const delta = (now.getFullYear() - state.viewYear) * 12 + (now.getMonth() - state.viewMonth);
    if (delta) shiftMonth(delta);
    return;
  }
  goToday();
});
el.dayToday.addEventListener("click", goToday);

el.notesToggle.addEventListener("click", () => {
  const expanded = el.notesToggle.getAttribute("aria-expanded") === "true";
  el.notesToggle.setAttribute("aria-expanded", String(!expanded));
  el.newNotesWrap.hidden = expanded;
  if (!expanded) el.newNotes.focus();
});

el.timeToggle.addEventListener("click", () => {
  const expanded = el.timeToggle.getAttribute("aria-expanded") === "true";
  el.timeToggle.setAttribute("aria-expanded", String(!expanded));
  el.newTimeWrap.hidden = expanded;
  if (!expanded) {
    updateTimeUI("new");
    el.newTimeBtn.focus();
  }
});

el.newTimeBtn.addEventListener("click", () => openTimePicker("new", "due", el.newTimeBtn));
el.newAdvanceBtn.addEventListener("click", () => openTimePicker("new", "advance", el.newAdvanceBtn));
el.editTimeBtn.addEventListener("click", () => openTimePicker("edit", "due", el.editTimeBtn));
el.editAdvanceBtn.addEventListener("click", () => openTimePicker("edit", "advance", el.editAdvanceBtn));

el.editDateBtn.addEventListener("click", () => {
  if (el.editDatePop.classList.contains("is-open")) closeEditDatePopover();
  else openEditDatePopover();
});

el.editDatePop.addEventListener("click", (event) => {
  if (event.target.closest("[data-edit-date-prev]")) {
    editDateView.month -= 1;
    if (editDateView.month < 0) {
      editDateView.month = 11;
      editDateView.year -= 1;
    }
    renderEditDatePopover();
    return;
  }
  if (event.target.closest("[data-edit-date-next]")) {
    editDateView.month += 1;
    if (editDateView.month > 11) {
      editDateView.month = 0;
      editDateView.year += 1;
    }
    renderEditDatePopover();
    return;
  }
  if (event.target.closest("[data-edit-date-today]")) {
    setEditDate(toISO(new Date()));
    return;
  }
  const day = event.target.closest("button[data-edit-date-pick]");
  if (day) setEditDate(day.dataset.editDatePick);
});

document.addEventListener("pointerdown", (event) => {
  if (el.editDatePop.hidden) return;
  if (el.editDatePop.contains(event.target) || event.target.closest("#edit-date-btn")) return;
  closeEditDatePopover();
});

el.newAdvanceOn.addEventListener("change", () => toggleAdvance("new", el.newAdvanceOn.checked));
el.editAdvanceOn.addEventListener("change", () => toggleAdvance("edit", el.editAdvanceOn.checked));

el.timeHours.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-hour]");
  if (!button || button.disabled || !timePick) return;
  timePick.hour = Number(button.dataset.hour);
  if (timePick.kind === "advance") {
    const dueMinutes = clockMinutes(timeContext(timePick.mode).due.value);
    if (dueMinutes != null && timePick.hour * 60 + timePick.minute >= dueMinutes) {
      timePick.minute = Math.max(0, dueMinutes - timePick.hour * 60 - 1);
    }
  }
  renderTimePicker();
  applyTimeDraft();
});

el.timeMinutes.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-minute]");
  if (!button || button.disabled || !timePick) return;
  timePick.minute = Number(button.dataset.minute);
  renderTimePicker();
  applyTimeDraft();
});

el.timePop.addEventListener("click", (event) => {
  if (event.target.closest("[data-time-close]") || event.target.closest("[data-time-done]")) {
    closeTimePicker();
    return;
  }
  if (event.target.closest("[data-time-clear]")) {
    if (timePick) {
      const { mode, kind } = timePick;
      if (kind === "advance") setAdvanceTime(mode, "");
      else setDueTime(mode, "");
    }
    closeTimePicker();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (el.timePop.hidden || !timePick) return;
  if (el.timePop.contains(event.target) || event.target.closest(".time-pick")) return;
  closeTimePicker();
});

window.addEventListener("resize", () => {
  if (timePick) closeTimePicker();
});

el.composer.addEventListener("submit", addTask);

el.newTitle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.isComposing) {
    event.preventDefault();
    el.composer.requestSubmit();
  }
});

el.newNotes.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey) && !event.isComposing) {
    event.preventDefault();
    el.composer.requestSubmit();
  }
});

el.editForm.addEventListener("submit", saveEdit);

el.editDialog.addEventListener("close", () => {
  if (timePick) closeTimePicker(true);
  closeEditDatePopover(true);
  el.editDialog.classList.remove("time-pop-open");
});

el.editDateChips.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-days]");
  if (!button) return;
  const target = new Date();
  target.setDate(target.getDate() + Number(button.dataset.days));
  el.editDate.value = toISO(target);
  syncEditDateField();
  syncDateChips();
  closeEditDatePopover(true);
});

el.editDate.addEventListener("change", syncDateChips);
el.editDate.addEventListener("input", syncDateChips);

el.editTitle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.isComposing) {
    event.preventDefault();
    el.editForm.requestSubmit();
  }
});

el.editDelete.addEventListener("click", () => {
  const id = state.editingId;
  el.editDialog.close();
  if (id != null) openDelete(id);
});

el.confirmOk.addEventListener("click", confirmDelete);
el.confirmCancel.addEventListener("click", () => el.confirmDialog.close());

el.editNotes.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    el.editForm.requestSubmit();
  }
});

document.querySelectorAll("dialog [data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

[el.editDialog, el.confirmDialog, el.planDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

el.editDialog.addEventListener("close", () => {
  state.editingId = null;
});

el.planDialog.addEventListener("close", () => {
  state.planEditingId = null;
  closePlanDatePopover();
});

el.planDialog.addEventListener("cancel", (event) => {
  if (el.planDatePop.hidden) return;
  event.preventDefault();
  closePlanDatePopover();
});

el.confirmDialog.addEventListener("close", () => {
  state.deletingId = null;
  state.planDeletingId = null;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && (timePick || !el.editDatePop.hidden)) {
    if (timePick) closeTimePicker();
    if (!el.editDatePop.hidden) closeEditDatePopover();
    return;
  }
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (state.calendarPick && event.key === "Escape") {
    event.preventDefault();
    if (state.calendarPick.pending) clearCalendarPickPending();
    else cancelCalendarPick();
    return;
  }
  const target = event.target;
  const typing = target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
  const inSlider = target instanceof HTMLElement && Boolean(target.closest(".tp-track"));
  if (typing || inSlider || el.editDialog.open || el.confirmDialog.open || el.planDialog.open) return;

  if (event.key === "Escape" && state.planDetailId != null) {
    event.preventDefault();
    closePlanDetail();
    return;
  }

  if (event.key === "Escape" && state.planView) {
    event.preventDefault();
    leavePlanView();
    return;
  }

  if (event.key === "/" || event.key === "n" || event.key === "N") {
    event.preventDefault();
    if (state.planView) el.planTitleInput.focus();
    else el.newTitle.focus();
  } else if (event.key === "t" || event.key === "T") {
    event.preventDefault();
    if (!state.calendarPick) goToday();
  }
});

let lastFocusRefresh = 0;
window.addEventListener("focus", () => {
  if (!state.selected) return;
  const now = Date.now();
  if (now - lastFocusRefresh < 2000) return;
  lastFocusRefresh = now;
  refreshAll();
  if (state.planAddParent == null && !el.planDialog.open && !el.confirmDialog.open) {
    loadPlans();
  }
});

function init() {
  const now = new Date();
  state.viewYear = now.getFullYear();
  state.viewMonth = now.getMonth();
  state.selected = toISO(now);
  state.animateNext = true;
  el.editDate.value = state.selected;
  syncSoundToggle();
  renderCalendar();
  updateDayHeader();
  renderTasks();
  loadMonth();
  loadTasks();
  loadPlans();
  if (!desktopBridge) startReminderLoop();
}

init();
