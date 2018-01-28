export const SET_NIGHT_MODE = 'SET_NIGHT_MODE';
export const SET_NORMAL_MODE = 'SET_NORMAL_MODE';
export const SET_TRANSLATION = 'SET_TRANSLATION';

export const setNightMode = () => ({ type: SET_NIGHT_MODE });
export const setNormalMode = () => ({ type: SET_NORMAL_MODE });

export const setTranslationMode = payload => ({ type: SET_TRANSLATION, payload })

const initialState = {
  isNightMode: false,
  translation: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_NIGHT_MODE:
      return {
        ...state,
        isNightMode: true,
      }
    case SET_NORMAL_MODE:
      return {
        ...state,
        isNightMode: false,
      }
    case SET_TRANSLATION:
      return {
        ...state,
        translation: action.payload,
      }
    default:
      return state;
  }
}
