// Typed text animation
const typedText = document.getElementById('typed-text');
const words = ['Data Development Engineer', 'Full-Stack Developer', 'AI Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = words[wordIndex];
  typedText.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
  } else if (deleting && charIndex > 0) {
    charIndex--;
  } else if (!deleting && charIndex === current.length) {
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }
  const delay = deleting ? 60 : 120;
  setTimeout(type, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  type();

  // Smooth scrolling
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
    });
  });

  // Scroll reveal
  const sections = document.querySelectorAll('.section');
  const reveal = () => {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.8) {
        sec.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', reveal);
  reveal();

  // Project filters
  const buttons = document.querySelectorAll('.filters button');
  const cards = document.querySelectorAll('.project-card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const categories = card.dataset.category;
        card.style.display = filter === 'all' || categories.includes(filter) ? 'block' : 'none';
      });
    });
  });

  // Theme toggler
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });
});
