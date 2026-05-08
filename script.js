/* ================================================
   NAVEEN P — Portfolio JS
================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── LOADER ── */
  var loader = document.getElementById('loader');

  setTimeout(function () {
    loader.style.transition = 'opacity 0.55s ease';
    loader.style.opacity = '0';
    setTimeout(function () {
      loader.style.display = 'none';
      revealHero();
    }, 580);
  }, 1100);

  /* ── HERO REVEAL ── */
  function revealHero() {
    var items = [
      { sel: '.hero-badge',   delay: 0   },
      { sel: '.hero-name',    delay: 140 },
      { sel: '.hero-role',    delay: 240 },
      { sel: '.hero-desc',    delay: 330 },
      { sel: '.hero-actions', delay: 420 },
      { sel: '.hero-scroll',  delay: 580 }
    ];

    items.forEach(function (item) {
      var el = document.querySelector(item.sel);
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
      setTimeout(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, item.delay);
    });
  }

  /* ── CURSOR ── */
  var dot  = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .project-card, .skill-card, .edu-card, .stat-row').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      dot.classList.add('big');
      ring.classList.add('big');
    });
    el.addEventListener('mouseleave', function () {
      dot.classList.remove('big');
      ring.classList.remove('big');
    });
  });

  /* ── NAV ── */
  var nav = document.querySelector('nav');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    highlightNav();
  }, { passive: true });

  function highlightNav() {
    var links = document.querySelectorAll('.nav-center a');
    var secs  = document.querySelectorAll('section[id]');
    var cur   = '';
    secs.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 200) cur = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
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
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    var sibs = el.parentElement.querySelectorAll('.reveal');
    if (sibs.length > 1) {
      el.style.transitionDelay = (Array.from(sibs).indexOf(el) * 90) + 'ms';
    }
    io.observe(el);
  });

  /* ── STAGGER CARDS ── */
  function staggerItems(selector, ioOptions) {
    var items = document.querySelectorAll(selector);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = Array.from(items).indexOf(entry.target);
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, idx * 90);
          obs.unobserve(entry.target);
        }
      });
    }, ioOptions || { threshold: 0.1 });

    items.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
      obs.observe(el);
    });
  }

  staggerItems('.project-card');
  staggerItems('.skill-card');
  staggerItems('.exp-item');
  staggerItems('.edu-card');

  /* ── COUNTER ── */
  function countUp(el, to, suffix) {
    var start = null;
    var dur = 1200;
    suffix = suffix || '';
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

  /* ── FOOTER YEAR ── */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

});