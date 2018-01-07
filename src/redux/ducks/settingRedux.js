export const SET_NIGHT_MODE = 'SET_NIGHT_MODE';
export const SET_NORMAL_MODE = 'SET_NORMAL_MODE';

export const setNightMode = () => ({ type: SET_NIGHT_MODE });
export const setNormalMode = () => ({ type: SET_NORMAL_MODE });

const initialState = {
  isNightMode: false,
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
    default:
      return state;
  }
}
