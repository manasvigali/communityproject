<section class="hero">
  <div class="container">
    <figure class="hero-figure" aria-hidden="false">
      <picture>
        <!-- WebP large -->
        <source type="image/webp" media="(min-width:1200px)" srcset="{{ site.baseurl }}/assets/images/hero-1920.webp 1920w, {{ site.baseurl }}/assets/images/hero-1280.webp 1280w">
        <!-- WebP medium -->
        <source type="image/webp" media="(min-width:768px)" srcset="{{ site.baseurl }}/assets/images/hero-1280.webp 1280w, {{ site.baseurl }}/assets/images/hero-768.webp 768w">
        <!-- Fallback JPG/PNG -->
        <img
          src="{{ site.baseurl }}/assets/images/hero-768.jpg"
          srcset="{{ site.baseurl }}/assets/images/hero-768.jpg 768w, {{ site.baseurl }}/assets/images/hero-1280.jpg 1280w, {{ site.baseurl }}/assets/images/hero-1920.jpg 1920w"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          alt="Three teenage students around a laptop looking at a colourful investment chart, smiling and discussing ideas"
          loading="lazy"
          decoding="async"
          style="width:100%;height:auto;display:block;"
        >
      </picture>

      <div class="hero-overlay" role="presentation" aria-hidden="true">
        <div class="hero-copy content-inner">
          <h1>Investing made clear for Cambridge ACE students</h1>
          <p class="lead">Practical lessons, quick simulations, and quizzes to help you learn investments, step-by-step — aligned to ACE thinking skills.</p>
          <p>
            <a class="btn primary" href="{{ site.baseurl }}/learning/">Start Learning</a>
            <a class="btn ghost" href="{{ site.baseurl }}/quiz/" style="margin-left:0.75rem">Try a Quiz</a>
          </p>
        </div>
      </div>
    </figure>
  </div>
</section>