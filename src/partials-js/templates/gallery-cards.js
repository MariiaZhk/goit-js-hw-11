export const createGalleryCardsTemplate = photos => {
  return photos
    .map(photo => {
      return `
      <div class="photo-card">
        <div class="lightbox-wrap">
          <a class="gallery-card-link" href="${photo.largeImageURL}">
          <img class = "gallery-img" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/></a>
        </div>
      <div class="info">
        <p class="info-item">
            <b>Likes:</b> ${photo.likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${photo.views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${photo.comments}
        </p>
        <p class="info-item">
            <b>Downloads:</b> ${photo.downloads}
        </p>
      </div>
    </div>
    `;
    })
    .join('');
};
