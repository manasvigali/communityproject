// InvestEd — Interactive JavaScript Engine
(function() {
  'use strict';

  // ─── Utility helpers ────────────────────────────
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  // ─── Year Update ────────────────────────────────
  ['year'].forEach(function(id) { var el = document.getElementById(id); if (el) el.textContent = new Date().getFullYear(); });

  // ─── Mobile Nav Toggle ──────────────────────────
  (function() {
    var menuBtn = $('.menu-btn');
    var mainNav = $('#main-nav');
    if (!menuBtn || !mainNav) return;

    menuBtn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('show', !expanded);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('show')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('show');
      }
    });

    $all('#main-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('show');
      });
    });
  })();

  // ─── Scroll Animations (Intersection Observer) ──
  (function() {
    if (!('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    $all('.fade-up').forEach(function(el) { observer.observe(el); });
  })();

  // ─── Animated Stat Counters ─────────────────────
  (function() {
    var counters = $all('.stat-number[data-target]');
    if (!counters.length) return;

    function animateCounter(el, target, duration) {
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var target = parseInt(entry.target.dataset.target, 10);
          animateCounter(entry.target, target, 2000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(c) { observer.observe(c); });
  })();

  // ─── Quiz Engine ────────────────────────────────
  (function() {
    if (!window.quizData) return;

    var currentTier = 'beginner';
    var questions = [];
    var answers = {};
    var timerInterval = null;
    var seconds = 0;
    var quizStarted = false;

    // ── Timer ──
    function startTimer() {
      if (quizStarted) return;
      quizStarted = true;
      seconds = 0;
      timerInterval = setInterval(function() {
        seconds++;
        var m = Math.floor(seconds / 60).toString().padStart(2, '0');
        var s = (seconds % 60).toString().padStart(2, '0');
        var display = $('#timer-display');
        if (display) display.textContent = m + ':' + s;
      }, 1000);
    }

    function stopTimer() { clearInterval(timerInterval); timerInterval = null; }

    // ── Tabs ──
    function initTabs() {
      $all('.quiz-tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          $all('.quiz-tab-btn').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          currentTier = btn.dataset.tier;
          renderQuestions();
        });
      });
    }

    // ── Render Questions ──
    function renderQuestions() {
      questions = window.quizData[currentTier] || [];
      answers = {};
      var container = $('#quiz-container');
      if (!container) return;
      container.innerHTML = '';

      if (!questions.length) { container.innerHTML = '<p>No questions available for this tier yet.</p>'; return; }

      // Update progress bar
      var progressBar = $('#quiz-progress-bar');
      if (progressBar) progressBar.style.width = '0%';

      questions.forEach(function(q, i) {
        var qDiv = document.createElement('div');
        qDiv.className = 'quiz-question fade-up';
        qDiv.id = 'question-' + i;
        qDiv.innerHTML = '<h3><span class="q-number">Q' + (i + 1) + '.</span> ' + q.q + '</h3>';

        var optDiv = document.createElement('div');
        optDiv.className = 'q-options';

        var letters = ['A', 'B', 'C', 'D'];
        q.options.forEach(function(opt, j) {
          var label = letters[j] + ') ';
          var optEl = document.createElement('div');
          optEl.className = 'q-option';
          optEl.dataset.index = j;
          optEl.innerHTML = label + opt;
          optEl.addEventListener('click', (function(idx, qi) { return function() { handleAnswer(idx, qi); }; })(j, i));
          optDiv.appendChild(optEl);
        });

        qDiv.appendChild(optDiv);
        container.appendChild(qDiv);
      });

      // Re-init scroll observers for new elements
      $all('.quiz-question.fade-up').forEach(function(el) {
        if ('IntersectionObserver' in window) {
          var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1 });
          obs.observe(el);
        }
      });

      // Show result hidden initially
      var resultBox = $('#quiz-result');
      if (resultBox) resultBox.hidden = true;
    }

    function handleAnswer(optionIdx, questionIdx) {
      var q = questions[questionIdx];
      if (!q) return;

      // If already answered, ignore
      if (answers[questionIdx] !== undefined) return;
      answers[questionIdx] = optionIdx;

      var qEl = $('#question-' + questionIdx);
      if (!qEl) return;
      startTimer();

      $all('.q-option', qEl).forEach(function(opt, i) {
        opt.style.pointerEvents = 'none';
        if (i === q.correct) opt.classList.add('correct');
        if (i === optionIdx && i !== q.correct) opt.classList.add('wrong');
      });

      // Show explanation
      var existingExp = qEl.querySelector('.q-explanation');
      if (existingExp) existingExp.remove();

      var expDiv = document.createElement('div');
      expDiv.className = 'q-explanation';
      var isCorrect = optionIdx === q.correct;
      expDiv.innerHTML = '<strong>' + (isCorrect ? '✅ Correct!' : '❌ Not quite.') + '</strong> ' + q.explanation;
      qEl.appendChild(expDiv);

      // Update progress bar
      var answered = Object.keys(answers).length;
      var total = questions.length;
      var pct = (answered / total) * 100;
      var progressBar = $('#quiz-progress-bar');
      if (progressBar) progressBar.style.width = pct + '%';

      // Show results when all answered
      if (answered === total) showResults();
    }

    function showResults() {
      stopTimer();
      var correct = 0;
      questions.forEach(function(q, i) { if (answers[i] === q.correct) correct++; });

      var pct = Math.round((correct / questions.length) * 100);
      var grade, gradeClass;
      if (pct >= 90) { grade = 'Excellent!'; gradeClass = 'excellent'; }
      else if (pct >= 70) { grade = 'Good job!'; gradeClass = 'good'; }
      else if (pct >= 50) { grade = 'Keep learning!'; gradeClass = 'fair'; }
      else { grade = 'Review the lessons!'; gradeClass = 'poor'; }

      var m = Math.floor(seconds / 60);
      var s = seconds % 60;

      var resultBox = $('#quiz-result');
      if (!resultBox) return;
      resultBox.hidden = false;
      resultBox.innerHTML = '<div class="quiz-score-circle">' + pct + '%</div>' +
        '<p class="quiz-grade ' + gradeClass + '">' + grade + '</p>' +
        '<p>Got <strong>' + correct + ' out of ' + questions.length + '</strong> correct in ' + m + 'm' + s + 's</p>' +
        '<p style="color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem;">Tier: <strong>' + currentTier.charAt(0).toUpperCase() + currentTier.slice(1) + '</strong></p>';

      // Scroll to results
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function restartQuiz() {
      stopTimer();
      quizStarted = false;
      seconds = 0;
      var timerEl = $('#timer-display');
      if (timerEl) timerEl.textContent = '00:00';
      var resultBox = $('#quiz-result');
      if (resultBox) resultBox.hidden = true;
      renderQuestions();
    }

    function init() {
      initTabs();
      var restartBtn = $('#restart-quiz') || $('#restart');
      if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
      renderQuestions();
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

  // ─── FAQ Search/Filter ──────────────────────────
  (function() {
    var searchInput = $('#faq-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
      var term = this.value.toLowerCase().trim();
      var items = $all('details.faq-item');

      if (!term) {
        items.forEach(function(item) { item.style.display = ''; });
        // Show all category headings
        $all('.faq-category h2').forEach(function(h) { h.style.display = ''; });
        return;
      }

      var visibleCount = 0;
      items.forEach(function(item) {
        var summary = item.querySelector('summary');
        var text = (summary ? summary.textContent : '') + ' ' + (item.querySelector('.faq-answer') ? item.querySelector('.faq-answer').textContent : '');
        if (text.toLowerCase().includes(term)) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      // Hide empty category headings
      var prevHeading = null;
      items.forEach(function(item) {
        if (item.style.display !== 'none') {
          var heading = item.previousElementSibling;
          if (heading && heading.tagName === 'H2' && heading !== prevHeading) {
            heading.style.display = '';
            prevHeading = heading;
          }
        }
      });
    });
  })();

  // ─── Investment Ideas Filter ────────────────────
  (function() {
    var filterBtns = $all('.filter-btn');
    var sections = $all('.ideas-section');
    if (!filterBtns.length) return;

    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        $all('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.dataset.filter;
        sections.forEach(function(section) {
          if (filter === 'all' || section.dataset.budget === filter) {
            section.style.display = '';
          } else {
            section.style.display = 'none';
          }
        });
      });
    });
  })();

  // ─── Compound Interest Calculator ───────────────
  window.calculateCompound = function() {
    var principal = parseFloat($('#calc-principal').value) || 0;
    var monthly = parseFloat($('#calc-monthly').value) || 0;
    var rate = parseFloat($('#calc-rate').value) || 0;
    var years = parseInt($('#calc-years').value) || 1;

    var r = rate / 100 / 12; // monthly rate
    var n = years * 12;      // total months

    // Compound interest formula: A = P(1+r)^n + PMT * [((1+r)^n - 1) / r]
    var futureValue;
    if (r === 0) {
      futureValue = principal + monthly * n;
    } else {
      futureValue = principal * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r);
    }

    var totalInvested = principal + monthly * n;
    var earnings = futureValue - totalInvested;

    var fmt = function(n) { return '$' + Math.round(n).toLocaleString(); };

    var investedEl = $('#calc-total-invested');
    var valueEl = $('#calc-total-value');
    var earnEl = $('#calc-earnings');
    var resultEl = $('#calc-result');

    if (investedEl) investedEl.textContent = fmt(totalInvested);
    if (valueEl) valueEl.textContent = fmt(futureValue);
    if (earnEl) earnEl.textContent = fmt(earnings);
    if (resultEl) resultEl.classList.remove('hidden');
  };

  // ─── Checklist LocalStorage Persistence ─────────
  (function() {
    var checkboxes = $all('.checklist input[type="checkbox"]');
    if (!checkboxes.length) return;

    checkboxes.forEach(function(cb) {
      // Restore saved state
      var saved = localStorage.getItem('inedited-' + cb.id);
      if (saved === 'true') cb.checked = true;

      cb.addEventListener('change', function() {
        localStorage.setItem('inedited-' + cb.id, String(cb.checked));
      });
    });
  })();

})();
