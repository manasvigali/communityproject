// script.js
(function(){
  // small helpers
  const id = (s) => document.getElementById(s);
  const yearEls = ['year','year2','year3','year4'];
  yearEls.forEach(y=>{const el = id(y); if(el) el.textContent = new Date().getFullYear();});

(function () {
  'use strict';

  // DOM helpers
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  // Update footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle (works on desktop when resized)
  var menuBtn = $('.menu-btn');
  var mainNav = $('#main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('show', !expanded);
    });

    // close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        menuBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('show');
        menuBtn.focus();
      }
    });

    // close when nav link clicked (mobile)
    $all('#main-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('show');
      });
    });
  }

  // Accessible quiz logic (progressive enhancement)
  $all('.quiz').forEach(function (quiz) {
    quiz.addEventListener('click', function (e) {
      var option = e.target.closest('.option');
      if (!option) return;
      var q = option.closest('.question');
      if (!q) return;
      // If already answered, ignore
      if (q.dataset.answered === 'true') return;
      var correct = option.classList.contains('correct');
      // mark option states
      $all('.option', q).forEach(function (o) {
        o.setAttribute('aria-pressed', 'false');
        o.classList.remove('selected');
      });
      option.classList.add('selected');
      option.setAttribute('aria-pressed', 'true');

      // visual feedback
      if (correct) {
        option.classList.add('correct');
      } else {
        option.classList.add('wrong');
      }

      // mark answered
      q.dataset.answered = 'true';

    // show tip
    if(quizResult){
      quizResult.hidden = false;
      const tip = document.createElement('div');
      tip.className = 'quiz-result';
      tip.innerHTML = '<strong>Tip:</strong> ' + item.tip;
      // append and keep previous tips
      quizResult.appendChild(tip);
    }
  }

    // keyboard support for options
    quiz.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var option = e.target.closest('.option');
        if (option) {
          e.preventDefault();
          option.click();
        }
      }
    });
  });

  // Improve performance: lightly defer heavy tasks until idle (if supported)
  if ('requestIdleCallback' in window) {
    requestIdleCallback(function () {
      // placeholder: analytics init or non-essential work
    }, {timeout: 2000});
  }

})();
