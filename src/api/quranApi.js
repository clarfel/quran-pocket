import axios from 'axios';
import { API_KEY } from 'react-native-dotenv';
import { API } from '../constants';

class QuranApi {
  static getAllQuranChapters() {
    return axios
      .create({
        baseURL: API.baseURL.chapters,
        timeout: 120000,
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
        timeout: 120000,
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
        timeout: 120000,
      })
      .get(path)
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export default QuranApi;
