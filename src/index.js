import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { lightbox } from './partials-js/simplelightbox.js';
import { PixabayAPI } from './partials-js/pixabay-api.js';
import { createGalleryCardsTemplate } from './partials-js/templates/gallery-cards.js';

const searchFormEl = document.querySelector('.js-search-form');
const containerPhotoGalleryEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const paramsNotify = {
  width: '500px',
  position: 'center-center',
  fontSize: '20px',
};
let perPage = 40;

const pixabayApi = new PixabayAPI();

const onSearchFormElSubmit = async event => {
  event.preventDefault();
  const { target: searchFormEl } = event;

  pixabayApi.page = 1;
  pixabayApi.query = searchFormEl.elements.searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');

  try {
    const data = await pixabayApi.fetchPhotosByQuery();

    if (data.totalHits === 0) {
      containerPhotoGalleryEl.innerHTML = '';
      loadMoreBtnEl.classList.add('is-hidden');
      searchFormEl.reset();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        paramsNotify
      );
      return;
    }

    if (pixabayApi.query === '') {
      containerPhotoGalleryEl.innerHTML = '';
      loadMoreBtnEl.classList.add('is-hidden');
      return Notify.failure('Enter your search query, please!', paramsNotify);
    }

    if (data.totalHits < perPage) {
      loadMoreBtnEl.classList.add('is-hidden');
      containerPhotoGalleryEl = createGalleryCardsTemplate(data.hits);
      return;
    }

    containerPhotoGalleryEl.innerHTML = createGalleryCardsTemplate(data.hits);
    loadMoreBtnEl.classList.remove('is-hidden');
    lightbox.refresh();
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  } catch (err) {
    Notify.failure(
      'Oops, something went wrong.Try to refresh this page or make another search.',
      paramsNotify
    );
  }
};

const onLoadMoreBtnElClick = async event => {
  pixabayApi.page += 1;
  try {
    const data = await pixabayApi.fetchPhotosByQuery();
    containerPhotoGalleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCardsTemplate(data.hits)
    );

    if (data.hits.length === 0) {
      loadMoreBtnEl.classList.add('is-hidden');
      return Notify.failure(
        "We're sorry, but you've reached the end of search results.",
        paramsNotify
      );
    }
    lightbox.refresh();
  } catch (err) {
    Notify.failure(
      'Oops, something went wrong. Try to refresh this page or make another search.',
      paramsNotify
    );
  }
};

searchFormEl.addEventListener('submit', onSearchFormElSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
