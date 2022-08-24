export { renderMarkup };

const renderMarkup = function (items) {
  return items
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a class='link' href='${largeImageURL}'>
  <img src="${webformatURL}" alt="${tags}" loading="lazy"  width='300' height='200'/>
  </a>
  <div class="info">
    <p class="info-item">
      Likes: <b>${likes}</b>
    </p>
    <p class="info-item">
      Views: <b>${views}</b>
    </p>
    <p class="info-item">
      Comments: <b>${comments}</b>
    </p>
    <p class="info-item">
       Downloads: <b>${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
};
