// ====== DOM Ready ======
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  loadFeatures();
  loadStats();
  loadTeam();
  initContactForm();
  initScrollAnimations();
});

// ====== Navbar Scroll Effect ======
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ====== Mobile Menu ======
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('active'));
  });
}

// ====== Load Features ======
async function loadFeatures() {
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;

  try {
    const res = await fetch('/api/features');
    const json = await res.json();
    if (!json.success) return;

    grid.innerHTML = json.data.map((f, i) => `
      <div class="feature-card" style="transition-delay: ${i * 80}ms">
        <span class="feature-icon">${f.icon}</span>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>
    `).join('');
  } catch (e) {
    console.error('Failed to load features:', e);
  }
}

// ====== Load Stats ======
async function loadStats() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;

  try {
    const res = await fetch('/api/stats');
    const json = await res.json();
    if (!json.success) return;

    grid.innerHTML = json.data.map((s, i) => `
      <div class="stat-card" style="transition-delay: ${i * 100}ms">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  } catch (e) {
    console.error('Failed to load stats:', e);
  }
}

// ====== Load Team ======
async function loadTeam() {
  const grid = document.getElementById('teamGrid');
  if (!grid) return;

  try {
    const res = await fetch('/api/team');
    const json = await res.json();
    if (!json.success) return;

    grid.innerHTML = json.data.map((t, i) => `
      <div class="team-card" style="transition-delay: ${i * 100}ms">
        <span class="team-avatar">${t.avatar}</span>
        <h3>${t.name}</h3>
        <div class="team-role">${t.role}</div>
        <p class="team-bio">${t.bio}</p>
      </div>
    `).join('');
  } catch (e) {
    console.error('Failed to load team:', e);
  }
}

// ====== Contact Form ======
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '提交中...';

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (json.success) {
        status.className = 'form-status success';
        status.textContent = json.message;
        form.reset();
      } else {
        status.className = 'form-status error';
        status.textContent = json.message || '提交失败，请重试';
      }
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = '网络错误，请稍后重试';
    }
  });
}

// ====== Scroll Animations (Intersection Observer) ======
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Observe cards after a short delay to allow API data to render
  setTimeout(() => {
    document.querySelectorAll('.feature-card, .stat-card, .team-card').forEach(el => {
      observer.observe(el);
    });
  }, 500);
}
