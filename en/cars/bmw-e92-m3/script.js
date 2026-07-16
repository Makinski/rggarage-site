const galleryButtons = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("p");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

if (lightbox && lightboxImage && lightboxCaption) {
  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      lightboxImage.src = button.dataset.image;
      lightboxImage.alt = button.dataset.caption;
      lightboxCaption.textContent = button.dataset.caption;
      document.body.classList.add("lightbox-open");
      lightbox.showModal();
      lightboxClose?.focus();
    });
  });

  const closeLightbox = () => {
    lightbox.close();
    document.body.classList.remove("lightbox-open");
  };

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
  });
}
