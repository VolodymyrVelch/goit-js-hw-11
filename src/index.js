import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderMarkup } from './js/markup';
import { fetchData, fetchDataMore } from './js/api-photo';

const NOTIFY_OPTIONS = {
  timeout: 1000,
  showOnlyTheLastOne: true,
  clickToClose: true,
};
const PHOTO_PER_PAGE = 40;
const refs = {
  sbmBtn: document.querySelector('#search-btn'),
  form: document.querySelector('.search-form'),
  galleryMarkup: document.querySelector('.gallery'),
  link: document.querySelector('.link'),
  loadMore: document.querySelector('.load-more'),
};
let query = '';
let items = [];
let page = 1;

async function onSubmit(e) {
  e.preventDefault();
  refs.galleryMarkup.innerHTML = '';
  query = e.target.searchQuery.value.trim();
  if (!query) {
    emptySearch();
    return;
  }
  // зчитуємо дані  з поля інпут та по сабміту  відправляємл дані  в зовнішню
  // функцію для отримання даних через AXIOS
  const data = await fetchData(query, page);
  items = data.hits;
  const markupGallery = renderMarkup(items);
  refs.galleryMarkup.insertAdjacentHTML('beforeend', markupGallery);
  lightbox();

  try {
    if (items.length > 0) {
      let itemQuantity = data.totalHits;
      foundImg(itemQuantity);
      refs.loadMore.classList.add('show');
    } else if (items.length <= 0) {
      refs.sbmBtn.disabled = true;
      noMaches();
    }
    if (PHOTO_PER_PAGE > items.length) {
      endContent();
      refs.loadMore.classList.remove('show');
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
let curentPg = 1;
// отримуємо та рендеримо  більше даних (якщо такі доступні)
async function onBtnLoadMore() {
  const data = await fetchDataMore(query);
  let moreItems = data.hits;
  const markupGallery = renderMarkup(moreItems);
  refs.galleryMarkup.insertAdjacentHTML('beforeend', markupGallery);
  lightbox();
  const totalPages = Math.ceil(data.totalHits / PHOTO_PER_PAGE);
  page += 1;

  try {
    // по умові  якщо  контент  для завантаження по даній темі  закінчився виводимо повідомлення та
    // приховуємо кнопку  "загрузити більше"
    if (page === totalPages) {
      endContent();
      refs.loadMore.classList.remove('show');
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
// додаємо слухачі подій
refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onBtnLoadMore);

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
// Notiflix інформування контент закінчився
function endContent() {
  Notiflix.Notify.failure(
    `"We're sorry, but you've reached the end of search results."`,
    NOTIFY_OPTIONS
  );
}
