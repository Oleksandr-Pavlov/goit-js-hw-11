import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PicturesApiService } from './js/pixabay-api';
import { makeMarkup } from './js/markup';

const form = document.querySelector('.search-form')
const button = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const picturesApiService = new PicturesApiService();

form.addEventListener('submit', onSubmit)
button.addEventListener('click', fetchPictures);
button.classList.add('is-hidden')

function onSubmit(e) {
  e.preventDefault()

  picturesApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  picturesApiService.resetPage()
  clearMarkup()
  fetchPictures()
}

function fetchPictures() {
  picturesApiService.fetchPictures().then(data => {
    if (picturesApiService.searchQuery === '' || data.hits.length === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 

    if ((gallery.innerHTML === '')) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    
    gallery.insertAdjacentHTML('beforeend', makeMarkup(data.hits));
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
    button.classList.remove('is-hidden')

    if (gallery.childElementCount === data.totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      button.classList.add('is-hidden')
    }
  });
}

function clearMarkup() {
  gallery.innerHTML = '';
}