export const FETCH_TRANSLATION = 'FETCH_QURAN_TRANSLATION';
export const FETCH_TRANSLATION_FAIL = 'FETCH_QURAN_TRANSLATION_FAIL';
export const FETCH_TRANSLATION_SUCCESS = 'FETCH_QURAN_TRANSLATION_SUCCESS';

export const getTranslation = payload => ({ type: FETCH_TRANSLATION, payload });
export const getTranslationSuccess = payload => ({ type: FETCH_TRANSLATION_SUCCESS, payload });
export const getTranslationFail = payload => ({ type: FETCH_TRANSLATION_FAIL, payload });

const initialState = {
  isFetchingTranslation: false,
  tafsir: [],
  error: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TRANSLATION:
      return {
        ...state,
        isFetchingTranslation: true,
      }
    case FETCH_TRANSLATION_SUCCESS:
      return {
        ...state,
        tafsir: action.payload,
        isFetchingTranslation: false,
      }
    case FETCH_TRANSLATION_FAIL:
      return {
        ...state,
        isFetchingTranslation: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
