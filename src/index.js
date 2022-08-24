import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { renderMarkup } from './js/markup';

const NOTIFY_OPTIONS = {
  timeout: 1000,
  showOnlyTheLastOne: true,
  clickToClose: true,
};

const DEFAULT_CURRENT_PAGE = 1;
const PHOTO_PER_PAGE = 40;

const refs = {
  form: document.querySelector('.search-form'),
  galleryMarkup: document.querySelector('.gallery'),
  link: document.querySelector('.link'),
};
let query = '';
let page = 1;
let items = [];

const apiKey = '29405183-239080ff925ad4e27b7a65791';
const baseURL = 'https://pixabay.com/api';
const parameters = `&image_type=photo&orientation=horizontal&safesearch=true`;

const fetchData = () => {
  axios
    .get(
      `${baseURL}/?key=${apiKey}&per_page=${PHOTO_PER_PAGE}&page=${page}&q=${query}${parameters}`
    )
    .then(({ data }) => {
      items = data.hits;
      const markupGallery = renderMarkup(items);
      refs.galleryMarkup.innerHTML = '';
      refs.galleryMarkup.innerHTML = markupGallery;
      lightbox();
      if (items.length > 0) {
        let itemQuantity = data.totalHits;
        foundImg(itemQuantity);
      } else if (items.length <= 0) {
        noMaches();
      }
    })
    .catch(error => console.log(error));
};

// ++++++++++++++++++++++++++++++++++++++

// ініціалізуємо lightbox  для відображення галереї картинок
function lightbox() {
  new SimpleLightbox('a', {
    fadeSpeed: '250',
    scrollZoom: 'true',
    animationSpeed: '250',
  });
}
// Notiflix інформування  про кількість знайдених картинок
function foundImg(itemQuantity) {
  Notiflix.Notify.info(
    `"Hooray! We found ${itemQuantity} images."`,
    NOTIFY_OPTIONS
  );
}
// Notiflix інформування запитуваної внфо не знайдено
function noMaches() {
  Notiflix.Notify.failure(
    `Sorry there are no images maching your search query. Please try again`,
    NOTIFY_OPTIONS
  );
}

// ========================================================

const onSubmit = e => {
  e.preventDefault();
  query = e.target.searchQuery.value;
  fetchData();
};

refs.form.addEventListener('submit', onSubmit);
