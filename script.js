// ═══════════════════════════════════════════════
// SAJAY WEDS AMRUSHA — script.js  "Dusk Bloom"
// ═══════════════════════════════════════════════

// ── LOADER ──────────────────────────────────────
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => {
      loader.style.display = "none";
      revealHero();
    }, 900);
  }, 4000);
});

function revealHero() {
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("active"), i * 260);
  });
}

// ── PARALLAX ────────────────────────────────────
function handleParallax() {
  const scrollY = window.scrollY;
  document.querySelectorAll(".parallax-layer").forEach(layer => {
    const speed = parseFloat(layer.dataset.speed || 0.2);
    layer.style.transform = `translateY(${scrollY * speed}px)`;
  });
  // Hero text subtle upward parallax
  const heroText = document.getElementById("p-text");
  if (heroText) {
    const speed = parseFloat(heroText.dataset.speed || 0.4);
    heroText.style.transform = `translateY(${scrollY * speed}px)`;
  }
}
window.addEventListener("scroll", handleParallax, { passive: true });

// ── COUNTDOWN ───────────────────────────────────
const weddingDate = new Date("April 29, 2026 07:30:00").getTime();

function pad(n) { return String(n).padStart(2, "0"); }

function updateCountdown() {
  const diff = weddingDate - Date.now();
  if (diff <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    return;
  }
  document.getElementById("days").textContent    = pad(Math.floor(diff / 86400000));
  document.getElementById("hours").textContent   = pad(Math.floor((diff % 86400000) / 3600000));
  document.getElementById("minutes").textContent = pad(Math.floor((diff % 3600000) / 60000));
  document.getElementById("seconds").textContent = pad(Math.floor((diff % 60000) / 1000));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── SCROLL REVEAL ────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ── GALLERY ──────────────────────────────────────
let gCurrent = 0;
const gSlides = document.querySelectorAll(".gallery-slide");
const gDots   = document.querySelectorAll(".gdot");

function gGoTo(n) {
  gSlides[gCurrent].classList.remove("active");
  gDots[gCurrent].classList.remove("active");
  gCurrent = (n + gSlides.length) % gSlides.length;
  gSlides[gCurrent].classList.add("active");
  gDots[gCurrent].classList.add("active");
}

let gTimer = setInterval(() => gGoTo(gCurrent + 1), 4500);

document.getElementById("galleryNext")?.addEventListener("click", () => {
  clearInterval(gTimer);
  gGoTo(gCurrent + 1);
  gTimer = setInterval(() => gGoTo(gCurrent + 1), 4500);
});
document.getElementById("galleryPrev")?.addEventListener("click", () => {
  clearInterval(gTimer);
  gGoTo(gCurrent - 1);
  gTimer = setInterval(() => gGoTo(gCurrent + 1), 4500);
});
gDots.forEach(dot => {
  dot.addEventListener("click", () => {
    clearInterval(gTimer);
    gGoTo(parseInt(dot.dataset.index));
    gTimer = setInterval(() => gGoTo(gCurrent + 1), 4500);
  });
});

// ── FALLING PETALS (Canvas) ──────────────────────
const canvas = document.getElementById("petals");
const ctx    = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas, { passive: true });

const PETAL_COLORS = [
  "rgba(232,180,160,0.72)",
  "rgba(200,148,90,0.6)",
  "rgba(240,192,112,0.55)",
  "rgba(224,160,120,0.65)",
  "rgba(245,237,224,0.5)",
];

const NUM_PETALS = 28;
const petals = [];

for (let i = 0; i < NUM_PETALS; i++) {
  petals.push({
    x:      Math.random() * window.innerWidth,
    y:      Math.random() * -window.innerHeight,
    size:   6 + Math.random() * 12,
    speedY: 0.5 + Math.random() * 1.2,
    speedX: (Math.random() - 0.5) * 0.6,
    rot:    Math.random() * Math.PI * 2,
    rotV:   (Math.random() - 0.5) * 0.025,
    sway:   Math.random() * Math.PI * 2,
    swayS:  0.008 + Math.random() * 0.012,
    color:  PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    opacity: 0.4 + Math.random() * 0.6,
  });
}

function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  // Simple petal shape: two bezier curves
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo( p.size, -p.size * 0.5,  p.size * 1.2,  p.size * 0.8, 0, p.size * 1.4);
  ctx.bezierCurveTo(-p.size * 1.2, p.size * 0.8, -p.size, -p.size * 0.5, 0, 0);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    p.sway += p.swayS;
    p.x    += p.speedX + Math.sin(p.sway) * 0.5;
    p.y    += p.speedY;
    p.rot  += p.rotV;

    if (p.y > canvas.height + 30) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }
    drawPetal(p);
  });
  requestAnimationFrame(animatePetals);
}
animatePetals();

// ── MUSIC ─────────────────────────────────────────
const music     = document.getElementById("bg-music");
const musicBtn  = document.getElementById("music-btn");
const iconPlay  = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");

function syncMusicIcon() {
  iconPlay.style.display  = music.paused ? "block" : "none";
  iconPause.style.display = music.paused ? "none"  : "block";
}

window.addEventListener("load", () => {
  music.play().then(syncMusicIcon).catch(() => {
    syncMusicIcon();
    const go = () => { music.play().then(syncMusicIcon); document.removeEventListener("click", go); };
    document.addEventListener("click", go);
  });
});

musicBtn.addEventListener("click", e => {
  e.stopPropagation();
  music.paused ? music.play().then(syncMusicIcon) : (music.pause(), syncMusicIcon());
});
