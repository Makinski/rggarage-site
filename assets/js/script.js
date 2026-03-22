const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
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
