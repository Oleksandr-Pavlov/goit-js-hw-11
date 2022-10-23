import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PicturesApiService } from './js/pixabay-api';
import { makeMarkup } from './js/markup';

const form = document.querySelector('.search-form')
const button = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const picturesApiService = new PicturesApiService();
const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSubmit)
button.addEventListener('click', onLoadMore)

function onSubmit(e) {
  e.preventDefault()

  picturesApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (picturesApiService.searchQuery === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.', {
        timeout: 5000,
      }
    );
  }

  picturesApiService.fetchPictures().then(pictures => {
    gallery.insertAdjacentHTML('beforeend', makeMarkup(pictures));
  })
  
}

function onLoadMore() {
  picturesApiService.fetchPictures().then(pictures => {
    gallery.insertAdjacentHTML('beforeend', makeMarkup(pictures));
  });
}
