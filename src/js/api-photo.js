import axios from 'axios';

const apiKey = '29405183-239080ff925ad4e27b7a65791';
const baseURL = 'https://pixabay.com/api';
const parameters = `&image_type=photo&orientation=horizontal&safesearch=true`;
const PHOTO_PER_PAGE = 40;
let morePage = 1;

const fetchData = async (query, page) => {
  const { data } = await axios.get(
    `${baseURL}/?key=${apiKey}&per_page=${PHOTO_PER_PAGE}&page=${page}&q=${query}${parameters}`
  );
  return data;
};

const fetchDataMore = async q => {
  morePage += 1;
  const nextPage = await fetchData(q, morePage);
  return nextPage;
};

export { fetchData, fetchDataMore };
