import axios from 'axios';

export class PixabayAPI {
  static API_KEY = '40710997-4253618bc3055cabfb83eaf18';

  constructor() {
    this.query = null;
    this.page = 1;
    axios.defaults.baseURL = 'https://pixabay.com';
  }

  fetchPhotosByQuery() {
    const axiosOptions = {
      params: {
        key: PixabayAPI.API_KEY,
        q: this.query,
        image_type: 'photo',
        page: this.page,
        per_page: 40,
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    return axios.get('/api/', axiosOptions).then(response => {
      return response.data;
    });
  }
}
