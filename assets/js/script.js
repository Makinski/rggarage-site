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
  let activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains('is-active'));
  const isBulgarian = document.documentElement.lang.toLowerCase().startsWith('bg');
  const openImageLabel = isBulgarian ? 'Отвори снимката на цял екран' : 'Open full-screen image';
  const viewerDialogLabel = isBulgarian ? 'Преглед на снимки' : 'Image viewer';
  const closeViewerLabel = isBulgarian ? 'Затвори прегледа' : 'Close image viewer';
  const previousImageLabel = isBulgarian ? 'Предишна снимка' : 'Previous image';
  const nextImageLabel = isBulgarian ? 'Следваща снимка' : 'Next image';

  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const setActiveThumb = (nextIndex) => {
    const normalizedIndex = (nextIndex + thumbs.length) % thumbs.length;
    const nextThumb = thumbs[normalizedIndex];

    thumbs.forEach((item) => item.classList.remove('is-active'));
    nextThumb.classList.add('is-active');
    mainGalleryImage.src = nextThumb.dataset.galleryImage;
    mainGalleryImage.alt = nextThumb.dataset.galleryAlt;
    mainGalleryImage.setAttribute('aria-label', `${nextThumb.dataset.galleryAlt}. ${openImageLabel}`);
    activeIndex = normalizedIndex;

    if (lightboxImage && lightboxCounter && lightbox.classList.contains('is-open')) {
      syncLightbox();
    }
  };

  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label="${viewerDialogLabel}">
      <div class="gallery-lightbox-image-wrap">
        <button class="gallery-lightbox-close" type="button" aria-label="${closeViewerLabel}">&times;</button>
        <button class="gallery-lightbox-arrow gallery-lightbox-arrow-prev" type="button" aria-label="${previousImageLabel}">
          <span aria-hidden="true">&#8249;</span>
        </button>
        <img class="gallery-lightbox-image" src="" alt="">
        <button class="gallery-lightbox-arrow gallery-lightbox-arrow-next" type="button" aria-label="${nextImageLabel}">
          <span aria-hidden="true">&#8250;</span>
        </button>
      </div>
      <div class="gallery-lightbox-counter" aria-live="polite"></div>
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.gallery-lightbox-image');
  const lightboxCounter = lightbox.querySelector('.gallery-lightbox-counter');
  const lightboxClose = lightbox.querySelector('.gallery-lightbox-close');
  const lightboxPrev = lightbox.querySelector('.gallery-lightbox-arrow-prev');
  const lightboxNext = lightbox.querySelector('.gallery-lightbox-arrow-next');

  const syncLightbox = () => {
    const currentThumb = thumbs[activeIndex];
    lightboxImage.src = currentThumb.dataset.galleryImage;
    lightboxImage.alt = currentThumb.dataset.galleryAlt;
    lightboxCounter.textContent = `${activeIndex + 1} / ${thumbs.length}`;
  };

  const openLightbox = () => {
    syncLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    mainGalleryImage.focus();
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      setActiveThumb(index);
    });
  });

  if (galleryPrev) {
    galleryPrev.addEventListener('click', () => {
      setActiveThumb(activeIndex - 1);
    });
  }

  if (galleryNext) {
    galleryNext.addEventListener('click', () => {
      setActiveThumb(activeIndex + 1);
    });
  }

  mainGalleryImage.tabIndex = 0;
  mainGalleryImage.setAttribute('role', 'button');
  mainGalleryImage.setAttribute('aria-label', `${mainGalleryImage.alt}. ${openImageLabel}`);

  mainGalleryImage.addEventListener('click', openLightbox);
  mainGalleryImage.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    openLightbox();
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => {
    setActiveThumb(activeIndex - 1);
  });
  lightboxNext.addEventListener('click', () => {
    setActiveThumb(activeIndex + 1);
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      setActiveThumb(activeIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      setActiveThumb(activeIndex + 1);
    }
  });
}

document.querySelectorAll('.card-clickable[data-card-href]').forEach((card) => {
  const targetHref = card.dataset.cardHref;

  if (!targetHref) {
    return;
  }

  const goToCard = () => {
    window.location.href = targetHref;
  };

  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button, input, select, textarea')) {
      return;
    }

    goToCard();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    if (event.target.closest('a, button, input, select, textarea')) {
      return;
    }

    event.preventDefault();
    goToCard();
  });
});
