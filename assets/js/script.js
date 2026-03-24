const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  const closeNav = () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });
}

const mainGalleryImage = document.querySelector('#main-gallery-image');
const galleryThumbs = document.querySelectorAll('.thumb');
const galleryPrev = document.querySelector('.gallery-arrow-prev');
const galleryNext = document.querySelector('.gallery-arrow-next');

if (mainGalleryImage && galleryThumbs.length) {
  const thumbs = Array.from(galleryThumbs);

  const setActiveThumb = (nextIndex) => {
    const normalizedIndex = (nextIndex + thumbs.length) % thumbs.length;
    const nextThumb = thumbs[normalizedIndex];

    thumbs.forEach((item) => item.classList.remove('is-active'));
    nextThumb.classList.add('is-active');
    mainGalleryImage.src = nextThumb.dataset.galleryImage;
    mainGalleryImage.alt = nextThumb.dataset.galleryAlt;
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      setActiveThumb(index);
    });
  });

  if (galleryPrev) {
    galleryPrev.addEventListener('click', () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains('is-active'));
      setActiveThumb(activeIndex - 1);
    });
  }

  if (galleryNext) {
    galleryNext.addEventListener('click', () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains('is-active'));
      setActiveThumb(activeIndex + 1);
    });
  }
}
