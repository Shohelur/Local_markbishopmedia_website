
/* ─── 1. THREE.JS MASTER UNIVERSE INITIALIZATION ─── */
const canvas = document.getElementById('master-3d-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.2, 22);

const lookAtTarget = { x: 0, y: 1.2, z: 0 };
let isInHeroMode = false;
let isHeroPurchasesEnabled = false;

const ambLight = new THREE.AmbientLight(0x0a182e, 2.8); scene.add(ambLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 3.2); dirLight.position.set(8, 14, 10); scene.add(dirLight);
const pointCyan = new THREE.PointLight(0x00d4ff, 3.8, 30); pointCyan.position.set(-6, 6, 8); scene.add(pointCyan);

/* ─── PROCEDURAL TEXTURES (APPROVED PHASE 1 & 2) ─── */
function createCustomerTexture() {
  const c = document.createElement('canvas'); c.width = 64; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.beginPath(); ctx.arc(32, 18, 9, 0, Math.PI * 2); ctx.fillStyle = '#00f0ff'; ctx.shadowColor = '#00f0ff'; ctx.shadowBlur = 10; ctx.fill();
  ctx.beginPath(); ctx.arc(32, 48, 15, Math.PI, 0, false); ctx.fillStyle = '#00f0ff'; ctx.fill();
  return new THREE.CanvasTexture(c);
}

function createCompetitorTexture() {
  const c = document.createElement('canvas'); c.width = 96; c.height = 96;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(15, 30, 52, 0.7)';
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
  ctx.lineWidth = 2.0;
  ctx.shadowColor = 'rgba(0, 212, 255, 0.4)';
  ctx.shadowBlur = 8;
  ctx.strokeRect(20, 32, 56, 54);
  ctx.fillRect(20, 32, 56, 54);
  ctx.beginPath(); ctx.moveTo(14, 32); ctx.lineTo(48, 10); ctx.lineTo(82, 32); ctx.closePath();
  ctx.fillStyle = 'rgba(20, 42, 75, 0.8)'; ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(0, 212, 255, 0.45)'; ctx.fillRect(30, 44, 12, 12); ctx.fillRect(54, 44, 12, 12);
  ctx.fillStyle = 'rgba(0, 212, 255, 0.25)'; ctx.fillRect(38, 64, 20, 22); ctx.strokeRect(38, 64, 20, 22);
  return new THREE.CanvasTexture(c);
}

function createClientBusinessTexture() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(8, 26, 46, 0.95)';
  ctx.strokeStyle = '#b8ff57';
  ctx.lineWidth = 4;
  ctx.shadowColor = '#b8ff57';
  ctx.shadowBlur = 22;
  ctx.beginPath(); ctx.moveTo(64, 12); ctx.lineTo(112, 36); ctx.lineTo(112, 92); ctx.lineTo(64, 116); ctx.lineTo(16, 92); ctx.lineTo(16, 36); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#b8ff57'; ctx.font = 'bold 46px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('★', 64, 64);
  return new THREE.CanvasTexture(c);
}

function createUltraPurchaseBadge(icon, mainText, subText, colorHex, bgHex) {
  const c = document.createElement('canvas'); c.width = 360; c.height = 114;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bgHex; ctx.strokeStyle = colorHex; ctx.lineWidth = 3.5; ctx.shadowColor = colorHex; ctx.shadowBlur = 24;
  ctx.beginPath(); ctx.roundRect(10, 10, 340, 94, 20); ctx.fill(); ctx.stroke();
  ctx.font = 'bold 36px sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = colorHex; ctx.fillText(icon, 28, 57);
  ctx.font = 'bold 26px "Space Grotesk", sans-serif'; ctx.fillStyle = '#ffffff'; ctx.fillText(mainText, 84, 44);
  ctx.font = 'bold 15px "JetBrains Mono", monospace'; ctx.fillStyle = colorHex; ctx.fillText(subText, 84, 74);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

const customerTex = createCustomerTexture();
const competitorTex = createCompetitorTexture();
const clientBusinessTex = createClientBusinessTexture();

const purchaseTextures = [
  createUltraPurchaseBadge('💰', '+$450 BOOKING', 'LOCAL CLIENT ACQUIRED', '#b8ff57', 'rgba(6, 26, 16, 0.96)'),
  createUltraPurchaseBadge('📞', 'NEW INBOUND CALL', 'HIGH-INTENT BUYER', '#00d4ff', 'rgba(4, 20, 38, 0.96)'),
  createUltraPurchaseBadge('★', '5-STAR SERVICE SALE', 'AUTOMATED 3-PACK WIN', '#b8ff57', 'rgba(6, 26, 16, 0.96)'),
  createUltraPurchaseBadge('⚡', '+$680 RETAINER', 'REPEAT APPOINTMENT', '#b8ff57', 'rgba(6, 26, 16, 0.96)')
];

// 1. SUBTLE DISTANT CORNER SHOPS (APPROVED PHASE 1)
const competitorGroup = new THREE.Group();
scene.add(competitorGroup);
const compMat = new THREE.SpriteMaterial({ map: competitorTex, transparent: true, opacity: 0.45 });
const shopPositions = [
  { x: -32, y: 16, z: -10 }, { x: -38, y: 10, z: -12 }, { x: 32, y: 16, z: -10 }, { x: 38, y: 10, z: -12 },
  { x: -30, y: -14, z: -10 }, { x: -36, y: -6, z: -12 }, { x: 30, y: -14, z: -10 }, { x: 36, y: -6, z: -12 },
  { x: -40, y: 2, z: -14 }, { x: 40, y: 2, z: -14 }, { x: -18, y: 22, z: -12 }, { x: 18, y: 22, z: -12 }
];
shopPositions.forEach(pos => {
  const sprite = new THREE.Sprite(compMat);
  sprite.position.set(pos.x, pos.y, pos.z);
  sprite.scale.set(2.2, 2.2, 1);
  competitorGroup.add(sprite);
});

// 2. 850 GLOWING DUST PARTICLES
const dustCount = 850;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(dustCount * 3);
const dustCols = new Float32Array(dustCount * 3);
const colCyan = new THREE.Color(0x00d4ff);
const colLime = new THREE.Color(0xb8ff57);
const colWhite = new THREE.Color(0xffffff);

for (let i = 0; i < dustCount * 3; i += 3) {
  dustPos[i] = (Math.random() - 0.5) * 65;
  dustPos[i + 1] = (Math.random() - 0.5) * 45;
  dustPos[i + 2] = (Math.random() - 0.5) * 40;
  const rand = Math.random();
  const c = rand > 0.55 ? colCyan : (rand > 0.25 ? colLime : colWhite);
  dustCols[i] = c.r; dustCols[i + 1] = c.g; dustCols[i + 2] = c.b;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
dustGeo.setAttribute('color', new THREE.BufferAttribute(dustCols, 3));
const dustMat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending });
const ambientDust = new THREE.Points(dustGeo, dustMat);
scene.add(ambientDust);

function createCustomerAvatarTex() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#00d4ff';
  ctx.shadowColor = '#00d4ff';
  ctx.shadowBlur = 16;
  ctx.beginPath(); ctx.arc(64, 38, 20, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(64, 105, 36, Math.PI, 0); ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

const SEARCH_QUERIES = [
  '🔍 "Emergency Plumber"',
  '🔍 "Best Pizza"',
  '🔍 "Dental Clinic"',
  '🔍 "Auto Repair"',
  '🔍 "Licensed Electrician"',
  '🔍 "Roofing Contractor"',
  '🔍 "Emergency Locksmith"',
  '🔍 "Injury Lawyer"',
  '🔍 "Carpet Cleaning"',
  '🔍 "Pet Clinic"',
  '🔍 "Plumber near me"',
  '🔍 "Best Pizza 24/7"',
  '🔍 "24/7 HVAC Repair"',
  '🔍 "Dentist open now"'
];

const PURCHASE_LABELS = [
  '💰 +$280 Walk-in Sale',
  '📅 New Client Booked',
  '💰 +$650 Emergency Call',
  '⭐ 5.0 Google Review',
  '💰 +$520 Inbound Order',
  '💰 +$420 Storefront Order',
  '⚡ Same-Day Contract Signed',
  '🛍️ +$190 Direct Order'
];

function createKeywordTexture(text) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(8, 16, 30, 0.92)';
  ctx.strokeStyle = '#00d4ff';
  ctx.lineWidth = 4;
  ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
  ctx.shadowBlur = 18;
  ctx.beginPath(); ctx.roundRect(16, 20, 480, 88, 44); ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.font = 'bold 32px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function createPurchaseTexture(text) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, '#00d4ff');
  grad.addColorStop(1, '#b8ff57');
  ctx.fillStyle = grad;
  ctx.shadowColor = '#b8ff57';
  ctx.shadowBlur = 24;
  ctx.beginPath(); ctx.roundRect(16, 20, 480, 88, 44); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.font = '800 34px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#020205';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

const customerAvatarTex = createCustomerAvatarTex();
const cachedKeywordTexs = SEARCH_QUERIES.map(createKeywordTexture);
const cachedPurchaseTexs = PURCHASE_LABELS.map(createPurchaseTexture);

const customerGroup = new THREE.Group();
scene.add(customerGroup);

const floatingPurchasesGroup = new THREE.Group();
scene.add(floatingPurchasesGroup);

const customerAvatars = [];
const TOTAL_CUSTOMERS = 8;

for (let i = 0; i < TOTAL_CUSTOMERS; i++) {
  const avatarSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: customerAvatarTex, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending }));
  avatarSprite.scale.set(0.48, 0.48, 1);
  customerGroup.add(avatarSprite);

  const hasKeyword = (i % 2 === 0);
  let keywordSprite = null;
  if (hasKeyword) {
    const kTex = cachedKeywordTexs[i % cachedKeywordTexs.length];
    keywordSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: kTex, transparent: true, opacity: 0 }));
    keywordSprite.scale.set(3.4, 0.85, 1);
    customerGroup.add(keywordSprite);
  }

  customerAvatars.push({
    avatarSprite,
    keywordSprite,
    hasKeyword,
    angle: (i / TOTAL_CUSTOMERS) * Math.PI * 2,
    dist: 16.0 + Math.random() * 8.0,
    startY: (Math.random() - 0.5) * 12.0 - 0.5,
    speed: 0.0010 + Math.random() * 0.0006,
    progress: (i / TOTAL_CUSTOMERS),
    floatOffset: Math.random() * Math.PI * 2
  });
}

const activePurchaseBadges = [];

function triggerStorefrontPurchaseBurst(pos) {
  const pTex = cachedPurchaseTexs[Math.floor(Math.random() * cachedPurchaseTexs.length)];
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: pTex, transparent: true, opacity: 0, depthTest: false }));
  const baseX = pinGroup.position.x + (Math.random() - 0.5) * 1.2;
  const baseY = pinGroup.position.y + 1.2;
  sprite.position.set(baseX, baseY, 2.0);
  sprite.scale.set(3.8, 0.95, 1);
  floatingPurchasesGroup.add(sprite);

  activePurchaseBadges.push({
    sprite,
    progress: 0,
    speed: 0.004 + Math.random() * 0.002,
    baseX,
    baseY,
    driftAngle: Math.random() * Math.PI * 2
  });

  gsap.to(shopWalls.scale, { x: 1.08, y: 1.08, z: 1.08, duration: 0.18, yoyo: true, repeat: 1 });
}


// 4. CENTRAL 3D GLASS PIN + VERIFIED BADGE + STOREFRONT
const pinGroup = new THREE.Group();
pinGroup.position.set(0, 3.2, 0);
scene.add(pinGroup);

const headGeo = new THREE.SphereGeometry(2.4, 32, 32);
const headMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.45 });
const headMesh = new THREE.Mesh(headGeo, headMat);
headMesh.position.y = 1.2;
pinGroup.add(headMesh);

const clientBadgeMat = new THREE.SpriteMaterial({ map: clientBusinessTex, transparent: true, opacity: 0.95 });
const clientBadge = new THREE.Sprite(clientBadgeMat);
clientBadge.position.y = 1.2;
clientBadge.scale.set(2.6, 2.6, 1);
pinGroup.add(clientBadge);

const shopGroup = new THREE.Group();
shopGroup.position.y = 1.2;
pinGroup.add(shopGroup);

const shopMats = {
  wall: new THREE.MeshStandardMaterial({ color: 0x0055aa, roughness: 0.2, metalness: 0.3, emissive: 0x001133 }),
  roofCyan: new THREE.MeshStandardMaterial({ color: 0x00d4ff, roughness: 0.2, metalness: 0.1, emissive: 0x00d4ff, emissiveIntensity: 0.35 }),
  roofWhite: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1, emissive: 0xffffff, emissiveIntensity: 0.2 }),
  glassCyan: new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.85, roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.95 }),
  doorWhite: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x00d4ff, emissiveIntensity: 0.75, roughness: 0.2 }),
  foundation: new THREE.MeshStandardMaterial({ color: 0x04101e, roughness: 0.4, metalness: 0.6 })
};

const shopBase = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.2, 32), shopMats.foundation);
shopBase.position.y = -0.6;
shopGroup.add(shopBase);

const shopWalls = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.45, 1.55), shopMats.wall);
shopWalls.position.y = 0.2;
shopGroup.add(shopWalls);

const awningGroup = new THREE.Group();
awningGroup.position.set(0, 0.7, 0.88);
awningGroup.rotation.x = Math.PI / 4.5;
for (let i = -3; i <= 3; i++) {
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.7), i % 2 === 0 ? shopMats.roofCyan : shopMats.roofWhite);
  stripe.position.x = i * 0.27;
  awningGroup.add(stripe);
}
shopGroup.add(awningGroup);

const winGlass = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.08), shopMats.glassCyan);
winGlass.position.set(-0.42, 0.15, 0.79);
shopGroup.add(winGlass);

const shopDoor = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.9, 0.08), shopMats.doorWhite);
shopDoor.position.set(0.45, 0.0, 0.79);
shopGroup.add(shopDoor);

const tipGeo = new THREE.ConeGeometry(2.38, 3.8, 32);
const tipMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.45 });
const tipMesh = new THREE.Mesh(tipGeo, tipMat);
tipMesh.rotation.x = Math.PI;
tipMesh.position.y = -0.7;
pinGroup.add(tipMesh);

const ringGeo = new THREE.TorusGeometry(5.4, 0.035, 16, 120);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.35 });
const halo1 = new THREE.Mesh(ringGeo, ringMat);
const halo2 = new THREE.Mesh(ringGeo, ringMat);
halo2.rotation.x = Math.PI / 2.8;
pinGroup.add(halo1);
pinGroup.add(halo2);

const purchaseRippleGeo = new THREE.RingGeometry(0.1, 0.5, 64);
const purchaseRippleMat = new THREE.MeshBasicMaterial({ color: 0xb8ff57, transparent: true, opacity: 0, side: THREE.DoubleSide });
const purchaseRipple = new THREE.Mesh(purchaseRippleGeo, purchaseRippleMat);
purchaseRipple.rotation.x = -Math.PI / 2;
purchaseRipple.position.set(0, -0.6, 0);
pinGroup.add(purchaseRipple);

// FLOATING PURCHASE BADGES
const floatingBadgeGroup = new THREE.Group();
scene.add(floatingBadgeGroup);
// Removed let activePurchaseBadges

function spawnRandomPurchaseBadge() {
  if (!isHeroPurchasesEnabled) return;
  const tex = purchaseTextures[Math.floor(Math.random() * purchaseTextures.length)];
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0 });
  const sprite = new THREE.Sprite(mat);
  const baseX = pinGroup.position.x + (Math.random() - 0.5) * 2.8;
  const baseY = pinGroup.position.y + 0.8;
  sprite.position.set(baseX, baseY, 1.2);
  sprite.scale.set(4.3, 1.36, 1);
  floatingBadgeGroup.add(sprite);
  activePurchaseBadges.push({
    sprite: sprite, progress: 0, speed: 0.007 + Math.random() * 0.003,
    baseX: baseX, baseY: baseY, driftAngle: Math.random() * Math.PI * 2
  });
}
setInterval(spawnRandomPurchaseBadge, 1700);

// 5. FIVE 3D GOLDEN STARS + COMET LIGHT TRAILS (ORBITING AROUND PIN)
const starGroup = new THREE.Group();
pinGroup.add(starGroup);

const starShape = new THREE.Shape();
const pts = 5;
const rOut = 0.65;
const rIn = 0.3;
for (let i = 0; i < pts * 2; i++) {
  const r = i % 2 === 0 ? rOut : rIn;
  const angle = (i * Math.PI) / pts - Math.PI / 2;
  const x = Math.cos(angle) * r;
  const y = Math.sin(angle) * r;
  if (i === 0) starShape.moveTo(x, y);
  else starShape.lineTo(x, y);
}
starShape.closePath();

const starGeo = new THREE.ExtrudeGeometry(starShape, { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.06, bevelThickness: 0.06 });
const starMat = new THREE.MeshBasicMaterial({ color: 0xb8ff57 });

const starMeshes = [];
const starTrails = [];
const TRAIL_LENGTH = 16;

for (let i = 0; i < 5; i++) {
  const mesh = new THREE.Mesh(starGeo, starMat);
  mesh.scale.set(0.001, 0.001, 0.001);
  starGroup.add(mesh);
  starMeshes.push(mesh);

  const trailGeo = new THREE.BufferGeometry();
  const trailPositions = new Float32Array(TRAIL_LENGTH * 3);
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  
  const trailMat = new THREE.PointsMaterial({
    color: i % 2 === 0 ? 0xb8ff57 : 0x00d4ff,
    size: 0.18,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  const trailPoints = new THREE.Points(trailGeo, trailMat);
  starGroup.add(trailPoints);
  starTrails.push({ points: trailPoints, history: [] });
}

function update3DTargetForCurrentScreen() {
  if (!isInHeroMode) return;
  const w = window.innerWidth;
  if (w < 768) {
    gsap.to(pinGroup.position, { x: 0.0, y: 4.1, z: -1.2, duration: 0.6, ease: "power2.out" });
    gsap.to(pinGroup.scale, { x: 0.34, y: 0.34, z: 0.34, duration: 0.6, ease: "power2.out" });
    gsap.to(lookAtTarget, { x: 0.0, y: 1.8, z: 0, duration: 0.6, ease: "power2.out" });
  } else if (w < 1024) {
    gsap.to(pinGroup.position, { x: 3.4, y: 0.2, z: 0.0, duration: 0.6, ease: "power2.out" });
    gsap.to(pinGroup.scale, { x: 0.65, y: 0.65, z: 0.65, duration: 0.6, ease: "power2.out" });
    gsap.to(lookAtTarget, { x: 0.8, y: 0.4, z: 0, duration: 0.6, ease: "power2.out" });
  } else {
    gsap.to(pinGroup.position, { x: 5.2, y: 0.5, z: 0.0, duration: 0.6, ease: "power2.out" });
    gsap.to(pinGroup.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.6, ease: "power2.out" });
    gsap.to(lookAtTarget, { x: 1.0, y: 0.6, z: 0, duration: 0.6, ease: "power2.out" });
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  update3DTargetForCurrentScreen();
}
window.addEventListener('resize', onWindowResize);

/* ─── 2. DYNAMIC TICKER ENGINE ─── */
const tickerItems = [
  { label: "DOMINANCE ENGINE:", val: "9-Mile Local Geo-Grid Coverage" },
  { label: "DOMINANCE TARGET:", val: "#1 Google Maps 3-Pack Positioning" },
  { label: "CITATION NETWORK:", val: "150+ Synchronized Authority Directories" },
  { label: "REPUTATION PROTOCOL:", val: "Automated 5-Star Review Velocity" },
  { label: "REVENUE PIPELINE:", val: "Predictable High-Ticket Inbound Calls" }
];

let currentTickerIdx = 0;
const tickerLabelEl = document.getElementById('ticker-label');
const tickerValEl = document.getElementById('ticker-val');

function cycleTicker() {
  currentTickerIdx = (currentTickerIdx + 1) % tickerItems.length;
  const nextItem = tickerItems[currentTickerIdx];

  gsap.to(tickerValEl, {
    y: -14, opacity: 0, filter: 'blur(4px)', duration: 0.35, ease: "power2.in",
    onComplete: () => {
      tickerLabelEl.innerText = nextItem.label;
      tickerValEl.innerText = nextItem.val;
      gsap.set(tickerValEl, { y: 14, opacity: 0, filter: 'blur(4px)' });
      gsap.to(tickerValEl, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: "power2.out" });
    }
  });
}
setInterval(cycleTicker, 3200);

/* ─── 3. SEAMLESS INTRO GSAP TIMELINE (APPROVED MASTER PRELOADER FLOW) ─── */
function triggerSeamlessIntro() {
  isInHeroMode = false;
  isHeroPurchasesEnabled = false;

  const w = window.innerWidth;
  const isMobile = w <= 860;

  // Pin tip directly points and sits snugly right above MARK BISHOP
  const initPinScale = isMobile ? 1.12 : 1.18;
  const initPinY = isMobile ? 3.45 : 3.65;

  gsap.set(pinGroup.position, { x: 0, y: initPinY, z: 0 });
  gsap.set(pinGroup.scale, { x: 0.001, y: 0.001, z: 0.001 });
  gsap.set(lookAtTarget, { x: 0, y: isMobile ? 1.4 : 1.2, z: 0 });
  starMeshes.forEach(s => gsap.set(s.scale, { x: 0.001, y: 0.001, z: 0.001 }));

  gsap.set('#preloader-layer', { opacity: 1, display: 'flex' });
  gsap.set('#splash-title', { opacity: 0, y: 16, filter: 'blur(6px)' });
  gsap.set('#splash-subline', { opacity: 0, y: 10 });
  gsap.set('#splash-progress', { opacity: 0 });
  gsap.set('#splash-progress-line', { width: '0%' });

  gsap.set('#master-nav-wrapper', { opacity: 0, y: -20 });
  gsap.set('#hero-left', { opacity: 0, visibility: 'hidden', x: -30, filter: 'blur(10px)' });

  const tl = gsap.timeline();

  // Intro Splash Entrance
  tl.to(pinGroup.scale, { x: initPinScale, y: initPinScale, z: initPinScale, duration: 1.1, ease: "elastic.out(1.2, 0.6)" }, 0.1);
  starMeshes.forEach((s, idx) => {
    tl.to(s.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.6, ease: "back.out(2)" }, 0.3 + idx * 0.1);
  });
  tl.to('#splash-title', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: "power3.out" }, 0.5);
  tl.to('#splash-subline', { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.7);
  tl.to('#splash-progress', { opacity: 1, duration: 0.3 }, 0.6);
  tl.to('#splash-progress-line', { width: '100%', duration: 1.5, ease: "power2.inOut" }, 0.7);

  tl.to(shopGroup.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, 2.0);
  tl.to(pinGroup.scale, { x: initPinScale * 1.06, y: initPinScale * 1.06, z: initPinScale * 1.06, duration: 0.2, yoyo: true, repeat: 1 }, 2.1);

  // Preloader Curtain Exit at 2.4s
  tl.to('#preloader-layer', { opacity: 0, duration: 0.4, ease: "power2.inOut", onComplete: () => {
    const pLayer = document.getElementById('preloader-layer');
    if (pLayer) pLayer.style.display = 'none';
  }}, 2.4);

  // Transition 3D Pin smoothly to Hero destination stage
  let targetX = 5.2, targetY = 0.5, targetZ = 0, targetScale = 1.0, lookX = 1.0, lookY = 0.6;
  if (isMobile) {
    targetX = 0.0; targetY = 4.1; targetZ = -1.2; targetScale = 0.36; lookX = 0.0; lookY = 1.8;
  } else if (w < 1024) {
    targetX = 3.4; targetY = 0.2; targetZ = 0.0; targetScale = 0.65; lookX = 0.8; lookY = 0.4;
  }

  tl.to(pinGroup.position, { x: targetX, y: targetY, z: targetZ, duration: 1.0, ease: "power3.inOut" }, 2.4);
  tl.to(pinGroup.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 1.0, ease: "power3.inOut" }, 2.4);
  tl.to(lookAtTarget, {
    x: lookX, y: lookY, z: 0, duration: 1.0, ease: "power3.inOut",
    onComplete: () => {
      isInHeroMode = true;
      isHeroPurchasesEnabled = true;
    }
  }, 2.4);

  tl.to('#master-nav-wrapper', { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.5);
  tl.to('#hero-left', { opacity: 1, visibility: 'visible', x: 0, y: 0, filter: 'blur(0px)', duration: 0.6, ease: "power3.out" }, 2.6);
}

/* ─── 4. APPROVED MASTER 3D NAVIGATION INTERACTION CONTROLLER ─── */
/* ─── 1. SMART SCROLL FREEZE & FLOAT ─── */
window.addEventListener('scroll', () => {
  if (window.scrollY > 5) {
    document.body.classList.add('is-scrolled');
  } else {
    document.body.classList.remove('is-scrolled');
  }
});

/* ─── 2. REFINED STORYTELLING DATABASE (TEAM VOICE + TOP 3 + DUAL REVIEWS) ─── */
const lockedDatabase = {
  maps: {
    title: '“We engineer your business into <span class="highlight">Google Maps Top 3</span> in 21 days.”',
    desc: 'When nearby local people search for your services, our system positions your verified profile in the local Top 3 before competitors, capturing the dominant share of high-intent inbound phone calls.',
    beforeStatus: 'Unranked #12+ (Lost Calls)',
    beforeVal: '$12,000 / MO',
    afterStatus: 'Google Maps Top 3 Locked',
    afterVal: '+$60,000 / MO',
    proof: '+$48,000 / MO VALUE'
  },
  reviews: {
    title: '“We <span class="highlight">actively generate 5-star Google reviews</span> on autopilot.”',
    desc: 'We do not just collect feedback; our system deploys automated multi-channel generation workflows that systematically convert your customers into verified 5-star Google reviews, building overwhelming local trust and dominating search rankings.',
    beforeStatus: '12 Reviews (Stagnant Growth)',
    beforeVal: 'LOW TRUST',
    afterStatus: '250+ Generated 5-Star Reviews',
    afterVal: '4.9★ RATING',
    proof: '94% TRUST RATE'
  },
  citations: {
    title: '“We lock and synchronize your business NAP across <span class="highlight">100+ directories</span>.”',
    desc: 'Our syndication engine locks your Name, Address & Phone across Apple Maps, Yelp, Bing, Yahoo & 100+ platforms so Google algorithms trust your local authority and boost your Top 3 ranking.',
    beforeStatus: 'Inconsistent NAP Across Web',
    beforeVal: 'RANK PENALTY',
    afterStatus: '100+ High-Authority Dirs Synced',
    afterVal: '100% TRUST',
    proof: '100% AUTHORITY'
  },
  website: {
    title: '“We build a lightning-fast 3D website engineered to <span class="highlight">convert clicks into booked calls</span>.”',
    desc: 'Visitors do not just browse; they get captivated by interactive 3D visual proof, smart local schema, and friction-free click-to-call triggers that convert 3.4x more traffic into paid contracts.',
    beforeStatus: 'Generic Slow Site (1.2% Conv)',
    beforeVal: 'LEAKING LEADS',
    afterStatus: 'Interactive 3D Website (3.4x Conv)',
    afterVal: '+$75,000 / MO',
    proof: '3.4x BOOKINGS'
  },
  audit: {
    title: '“We scan your exact <span class="highlight">9-mile radius in 5 seconds</span>.”',
    desc: 'Our street-level radar scan checks 81 GPS grid coordinates around your zip code to show exactly which competitors are stealing your calls and how our system overtakes them.',
    beforeStatus: 'Blind to Visibility Gaps',
    beforeVal: 'LOST REVENUE',
    afterStatus: 'Full 81-Point Radar Scan',
    afterVal: '100% FREE SCAN',
    proof: '0 COST / 60 SECONDS'
  },
  blog: {
    title: '“We publish battle-tested <span class="highlight">Local SEO & Growth Guides</span>.”',
    desc: 'Deep-dive tactical teardowns, algorithm update breakdowns, and step-by-step visibility playbooks designed specifically for local business owners scaling past 7-figures.',
    beforeStatus: 'Outdated SEO Tactics',
    beforeVal: 'RANK DROPS',
    afterStatus: 'Battle-Tested Playbooks',
    afterVal: 'TOP 3 STRATEGIES',
    proof: 'WEEKLY ARTICLES'
  },
  faq: {
    title: '“Everything you need to know about the <span class="highlight">Visibility Operating System</span>.”',
    desc: 'Transparent answers on timelines, ROI guarantees, directory sync integrations, 3D conversion engines, and how quickly your phone starts ringing with qualified local calls.',
    beforeStatus: 'Unanswered Questions',
    beforeVal: 'UNCERTAINTY',
    afterStatus: '100% Transparent Answers',
    afterVal: 'CLEAR ROADMAP',
    proof: 'DIRECT ACCESS'
  }
};

/* ─── 3. INTERACTION CONTROLLER (SMART PROGRESSIVE REVEAL + INSTANT HOVER POP) ─── */
const solutionsPanel = document.getElementById('solutions-spatial-panel');
const navItemSolutions = document.getElementById('nav-item-solutions');
const cards = document.querySelectorAll('#solutions-spatial-panel .dropdown-card-master');
const storyTitle = document.getElementById('story-title');
const storyDesc = document.getElementById('story-desc');
const splitBeforeStatus = document.getElementById('split-before-status');
const splitBeforeVal = document.getElementById('split-before-val');
const splitAfterStatus = document.getElementById('split-after-status');
const splitAfterVal = document.getElementById('split-after-val');
const storyProofVal = document.getElementById('story-proof-val');
const storyBanner = document.getElementById('story-banner-display');

// Resources DOM Elements
const resourcesPanel = document.getElementById('resources-spatial-panel');
const navItemResources = document.getElementById('nav-item-resources');
const resourceCards = document.querySelectorAll('#resources-spatial-panel .dropdown-card-master');
const resStoryTitle = document.getElementById('res-story-title');
const resStoryDesc = document.getElementById('res-story-desc');
const resSplitBeforeStatus = document.getElementById('res-split-before-status');
const resSplitBeforeVal = document.getElementById('res-split-before-val');
const resSplitAfterStatus = document.getElementById('res-split-after-status');
const resSplitAfterVal = document.getElementById('res-split-after-val');
const resStoryProofVal = document.getElementById('res-story-proof-val');
const resourceStoryDeck = document.getElementById('resource-story-deck');

let solutionsTimer = null;
let resourcesTimer = null;

function renderStoryCard(key) {
  const data = lockedDatabase[key];
  if (data && storyBanner) {
    storyBanner.style.transform = 'perspective(1000px) rotateY(-3deg) translateZ(25px) scale(1.02)';
    storyBanner.style.borderColor = 'var(--lime-glow)';
    
    storyTitle.innerHTML = data.title;
    storyDesc.innerHTML = data.desc;
    splitBeforeStatus.innerHTML = data.beforeStatus;
    splitBeforeVal.innerHTML = data.beforeVal;
    splitAfterStatus.innerHTML = data.afterStatus;
    splitAfterVal.innerHTML = data.afterVal;
    storyProofVal.innerHTML = data.proof;
    
    setTimeout(() => {
      storyBanner.style.transform = 'perspective(1000px) rotateY(-6deg) translateZ(15px) scale(1)';
      storyBanner.style.borderColor = 'rgba(0, 212, 255, 0.35)';
    }, 250);
  }
}

function renderResourceCard(key) {
  const data = lockedDatabase[key];
  if (data && resourceStoryDeck) {
    resourceStoryDeck.style.transform = 'perspective(1000px) rotateY(-3deg) translateZ(25px) scale(1.02)';
    resourceStoryDeck.style.borderColor = 'var(--lime-glow)';
    
    if (resStoryTitle) resStoryTitle.innerHTML = data.title;
    if (resStoryDesc) resStoryDesc.innerHTML = data.desc;
    if (resSplitBeforeStatus) resSplitBeforeStatus.innerHTML = data.beforeStatus;
    if (resSplitBeforeVal) resSplitBeforeVal.innerHTML = data.beforeVal;
    if (resSplitAfterStatus) resSplitAfterStatus.innerHTML = data.afterStatus;
    if (resSplitAfterVal) resSplitAfterVal.innerHTML = data.afterVal;
    if (resStoryProofVal) resStoryProofVal.innerHTML = data.proof;
    
    setTimeout(() => {
      resourceStoryDeck.style.transform = 'perspective(1000px) rotateY(-6deg) translateZ(15px) scale(1)';
      resourceStoryDeck.style.borderColor = 'rgba(0, 212, 255, 0.35)';
    }, 250);
  }
}

// 1. WHAT WE DO LOGIC:
if (navItemSolutions) {
  navItemSolutions.addEventListener('mouseenter', () => {
    clearTimeout(solutionsTimer);
    solutionsTimer = setTimeout(() => {
      if (solutionsPanel && !solutionsPanel.classList.contains('has-banner-active')) {
        solutionsPanel.classList.add('has-banner-active');
        cards[0].classList.add('active-story');
        renderStoryCard('maps');
      }
    }, 6500);
  });

  navItemSolutions.addEventListener('mouseleave', () => {
    clearTimeout(solutionsTimer);
    if (solutionsPanel) solutionsPanel.classList.remove('has-banner-active');
    cards.forEach(c => c.classList.remove('active-story'));
  });
}

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    clearTimeout(solutionsTimer);
    if (solutionsPanel) solutionsPanel.classList.add('has-banner-active');
    cards.forEach(c => c.classList.remove('active-story'));
    card.classList.add('active-story');
    
    const key = card.getAttribute('data-story');
    renderStoryCard(key);
  });
});

// 2. RESOURCES LOGIC:
if (navItemResources) {
  navItemResources.addEventListener('mouseenter', () => {
    clearTimeout(resourcesTimer);
    resourcesTimer = setTimeout(() => {
      if (resourcesPanel && !resourcesPanel.classList.contains('has-banner-active')) {
        resourcesPanel.classList.add('has-banner-active');
        resourceCards[0].classList.add('active-story');
        renderResourceCard('audit');
      }
    }, 6500);
  });

  navItemResources.addEventListener('mouseleave', () => {
    clearTimeout(resourcesTimer);
    if (resourcesPanel) resourcesPanel.classList.remove('has-banner-active');
    resourceCards.forEach(c => c.classList.remove('active-story'));
  });
}

resourceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    clearTimeout(resourcesTimer);
    if (resourcesPanel) resourcesPanel.classList.add('has-banner-active');
    resourceCards.forEach(c => c.classList.remove('active-story'));
    card.classList.add('active-story');
    
    const key = card.getAttribute('data-story');
    renderResourceCard(key);
  });
});

/* ─── 4. MOBILE DRAWER & TOUCH ACCORDION CONTROLLER ─── */
const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
const mobDrawerCloseBtn = document.getElementById('mob-drawer-close-btn');
const mobileDrawerSheet = document.getElementById('mobile-drawer-sheet');

function openMobileDrawer() {
  document.body.classList.add('mobile-drawer-open');
}

function closeMobileDrawer() {
  document.body.classList.remove('mobile-drawer-open');
}

function toggleMobileDrawer() {
  document.body.classList.toggle('mobile-drawer-open');
}

if (mobileMenuTrigger) {
  mobileMenuTrigger.addEventListener('click', toggleMobileDrawer);
}
if (mobDrawerCloseBtn) {
  mobDrawerCloseBtn.addEventListener('click', closeMobileDrawer);
}

// Close mobile drawer on ESC key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileDrawer();
});

// Toggle Unboxed Mobile Dropdowns
function toggleMobDropdown(id) {
  const group = document.getElementById(id);
  if (group) {
    group.classList.toggle('is-collapsed');
  }
}

// Toggle Mobile Accordions (backward compatible)
function toggleMobAccordion(id) {
  const block = document.getElementById(id);
  if (block) {
    block.classList.toggle('is-expanded');
  }
}

/* ─── 5. TABLET TOUCHSCREEN TAP HANDLER (POINTEREVENTS) ─── */
document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
  item.addEventListener('pointerdown', (e) => {
    if (window.innerWidth <= 1024 && window.innerWidth >= 769) {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        const isCurrentActive = item.classList.contains('active');
        document.querySelectorAll('.nav-item.has-dropdown').forEach(other => other.classList.remove('active'));
        if (!isCurrentActive) {
          item.classList.add('active');
        }
      }
    }
  });
});

// Close tablet dropdown on outside click
document.addEventListener('pointerdown', (e) => {
  if (window.innerWidth <= 1024 && window.innerWidth >= 769) {
    if (!e.target.closest('.master-nav-wrapper')) {
      document.querySelectorAll('.nav-item.has-dropdown').forEach(other => other.classList.remove('active'));
    }
  }
});

/* ─── 5. MOUSE TRACKING & RENDER ANIMATE LOOP ─── */
const mouseVec = new THREE.Vector2();
window.addEventListener('mousemove', (e) => {
  mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const clock = new THREE.Clock();
let rippleProgress = 0;

let heroElementsOpacity = 0;
function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  if (isInHeroMode) {
    heroElementsOpacity += (1.0 - heroElementsOpacity) * 0.02;
  }

  const isMob = window.innerWidth < 768;
  const targetCamX = isInHeroMode ? (isMob ? 0 : mouseVec.x * 1.2) : mouseVec.x * 2.5;
  const targetCamY = isInHeroMode ? (isMob ? 0.8 : mouseVec.y * 0.8 + 0.8) : mouseVec.y * 1.8 + 1.2;
  camera.position.x += (targetCamX - camera.position.x) * 0.04;
  camera.position.y += (targetCamY - camera.position.y) * 0.04;
  camera.lookAt(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);

  pinGroup.rotation.y = time * 0.25;

  if (isHeroPurchasesEnabled) {
    rippleProgress += 0.012;
    if (rippleProgress >= 1.0) rippleProgress = 0;
    const curR = rippleProgress * 5.4;
    purchaseRipple.scale.set(curR, curR, 1);
    purchaseRipple.material.opacity = (1.0 - rippleProgress) * 0.95;
  } else {
    purchaseRipple.material.opacity = 0;
  }

  for (let i = activePurchaseBadges.length - 1; i >= 0; i--) {
    const b = activePurchaseBadges[i];
    b.progress += b.speed;
    b.sprite.position.y = b.baseY + b.progress * 8.5;
    b.sprite.position.x = b.baseX + Math.sin(time * 1.5 + b.driftAngle) * 0.35;
    let alpha = b.progress < 0.1 ? (b.progress / 0.1) : (b.progress > 0.85 ? (1.0 - b.progress) / 0.15 : 1.0);
    b.sprite.material.opacity = Math.max(0, alpha);
    if (b.progress >= 1.0) {
      floatingBadgeGroup.remove(b.sprite);
      activePurchaseBadges.splice(i, 1);
    }
  }

  // Corner Competitor Shops Subtle Drift
  competitorGroup.rotation.y = time * 0.002;

  // Stardust Ambient Rotation
  ambientDust.rotation.y = time * 0.025;
  ambientDust.rotation.x = Math.sin(time * 0.08) * 0.035;

  // 1. CUSTOMER AVATARS & KEYWORD POPUP LIFECYCLE
  const destX = pinGroup.position.x;
  const destY = pinGroup.position.y + 0.6;

  customerAvatars.forEach((c) => {
    c.progress += c.speed;
    if (c.progress >= 1.0) {
      c.progress = 0;
      c.angle = Math.random() * Math.PI * 2;
      c.dist = 18.0 + Math.random() * 8.0;
      c.startY = (Math.random() - 0.5) * 12.0 - 0.5;
    }

    const curDist = (1.0 - c.progress) * c.dist + 0.4;
    const curAngle = c.angle + c.progress * 0.8;
    const curX = destX + Math.cos(curAngle) * curDist;
    const curY = (1.0 - c.progress) * c.startY + c.progress * destY + Math.sin(time * 1.5 + c.floatOffset) * 0.2;
    const curZ = Math.sin(curAngle) * curDist * 0.35 - 1.0;

    c.avatarSprite.position.set(curX, curY, curZ);

    let avatarAlpha = 1.0;
    if (c.progress < 0.15) {
      avatarAlpha = c.progress / 0.15;
    } else if (c.progress > 0.92) {
      avatarAlpha = (1.0 - c.progress) / 0.08;
      if (c.progress >= 0.94 && c.progress < 0.94 + c.speed * 1.5 && heroElementsOpacity > 0.8) {
        triggerStorefrontPurchaseBurst(c.avatarSprite.position);
      }
    }
    c.avatarSprite.material.opacity = Math.max(0, Math.min(1, avatarAlpha * 0.9)) * heroElementsOpacity;

    if (c.hasKeyword && c.keywordSprite) {
      c.keywordSprite.position.set(curX, curY + 0.75, curZ + 0.2);

      let keyAlpha = 0;
      let keyScale = 1.0;

      if (c.progress < 0.25) {
        const t = c.progress / 0.25;
        keyAlpha = t;
        keyScale = 0.5 + t * 0.5;
      } else if (c.progress >= 0.25 && c.progress <= 0.60) {
        keyAlpha = 0.95;
        keyScale = 1.0;
      } else if (c.progress > 0.60 && c.progress <= 0.85) {
        const t = (c.progress - 0.60) / 0.25;
        keyAlpha = (1.0 - t) * 0.95;
        keyScale = 1.0 - t * 0.6;
      } else {
        keyAlpha = 0;
      }

      c.keywordSprite.material.opacity = Math.max(0, keyAlpha) * heroElementsOpacity;
      c.keywordSprite.scale.set(3.4 * keyScale, 0.85 * keyScale, 1);
    }
  });

  // 2. FLOATING WALK-IN PURCHASE BADGES
  for (let i = activePurchaseBadges.length - 1; i >= 0; i--) {
    const b = activePurchaseBadges[i];
    b.progress += b.speed;
    b.sprite.position.y = b.baseY + b.progress * 6.5;
    b.sprite.position.x = b.baseX + Math.sin(time * 1.4 + b.driftAngle) * 0.25;

    let pAlpha = b.progress < 0.15 ? (b.progress / 0.15) : (b.progress > 0.75 ? (1.0 - b.progress) / 0.25 : 1.0);
    b.sprite.material.opacity = Math.max(0, pAlpha) * heroElementsOpacity;

    if (b.progress >= 1.0) {
      floatingPurchasesGroup.remove(b.sprite);
      activePurchaseBadges.splice(i, 1);
    }
  }


  // 5 Extruded Golden Stars Orbiting Pin + Comet Light Trails
  const orbitR = 5.4;
  starMeshes.forEach((star, idx) => {
    const angle = time * 1.0 + (idx * (Math.PI * 2 / 5));
    const sx = Math.cos(angle) * orbitR;
    const sz = Math.sin(angle) * orbitR;
    const sy = Math.sin(time * 1.8 + idx) * 0.6;

    star.position.set(sx, sy, sz);
    star.rotation.y = time * 1.4;
    star.rotation.z = Math.sin(time + idx) * 0.4;

    const trail = starTrails[idx];
    trail.history.unshift({ x: sx, y: sy, z: sz });
    if (trail.history.length > TRAIL_LENGTH) trail.history.pop();

    const posArray = trail.points.geometry.attributes.position.array;
    for (let j = 0; j < TRAIL_LENGTH; j++) {
      if (j < trail.history.length) {
        posArray[j * 3] = trail.history[j].x;
        posArray[j * 3 + 1] = trail.history[j].y;
        posArray[j * 3 + 2] = trail.history[j].z;
      }
    }
    trail.points.geometry.attributes.position.needsUpdate = true;
  });

  halo1.rotation.z = time * 0.15;
  halo2.rotation.y = -time * 0.2;

  renderer.render(scene, camera);
}

// Start immediately
animate();
triggerSeamlessIntro();
