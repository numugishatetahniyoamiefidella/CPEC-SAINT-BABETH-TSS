
  // ── MOBILE NAV ──
  function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navLinks').classList.remove('open');
    });
  });

  // ── ACTIVE NAV ON SCROLL ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });

    // scroll top button
    const scrollBtn = document.getElementById('scrollTop');
    if (window.scrollY > 400) scrollBtn.classList.add('visible');
    else scrollBtn.classList.remove('visible');
  });

  // ── REVEAL ON SCROLL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── MODAL ──
  function openModal() {
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function closeModalOutside(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // ── DEPT CARD INFO ──
  function showDeptInfo(dept) {
    // small toast
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
      background:var(--royal); color:#fff; padding:12px 24px;
      border-radius:8px; font-size:14px; font-weight:600;
      border-left:4px solid var(--gold); z-index:3000;
      animation: toastIn 0.3s ease;
      white-space:nowrap;
    `;
    toast.textContent = '📚 ' + dept + ' — click Apply Now to enroll!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
  }

  // ── FORM VALIDATION ──
  function submitForm() {
    let valid = true;

    const fields = [
      { id: 'firstName', errId: 'firstNameErr', check: v => v.trim().length > 1 },
      { id: 'lastName',  errId: 'lastNameErr',  check: v => v.trim().length > 1 },
      { id: 'email',     errId: 'emailErr',     check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'message',   errId: 'messageErr',   check: v => v.trim().length > 5 },
    ];

    fields.forEach(({ id, errId, check }) => {
      const input = document.getElementById(id);
      const err   = document.getElementById(errId);
      if (!check(input.value)) {
        err.style.display = 'block';
        input.style.borderColor = 'var(--accent)';
        valid = false;
      } else {
        err.style.display = 'none';
        input.style.borderColor = '#6ee7b7';
      }
    });

    if (valid) {
      document.getElementById('formSuccess').style.display = 'block';
      ['firstName','lastName','email','message'].forEach(id => {
        document.getElementById(id).value = '';
        document.getElementById(id).style.borderColor = '#e0d8cc';
      });
      document.getElementById('program').value = '';
    }
  }
