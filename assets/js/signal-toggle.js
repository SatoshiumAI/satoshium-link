window.initSatoshiumSignal = function initSatoshiumSignal() {
  const existingButton = document.getElementById("signalToggle");
  if (!existingButton) return;

  if (existingButton.dataset.signalBound === "true") return;
  existingButton.dataset.signalBound = "true";

  const STORAGE_KEY = "satoshium_signal_enabled";

  let audioCtx = null;
  let masterGain = null;
  let carrier = null;
  let shimmer = null;
  let drift = null;
  let driftGain = null;
  let breath = null;
  let breathGain = null;
  let carrierGain = null;
  let shimmerGain = null;
  let isOn = false;

  const signalToggle = existingButton;

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
    masterGain.gain.value = 0.0001;

    carrier = audioCtx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.value = 58;

    shimmer = audioCtx.createOscillator();
    shimmer.type = "triangle";
    shimmer.frequency.value = 116.2;

    drift = audioCtx.createOscillator();
    drift.type = "sine";
    drift.frequency.value = 0.045;

    driftGain = audioCtx.createGain();
    driftGain.gain.value = 1.8;

    breath = audioCtx.createOscillator();
    breath.type = "sine";
    breath.frequency.value = 0.018;

    breathGain = audioCtx.createGain();
    breathGain.gain.value = 0.0035;

    shimmerGain = audioCtx.createGain();
    shimmerGain.gain.value = 0.0038;

    carrierGain = audioCtx.createGain();
    carrierGain.gain.value = 0.0115;

    drift.connect(driftGain);
    driftGain.connect(carrier.frequency);

    breath.connect(breathGain);
    breathGain.connect(masterGain.gain);

    carrier.connect(carrierGain);
    shimmer.connect(shimmerGain);

    carrierGain.connect(masterGain);
    shimmerGain.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(0.016, now + 2.2);

    carrier.start();
    shimmer.start();
    drift.start();
    breath.start();

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
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);

    setTimeout(async () => {
      try { carrier && carrier.stop(); } catch (e) {}
      try { shimmer && shimmer.stop(); } catch (e) {}
      try { drift && drift.stop(); } catch (e) {}
      try { breath && breath.stop(); } catch (e) {}

      try { carrier && carrier.disconnect(); } catch (e) {}
      try { shimmer && shimmer.disconnect(); } catch (e) {}
      try { drift && drift.disconnect(); } catch (e) {}
      try { driftGain && driftGain.disconnect(); } catch (e) {}
      try { breath && breath.disconnect(); } catch (e) {}
      try { breathGain && breathGain.disconnect(); } catch (e) {}
      try { carrierGain && carrierGain.disconnect(); } catch (e) {}
      try { shimmerGain && shimmerGain.disconnect(); } catch (e) {}
      try { masterGain && masterGain.disconnect(); } catch (e) {}

      carrier = null;
      shimmer = null;
      drift = null;
      driftGain = null;
      breath = null;
      breathGain = null;
      carrierGain = null;
      shimmerGain = null;
      masterGain = null;

      try {
        await audioCtx.close();
      } catch (e) {}

      audioCtx = null;
    }, 1600);

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
