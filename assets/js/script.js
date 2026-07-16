name=assets/js/script.js
// script.js
(function(){
  // small helpers
  const id = (s) => document.getElementById(s);
  const yearEls = ['year','year2','year3','year4'];
  yearEls.forEach(y=>{const el = id(y); if(el) el.textContent = new Date().getFullYear();});

  // Menu toggle
  const menuBtn = document.querySelector('.menu-btn');
  const mainNav = document.getElementById('main-nav');
  if(menuBtn && mainNav){
    menuBtn.addEventListener('click', ()=>{
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('show');
    });
  }

  // Quiz logic
  const quizContainer = id('quiz-container');
  const quizResult = id('quiz-result');
  const restartBtn = id('restart');

  const questions = [
    {
      q: 'What does diversification mean?',
      options: ['Putting all money in one company','Spreading investments across different assets','Hiding money in different places','Buying and selling every day'],
      a: 1,
      tip: 'Diversification reduces the impact of any single investment underperforming.'
    },
    {
      q: 'Which investment typically has the highest potential return over the long term?',
      options: ['Savings account','Government bonds','Stocks','Cash under the mattress'],
      a: 2,
      tip: 'Stocks are generally higher risk but higher potential returns compared to cash or bonds over long horizons.'
    },
    {
      q: 'What is compound interest?',
      options: ['Interest paid once a year','Interest on original principal only','Interest earned on interest','A loan with no interest'],
      a: 2,
      tip: 'Compound interest means your interest earns interest too — which helps growth over time.'
    },
    {
      q: 'Why is time horizon important in investing?',
      options: ['It determines the colour of your stocks','Shorter horizons usually mean you should prefer lower-risk investments','It is only for tax purposes','It decides your account number'],
      a: 1,
      tip: 'If you need money soon, choose lower-risk options. For long-term goals you can usually accept more volatility.'
    }
  ];

  function renderQuiz(){
    if(!quizContainer) return;
    quizContainer.innerHTML = '';
    questions.forEach((item, idx)=>{
      const qEl = document.createElement('div');
      qEl.className = 'question';
      const h = document.createElement('h3'); h.textContent = (idx+1)+'. '+item.q; qEl.appendChild(h);
      const opts = document.createElement('div'); opts.className = 'options';
      item.options.forEach((opt, oi)=>{
        const b = document.createElement('button');
        b.className = 'option';
        b.type = 'button';
        b.setAttribute('data-q', idx);
        b.setAttribute('data-a', oi);
        b.textContent = opt;
        b.addEventListener('click', onAnswer);
        opts.appendChild(b);
      });
      qEl.appendChild(opts);
      quizContainer.appendChild(qEl);
    });
    if(quizResult){quizResult.hidden = true; quizResult.innerHTML = '';}
  }

  function onAnswer(e){
    const btn = e.currentTarget;
    const q = Number(btn.getAttribute('data-q'));
    const a = Number(btn.getAttribute('data-a'));
    const item = questions[q];
    const parent = btn.parentElement;

    // disable all options for that question
    Array.from(parent.children).forEach(ch => ch.disabled = true);

    if(a === item.a){
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      // highlight correct
      const correctBtn = parent.querySelector('[data-a="'+item.a+'"]');
      if(correctBtn) correctBtn.classList.add('correct');
    }

    // show tip
    if(quizResult){
      quizResult.hidden = false;
      const tip = document.createElement('div');
      tip.className = 'quiz-result';
      tip.innerHTML = `<strong>Tip:</strong> ${item.tip}`;
      // append and keep previous tips
      quizResult.appendChild(tip);
    }
  }

  if(quizContainer) renderQuiz();
  if(restartBtn){ restartBtn.addEventListener('click', ()=>{ renderQuiz(); if(quizResult){quizResult.innerHTML=''; quizResult.hidden=true;} }); }

})();