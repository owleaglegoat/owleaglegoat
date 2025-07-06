// Typed text effect
const typedText = document.getElementById("typed-text");
const words = [
  "Data Development Engineer",
  "Full-Stack Developer",
  "AI Enthusiast",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const displayed = currentWord.substring(0, charIndex);
  typedText.textContent = displayed;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const delay = isDeleting ? 60 : 100;
  setTimeout(type, delay);
}

document.addEventListener("DOMContentLoaded", () => {
  type();

  // Smooth scrolling for nav links
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Scroll reveal
  const sections = document.querySelectorAll(".section");
  const reveal = () => {
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.8) {
        sec.classList.add("visible");
      }
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();

  // Project filtering
  const buttons = document.querySelectorAll(".filters button");
  const cards = document.querySelectorAll(".project-card");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      cards.forEach((card) => {
        const categories = card.getAttribute("data-category");
        card.style.display =
          filter === "all" || categories.includes(filter) ? "block" : "none";
      });
    });
  });

  // Theme toggle
  const toggle = document.getElementById("theme-toggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  });

  // Back to top button
  const topBtn = document.getElementById("top-btn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  });
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
