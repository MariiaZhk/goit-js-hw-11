export const createGalleryCardsTemplate = photos => {
  return photos
    .map(photo => {
      return `
      <div class="photo-card">
        <div class="simplebox-wrap">
          <a class="gallery-card-link" href="${photo.largeImageURL}">
          <img class = "gallery-img" src="${photo.webformatURL}" alt="${photo.tags}" width="300" loading="lazy"/></a>
        </div>
      <div class="info">
        <p class="info-item">
            <b>Likes: ${photo.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${photo.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${photo.comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads: ${photo.downloads}</b>
        </p>
      </div>
    </div>
    `;
    })
    .join('');
};
