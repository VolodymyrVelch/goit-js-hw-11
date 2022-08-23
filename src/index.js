import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const NOTIFY_OPTIONS = {
  timeout: 1000,
  showOnlyTheLastOne: true,
  clickToClose: true,
};

const DEFAULT_CURRENT_PAGE = 1;
const PHOTO_PER_PAGE = 40;
const apiKey = '29405183-239080ff925ad4e27b7a65791';

const fefs = {
  search: document.querySelector('#search-field'),
};
// https://pixabay.com/api/

axios({
  method: 'get',
  url: `https://pixabay.com/api/?key=${apiKey}&per_page=${PHOTO_PER_PAGE}&q=yellow+flowers&image_type=photo`,
  responseType: 'stream',
})
  .then(function (response) {
    response;
    console.log(response.data);
  })
  .catch(error => error);

// https://pixabay.com/api/videos/?key=29405183-239080ff925ad4e27b7a65791&q=yellow+flowers
