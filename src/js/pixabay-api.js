import { Notify } from 'notiflix';
const axios = require('axios').default;

const API_KEY = '30800141-5155b96734261143d4ff6b69f';
const BASE_URL = 'https://pixabay.com/api/';

export class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`, {
        timeout: 5000,
      });
      this.page += 1;
      return response.data.hits;
    } catch (error) {
      console.error(error);
    }
  }

  resetPage() {
    this.page = 1;
  }
}
