document.addEventListener('DOMContentLoaded', function () {

  /* ── TYPED ROLE ── */
  var roles = ['Full-Stack Developer', 'Blockchain Engineer', 'Coding Mentor', 'Python Developer'];
  var ri = 0, ci = 0, deleting = false;
  var el = document.getElementById('typedRole');
  function type() {
    if (!el) return;
    var cur = roles[ri];
    if (!deleting) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  setTimeout(type, 500);

  /* ── NAV SCROLL ── */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    highlightNav();
  }, { passive: true });

  function highlightNav() {
    var links = document.querySelectorAll('.nav-link');
    var secs = document.querySelectorAll('section[id]');
    var cur = '';
    secs.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 200) cur = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  }

  /* ── HAMBURGER ── */
  var ham = document.getElementById('hamburger');
  var overlay = document.getElementById('mobileOverlay');
  var open = false;
  if (ham && overlay) {
    ham.addEventListener('click', function () {
      open = !open;
      overlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        open = false; overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── THEME TOGGLE ── */
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      document.documentElement.setAttribute('data-theme', isLight ? '' : 'light');
      themeBtn.textContent = isLight ? '☀️' : '🌙';
    });
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── SCROLL REVEAL ── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    var sibs = el.parentElement.querySelectorAll('.reveal');
    if (sibs.length > 1) {
      el.style.transitionDelay = (Array.from(sibs).indexOf(el) * 100) + 'ms';
    }
    io.observe(el);
  });

  /* ── SKILL BARS ── */
  var barIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bar = entry.target.querySelector('.sk-bar');
        if (bar) bar.style.width = bar.dataset.width + '%';
        barIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(function (c) { barIo.observe(c); });

  /* ── COUNTER ── */
  function countUp(el, to, suffix) {
    var start = null; var dur = 1400; suffix = suffix || '';
    (function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to % 1 ? (e * to).toFixed(1) : Math.floor(e * to)) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = to + suffix;
    })(performance.now());
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        countUp(el, parseFloat(el.dataset.count), el.dataset.suffix || '');
        cio.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ── CONTACT FORM ── */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✅ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(function () {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── FOOTER YEAR ── */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

});