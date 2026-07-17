---
layout: default
title: Home — InvestEd
permalink: /
---

<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <h1><span class="gradient-text">Investing for the Next Generation</span></h1>
      <p class="lead">Understand the basics of investing, manage risk, and build real financial confidence — designed specifically for Cambridge ACE/A-Level teenagers and young students.</p>
      <div class="btn-group">
        <a class="btn primary" href="{{ site.baseurl }}/learning/">
          <span>&#9733;</span> Start Learning
        </a>
        <a class="btn ghost" href="{{ site.baseurl }}/quiz/">
          <span>&#9654;</span> Take the Quiz
        </a>
      </div>
    </div>

    <!-- Stats Strip -->
    <div class="stats-strip">
      <div class="stat-item fade-up">
        <span class="stat-number" data-target="30" data-suffix="+">0</span>
        <span class="stat-label">Topics</span>
      </div>
      <div class="stat-item fade-up">
        <span class="stat-number" data-target="20" data-suffix="">0</span>
        <span class="stat-label">Quiz Questions</span>
      </div>
      <div class="stat-item fade-up">
        <span class="stat-number" data-target="3" data-suffix="">0</span>
        <span class="stat-label">Investment Plans</span>
      </div>
      <div class="stat-item fade-up">
        <span class="stat-number" data-target="12" data-suffix="+">0</span>
        <span class="stat-label">Ideas</span>
      </div>
    </div>
  </div>
</section>

<!-- Features Grid -->
<section class="features-section container">
  <h2 class="section-title">Everything You Need to Start Investing</h2>
  <p class="section-subtitle">From zero knowledge to your first investment — structured lessons, interactive practice, and real-world ideas for every budget.</p>

  <div class="features-grid">
    <a href="{{ site.baseurl }}/learning/" class="feature-card fade-up" style="text-decoration:none;color:inherit;">
      <span class="feature-icon">&#128218;</span>
      <h3>Structured Lessons</h3>
      <p>3 comprehensive modules from investment basics to market analysis — aligned with ACE math and business curriculum.</p>
    </a>

    <a href="{% link plans.md %}" class="feature-card fade-up" style="text-decoration:none;color:inherit;">
      <span class="feature-icon">&#128200;</span>
      <h3>Investment Roadmaps</h3>
      <p>Age-specific plans with step-by-step guidance. Start at 14 with $0, or scale up as your budget grows.</p>
    </a>

    <a href="{% link ideas.md %}" class="feature-card fade-up" style="text-decoration:none;color:inherit;">
      <span class="feature-icon">&#128161;</span>
      <h3>Ideas for Every Budget</h3>
      <p>12+ actionable investment ideas organized by budget tier — from free paper trading to building real portfolios.</p>
    </a>

    <a href="{{ site.baseurl }}/quiz/" class="feature-card fade-up" style="text-decoration:none;color:inherit;">
      <span class="feature-icon">&#9745;</span>
      <h3>Interactive Quiz</h3>
      <p>Test your knowledge with 20 questions across 3 difficulty levels. Get instant feedback and track your progress.</p>
    </a>

    <a href="{{ site.baseurl }}/faq/" class="feature-card fade-up" style="text-decoration:none;color:inherit;">
      <span class="feature-icon">&#128172;</span>
      <h3>FAQ & Guides</h3>
      <p>30+ answered questions about teen investing, apps, safety, and student-specific financial guidance.</p>
    </a>

    <a href="{% link about.md %}" class="feature-card fade-up" style="text-decoration:none;color:inherit;">
      <span class="feature-icon">&#127759;</span>
      <h3>Built for Students</h3>
      <p>Created specifically for Cambridge ACE students. Connects investing concepts to your school subjects and exams.</p>
    </a>
  </div>
</section>

<!-- CTA Section -->
<section class="content-page container text-center" style="padding-top:3rem;">
  <div style="background: var(--gradient-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 3rem; max-width: 700px; margin: 0 auto;">
    <h2 style="font-size:1.5rem; margin-bottom:0.5rem;">Ready to Start Your Journey?</h2>
    <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.95rem;">Pick your starting point and begin learning about investing today — it only takes $5/month to start building wealth.</p>
    <div class="btn-group" style="justify-content:center;">
      <a class="btn primary" href="{% link learning.md %}">Begin Learning</a>
      <a class="btn ghost" href="{% link ideas.md %}">Browse Ideas</a>
    </div>
  </div>
</section>
