const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navToggle = document.getElementById('navToggle');
const siteNav = document.querySelector('.site-nav');
const preloader = document.getElementById('preloader');
const filterButtons = document.querySelectorAll('.filter-button');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const sliderTrack = document.querySelector('.testimonial-track');
const sliderPrev = document.querySelector('.slider-control.prev');
const sliderNext = document.querySelector('.slider-control.next');
let currentSlide = 0;

const currentTheme = localStorage.getItem('magteezy-theme');
if (currentTheme === 'light') {
  body.classList.add('light');
  if (themeToggle) themeToggle.textContent = 'Dark';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');
    themeToggle.textContent = isLight ? 'Dark' : 'Light';
    localStorage.setItem('magteezy-theme', isLight ? 'light' : 'dark');
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
  });
}

window.addEventListener('click', (event) => {
  if (siteNav && siteNav.classList.contains('active') && !siteNav.contains(event.target) && event.target !== navToggle) {
    siteNav.classList.remove('active');
  }
});

window.addEventListener('load', () => {
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.remove();
    }, 300);
  }
});

if (filterButtons.length && portfolioCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.filter;
      portfolioCards.forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

if (sliderTrack && sliderPrev && sliderNext) {
  const slides = sliderTrack.querySelectorAll('.testimonial-card');
  const slideCount = slides.length;
  const updateSlider = () => {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}% )`;
  };

  sliderPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  });

  sliderNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  });
}

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
  link.addEventListener('click', () => {
    if (window.innerWidth < 760 && siteNav) {
      siteNav.classList.remove('active');
    }
  });
});

const heroVideo = document.getElementById('heroVideo');
const videoControls = document.querySelector('.video-controls');
const playPauseButton = document.querySelector('.play-pause');
const muteToggle = document.querySelector('.mute-toggle');
const fullscreenToggle = document.querySelector('.fullscreen-toggle');
const progressBar = document.querySelector('.progress-bar');

if (heroVideo) {
  const updateControls = () => {
    if (heroVideo.paused) {
      playPauseButton.textContent = '▶';
    } else {
      playPauseButton.textContent = '❚❚';
    }
  };

  const updateProgress = () => {
    const percent = heroVideo.duration ? (heroVideo.currentTime / heroVideo.duration) * 100 : 0;
    progressBar.value = percent;
  };

  heroVideo.addEventListener('play', updateControls);
  heroVideo.addEventListener('pause', updateControls);
  heroVideo.addEventListener('timeupdate', updateProgress);
  heroVideo.addEventListener('loadedmetadata', updateProgress);

  playPauseButton.addEventListener('click', () => {
    if (heroVideo.paused) {
      heroVideo.play();
    } else {
      heroVideo.pause();
    }
  });

  muteToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    muteToggle.textContent = heroVideo.muted ? '🔊' : '🔈';
  });

  fullscreenToggle.addEventListener('click', async () => {
    if (!document.fullscreenElement) {
      await heroVideo.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  });

  progressBar.addEventListener('input', () => {
    const time = (progressBar.value / 100) * heroVideo.duration;
    heroVideo.currentTime = time;
  });

  heroVideo.addEventListener('mouseenter', () => {
    videoControls.classList.remove('hidden');
  });

  heroVideo.addEventListener('mouseleave', () => {
    videoControls.classList.add('hidden');
  });

  heroVideo.addEventListener('click', () => {
    if (heroVideo.paused) {
      heroVideo.play();
    } else {
      heroVideo.pause();
    }
  });

  updateControls();
}
