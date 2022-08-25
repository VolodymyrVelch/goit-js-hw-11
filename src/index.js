import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { renderMarkup } from './js/markup';

const PHOTO_PER_PAGE = 40;
const NOTIFY_OPTIONS = {
  timeout: 1000,
  showOnlyTheLastOne: true,
  clickToClose: true,
};

const refs = {
  sbmBtn: document.querySelector('#search-btn'),
  form: document.querySelector('.search-form'),
  galleryMarkup: document.querySelector('.gallery'),
  link: document.querySelector('.link'),

  // loadMore: document.querySelector('.load-more'),
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
      refs.galleryMarkup.insertAdjacentHTML('beforeend', markupGallery);
      lightbox();
      if (items.length > 0) {
        let itemQuantity = data.totalHits;
        foundImg(itemQuantity);
      } else if (items.length <= 0) {
        refs.sbmBtn.disabled = true;
        noMaches();
      }
    })
    .catch(error => console.log(error));
};

function loadMore(e) {
  page += 1;
  fetchData();
}

// ++++++++++++++++++++++++++++++++++++++
const handleScroll = e => {
  if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
    loadMore();
  }
};

// ініціалізуємо lightbox  для відображення галереї картинок
function lightbox() {
  new SimpleLightbox('a', {
    fadeSpeed: '250',
    scrollZoom: 'true',
    animationSpeed: '250',
  }).refresh();
}
// Notiflix інформування  про кількість знайдених картинок
function foundImg(itemQuantity) {
  Notiflix.Notify.info(
    `"Hooray! We found ${itemQuantity} images."`,
    NOTIFY_OPTIONS
  );
}
//інформування про те  що поле не повинно бути пустим
function emptySearch() {
  Notiflix.Notify.warning(
    `You should type request to recieve info`,
    NOTIFY_OPTIONS
  );
}

// Notiflix інформування запитуваної інфо не знайдено
function noMaches() {
  Notiflix.Notify.failure(
    `Sorry there are no images maching your search query. Please try again`,
    NOTIFY_OPTIONS
  );
}

function endContent() {
  Notiflix.Notify.failure(
    `"We're sorry, but you've reached the end of search results."`,
    NOTIFY_OPTIONS
  );
}

// ========================================================

const onSubmit = e => {
  e.preventDefault();
  page = 1;
  // if ((query = e.target.searchQuery.value)) {
  //   return;
  // }
  refs.galleryMarkup.innerHTML = '';
  query = e.target.searchQuery.value;
  if (!query) {
    emptySearch();
    return;
  }
  fetchData();
};

refs.form.addEventListener('submit', onSubmit);
refs.galleryMarkup.addEventListener('scroll', handleScroll);
