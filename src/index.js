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

// https://pixabay.com/api/
