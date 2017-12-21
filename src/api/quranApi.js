import axios from 'axios';
import { API } from '../constants';

class QuranApi {
  static getAllQuranChapters() {
    return axios
      .create({
        baseURL: API.baseURL,
      })
      .get(API.endpoints.chapter)
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  static getQuranChapter(id) {
    const path = `${API.endpoints.chapter}/${id}`;
    return axios
      .create({
        baseURL: API.baseURL,
      })
      .get(path)
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export default QuranApi;