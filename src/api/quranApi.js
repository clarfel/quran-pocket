import axios from 'axios';
import { API_KEY } from 'react-native-dotenv';
import { API } from '../constants';

class QuranApi {
  static getAllQuranChapters() {
    return axios
      .create({
        baseURL: API.baseURL.chapters,
      })
      .get(API.endpoints.chapters)
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  static getQuranChapter(id) {
    const path = `${API.endpoints.chapter}/${id}/${API.endpoints.quran_id}?key=${API_KEY}`;
    return axios
      .create({
        baseURL: API.baseURL.quran,
      })
      .get(path)
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  static getTranslation(id) {
    const path = `${API.endpoints.chapter}/${id}/${API.endpoints.translation_id}`;
    return axios
      .create({
        baseURL: API.baseURL.translations,
      })
      .get(path)
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export default QuranApi;
