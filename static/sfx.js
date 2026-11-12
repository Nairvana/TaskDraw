/* TaskDraw sound effects — synthesized with Web Audio, no audio assets. */
(function () {
  "use strict";

  const STORAGE_KEY = "taskdraw.sound";
  const DEFAULT_VOLUME = 1;
  const OUTPUT_BOOST = 2;
  let ctx = null;
  let master = null;
  let limiter = null;
  let muted = false;
  let volume = DEFAULT_VOLUME;
  let lastPlayed = "";
  let playCount = 0;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && typeof saved === "object") {
      if (typeof saved.muted === "boolean") muted = saved.muted;
      if (Number.isFinite(saved.volume)) volume = Math.min(1, Math.max(0, saved.volume));
    }
  } catch (error) {
    /* preferences are best-effort */
  }

  function savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ muted, volume }));
    } catch (error) {
      /* storage may be unavailable */
    }
  }

  function ensureContext() {
    if (ctx) {
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      return ctx;
    }
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
    } catch (error) {
      return null;
    }
    master = ctx.createGain();
    master.gain.value = muted ? 0 : volume * OUTPUT_BOOST;
    limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -6;
    limiter.knee.value = 12;
    limiter.ratio.value = 6;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.18;
    master.connect(limiter);
    limiter.connect(ctx.destination);
    return ctx;
  }

  function tone({ freq, start = 0, duration = 0.2, type = "sine", gain = 0.16, attack = 0.006, slideTo = 0, detune = 0 }) {
    const c = ensureContext();
    if (!c || !master) return;
    const t0 = c.currentTime + start;
    const osc = c.createOscillator();
    const amp = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), t0);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + duration);
    }
    if (detune) osc.detune.setValueAtTime(detune, t0);
    amp.gain.setValueAtTime(0.0001, t0);
    amp.gain.exponentialRampToValueAtTime(gain, t0 + Math.min(attack, duration * 0.4));
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(amp);
    amp.connect(master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }

  function noise({ start = 0, duration = 0.06, gain = 0.1, from = 1800, to = 700, q = 0.9 }) {
    const c = ensureContext();
    if (!c || !master) return;
    const t0 = c.currentTime + start;
    const length = Math.max(1, Math.floor(c.sampleRate * duration));
    const buffer = c.createBuffer(1, length, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    }
    const src = c.createBufferSource();
    src.buffer = buffer;
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = q;
    filter.frequency.setValueAtTime(from, t0);
    filter.frequency.exponentialRampToValueAtTime(Math.max(60, to), t0 + duration);
    const amp = c.createGain();
    amp.gain.setValueAtTime(gain, t0);
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    src.connect(filter);
    filter.connect(amp);
    amp.connect(master);
    src.start(t0);
    src.stop(t0 + duration + 0.02);
  }

  const note = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  const SOUNDS = {
    "task-done": () => {
      tone({ freq: note(76), start: 0, duration: 0.18, type: "triangle", gain: 0.14 });
      tone({ freq: note(79), start: 0.045, duration: 0.2, gain: 0.12 });
      tone({ freq: note(84), start: 0.09, duration: 0.22, gain: 0.1 });
    },
    "task-open": () => {
      tone({ freq: note(74), start: 0, duration: 0.14, gain: 0.12 });
      tone({ freq: note(69), start: 0.055, duration: 0.18, gain: 0.1 });
    },
    "task-add": () => {
      noise({ start: 0, duration: 0.035, gain: 0.06, from: 2600, to: 1400, q: 1.2 });
      tone({ freq: note(76), start: 0.015, duration: 0.1, type: "triangle", gain: 0.09, slideTo: note(79) });
    },
    "task-delete": () => {
      tone({ freq: note(55), start: 0, duration: 0.2, gain: 0.15, slideTo: note(48) });
    },
    "plan-done": () => {
      tone({ freq: note(79), start: 0, duration: 0.24, type: "triangle", gain: 0.1 });
      tone({ freq: note(84), start: 0.012, duration: 0.26, gain: 0.08 });
      tone({ freq: note(88), start: 0.03, duration: 0.22, gain: 0.05 });
    },
    "plan-open": () => {
      tone({ freq: note(76), start: 0, duration: 0.16, gain: 0.1, slideTo: note(72) });
    },
    "plan-all-done": () => {
      const motif = [72, 76, 79, 84];
      motif.forEach((midi, index) => {
        tone({ freq: note(midi), start: index * 0.1, duration: 0.3, type: index === motif.length - 1 ? "triangle" : "sine", gain: 0.11 });
        if (index === motif.length - 1) {
          tone({ freq: note(midi + 12), start: index * 0.1 + 0.04, duration: 0.34, gain: 0.045 });
        }
      });
    },
    "plan-add": () => {
      noise({ start: 0, duration: 0.1, gain: 0.08, from: 1600, to: 520, q: 0.7 });
      tone({ freq: note(60), start: 0.01, duration: 0.11, gain: 0.07 });
    },
    "plan-delete": () => {
      tone({ freq: note(50), start: 0, duration: 0.22, gain: 0.15, slideTo: note(43) });
    },
    "date-confirm": () => {
      tone({ freq: note(84), start: 0, duration: 0.07, type: "triangle", gain: 0.1 });
      tone({ freq: note(88), start: 0.055, duration: 0.08, gain: 0.09 });
    },
    "date-click": () => {
      noise({ start: 0, duration: 0.025, gain: 0.05, from: 3200, to: 1600, q: 1.4 });
      tone({ freq: note(84), start: 0.005, duration: 0.06, type: "triangle", gain: 0.05 });
    },
    dissolve: () => {
      noise({ start: 0, duration: 0.48, gain: 0.06, from: 2200, to: 380, q: 0.45 });
      tone({ freq: note(79), start: 0, duration: 0.46, gain: 0.05, slideTo: note(69) });
      tone({ freq: note(72), start: 0.08, duration: 0.42, gain: 0.035, slideTo: note(64) });
    },
    firework: () => {
      tone({ freq: 160, start: 0, duration: 0.14, gain: 0.14, slideTo: 60 });
      noise({ start: 0, duration: 0.09, gain: 0.1, from: 2200, to: 700, q: 0.6 });
      [88, 91, 96].forEach((midi, index) => {
        tone({ freq: note(midi), start: 0.06 + index * 0.07, duration: 0.22, gain: 0.05 });
      });
    },
    "task-remind": () => {
      tone({ freq: note(88), start: 0, duration: 0.5, gain: 0.05 });
      tone({ freq: note(95), start: 0.16, duration: 0.62, gain: 0.045 });
      tone({ freq: note(100), start: 0.34, duration: 0.76, gain: 0.035 });
      tone({ freq: note(76), start: 0.34, duration: 0.5, type: "triangle", gain: 0.03 });
    },
    "page-turn": () => {
      noise({ start: 0, duration: 0.14, gain: 0.07, from: 2600, to: 700, q: 0.6 });
      tone({ freq: note(72), start: 0.02, duration: 0.1, gain: 0.04, slideTo: note(76) });
    },
  };

  function play(name) {
    if (muted) return;
    const sound = SOUNDS[name];
    if (!sound) return;
    const c = ensureContext();
    if (!c) return;
    if (c.state === "suspended") c.resume().catch(() => {});
    lastPlayed = name;
    playCount += 1;
    sound();
  }

  function setMuted(next) {
    muted = Boolean(next);
    if (master && ctx) master.gain.setTargetAtTime(muted ? 0 : volume * OUTPUT_BOOST, ctx.currentTime, 0.015);
    savePrefs();
    return muted;
  }

  function setVolume(next) {
    volume = Math.min(1, Math.max(0, Number(next) || 0));
    if (master && ctx) master.gain.setTargetAtTime(muted ? 0 : volume * OUTPUT_BOOST, ctx.currentTime, 0.02);
    savePrefs();
    return volume;
  }

  function unlock() {
    ensureContext();
  }

  window.addEventListener("pointerdown", unlock, { capture: true });
  window.addEventListener("keydown", unlock, { capture: true });

  window.Sfx = {
    play,
    setMuted,
    toggleMuted: () => setMuted(!muted),
    isMuted: () => muted,
    getVolume: () => volume,
    setVolume,
    last: () => ({ name: lastPlayed, count: playCount }),
  };
})();
