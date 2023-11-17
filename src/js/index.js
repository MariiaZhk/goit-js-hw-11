import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { PixabayAPI } from './pixabayAPI.js';
import { createGalleryCardsTemplate } from './templates/gallery-cards.js';

const searchFormEl = document.querySelector('.js-search-form');
const containerPhotoGalleryEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
// loadMoreBtnEl.classList.replace('.load-more', '.is-hidden');
loadMoreBtnEl.classList.add('is-hidden');

const paramsNotify = {
  width: '500px',
  position: 'center-center',
  fontSize: '20px',
};
let perPage = 1;

const pixabayApi = new PixabayAPI();

const onSearchFormElSubmit = event => {
  event.preventDefault();
  const { target: searchFormEl } = event;

  pixabayApi.page = 1;

  pixabayApi.query = searchFormEl.elements.searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');

  pixabayApi
    .fetchPhotosByQuery()
    .then(data => {
      console.log(data);

      if (data.totalHits === 0) {
        containerPhotoGalleryEl.innerHTML = '';
        loadMoreBtnEl.classList.add('.is-hidden');
        searchFormEl.reset();
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (pixabayApi.query === '') {
        return Notify.failure('Enter your search query, please!', paramsNotify);
      }

      if (data.totalHits <= perPage) {
        containerPhotoGalleryEl = createGalleryCardsTemplate(data.hits);
        loadMoreBtnEl.classList.add('is-hidden');
        // window.addEventListener('scroll', showLoadMorePage);
      }

      containerPhotoGalleryEl.innerHTML = createGalleryCardsTemplate(data.hits);
      loadMoreBtnEl.classList.remove('.is-hidden');
    })
    .catch(err => {
      console.log(err);
    });
};
const onLoadMoreBtnElClick = event => {
  pixabayApi.page += 1;

  pixabayApi
    .fetchPhotosByQuery()
    .then(data => {
      const numberOfPage = Math.ceil(data.totalHits / perPage);
      containerPhotoGalleryEl.insertAdjacentHTML(
        'beforeend',
        createGalleryCardsTemplate(data.hits)
      );
      if (numberOfPage === pixabayApi.page) {
        loadMoreBtnEl.classList.add('.is-hidden');
        return Notify.failure(
          "We're sorry, but you've reached the end of search results.",
          paramsNotify
        );
      }
    })
    .catch(err => {
      console.log(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormElSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
