window.initSatoshiumSignal = function initSatoshiumSignal() {
  const signalToggle = document.getElementById("signalToggle");
  if (!signalToggle) return;

  if (signalToggle.dataset.signalBound === "true") return;
  signalToggle.dataset.signalBound = "true";

  const STORAGE_KEY = "satoshium_signal_enabled";

  let audioCtx = null;
  let masterGain = null;
  let carrier = null;
  let overtone = null;
  let drift = null;
  let driftGain = null;
  let carrierGain = null;
  let overtoneGain = null;
  let isOn = false;

  function updateButton(state, labelOverride = null) {
    isOn = state;
    signalToggle.textContent = labelOverride || (state ? "Signal: ON" : "Signal: OFF");
    signalToggle.setAttribute("aria-pressed", String(state));
    signalToggle.classList.toggle("is-on", state);
  }

  async function ensureAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
  }

  async function startSignal() {
    if (isOn) return;

    await ensureAudioContext();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);

    carrier = audioCtx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.setValueAtTime(58, audioCtx.currentTime);

    overtone = audioCtx.createOscillator();
    overtone.type = "sine";
    overtone.frequency.setValueAtTime(116, audioCtx.currentTime);

    drift = audioCtx.createOscillator();
    drift.type = "sine";
    drift.frequency.setValueAtTime(0.03, audioCtx.currentTime);

    driftGain = audioCtx.createGain();
    driftGain.gain.setValueAtTime(0.8, audioCtx.currentTime);

    carrierGain = audioCtx.createGain();
    carrierGain.gain.setValueAtTime(0.012, audioCtx.currentTime);

    overtoneGain = audioCtx.createGain();
    overtoneGain.gain.setValueAtTime(0.0025, audioCtx.currentTime);

    drift.connect(driftGain);
    driftGain.connect(carrier.frequency);

    carrier.connect(carrierGain);
    overtone.connect(overtoneGain);

    carrierGain.connect(masterGain);
    overtoneGain.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    carrier.start(now);
    overtone.start(now);
    drift.start(now);

    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.9, now + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(1.0, now + 1.8);

    localStorage.setItem(STORAGE_KEY, "true");
    updateButton(true);
  }

  async function stopSignal() {
    if (!audioCtx || !isOn) {
      localStorage.setItem(STORAGE_KEY, "false");
      updateButton(false);
      return;
    }

    const now = audioCtx.currentTime;

    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value, 0.0001), now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(async () => {
      try { carrier?.stop(); } catch (e) {}
      try { overtone?.stop(); } catch (e) {}
      try { drift?.stop(); } catch (e) {}

      try { carrier?.disconnect(); } catch (e) {}
      try { overtone?.disconnect(); } catch (e) {}
      try { drift?.disconnect(); } catch (e) {}
      try { driftGain?.disconnect(); } catch (e) {}
      try { carrierGain?.disconnect(); } catch (e) {}
      try { overtoneGain?.disconnect(); } catch (e) {}
      try { masterGain?.disconnect(); } catch (e) {}

      carrier = null;
      overtone = null;
      drift = null;
      driftGain = null;
      carrierGain = null;
      overtoneGain = null;
      masterGain = null;

      try {
        await audioCtx.close();
      } catch (e) {}

      audioCtx = null;
    }, 1300);

    localStorage.setItem(STORAGE_KEY, "false");
    updateButton(false);
  }

  signalToggle.addEventListener("click", async () => {
    if (isOn) {
      await stopSignal();
    } else {
      await startSignal();
    }
  });

  updateButton(false);

  if (localStorage.getItem(STORAGE_KEY) === "true") {
    updateButton(false, "Signal: READY");
  }
};
