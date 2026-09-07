(function () {
  var deck = document.body;
  if (!deck || !deck.classList.contains('lp-deck')) return;

  document.documentElement.classList.add('lp-deck');

  var dotsNav = document.querySelector('.lp-dots');
  var nextBtn = document.querySelector('.lp-next');

  function visibleSlides() {
    return Array.prototype.filter.call(document.querySelectorAll('.lp-slide'), function (el) {
      if (el.hasAttribute('hidden')) return false;
      var cs = window.getComputedStyle(el);
      return cs.display !== 'none' && cs.visibility !== 'hidden';
    });
  }

  function currentIndex() {
    var slides = visibleSlides();
    var y = window.scrollY + 8;
    var best = 0;
    slides.forEach(function (slide, i) {
      if (slide.offsetTop <= y + window.innerHeight * 0.3) best = i;
    });
    return best;
  }

  function goTo(index) {
    var slides = visibleSlides();
    if (!slides.length) return;
    var i = Math.max(0, Math.min(slides.length - 1, index));
    var inner = slides[i].querySelector('.lp-slide-inner');
    if (inner) inner.scrollTop = 0;
    slides[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function measureTabs() {
    var tabs = document.querySelector('.guia-tabs-wrap');
    if (!tabs) return;
    var h = Math.ceil(tabs.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--lp-tabs', h + 'px');
  }

  function canScroll(el, goingDown) {
    var node = el;
    while (node && node !== document.body && node !== document.documentElement) {
      var style = window.getComputedStyle(node);
      var oy = style.overflowY;
      if ((oy === 'auto' || oy === 'scroll') && node.scrollHeight > node.clientHeight + 2) {
        var atTop = node.scrollTop <= 1;
        var atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 2;
        if ((goingDown && !atBottom) || (!goingDown && !atTop)) return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  var wheelLock = false;
  window.addEventListener('wheel', function (e) {
    if (window.matchMedia('(max-width: 899px)').matches) return;
    if (e.ctrlKey || e.metaKey) return;
    var dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    if (Math.abs(dy) < 10) return;
    var goingDown = dy > 0;
    if (canScroll(e.target, goingDown)) return;
    e.preventDefault();
    if (wheelLock) return;
    wheelLock = true;
    goTo(currentIndex() + (goingDown ? 1 : -1));
    setTimeout(function () { wheelLock = false; }, 720);
  }, { passive: false, capture: true });

  function renderDots() {
    if (!dotsNav) return;
    var slides = visibleSlides();
    var idx = currentIndex();
    var y = window.scrollY;
    var inView = slides.some(function (s) {
      return Math.abs(s.offsetTop - y) < window.innerHeight * 0.45;
    });
    if (!inView && slides.length) {
      var next = slides.filter(function (s) { return s.offsetTop >= y - 4; })[0] || slides[slides.length - 1];
      next.scrollIntoView({ behavior: 'auto', block: 'start' });
      idx = slides.indexOf(next);
    }
    dotsNav.innerHTML = slides.map(function (slide, i) {
      var label = slide.getAttribute('data-slide') || ('Seção ' + (i + 1));
      return '<button class="lp-dot' + (i === idx ? ' is-active' : '') + '" type="button" data-i="' + i + '" aria-label="' + label + '"' + (i === idx ? ' aria-current="true"' : '') + '><span>' + label + '</span><i></i></button>';
    }).join('');
    if (nextBtn) nextBtn.hidden = idx >= slides.length - 1 || slides.length < 2;
  }

  function sync() {
    if (!dotsNav) return;
    var slides = visibleSlides();
    var idx = currentIndex();
    Array.prototype.forEach.call(dotsNav.querySelectorAll('.lp-dot'), function (btn, i) {
      var on = i === idx;
      btn.classList.toggle('is-active', on);
      if (on) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
    if (nextBtn) nextBtn.hidden = idx >= slides.length - 1 || slides.length < 2;
  }

  if (dotsNav) {
    dotsNav.addEventListener('click', function (e) {
      var btn = e.target.closest('.lp-dot');
      if (!btn) return;
      goTo(parseInt(btn.getAttribute('data-i'), 10));
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goTo(currentIndex() + 1);
    });
  }

  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.target.isContentEditable) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goTo(currentIndex() + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(currentIndex() - 1);
    } else if (e.key === ' ' && !/BUTTON|A/.test(tag)) {
      e.preventDefault();
      goTo(currentIndex() + (e.shiftKey ? -1 : 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(visibleSlides().length - 1);
    }
  });

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      sync();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', function () {
    measureTabs();
    renderDots();
  });

  measureTabs();
  requestAnimationFrame(measureTabs);
  renderDots();
  if (location.hash) {
    var target = document.querySelector(location.hash);
    if (target && target.classList.contains('lp-slide')) {
      requestAnimationFrame(function () {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        sync();
      });
    }
  }
  window.HubfiSlides = {
    refresh: function () {
      measureTabs();
      renderDots();
    },
    goTo: goTo,
    currentIndex: currentIndex
  };
})();
