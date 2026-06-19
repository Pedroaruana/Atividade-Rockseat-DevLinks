// Typing effect for terminal lines
function typeText(element, text, speed, onDone) {
  element.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (onDone) onDone();
    }
  }, speed);
}

function runTerminal() {
  const lines = document.querySelectorAll(".terminal-body .line.output");
  if (!lines.length) return;

  const texts = ["Pedro Aruanã — Frontend Developer", "Disponível para projetos"];

  typeText(lines[0], texts[0], 40, () => {
    setTimeout(() => {
      typeText(lines[1], texts[1], 50);
    }, 300);
  });
}

// Copy e-mail to clipboard + toast
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function setupEmailCopy() {
  const emailCard = document.querySelector(".link-email");
  if (!emailCard) return;

  emailCard.addEventListener("click", (e) => {
    const email = "aruanapedro@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast("✓ E-mail copiado para a área de transferência");
    }).catch(() => {
      showToast("aruanapedro@gmail.com");
    });
  });
}

// Ripple effect on all link cards
function setupRipple() {
  document.querySelectorAll(".link-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
      card.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

// Scroll-based fade-in for project cards
function setupScrollReveal() {
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${idx * 60}ms`;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(12px)";
    card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    observer.observe(card);
  });

  document.addEventListener("animationend", () => {}, { once: true });
}

function addVisibleStyle() {
  const style = document.createElement("style");
  style.textContent = ".project-card.visible { opacity: 1 !important; transform: translateY(0) !important; }";
  document.head.appendChild(style);
}

// Theme toggle
function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");

  btn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  addVisibleStyle();
  setupThemeToggle();
  runTerminal();
  setupEmailCopy();
  setupRipple();
  setupScrollReveal();
});
