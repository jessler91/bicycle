const pages = {
  fit: document.querySelector("#fit-page"),
  benefits: document.querySelector("#benefits-page"),
};

const sceneEl = document.querySelector("#fit-scene");
const signalList = document.querySelector("#signal-list");
const detailTitle = document.querySelector("#detail-title");
const detailSummary = document.querySelector("#detail-summary");
const detailFeelings = document.querySelector("#detail-feelings");
const detailContributors = document.querySelector("#detail-contributors");
const detailContacts = document.querySelector("#detail-contacts");
const detailNote = document.querySelector("#detail-note");
const scoreLabel = document.querySelector("#score-label");
const scoreDot = document.querySelector("#score-dot");
const meterFill = document.querySelector("#meter-fill");
const torsoAngleEl = document.querySelector("#torso-angle");
const hipAngleEl = document.querySelector("#hip-angle");
const kneeAngleEl = document.querySelector("#knee-angle");
const torsoContextEl = document.querySelector("#torso-context");
const hipContextEl = document.querySelector("#hip-context");
const kneeContextEl = document.querySelector("#knee-context");
const angleHelpEl = document.querySelector("#angle-help");
const experimentTitle = document.querySelector("#experiment-title");
const experimentSummary = document.querySelector("#experiment-summary");
const experimentActions = document.querySelector("#experiment-actions");
const fitControls = [...document.querySelectorAll("[data-fit-control]")];
const fitOutputs = [...document.querySelectorAll("[data-fit-output]")];
const baselineLabel = document.querySelector("#baseline-label");

const presets = {
  drops: {
    saddleHeight: 1.45,
    saddleForeAft: -0.12,
    barHeight: 1.5,
    barReach: 0.98,
    frameReach: 0.88,
    crankLength: 172.5,
    headAngle: 73,
    headTubeLength: 0.26,
    forkOffset: 0.07,
    chainstayLength: 0.78,
    seatstayDrop: 0.03,
    tireWidth: 0.034,
    rimDepth: 0.02,
    frameStack: 1.47,
    stemLength: 0.12,
    stemBaselineReach: 0.98,
    barStyle: "drop",
    handPosition: "drops",
    barWidth: 0.34,
    barFlare: 0.015,
    upperArmLength: 0.5,
    forearmLength: 0.38,
    torsoLift: -0.82,
    handDrop: 0.24,
    note: "Road drops lower the torso without requiring an extreme stem. This compact performance position keeps the elbows softly bent and the wrists supported on the lower curve.",
  },
  tops: {
    saddleHeight: 1.45,
    saddleForeAft: -0.04,
    barHeight: 1.5,
    barReach: 1.08,
    frameReach: 0.94,
    crankLength: 172.5,
    headAngle: 73,
    headTubeLength: 0.28,
    forkOffset: 0.07,
    chainstayLength: 0.78,
    seatstayDrop: 0.03,
    tireWidth: 0.034,
    rimDepth: 0.02,
    frameStack: 1.49,
    barStyle: "drop",
    handPosition: "tops",
    barWidth: 0.34,
    barFlare: 0.015,
    torsoLift: 0.08,
    handDrop: -0.04,
    note: "Road tops open the torso compared with the drops. This may reduce back and hand pressure while keeping a road-bike feel.",
  },
  gravel: {
    saddleHeight: 1.44,
    saddleForeAft: 0,
    barHeight: 1.51,
    barReach: 1,
    frameReach: 0.9,
    crankLength: 170,
    headAngle: 71.5,
    headTubeLength: 0.32,
    forkOffset: 0.075,
    chainstayLength: 0.82,
    seatstayDrop: 0.12,
    tireWidth: 0.052,
    rimDepth: 0.018,
    frameStack: 1.51,
    barStyle: "drop",
    handPosition: "hoods",
    barWidth: 0.37,
    barFlare: 0.055,
    torsoLift: 0.16,
    handDrop: 0.04,
    note: "Gravel positions often balance comfort, control, and endurance. A slightly higher bar can help on long mixed-surface rides.",
  },
  commuter: {
    saddleHeight: 1.43,
    saddleForeAft: 0.08,
    barHeight: 1.76,
    barReach: 0.58,
    frameReach: 0.62,
    crankLength: 170,
    headAngle: 70,
    headTubeLength: 0.36,
    forkOffset: 0.08,
    chainstayLength: 0.84,
    seatstayDrop: 0.08,
    tireWidth: 0.046,
    rimDepth: 0.017,
    frameStack: 1.55,
    barStyle: "swept",
    handPosition: "grips",
    barWidth: 0.43,
    torsoLift: 0.72,
    handDrop: -0.22,
    note: "Commuter positions are more upright for visibility and easy control. They may reduce hand pressure but can place more weight on the saddle.",
  },
  mtb: {
    saddleHeight: 1.43,
    saddleForeAft: 0.04,
    barHeight: 1.44,
    barReach: 0.86,
    frameReach: 0.82,
    crankLength: 170,
    headAngle: 66.5,
    headTubeLength: 0.3,
    forkOffset: 0.09,
    chainstayLength: 0.9,
    seatstayDrop: 0.34,
    tireWidth: 0.072,
    rimDepth: 0.016,
    frameStack: 1.46,
    barStyle: "flat",
    handPosition: "grips",
    barWidth: 0.48,
    torsoLift: 0.34,
    handDrop: -0.08,
    note: "Mountain bike fit keeps the rider ready to move over terrain. Wider, higher bars can change shoulder and wrist loading.",
  },
};

const contactPoints = {
  saddleHeight: { label: "Saddle height", handles: ["saddle"], regions: ["knees", "hips", "hamstrings"] },
  saddleForeAft: { label: "Saddle fore/aft", handles: ["saddle"], regions: ["knees", "hips", "lowback", "hands"] },
  barHeight: { label: "Bar height", handles: ["bars"], regions: ["lowback", "neck", "hips"] },
  barReach: { label: "Bar reach", handles: ["bars", "reach"], regions: ["hands", "neck", "lowback", "hips"] },
  frameReach: { label: "Frame/cockpit reach", handles: ["reach", "bars"], regions: ["hands", "neck", "lowback"] },
  pedals: { label: "Pedal stroke", handles: ["pedals"], regions: ["knees", "hips", "hamstrings"] },
};

const fitKnowledge = {
  lowback: {
    title: "Low back",
    shortSignal: "Back and neck: low bars can close the hip angle and increase back or neck demand.",
    summary: "Low back signals often show up when the rider is asked to hold a long, low posture for longer than their mobility or strength comfortably supports.",
    feelings: ["Dull ache across the lower back", "Tightness after longer climbs or steady efforts", "Feeling folded at the hips instead of supported by the bike"],
    contributors: ["Bars may be too low for the rider's current mobility", "Reach may be long enough that the pelvis rolls forward", "Saddle position may make the rider brace through the back"],
    contacts: ["barHeight", "barReach", "frameReach", "saddleForeAft"],
    note: "A useful experiment is to raise the bars or shorten reach in small steps, then notice whether breathing, hip angle, and hand pressure feel easier.",
  },
  neck: {
    title: "Neck and shoulders",
    shortSignal: "Neck and shoulders: low or long bars may ask the rider to hold the head up under tension.",
    summary: "Neck and shoulder signals often come from supporting the head while the torso is low or stretched.",
    feelings: ["Tension at the base of the neck", "Shoulder fatigue or shrugging", "Difficulty looking ahead without craning"],
    contributors: ["Bars may be low relative to saddle height", "Reach may be long enough to lock the shoulders", "Drop position may be too aggressive for the ride length"],
    contacts: ["barHeight", "barReach", "frameReach"],
    note: "Try opening the cockpit first: slightly higher bars, a shorter reach, or using the tops/hoods can reduce the demand on the neck.",
  },
  hands: {
    title: "Hands and wrists",
    shortSignal: "Hands and wrists: long reach may increase hand pressure, wrist load, and shoulder tension.",
    summary: "Hand pressure often means too much body weight is being carried by the cockpit instead of balanced between saddle, pedals, and bars.",
    feelings: ["Numbness or tingling in fingers", "Wrist pressure", "Feeling like the body slides toward the bars"],
    contributors: ["Reach may be too long", "Bars may be too low", "Saddle may be tipped or positioned in a way that shifts weight forward"],
    contacts: ["barReach", "frameReach", "barHeight", "saddleForeAft"],
    note: "A small cockpit change can be noticeable. Shorten reach or raise the bars, then check whether the hands feel lighter while pedaling.",
  },
  knees: {
    title: "Knees",
    shortSignal: "Knees: low or forward saddle positions may increase front-knee load and reduce pedaling efficiency.",
    summary: "Knee signals often relate to how much bend and forward load the leg sees through the pedal stroke.",
    feelings: ["Front-of-knee pressure", "Knee ache after climbs or higher effort", "Feeling cramped at the top of the pedal stroke"],
    contributors: ["Saddle may be too low", "Saddle may be too far forward", "Cramped posture may reduce room for the knee to track comfortably"],
    contacts: ["saddleHeight", "saddleForeAft", "pedals"],
    note: "The first experiment is usually small saddle changes. Raise or move the saddle back slightly, then watch whether knee bend and hip comfort improve.",
  },
  hips: {
    title: "Hips",
    shortSignal: "Hips: closed hip angle may feel pinched or compressed in aggressive positions.",
    summary: "Hip signals often appear when saddle, bar height, and reach combine to close the front of the body.",
    feelings: ["Pinching at the front of the hip", "Difficulty staying smooth at the top of the pedal stroke", "Feeling compressed between saddle and bars"],
    contributors: ["Bars may be low", "Saddle may be low or too far forward", "Reach may pull the torso into a closed angle"],
    contacts: ["barHeight", "barReach", "saddleHeight", "saddleForeAft", "pedals"],
    note: "Open the hip angle by raising the bars, shortening reach, or checking saddle height. The goal is smoother movement, not just a bigger angle number.",
  },
  hamstrings: {
    title: "Hamstrings and calves",
    shortSignal: "Hamstrings and calves: a high saddle may cause hip rocking, hamstring strain, or ankle discomfort.",
    summary: "Hamstring and calf signals often appear when the leg has to reach for the bottom of the pedal stroke.",
    feelings: ["Pulling behind the thigh", "Calf or Achilles tightness", "Hips rocking side to side on the saddle"],
    contributors: ["Saddle may be too high", "Saddle setback may increase reach to the pedal", "Ankle may be compensating for leg extension"],
    contacts: ["saddleHeight", "saddleForeAft", "pedals"],
    note: "Lower the saddle in small increments and look for calmer hips. If the rider stops reaching for the pedal, hamstring load often feels more manageable.",
  },
};

const fitExperiments = {
  lowback: {
    title: "Open the cockpit",
    summary: "A slightly higher or shorter cockpit can bring the torso upright and reduce the effort needed to hold a long, low position.",
    actions: [
      { key: "barHeight", delta: 0.1, label: "Raise bars 10 mm" },
      { key: "barReach", delta: -0.1, label: "Shorten reach 10 mm" },
    ],
  },
  neck: {
    title: "Reduce the reach to the bars",
    summary: "Bring the grips closer or higher so the shoulders can relax while the rider still looks comfortably ahead.",
    actions: [
      { key: "barReach", delta: -0.1, label: "Shorten reach 10 mm" },
      { key: "barHeight", delta: 0.1, label: "Raise bars 10 mm" },
    ],
  },
  hands: {
    title: "Take weight off the hands",
    summary: "Start with one small cockpit change. A shorter or higher position usually shifts support back toward the saddle and pedals.",
    actions: [
      { key: "barReach", delta: -0.1, label: "Shorten reach 10 mm" },
      { key: "barHeight", delta: 0.1, label: "Raise bars 10 mm" },
      { key: "saddleForeAft", delta: -0.05, label: "Move saddle back 5 mm" },
    ],
  },
  knees: {
    title: "Create more room for the knee",
    summary: "Front-knee pressure in this model responds first to a low or forward saddle and, secondarily, to a long crank.",
    actions: [
      { key: "saddleHeight", delta: 0.1, label: "Raise saddle 10 mm" },
      { key: "saddleForeAft", delta: -0.05, label: "Move saddle back 5 mm" },
      { key: "crankLength", delta: -2.5, label: "Shorten crank 2.5 mm" },
    ],
  },
  hips: {
    title: "Open the front of the hip",
    summary: "Higher bars, a little more saddle height, or a shorter crank can create space at the top of the pedal stroke.",
    actions: [
      { key: "barHeight", delta: 0.1, label: "Raise bars 10 mm" },
      { key: "saddleHeight", delta: 0.1, label: "Raise saddle 10 mm" },
      { key: "crankLength", delta: -2.5, label: "Shorten crank 2.5 mm" },
    ],
  },
  hamstrings: {
    title: "Reduce the reach to the pedal",
    summary: "A small saddle drop can reduce overextension and help the hips stay quieter through the bottom of the stroke.",
    actions: [
      { key: "saddleHeight", delta: -0.1, label: "Lower saddle 10 mm" },
      { key: "crankLength", delta: -2.5, label: "Shorten crank 2.5 mm" },
    ],
  },
};

const state = {
  preset: "drops",
  fitValues: null,
  baselineValues: null,
  selectedRegion: null,
  userPinnedRegion: false,
  regionScores: {},
  contactHighlightTimer: null,
};

let sceneApi;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function levelFromScore(score) {
  if (score >= 72) return "red";
  if (score >= 34) return "yellow";
  return "green";
}

function colorForLevel(level) {
  if (level === "red") return 0xce4a3d;
  if (level === "yellow") return 0xd49626;
  return 0x2f9c68;
}

function strongestRegion(regionScores) {
  return Object.entries(regionScores).sort((a, b) => b[1] - a[1])[0]?.[0] || "lowback";
}

function computeFit(values) {
  const crankLength = values.crankLength ?? 172.5;
  const reachStress = Math.max(0, (values.barReach - 0.9) * 72 + (values.frameReach - 0.8) * 52 - (values.barHeight - 1.2) * 18);
  const lowBarStress = Math.max(0, (1.25 - values.barHeight) * 74 + Math.max(0, values.barReach - 0.9) * 26 + values.handDrop * 18);
  const highSaddleStress = Math.max(0, (values.saddleHeight - 1.3) * 115);
  const lowSaddleStress = Math.max(0, (1.28 - values.saddleHeight) * 88);
  const forwardSaddleStress = Math.max(0, values.saddleForeAft * 120);
  const longCrankStress = Math.max(0, (crankLength - 172.5) * 2.4);
  const regionScores = {
    lowback: lowBarStress + reachStress * 0.55,
    neck: lowBarStress + reachStress * 0.42,
    hands: reachStress + Math.max(0, 1.18 - values.barHeight) * 28,
    knees: lowSaddleStress + forwardSaddleStress + longCrankStress * 0.55,
    hips: lowBarStress * 0.76 + lowSaddleStress * 0.28 + longCrankStress * 0.7,
    hamstrings: highSaddleStress,
  };
  const score = Math.max(...Object.values(regionScores));
  return {
    regionScores,
    score,
    level: levelFromScore(score),
    torsoAngle: Math.round(clamp(38 + values.torsoLift * 28 + (values.barHeight - 1.1) * 14 - (values.barReach - 0.9) * 16, 15, 72)),
    hipAngle: Math.round(clamp(72 + values.torsoLift * 30 + (values.barHeight - 1) * 12 - (values.barReach - 0.9) * 6 + (values.saddleHeight - 1.3) * 8 - (crankLength - 172.5) * 0.35, 48, 118)),
    kneeAngle: Math.round(clamp(145 + (values.saddleHeight - 1.3) * 45 - Math.max(0, 1.28 - values.saddleHeight) * 32 + (crankLength - 172.5) * 0.35, 118, 168)),
  };
}

function renderList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderDetail() {
  const detail = fitKnowledge[state.selectedRegion] || fitKnowledge.lowback;
  detailTitle.textContent = detail.title;
  detailSummary.textContent = detail.summary;
  detailFeelings.innerHTML = renderList(detail.feelings);
  detailContributors.innerHTML = renderList(detail.contributors);
  detailContacts.innerHTML = detail.contacts
    .map((contact) => `<button class="contact-tag" type="button" data-contact="${contact}">${contactPoints[contact].label}</button>`)
    .join("");
  detailNote.textContent = detail.note;
  renderExperiment();
}

function renderExperiment() {
  const experiment = fitExperiments[state.selectedRegion] || fitExperiments.lowback;
  experimentTitle.textContent = experiment.title;
  experimentSummary.textContent = experiment.summary;
  experimentActions.innerHTML = experiment.actions
    .map((action) => `<button type="button" data-experiment-key="${action.key}" data-experiment-delta="${action.delta}">${action.label}</button>`)
    .join("");
}

function describeAngleChange(value, baseline, positive, negative) {
  const delta = value - baseline;
  if (Math.abs(delta) < 1) return "Preset baseline";
  return `${delta > 0 ? "+" : "−"}${Math.abs(delta)}° ${delta > 0 ? positive : negative}`;
}

function selectRegion(region, { userSelected = true } = {}) {
  if (!fitKnowledge[region]) return;
  state.selectedRegion = region;
  if (userSelected) state.userPinnedRegion = true;
  renderDetail();
  updateSelectionUI();
  sceneApi?.selectRegion(region);
}

function updateSelectionUI() {
  document.querySelectorAll(".signal-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.region === state.selectedRegion);
  });
}

function updateInsights(values) {
  const fit = computeFit(values);
  const measuredAngles = sceneApi?.measureAngles(values) || fit;
  const baselineAngles = sceneApi?.measureAngles(state.baselineValues || values) || computeFit(state.baselineValues || values);
  state.regionScores = fit.regionScores;
  const autoRegion = strongestRegion(fit.regionScores);
  if (!state.selectedRegion || !state.userPinnedRegion) state.selectedRegion = autoRegion;

  const signalRegions = Object.entries(fit.regionScores)
    .sort((a, b) => b[1] - a[1])
    .map(([region]) => region);
  signalList.innerHTML = signalRegions
    .map((region) => `<li><button class="signal-button" type="button" data-region="${region}">${fitKnowledge[region].shortSignal}</button></li>`)
    .join("");

  scoreDot.className = `score-dot ${fit.level === "green" ? "" : fit.level}`.trim();
  meterFill.className = `tuner-needle ${fit.level === "green" ? "" : fit.level}`.trim();
  meterFill.style.left = `${Math.round(Math.min(96, Math.max(4, 12 + fit.score * 0.86)))}%`;
  scoreLabel.textContent = fit.level === "red" ? "High strain signal" : fit.level === "yellow" ? "Possible strain zone" : "Neutral learning zone";
  torsoAngleEl.textContent = `${measuredAngles.torsoAngle}°`;
  hipAngleEl.textContent = `${measuredAngles.hipAngle}°`;
  kneeAngleEl.textContent = `${measuredAngles.kneeAngle}°`;
  torsoContextEl.textContent = describeAngleChange(measuredAngles.torsoAngle, baselineAngles.torsoAngle, "more upright", "lower");
  hipContextEl.textContent = describeAngleChange(measuredAngles.hipAngle, baselineAngles.hipAngle, "more open", "more closed");
  kneeContextEl.textContent = describeAngleChange(measuredAngles.kneeAngle, baselineAngles.kneeAngle, "straighter", "more bent");
  const angleGuidance = {
    hands: "For wrist pressure, raising the torso or shortening reach can help the hands carry less body weight.",
    lowback: "For low-back comfort, a more upright torso and a more open hip angle usually reduce the demand of holding a low position.",
    neck: "For neck tension, a more upright torso can reduce how far the rider must lift the head to look ahead.",
    knees: "Knee angle shows extension near the bottom of the stroke. More bend can indicate a low saddle; too straight can suggest overreaching.",
    hips: "A larger hip angle means more space at the front of the hip, especially near the top of the pedal stroke.",
    hamstrings: "A very straight knee at the bottom of the stroke can indicate that the leg is reaching for the pedal.",
  };
  angleHelpEl.textContent = angleGuidance[state.selectedRegion] || angleGuidance.lowback;
  renderDetail();
  updateSelectionUI();
  sceneApi?.updateStress(fit.regionScores, state.selectedRegion);
}

function renderFitControls() {
  if (!state.fitValues || !state.baselineValues) return;
  let hasAdjustments = false;
  fitControls.forEach((control) => {
    const key = control.dataset.fitControl;
    control.value = state.fitValues[key];
  });
  fitOutputs.forEach((output) => {
    const key = output.dataset.fitOutput;
    const value = state.fitValues[key];
    const baseline = state.baselineValues[key];
    if (key === "crankLength") {
      output.textContent = `${Number(value).toFixed(Number(value) % 1 ? 1 : 0)} mm`;
      hasAdjustments ||= Math.abs(value - baseline) > 0.01;
      return;
    }
    const deltaMillimeters = Math.round((value - baseline) * 100);
    output.textContent = `${deltaMillimeters > 0 ? "+" : ""}${deltaMillimeters} mm`;
    hasAdjustments ||= deltaMillimeters !== 0;
  });
  const presetButton = document.querySelector(`.preset[data-preset="${state.preset}"]`);
  baselineLabel.textContent = `${presetButton?.textContent.trim() || "Preset"} baseline${hasAdjustments ? " · adjusted" : ""}`;
}

function configureFitControlRanges() {
  const deltas = {
    saddleHeight: 0.4,
    barHeight: 0.5,
    barReach: 0.4,
  };
  fitControls.forEach((control) => {
    const key = control.dataset.fitControl;
    if (key === "crankLength") {
      control.min = 160;
      control.max = 180;
      return;
    }
    if (key === "saddleForeAft") {
      control.min = (state.baselineValues[key] - 0.25).toFixed(2);
      control.max = (state.baselineValues[key] + 0.15).toFixed(2);
      return;
    }
    control.min = (state.baselineValues[key] - deltas[key]).toFixed(2);
    control.max = (state.baselineValues[key] + deltas[key]).toFixed(2);
  });
}

let pendingFitFrame;

function scheduleFitUpdate() {
  if (pendingFitFrame) return;
  pendingFitFrame = requestAnimationFrame(() => {
    pendingFitFrame = null;
    sceneApi.applyPreset(state.fitValues);
    updateInsights(state.fitValues);
  });
}

function applyFitExperiment(key, delta) {
  const control = fitControls.find((item) => item.dataset.fitControl === key);
  if (!control || !state.fitValues) return;
  const nextValue = clamp(state.fitValues[key] + delta, Number(control.min), Number(control.max));
  state.fitValues[key] = Number(nextValue.toFixed(key === "crankLength" ? 1 : 2));
  renderFitControls();
  scheduleFitUpdate();
}

function applyPreset(presetKey) {
  state.preset = presetKey;
  state.selectedRegion = null;
  state.userPinnedRegion = false;
  state.baselineValues = { ...presets[presetKey] };
  state.fitValues = { ...state.baselineValues };
  configureFitControlRanges();
  sceneApi.applyPreset(state.fitValues);
  updateInsights(state.fitValues);
  renderFitControls();
}

function highlightContact(contact) {
  const data = contactPoints[contact];
  if (!data) return;
  if (data.regions?.[0]) selectRegion(data.regions[0]);
  sceneApi.highlightContact(data);
  window.clearTimeout(state.contactHighlightTimer);
  state.contactHighlightTimer = window.setTimeout(() => sceneApi.clearContactHighlights(), 1300);
}

function makeMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.48,
    metalness: 0.08,
    ...options,
  });
}

function createScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 100);
  camera.position.set(4.3, 2.7, 4.6);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.84;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  sceneEl.appendChild(renderer.domElement);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const root = new THREE.Group();
  const bike = new THREE.Group();
  const rider = new THREE.Group();
  const markers = {};
  const contactObjects = {};
  const selectable = [];
  const bodyParts = {};
  let dragging = false;
  let moved = false;
  let last = { x: 0, y: 0 };
  let yaw = -0.62;
  let pitch = 0.1;
  let distance = 5.3;
  let entranceStarted = performance.now();
  let lastAnimationTime = performance.now();
  let crankAngle = -0.7;
  let pedaling = false;
  let riderRig = null;

  scene.add(root);
  root.add(bike, rider);
  scene.add(new THREE.HemisphereLight(0xf8fffc, 0x829590, 1.1));
  const key = new THREE.DirectionalLight(0xfff8e9, 2.2);
  key.position.set(3.5, 6, 4.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 4;
  key.shadow.camera.bottom = -2;
  key.shadow.bias = -0.00025;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xa8d9d3, 0.9);
  fill.position.set(-4, 2, -2);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffd2a2, 0.65);
  rim.position.set(-1, 4, 5);
  scene.add(rim);

  const floor = new THREE.Mesh(
    new THREE.CylinderGeometry(2.9, 2.9, 0.025, 96),
    makeMaterial(0xc9d8d0, { transparent: true, opacity: 0.44, roughness: 1 }),
  );
  floor.position.y = -0.05;
  floor.scale.z = 0.48;
  floor.receiveShadow = true;
  scene.add(floor);

  [1.55, 2.2, 2.75].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(radius, radius + 0.008, 96),
      new THREE.MeshBasicMaterial({ color: 0x72948a, transparent: true, opacity: 0.12 - index * 0.02, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.031;
    ring.scale.z = 0.48;
    scene.add(ring);
  });

  const materials = {
    bike: makeMaterial(0x174f52, { roughness: 0.28, metalness: 0.48 }),
    farBike: makeMaterial(0x123f42, { roughness: 0.34, metalness: 0.42 }),
    wheel: makeMaterial(0x17282d, { roughness: 0.3, metalness: 0.32 }),
    spoke: makeMaterial(0x6b7e80, { roughness: 0.26, metalness: 0.72 }),
    rider: makeMaterial(0xc56542, { roughness: 0.68 }),
    shorts: makeMaterial(0x263940, { roughness: 0.7 }),
    skin: makeMaterial(0xd99a78, { roughness: 0.82 }),
    rearSkin: makeMaterial(0xb98873, { transparent: true, opacity: 0.72, roughness: 0.78 }),
    rearShorts: makeMaterial(0x617278, { transparent: true, opacity: 0.72, roughness: 0.7 }),
    shoe: makeMaterial(0x25363d, { roughness: 0.58, metalness: 0.05 }),
    sole: makeMaterial(0x101a1e, { roughness: 0.72 }),
    cable: makeMaterial(0x26373b, { roughness: 0.5, metalness: 0.12 }),
    rotor: makeMaterial(0x87989a, { roughness: 0.2, metalness: 0.86 }),
    joint: makeMaterial(0xd99a78, { roughness: 0.82 }),
    contact: makeMaterial(0x3975d3, { roughness: 0.28, metalness: 0.18, emissive: 0x102e66, emissiveIntensity: 0.2 }),
    marker: makeMaterial(0x2f9c68, { transparent: true, opacity: 0.62 }),
    selected: makeMaterial(0x436fbd, { emissive: 0x1c4b96, emissiveIntensity: 0.5, transparent: true, opacity: 0.82 }),
    contactHighlight: makeMaterial(0xffcf66, { emissive: 0x8a5f00, emissiveIntensity: 0.35 }),
  };

  const riderProfile = {
    torsoLength: 0.72,
    shoulderHalfWidth: 0.17,
    hipHalfWidth: 0.085,
    upperArmLength: 0.43,
    forearmLength: 0.4,
    thighLength: 0.75,
    lowerLegLength: 0.73,
    headRadius: 0.16,
  };

  function resize() {
    const rect = sceneEl.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.fov = rect.width < 520 ? 50 : rect.height < 320 ? 30 : 39;
    camera.updateProjectionMatrix();
  }

  function updateCamera() {
    const y = Math.sin(pitch) * distance + 1.05;
    const flat = Math.cos(pitch) * distance;
    camera.position.set(Math.sin(yaw) * flat, y, Math.cos(yaw) * flat);
    camera.lookAt(0.05, 0.9, 0);
  }

  function tubeBetween(a, b, radius, material) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const length = dir.length();
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 20), material);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    mesh.userData.baseLength = length;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function curvedTube(points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, radius, 12, false), material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function updateTube(mesh, a, b) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const length = Math.max(0.001, dir.length());
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    mesh.scale.y = length / mesh.userData.baseLength;
  }

  function taperedBetween(a, b, radiusAtA, radiusAtB, material) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const length = dir.length();
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusAtB, radiusAtA, length, 24), material);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    mesh.userData.baseLength = length;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function solveKnee(hip, foot, upperLength = 0.78, lowerLength = 0.76) {
    const dx = foot.x - hip.x;
    const dy = foot.y - hip.y;
    const rawDistance = Math.max(0.001, Math.hypot(dx, dy));
    const distance = clamp(rawDistance, 0.16, upperLength + lowerLength - 0.015);
    const along = (upperLength ** 2 - lowerLength ** 2 + distance ** 2) / (2 * distance);
    const height = Math.sqrt(Math.max(0, upperLength ** 2 - along ** 2));
    const ux = dx / rawDistance;
    const uy = dy / rawDistance;
    return new THREE.Vector3(
      hip.x + ux * along - uy * height,
      hip.y + uy * along + ux * height,
      (hip.z + foot.z) * 0.5,
    );
  }

  function sphere(name, radius, material, userData = {}) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 16), material);
    mesh.name = name;
    mesh.userData = userData;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function box(name, scale, material, userData = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(scale.x, scale.y, scale.z), material);
    mesh.name = name;
    mesh.userData = userData;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function wheel(x, values, label) {
    const group = new THREE.Group();
    group.name = `${label} wheel`;
    const wheelRadius = 0.58;
    const tireWidth = values.tireWidth ?? 0.043;
    const rimRadius = wheelRadius - tireWidth * 0.82;
    const tire = new THREE.Mesh(new THREE.TorusGeometry(wheelRadius, tireWidth, 18, 84), materials.wheel);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(rimRadius, values.rimDepth ?? 0.018, 10, 72), materials.spoke);
    tire.castShadow = true;
    rim.castShadow = true;
    group.add(tire, rim);
    for (let i = 0; i < 18; i += 1) {
      const angle = i * Math.PI * 2 / 18;
      const hubSide = i % 2 === 0 ? 0.048 : -0.048;
      const spoke = tubeBetween(
        new THREE.Vector3(0, 0, hubSide),
        new THREE.Vector3(Math.cos(angle) * (rimRadius - 0.012), Math.sin(angle) * (rimRadius - 0.012), 0),
        0.0025,
        materials.spoke,
      );
      group.add(spoke);
    }
    const hubShell = tubeBetween(new THREE.Vector3(0, 0, -0.065), new THREE.Vector3(0, 0, 0.065), 0.025, materials.spoke);
    const valve = tubeBetween(new THREE.Vector3(0, -rimRadius + 0.005, 0), new THREE.Vector3(0, -wheelRadius + tireWidth * 0.35, 0), 0.004, materials.cable);
    group.add(hubShell, valve);
    group.position.set(x, 0.58, 0);
    return group;
  }

  function discBrakeAssembly(center, z, radius, caliperPosition, label) {
    const group = new THREE.Group();
    group.name = `${label} disc brake`;
    const rotor = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.0045, 8, 48), materials.rotor);
    rotor.position.copy(center).add(new THREE.Vector3(0, 0, z));
    rotor.castShadow = true;
    group.add(rotor);
    for (let index = 0; index < 6; index += 1) {
      const angle = index * Math.PI / 3;
      const edge = center.clone().add(new THREE.Vector3(Math.cos(angle) * (radius - 0.008), Math.sin(angle) * (radius - 0.008), z));
      group.add(tubeBetween(center.clone().add(new THREE.Vector3(0, 0, z)), edge, 0.0028, materials.rotor));
    }
    const caliper = box(`${label} brake caliper`, new THREE.Vector3(0.055, 0.085, 0.052), materials.shorts);
    caliper.position.copy(caliperPosition);
    caliper.rotation.z = -0.35;
    group.add(caliper);
    return { group, caliperPosition: caliper.position.clone() };
  }

  function registerBikeContact(name, object, contact) {
    object.name = contactPoints[contact]?.label || object.name;
    object.traverse((part) => {
      if (!part.isMesh) return;
      part.userData = { ...part.userData, type: "contact", contact, baseMaterial: part.material };
    });
    contactObjects[name] = object;
    selectable.push(object);
    return object;
  }

  function setRegionLobes(marker, anchor, lobes) {
    marker.position.copy(anchor);
    marker.userData.lobePairs.forEach((pair, index) => {
      const lobe = lobes[index];
      if (!lobe) return;
      const localPosition = lobe.center.clone().sub(anchor);
      const orientation = lobe.direction?.lengthSq() > 0.0001
        ? new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), lobe.direction.clone().normalize())
        : new THREE.Quaternion();
      pair.forEach((mesh) => {
        const layerScale = mesh.userData.heatLayer === "core" ? 0.56 : mesh.userData.heatLayer === "outline" ? 1.13 : 1;
        mesh.position.copy(localPosition);
        mesh.quaternion.copy(orientation);
        mesh.userData.baseScale.copy(lobe.scale).multiplyScalar(layerScale);
        mesh.scale.copy(mesh.userData.baseScale);
      });
    });
  }

  function addRegionMarker(region, anchor, lobes) {
    const marker = new THREE.Group();
    marker.name = fitKnowledge[region].title;
    marker.userData = { type: "region", region, selected: false, score: 0, lobePairs: [] };

    lobes.forEach(() => {
      const outerMaterial = makeMaterial(0x2f9c68, {
        transparent: true,
        opacity: 0.16,
        emissive: 0x143b25,
        emissiveIntensity: 0.12,
        depthTest: false,
        depthWrite: false,
      });
      const coreMaterial = makeMaterial(0x2f9c68, {
        transparent: true,
        opacity: 0.32,
        emissive: 0x143b25,
        emissiveIntensity: 0.24,
        depthTest: false,
        depthWrite: false,
      });
      const outlineMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          outlineColor: { value: new THREE.Color(0x174f52) },
          outlineOpacity: { value: 0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewDirection;
          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vViewDirection = normalize(-viewPosition.xyz);
            gl_Position = projectionMatrix * viewPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 outlineColor;
          uniform float outlineOpacity;
          varying vec3 vNormal;
          varying vec3 vViewDirection;
          void main() {
            float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDirection))), 1.7);
            float alpha = smoothstep(0.18, 0.86, rim) * outlineOpacity;
            gl_FragColor = vec4(outlineColor, alpha);
          }
        `,
      });
      outerMaterial.userData.disposeWithMesh = true;
      coreMaterial.userData.disposeWithMesh = true;
      outlineMaterial.userData.disposeWithMesh = true;
      const outer = sphere(`${fitKnowledge[region].title} heat zone`, 1, outerMaterial, { type: "region", region, heatLayer: "outer", baseScale: new THREE.Vector3() });
      const core = sphere(`${fitKnowledge[region].title} focus`, 1, coreMaterial, { type: "region", region, heatLayer: "core", baseScale: new THREE.Vector3() });
      const outline = sphere(`${fitKnowledge[region].title} selected outline`, 1, outlineMaterial, { type: "region", region, heatLayer: "outline", baseScale: new THREE.Vector3() });
      [outer, core, outline].forEach((mesh) => {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      });
      outer.renderOrder = 3;
      core.renderOrder = 4;
      outline.renderOrder = 5;
      marker.add(outer, core, outline);
      marker.userData.lobePairs.push([outer, core, outline]);
    });

    setRegionLobes(marker, anchor, lobes);
    markers[region] = marker;
    selectable.push(marker);
    rider.add(marker);
    return marker;
  }

  function clearGeometry(group) {
    group.traverse((object) => {
      if (!object.isMesh) return;
      object.geometry?.dispose();
      if (object.material?.userData?.disposeWithMesh) object.material.dispose();
    });
    group.clear();
  }

  function calculateBikePoints(values) {
    const crank = new THREE.Vector3(-0.12, 0.58, 0);
    const rear = new THREE.Vector3(crank.x - (values.chainstayLength ?? 0.78), 0.58, 0);
    const seatCluster = new THREE.Vector3(-0.24, 1.12, 0);
    const seatAxis = seatCluster.clone().sub(crank).normalize();
    const postExtension = (values.saddleHeight - seatCluster.y) / seatAxis.y;
    const seatpostTop = seatCluster.clone().addScaledVector(seatAxis, postExtension);
    const saddleTilt = -0.08;
    const railDirection = new THREE.Vector3(Math.cos(saddleTilt), Math.sin(saddleTilt), 0);
    const railOffset = 0.043 + values.saddleForeAft * 0.5;
    const saddle = seatpostTop.clone().addScaledVector(railDirection, railOffset);
    const headTop = new THREE.Vector3(0.38 + values.frameReach * 0.35, values.frameStack ?? 1.16, 0);
    const headAngle = THREE.MathUtils.degToRad(values.headAngle ?? 72);
    const headTubeLength = values.headTubeLength ?? 0.32;
    const headBottom = headTop.clone().add(new THREE.Vector3(
      Math.cos(headAngle) * headTubeLength,
      -Math.sin(headAngle) * headTubeLength,
      0,
    ));
    const steeringRunToAxle = (headBottom.y - 0.58) / Math.tan(headAngle);
    const steeringAxisAxle = new THREE.Vector3(headBottom.x + steeringRunToAxle, 0.58, 0);
    const front = steeringAxisAxle.clone().add(new THREE.Vector3(values.forkOffset ?? 0.075, 0, 0));
    const forkCrown = headBottom.clone().add(new THREE.Vector3(Math.cos(headAngle) * 0.075, -Math.sin(headAngle) * 0.075, 0));
    const stemReach = values.stemLength != null
      ? values.stemLength + (values.barReach - (values.stemBaselineReach ?? values.barReach)) * 0.18
      : 0.16 + (values.barReach - 0.75) * 0.18;
    const bars = new THREE.Vector3(headTop.x + stemReach, values.barHeight, 0);
    const crankRadius = (values.crankLength ?? 172.5) / 507;
    const barStyle = values.barStyle ?? "flat";
    const halfBarWidth = values.barWidth ?? 0.42;
    const barFlare = values.barFlare ?? 0;
    const barPaths = [];
    const hoods = [];
    const grips = [1, -1].map((side) => {
      if (barStyle === "drop") {
        const topEnd = bars.clone().add(new THREE.Vector3(0, 0, side * halfBarWidth));
        const shoulder = bars.clone().add(new THREE.Vector3(0.07, -0.005, side * (halfBarWidth + barFlare * 0.12)));
        const hood = bars.clone().add(new THREE.Vector3(0.145, -0.035, side * (halfBarWidth + barFlare * 0.3)));
        const hook = bars.clone().add(new THREE.Vector3(0.17, -0.14, side * (halfBarWidth + barFlare * 0.62)));
        const lower = bars.clone().add(new THREE.Vector3(0.11, -0.265, side * (halfBarWidth + barFlare)));
        const tail = bars.clone().add(new THREE.Vector3(-0.055, -0.285, side * (halfBarWidth + barFlare * 1.08)));
        barPaths.push([topEnd, shoulder, hood, hook, lower, tail]);
        hoods.push({ base: shoulder.clone().lerp(hood, 0.68), tip: hood.clone().add(new THREE.Vector3(0.018, 0.035, 0)) });
        if (values.handPosition === "tops") return bars.clone().add(new THREE.Vector3(0.015, 0.012, side * 0.19));
        if (values.handPosition === "hoods") return hood.clone().add(new THREE.Vector3(-0.008, 0.028, 0));
        return lower.clone().lerp(tail, 0.32).add(new THREE.Vector3(0, 0.012, 0));
      }

      const bend = barStyle === "swept" ? -0.085 : 0.018;
      const rise = barStyle === "swept" ? 0.035 : 0;
      const mid = bars.clone().add(new THREE.Vector3(bend * 0.35, rise * 0.45, side * halfBarWidth * 0.62));
      const end = bars.clone().add(new THREE.Vector3(bend, rise, side * halfBarWidth));
      barPaths.push([bars.clone(), mid, end]);
      return end.clone().lerp(mid, 0.16);
    });
    return { rear, front, crank, saddle, seatCluster, seatAxis, seatpostTop, saddleTilt, railDirection, headTop, headBottom, forkCrown, steeringAxisAxle, bars, crankRadius, barStyle, halfBarWidth, barPaths, hoods, grips };
  }

  function calculateRiderPose(values, points = calculateBikePoints(values)) {
    const hip = points.saddle.clone().add(new THREE.Vector3(-0.04, 0.2, 0));
    const handCenter = points.grips[0].clone().add(points.grips[1]).multiplyScalar(0.5);
    const torsoRadians = THREE.MathUtils.degToRad(computeFit(values).torsoAngle);
    const shoulder = hip.clone().add(new THREE.Vector3(
      Math.cos(torsoRadians) * riderProfile.torsoLength,
      Math.sin(torsoRadians) * riderProfile.torsoLength,
      0,
    ));
    const head = shoulder.clone().add(new THREE.Vector3(0.13, 0.35, 0));
    return { hip, handCenter, shoulder, head, points };
  }

  function angleAtJoint(first, joint, third) {
    const a = first.clone().sub(joint).normalize();
    const b = third.clone().sub(joint).normalize();
    return THREE.MathUtils.radToDeg(a.angleTo(b));
  }

  function measureAngles(values) {
    const pose = calculateRiderPose(values);
    const referenceFoot = pose.points.crank.clone().add(new THREE.Vector3(0, -pose.points.crankRadius, riderProfile.hipHalfWidth));
    const referenceHip = pose.hip.clone().add(new THREE.Vector3(0, 0, riderProfile.hipHalfWidth));
    const referenceKnee = solveKnee(referenceHip, referenceFoot, riderProfile.thighLength, riderProfile.lowerLegLength);
    const torsoVector = pose.shoulder.clone().sub(pose.hip);
    return {
      torsoAngle: Math.round(THREE.MathUtils.radToDeg(Math.atan2(torsoVector.y, torsoVector.x))),
      hipAngle: Math.round(angleAtJoint(pose.shoulder, pose.hip, referenceKnee)),
      kneeAngle: Math.round(angleAtJoint(referenceHip, referenceKnee, referenceFoot)),
    };
  }

  function buildBike(values) {
    clearGeometry(bike);
    Object.keys(contactObjects).forEach((keyName) => delete contactObjects[keyName]);
    const { rear, front, crank, saddle, seatCluster, seatpostTop, saddleTilt, railDirection, headTop, headBottom, forkCrown, bars, crankRadius, barStyle, halfBarWidth, barPaths, hoods, grips } = calculateBikePoints(values);

    bike.add(wheel(rear.x, values, "Rear"), wheel(front.x, values, "Front"));

    const rearTriangle = new THREE.Group();
    const bottomBracketHalfWidth = 0.082;
    const dropoutHalfWidth = 0.064;
    const seatstayHalfWidth = 0.052;
    const seatstayJunction = seatCluster.clone().lerp(crank, values.seatstayDrop ?? 0.05);
    const chainstayEnds = {};
    const seatstayEnds = {};

    [1, -1].forEach((side) => {
      const material = side > 0 ? materials.bike : materials.farBike;
      const bottomBracketSide = crank.clone().add(new THREE.Vector3(0, 0, side * bottomBracketHalfWidth));
      const dropout = rear.clone().add(new THREE.Vector3(0, 0, side * dropoutHalfWidth));
      const seatstayTop = seatstayJunction.clone().add(new THREE.Vector3(0, 0, side * seatstayHalfWidth));
      rearTriangle.add(taperedBetween(bottomBracketSide, dropout, 0.027, 0.017, material));
      rearTriangle.add(taperedBetween(seatstayTop, dropout, 0.022, 0.014, material));
      const dropoutBody = sphere(`${side > 0 ? "Drive" : "Brake"} side rear dropout`, 0.03, materials.spoke);
      dropoutBody.position.copy(dropout);
      dropoutBody.scale.set(1.18, 0.78, 0.62);
      rearTriangle.add(dropoutBody);
      chainstayEnds[side] = { start: bottomBracketSide, end: dropout };
      seatstayEnds[side] = { start: seatstayTop, end: dropout };
    });

    rearTriangle.add(tubeBetween(
      crank.clone().add(new THREE.Vector3(0, 0, -bottomBracketHalfWidth - 0.018)),
      crank.clone().add(new THREE.Vector3(0, 0, bottomBracketHalfWidth + 0.018)),
      0.046,
      materials.spoke,
    ));
    rearTriangle.add(tubeBetween(
      rear.clone().add(new THREE.Vector3(0, 0, -0.115)),
      rear.clone().add(new THREE.Vector3(0, 0, 0.115)),
      0.018,
      materials.spoke,
    ));
    const chainBridgeLeft = chainstayEnds[-1].start.clone().lerp(chainstayEnds[-1].end, 0.32);
    const chainBridgeRight = chainstayEnds[1].start.clone().lerp(chainstayEnds[1].end, 0.32);
    const seatBridgeLeft = seatstayEnds[-1].start.clone().lerp(seatstayEnds[-1].end, 0.2);
    const seatBridgeRight = seatstayEnds[1].start.clone().lerp(seatstayEnds[1].end, 0.2);
    rearTriangle.add(tubeBetween(chainBridgeLeft, chainBridgeRight, 0.011, materials.spoke));
    rearTriangle.add(tubeBetween(seatBridgeLeft, seatBridgeRight, 0.012, materials.spoke));
    bike.add(rearTriangle);

    bike.add(tubeBetween(crank, seatCluster, 0.029, materials.bike));
    bike.add(tubeBetween(seatCluster, headTop, 0.027, materials.bike));
    bike.add(tubeBetween(crank, headBottom, 0.031, materials.bike));
    bike.add(taperedBetween(headBottom, headTop, 0.038, 0.033, materials.bike));
    bike.add(tubeBetween(seatCluster, seatpostTop, 0.022, materials.spoke));

    const headAxis = headTop.clone().sub(headBottom).normalize();
    const topCollarA = headTop.clone().addScaledVector(headAxis, -0.022);
    const topCollarB = headTop.clone().addScaledVector(headAxis, 0.022);
    const bottomCollarA = headBottom.clone().addScaledVector(headAxis, -0.022);
    const bottomCollarB = headBottom.clone().addScaledVector(headAxis, 0.022);
    bike.add(tubeBetween(topCollarA, topCollarB, 0.046, materials.spoke));
    bike.add(tubeBetween(bottomCollarA, bottomCollarB, 0.046, materials.spoke));

    const steererTop = headTop.clone().addScaledVector(headAxis, 0.055);
    bike.add(tubeBetween(headTop, steererTop, 0.021, materials.spoke));
    const stem = tubeBetween(steererTop, bars, 0.022, materials.spoke);
    bike.add(stem);
    registerBikeContact("reach", stem, "frameReach");

    const crownLeft = forkCrown.clone().add(new THREE.Vector3(0, 0, 0.085));
    const crownRight = forkCrown.clone().add(new THREE.Vector3(0, 0, -0.085));
    const axleLeft = front.clone().add(new THREE.Vector3(0, 0, 0.055));
    const axleRight = front.clone().add(new THREE.Vector3(0, 0, -0.055));
    bike.add(tubeBetween(headBottom, forkCrown, 0.028, materials.spoke));
    bike.add(tubeBetween(crownLeft, crownRight, 0.032, materials.bike));
    bike.add(taperedBetween(crownLeft, axleLeft, 0.03, 0.018, materials.bike));
    bike.add(taperedBetween(crownRight, axleRight, 0.03, 0.018, materials.bike));
    const frontBrakePosition = front.clone().add(new THREE.Vector3(-0.082, 0.12, -0.078));
    const frontBrake = discBrakeAssembly(front, -0.078, 0.105, frontBrakePosition, "Front");
    bike.add(frontBrake.group);

    const chainring = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.009, 10, 48), materials.spoke);
    chainring.position.copy(crank).add(new THREE.Vector3(0, 0, 0.085));
    chainring.castShadow = true;
    const crankContact = new THREE.Group();
    crankContact.add(chainring);
    bike.add(crankContact);

    const cassette = new THREE.Group();
    [0.045, 0.055, 0.065, 0.075].forEach((radius, index) => {
      const cog = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.0045, 8, 32), materials.spoke);
      cog.position.copy(rear).add(new THREE.Vector3(0, 0, 0.072 + index * 0.009));
      cog.castShadow = true;
      cassette.add(cog);
    });
    bike.add(cassette);

    const rearBrakePosition = rear.clone().add(new THREE.Vector3(0.082, 0.115, -0.078));
    const rearBrake = discBrakeAssembly(rear, -0.078, 0.105, rearBrakePosition, "Rear");
    bike.add(rearBrake.group);

    const derailleur = new THREE.Group();
    const derailleurPivot = rear.clone().add(new THREE.Vector3(0.055, -0.075, 0.105));
    const upperPulley = rear.clone().add(new THREE.Vector3(0.08, -0.145, 0.108));
    const lowerPulley = rear.clone().add(new THREE.Vector3(0.045, -0.255, 0.108));
    derailleur.add(tubeBetween(derailleurPivot, upperPulley, 0.012, materials.shorts));
    derailleur.add(tubeBetween(upperPulley, lowerPulley, 0.01, materials.shorts));
    [upperPulley, lowerPulley].forEach((position, index) => {
      const pulley = new THREE.Mesh(new THREE.TorusGeometry(index === 0 ? 0.038 : 0.042, 0.005, 8, 28), materials.spoke);
      pulley.position.copy(position);
      derailleur.add(pulley);
    });
    bike.add(derailleur);

    bike.add(tubeBetween(rear.clone().add(new THREE.Vector3(0, 0.075, 0.09)), crank.clone().add(new THREE.Vector3(0, 0.14, 0.085)), 0.006, materials.spoke));
    bike.add(tubeBetween(crank.clone().add(new THREE.Vector3(0, -0.14, 0.085)), lowerPulley, 0.0055, materials.spoke));
    bike.add(tubeBetween(lowerPulley, upperPulley, 0.0055, materials.spoke));
    bike.add(tubeBetween(upperPulley, rear.clone().add(new THREE.Vector3(0, -0.075, 0.09)), 0.0055, materials.spoke));
    function addFrameCable(points, radius, guideIndexes) {
      for (let index = 1; index < points.length; index += 1) {
        bike.add(tubeBetween(points[index - 1], points[index], radius, materials.cable));
      }
      guideIndexes.forEach((index) => {
        const guide = sphere("Cable guide", radius * 1.85, materials.spoke);
        guide.position.copy(points[index]);
        guide.scale.set(1, 0.72, 1);
        bike.add(guide);
      });
    }

    const frontHeadGuide = headTop.clone().lerp(headBottom, 0.52).add(new THREE.Vector3(0.018, 0, -0.058));
    const frontForkGuide = crownRight.clone().lerp(axleRight, 0.48).add(new THREE.Vector3(-0.012, 0, -0.012));
    addFrameCable([
      bars.clone().add(new THREE.Vector3(0.03, -0.025, -0.085)),
      headTop.clone().add(new THREE.Vector3(0.035, 0.035, -0.065)),
      frontHeadGuide,
      crownRight.clone().add(new THREE.Vector3(0.015, 0.025, -0.008)),
      frontForkGuide,
      frontBrake.caliperPosition,
    ], 0.0045, [2, 4]);

    const topTubeBrakeGuide = headTop.clone().lerp(seatCluster, 0.52).add(new THREE.Vector3(0, 0.026, -0.052));
    const brakeSeatstayGuide = seatstayEnds[-1].start.clone().lerp(seatstayEnds[-1].end, 0.52).add(new THREE.Vector3(0.012, 0.01, -0.012));
    addFrameCable([
      bars.clone().add(new THREE.Vector3(0.015, -0.02, -0.105)),
      headTop.clone().add(new THREE.Vector3(-0.015, 0.03, -0.06)),
      topTubeBrakeGuide,
      seatCluster.clone().add(new THREE.Vector3(0.015, 0.025, -0.058)),
      brakeSeatstayGuide,
      rearBrake.caliperPosition,
    ], 0.004, [2, 3, 4]);

    const downTubeShiftGuide = headBottom.clone().lerp(crank, 0.48).add(new THREE.Vector3(0.012, -0.02, 0.052));
    const driveChainstayGuide = chainstayEnds[1].start.clone().lerp(chainstayEnds[1].end, 0.52).add(new THREE.Vector3(0, -0.012, 0.014));
    addFrameCable([
      bars.clone().add(new THREE.Vector3(0.02, -0.035, 0.095)),
      headBottom.clone().add(new THREE.Vector3(0.015, 0.025, 0.055)),
      downTubeShiftGuide,
      crank.clone().add(new THREE.Vector3(0.025, 0.035, 0.082)),
      driveChainstayGuide,
      derailleurPivot,
    ], 0.0038, [2, 3, 4]);
    const saddleAssembly = new THREE.Group();
    const saddleNormal = new THREE.Vector3(-railDirection.y, railDirection.x, 0);
    const seat = box("Saddle", new THREE.Vector3(0.46, 0.07, 0.22), materials.bike, { type: "contact", contact: "saddleHeight" });
    seat.position.copy(saddle).addScaledVector(saddleNormal, 0.055);
    seat.rotation.z = saddleTilt;
    saddleAssembly.add(seat);
    [1, -1].forEach((side) => {
      const railStart = saddle.clone().addScaledVector(railDirection, -0.18).add(new THREE.Vector3(0, 0, side * 0.065));
      const railEnd = saddle.clone().addScaledVector(railDirection, 0.18).add(new THREE.Vector3(0, 0, side * 0.065));
      saddleAssembly.add(tubeBetween(railStart, railEnd, 0.008, materials.spoke));
      const clampStart = seatpostTop.clone().addScaledVector(railDirection, -0.028).add(new THREE.Vector3(0, 0, side * 0.065));
      const clampEnd = seatpostTop.clone().addScaledVector(railDirection, 0.028).add(new THREE.Vector3(0, 0, side * 0.065));
      saddleAssembly.add(tubeBetween(clampStart, clampEnd, 0.015, materials.bike));
    });
    saddleAssembly.add(tubeBetween(
      seatpostTop.clone().add(new THREE.Vector3(0, 0, -0.09)),
      seatpostTop.clone().add(new THREE.Vector3(0, 0, 0.09)),
      0.013,
      materials.bike,
    ));
    bike.add(saddleAssembly);
    registerBikeContact("saddle", saddleAssembly, "saddleHeight");
    const handlebarGroup = new THREE.Group();
    if (barStyle === "drop") {
      const topLeft = bars.clone().add(new THREE.Vector3(0, 0, -halfBarWidth));
      const topRight = bars.clone().add(new THREE.Vector3(0, 0, halfBarWidth));
      handlebarGroup.add(tubeBetween(topLeft, topRight, 0.025, materials.shorts));
      barPaths.forEach((path) => handlebarGroup.add(curvedTube(path, 0.026, materials.shorts)));
      hoods.forEach(({ base, tip }) => {
        handlebarGroup.add(taperedBetween(base, tip, 0.042, 0.032, materials.shorts));
      });
    } else {
      barPaths.forEach((path) => handlebarGroup.add(curvedTube(path, 0.027, materials.bike)));
      grips.forEach((grip, index) => {
        const side = index === 0 ? 1 : -1;
        const end = barPaths[index][barPaths[index].length - 1];
        const inward = end.clone().add(new THREE.Vector3(0, 0, -side * 0.13));
        handlebarGroup.add(tubeBetween(end, inward, 0.033, materials.shorts));
      });
    }
    bike.add(handlebarGroup);
    registerBikeContact("bars", handlebarGroup, "barReach");
    const axle = sphere("Crank axle", 0.055, materials.spoke);
    axle.position.copy(crank);
    crankContact.add(axle);
    registerBikeContact("pedals", crankContact, "pedals");
    return { saddle, bars, crank, crankRadius, grips };
  }

  function lobeBetween(start, end, thicknessX, thicknessZ = thicknessX) {
    return {
      center: start.clone().lerp(end, 0.5),
      direction: end.clone().sub(start),
      scale: new THREE.Vector3(thicknessX, Math.max(0.055, start.distanceTo(end) * 0.5), thicknessZ),
    };
  }

  function markerLayout(lobes) {
    const anchor = lobes.reduce((sum, lobe) => sum.add(lobe.center), new THREE.Vector3()).multiplyScalar(1 / lobes.length);
    return { anchor, lobes };
  }

  function getRegionLayouts() {
    if (!riderRig) return {};
    const { hip, shoulder, head, arms, legs } = riderRig;
    const lowBackStart = hip.clone().lerp(shoulder, 0.05).add(new THREE.Vector3(-0.025, 0, 0));
    const lowBackEnd = hip.clone().lerp(shoulder, 0.36).add(new THREE.Vector3(-0.025, 0, 0));
    const neckStart = shoulder.clone().lerp(head, 0.08);
    const neckEnd = shoulder.clone().lerp(head, 0.62);
    const shoulderLeft = shoulder.clone().add(new THREE.Vector3(0, -0.015, -riderProfile.shoulderHalfWidth));
    const shoulderRight = shoulder.clone().add(new THREE.Vector3(0, -0.015, riderProfile.shoulderHalfWidth));

    const handLobes = arms.map((arm) => {
      const wristEnd = arm.handPoint.clone().lerp(arm.elbowPoint, 0.24);
      return lobeBetween(arm.handPoint, wristEnd, 0.064, 0.072);
    });
    const kneeLobes = legs.map((leg) => ({
      center: leg.kneePoint.clone(),
      direction: leg.footPoint.clone().sub(leg.hipPoint),
      scale: new THREE.Vector3(0.095, 0.13, 0.09),
    }));
    const hamstringLobes = legs.map((leg) => {
      const start = leg.hipPoint.clone().lerp(leg.kneePoint, 0.2).add(new THREE.Vector3(-0.035, 0, 0));
      const end = leg.hipPoint.clone().lerp(leg.kneePoint, 0.67).add(new THREE.Vector3(-0.035, 0, 0));
      return lobeBetween(start, end, 0.075, 0.07);
    });

    return {
      lowback: markerLayout([lobeBetween(lowBackStart, lowBackEnd, 0.115, 0.105)]),
      neck: markerLayout([
        lobeBetween(neckStart, neckEnd, 0.09, 0.095),
        lobeBetween(shoulderLeft, shoulderRight, 0.085, 0.085),
      ]),
      hands: markerLayout(handLobes),
      knees: markerLayout(kneeLobes),
      hips: markerLayout([{
        center: hip.clone().add(new THREE.Vector3(-0.025, 0.005, 0)),
        direction: new THREE.Vector3(0, 1, 0),
        scale: new THREE.Vector3(0.18, 0.115, 0.235),
      }]),
      hamstrings: markerLayout(hamstringLobes),
    };
  }

  function syncRegionMarkers() {
    const layouts = getRegionLayouts();
    Object.entries(layouts).forEach(([region, layout]) => {
      if (markers[region]) setRegionLobes(markers[region], layout.anchor, layout.lobes);
    });
  }

  function buildRider(values, points) {
    clearGeometry(rider);
    Object.keys(markers).forEach((keyName) => delete markers[keyName]);
    const { hip, handCenter, shoulder, head } = calculateRiderPose(values, points);
    const spineMid = hip.clone().lerp(shoulder, 0.52);

    bodyParts.torsoLower = taperedBetween(hip, spineMid, 0.115, 0.145, materials.rider);
    bodyParts.torsoUpper = taperedBetween(spineMid, shoulder, 0.145, 0.17, materials.rider);
    bodyParts.pelvis = sphere("Pelvis", 0.18, materials.shorts);
    bodyParts.pelvis.position.copy(hip);
    bodyParts.pelvis.scale.set(1.08, 0.76, 1.15);
    const chest = sphere("Chest", 0.17, materials.rider);
    chest.position.copy(shoulder.clone().lerp(spineMid, 0.18));
    chest.scale.set(1.0, 0.78, 1.22);
    rider.add(bodyParts.torsoLower, bodyParts.torsoUpper, bodyParts.pelvis, chest);
    rider.add(taperedBetween(shoulder, head, 0.052, 0.06, materials.skin));
    const headMesh = sphere("Head", riderProfile.headRadius, materials.skin);
    headMesh.position.copy(head);
    rider.add(headMesh);
    const helmetCenter = head.clone().add(new THREE.Vector3(-0.025, 0.055, 0));
    const helmet = sphere("Helmet shell", riderProfile.headRadius * 1.06, materials.shorts);
    helmet.position.copy(helmetCenter);
    helmet.scale.set(1.08, 0.72, 1.06);
    const helmetTail = sphere("Helmet rear cradle", riderProfile.headRadius * 0.72, materials.shorts);
    helmetTail.position.copy(head).add(new THREE.Vector3(-0.115, 0.04, 0));
    helmetTail.scale.set(1.05, 0.52, 0.94);
    rider.add(helmet, helmetTail);
    [-0.065, 0, 0.065].forEach((z, index) => {
      const ventStart = head.clone().add(new THREE.Vector3(-0.09 + index * 0.01, 0.145, z));
      const ventEnd = head.clone().add(new THREE.Vector3(0.075, 0.135, z));
      rider.add(tubeBetween(ventStart, ventEnd, 0.008, materials.cable));
    });
    const visor = box("Helmet visor", new THREE.Vector3(0.13, 0.018, 0.18), materials.shorts);
    visor.position.copy(head).add(new THREE.Vector3(0.135, 0.075, 0));
    visor.rotation.z = -0.16;
    rider.add(visor);
    [1, -1].forEach((side) => {
      rider.add(curvedTube([
        head.clone().add(new THREE.Vector3(-0.015, 0.085, side * 0.145)),
        head.clone().add(new THREE.Vector3(0.03, -0.025, side * 0.14)),
        head.clone().add(new THREE.Vector3(0.075, -0.115, side * 0.055)),
      ], 0.0045, materials.cable));
    });

    const hands = [];
    const arms = [];
    [1, -1].forEach((side, index) => {
      const shoulderPoint = shoulder.clone().add(new THREE.Vector3(0, 0, side * riderProfile.shoulderHalfWidth));
      const handPoint = points.grips[index].clone();
      const upperArmLength = values.upperArmLength ?? riderProfile.upperArmLength;
      const forearmLength = values.forearmLength ?? riderProfile.forearmLength;
      const elbowPoint = solveKnee(shoulderPoint, handPoint, upperArmLength, forearmLength);
      elbowPoint.z += side * 0.035;
      const upperArm = taperedBetween(shoulderPoint, elbowPoint, side > 0 ? 0.066 : 0.057, side > 0 ? 0.052 : 0.046, materials.rider);
      const forearm = taperedBetween(elbowPoint, handPoint, side > 0 ? 0.052 : 0.046, side > 0 ? 0.038 : 0.034, side > 0 ? materials.skin : materials.rearSkin);
      rider.add(upperArm, forearm);
      [shoulderPoint, elbowPoint, handPoint].forEach((point) => {
        const joint = sphere("Arm joint", 0.05, side > 0 ? materials.joint : materials.rearSkin);
        joint.position.copy(point);
        rider.add(joint);
      });
      hands.push(handPoint);
      arms.push({ shoulderPoint, elbowPoint, handPoint });
    });

    function createLeg(side, phase) {
      const isFront = side > 0;
      const hipPoint = hip.clone().add(new THREE.Vector3(0, 0, side * riderProfile.hipHalfWidth));
      const footPoint = points.crank.clone().add(new THREE.Vector3(Math.cos(phase) * points.crankRadius, Math.sin(phase) * points.crankRadius, side * 0.14));
      const kneePoint = solveKnee(hipPoint, footPoint, riderProfile.thighLength, riderProfile.lowerLegLength);
      const shortPoint = hipPoint.clone().lerp(kneePoint, 0.44);
      const thighShort = taperedBetween(hipPoint, shortPoint, isFront ? 0.095 : 0.08, isFront ? 0.082 : 0.069, isFront ? materials.shorts : materials.rearShorts);
      const thigh = taperedBetween(shortPoint, kneePoint, isFront ? 0.082 : 0.069, isFront ? 0.062 : 0.053, isFront ? materials.skin : materials.rearSkin);
      const shin = taperedBetween(kneePoint, footPoint, isFront ? 0.066 : 0.056, isFront ? 0.045 : 0.039, isFront ? materials.skin : materials.rearSkin);
      const crankArm = tubeBetween(points.crank.clone().add(new THREE.Vector3(0, 0, side * 0.14)), footPoint, 0.014, materials.spoke);
      const kneeJoint = sphere("Knee", isFront ? 0.058 : 0.052, isFront ? materials.joint : materials.rearSkin);
      const ankleJoint = sphere("Ankle", 0.045, isFront ? materials.joint : materials.rearSkin);
      kneeJoint.position.copy(kneePoint);
      ankleJoint.position.copy(footPoint);
      const pedal = new THREE.Group();
      pedal.name = "Clipless pedal";
      const pedalBody = box("Pedal platform", new THREE.Vector3(0.15, 0.025, 0.1), materials.spoke);
      const pedalAxle = tubeBetween(new THREE.Vector3(0, 0, -0.105), new THREE.Vector3(0, 0, 0.105), 0.009, materials.spoke);
      pedal.add(pedalBody, pedalAxle);
      pedal.position.copy(footPoint);

      const shoe = new THREE.Group();
      shoe.name = "Cycling shoe";
      const shoeSole = box("Shoe sole", new THREE.Vector3(0.27, 0.026, 0.115), materials.sole);
      shoeSole.position.set(0.065, 0.025, 0);
      const shoeUpper = box("Shoe upper", new THREE.Vector3(0.22, 0.065, 0.108), isFront ? materials.shoe : materials.rearShorts);
      shoeUpper.position.set(0.045, 0.067, 0);
      shoeUpper.rotation.z = -0.08;
      const shoeToe = sphere("Shoe toe", 0.066, isFront ? materials.shoe : materials.rearShorts);
      shoeToe.position.set(0.155, 0.055, 0);
      shoeToe.scale.set(0.78, 0.52, 0.82);
      shoe.add(shoeSole, shoeUpper, shoeToe);
      shoe.position.copy(footPoint);
      rider.add(thighShort, thigh, shin, crankArm, kneeJoint, ankleJoint, pedal, shoe);
      return { side, phase, hipPoint, footPoint, kneePoint, shortPoint, thighShort, thigh, shin, crankArm, kneeJoint, ankleJoint, pedal, shoe };
    }

    const legs = [createLeg(1, crankAngle), createLeg(-1, crankAngle + Math.PI)];
    [shoulder, hip, spineMid].forEach((p) => {
      const joint = sphere("Joint", 0.055, materials.joint);
      joint.position.copy(p);
      rider.add(joint);
    });

    riderRig = { points, hip, shoulder, head, handCenter, hands, arms, legs };
    const regionLayouts = getRegionLayouts();
    Object.entries(regionLayouts).forEach(([region, layout]) => addRegionMarker(region, layout.anchor, layout.lobes));
    updateRiderMotion(crankAngle);
  }

  function updateRiderMotion(angle) {
    if (!riderRig) return;
    riderRig.legs.forEach((leg, index) => {
      const phase = angle + index * Math.PI;
      const foot = riderRig.points.crank.clone().add(new THREE.Vector3(Math.cos(phase) * riderRig.points.crankRadius, Math.sin(phase) * riderRig.points.crankRadius, leg.side * 0.14));
      const knee = solveKnee(leg.hipPoint, foot, riderProfile.thighLength, riderProfile.lowerLegLength);
      const shortPoint = leg.hipPoint.clone().lerp(knee, 0.44);
      updateTube(leg.thighShort, leg.hipPoint, shortPoint);
      updateTube(leg.thigh, shortPoint, knee);
      updateTube(leg.shin, knee, foot);
      updateTube(leg.crankArm, riderRig.points.crank.clone().add(new THREE.Vector3(0, 0, leg.side * 0.14)), foot);
      leg.kneeJoint.position.copy(knee);
      leg.ankleJoint.position.copy(foot);
      leg.pedal.position.copy(foot);
      leg.pedal.rotation.z = Math.sin(phase) * 0.045;
      leg.shoe.position.copy(foot);
      leg.shoe.rotation.z = Math.sin(phase) * 0.08;
      leg.footPoint.copy(foot);
      leg.kneePoint.copy(knee);
      leg.shortPoint.copy(shortPoint);
    });
    syncRegionMarkers();
  }

  function applyPreset(values) {
    selectable.length = 0;
    const points = buildBike(values);
    buildRider(values, points);
    entranceStarted = performance.now();
    root.scale.setScalar(0.975);
    updateStress(computeFit(values).regionScores, state.selectedRegion);
  }

  function updateStress(regionScores, selectedRegion) {
    Object.entries(markers).forEach(([region, marker]) => {
      const score = regionScores[region] || 0;
      const level = levelFromScore(score);
      const color = level === "green" ? 0x2a8f83 : colorForLevel(level);
      const isSelected = region === selectedRegion;
      marker.userData.score = score;
      marker.userData.selected = isSelected;
      marker.traverse((object) => {
        if (!object.isMesh || !object.userData.heatLayer) return;
        if (object.userData.heatLayer === "outline") {
          object.material.uniforms.outlineColor.value.setHex(level === "red" ? 0x8d2f28 : level === "yellow" ? 0x8a5d12 : 0x174f52);
          object.material.uniforms.outlineOpacity.value = isSelected ? 1 : 0;
          return;
        }
        const isCore = object.userData.heatLayer === "core";
        object.material.color.setHex(color);
        object.material.emissive.setHex(color);
        object.material.emissiveIntensity = isSelected ? (isCore ? 0.72 : 0.38) : (isCore ? 0.28 : 0.14);
        if (isSelected) object.material.opacity = isCore ? 0.82 : 0.38;
        else if (level === "red") object.material.opacity = isCore ? 0.5 : 0.22;
        else if (level === "yellow") object.material.opacity = isCore ? 0.38 : 0.17;
        else object.material.opacity = isCore ? 0.24 : 0.1;
      });
    });
  }

  function selectRegionInScene(region) {
    updateStress(state.regionScores, region);
  }

  function highlightContactInScene(data) {
    clearContactHighlights();
    data.handles.forEach((handle) => {
      const obj = contactObjects[handle];
      if (obj) {
        obj.traverse((part) => {
          if (part.isMesh) part.material = materials.contactHighlight;
        });
      }
    });
    data.regions.forEach((region) => {
      const marker = markers[region];
      if (marker) {
        marker.traverse((object) => {
          if (!object.isMesh || !object.userData.heatLayer) return;
          if (object.userData.heatLayer === "outline") {
            object.material.uniforms.outlineColor.value.setHex(0x8a5f00);
            object.material.uniforms.outlineOpacity.value = 1;
            return;
          }
          object.material.color.setHex(0xffcf66);
          object.material.emissive.setHex(0xffcf66);
          object.material.emissiveIntensity = object.userData.heatLayer === "core" ? 0.88 : 0.52;
        });
      }
    });
  }

  function clearContactHighlights() {
    Object.values(contactObjects).forEach((obj) => {
      obj.traverse((part) => {
        if (part.isMesh && part.userData.baseMaterial) part.material = part.userData.baseMaterial;
      });
    });
    updateStress(state.regionScores, state.selectedRegion);
  }

  function handlePick(event) {
    if (moved) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(selectable, true)[0];
    const data = hit?.object?.userData;
    if (data?.type === "region") selectRegion(data.region);
    if (data?.type === "contact") highlightContact(data.contact);
  }

  renderer.domElement.addEventListener("pointerdown", (event) => {
    dragging = true;
    moved = false;
    last = { x: event.clientX, y: event.clientY };
    sceneEl.classList.add("is-dragging");
    renderer.domElement.setPointerCapture(event.pointerId);
  });
  renderer.domElement.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const dx = event.clientX - last.x;
    const dy = event.clientY - last.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
    yaw -= dx * 0.008;
    pitch = clamp(pitch + dy * 0.006, -0.35, 0.75);
    last = { x: event.clientX, y: event.clientY };
    updateCamera();
  });
  renderer.domElement.addEventListener("pointerup", (event) => {
    dragging = false;
    sceneEl.classList.remove("is-dragging");
    handlePick(event);
  });
  renderer.domElement.addEventListener("pointercancel", () => {
    dragging = false;
    sceneEl.classList.remove("is-dragging");
  });
  renderer.domElement.addEventListener("wheel", (event) => {
    event.preventDefault();
    distance = clamp(distance + event.deltaY * 0.004, 3.6, 10);
    updateCamera();
  }, { passive: false });

  function animate(now = performance.now()) {
    const delta = Math.min(50, now - lastAnimationTime);
    lastAnimationTime = now;
    if (pedaling) {
      crankAngle = (crankAngle - delta * 0.0046) % (Math.PI * 2);
      updateRiderMotion(crankAngle);
    }
    const entrance = clamp((now - entranceStarted) / 420, 0, 1);
    const eased = 1 - Math.pow(1 - entrance, 3);
    root.scale.setScalar(0.975 + eased * 0.025);
    Object.values(markers).forEach((marker, markerIndex) => {
      const scoreStrength = clamp((marker.userData.score || 0) / 100, 0, 1);
      const amplitude = marker.userData.selected ? 0.075 : 0.012 + scoreStrength * 0.022;
      const pulse = 1 + Math.sin(now * 0.0024 + markerIndex * 0.78) * amplitude;
      marker.userData.lobePairs.forEach((pair) => {
        pair.forEach((mesh) => mesh.scale.copy(mesh.userData.baseScale).multiplyScalar(pulse));
      });
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function resetCamera() {
    yaw = -0.62;
    pitch = 0.1;
    distance = 5.3;
    updateCamera();
  }

  function togglePedaling() {
    pedaling = !pedaling;
    lastAnimationTime = performance.now();
    return pedaling;
  }

  window.addEventListener("resize", resize);
  resize();
  updateCamera();
  animate();
  return {
    applyPreset,
    updateStress,
    selectRegion: selectRegionInScene,
    highlightContact: highlightContactInScene,
    clearContactHighlights,
    resetCamera,
    togglePedaling,
    measureAngles,
  };
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.page;
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
    Object.entries(pages).forEach(([key, page]) => page.classList.toggle("is-active", key === target));
    setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
  });
});

document.querySelectorAll(".preset").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".preset").forEach((preset) => preset.classList.toggle("is-active", preset === button));
    applyPreset(button.dataset.preset);
  });
});

fitControls.forEach((control) => {
  const controlContact = contactPoints[control.dataset.fitControl] || (control.dataset.fitControl === "crankLength" ? contactPoints.pedals : null);
  const previewContact = () => {
    if (controlContact) sceneApi?.highlightContact(controlContact);
  };
  const clearPreview = () => {
    if (!control.matches(":focus")) sceneApi?.clearContactHighlights();
  };
  control.addEventListener("pointerenter", previewContact);
  control.addEventListener("pointerleave", clearPreview);
  control.addEventListener("focus", previewContact);
  control.addEventListener("blur", () => sceneApi?.clearContactHighlights());
  control.addEventListener("input", () => {
    state.fitValues[control.dataset.fitControl] = Number(control.value);
    renderFitControls();
    scheduleFitUpdate();
  });
});

document.querySelector("#reset-fit").addEventListener("click", () => applyPreset(state.preset));
document.querySelector("#reset-camera").addEventListener("click", () => sceneApi.resetCamera());
document.querySelector("#toggle-pedaling").addEventListener("click", (event) => {
  const isPedaling = sceneApi.togglePedaling();
  event.currentTarget.setAttribute("aria-pressed", String(isPedaling));
  event.currentTarget.setAttribute("aria-label", isPedaling ? "Pause pedaling animation" : "Start pedaling animation");
  event.currentTarget.title = isPedaling ? "Pause pedaling" : "Start pedaling";
});

signalList.addEventListener("click", (event) => {
  const button = event.target.closest(".signal-button");
  if (button) selectRegion(button.dataset.region);
});

detailContacts.addEventListener("click", (event) => {
  const button = event.target.closest(".contact-tag");
  if (button) highlightContact(button.dataset.contact);
});

experimentActions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-experiment-key]");
  if (!button) return;
  applyFitExperiment(button.dataset.experimentKey, Number(button.dataset.experimentDelta));
});

sceneApi = createScene();
applyPreset("drops");
