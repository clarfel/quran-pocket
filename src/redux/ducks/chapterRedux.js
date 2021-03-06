export const FETCH_CHAPTER = 'FETCH_QURAN_CHAPTER';
export const FETCH_ALL_CHAPTERS = 'FETCH_ALL_QURAN_CHAPTERS';
export const FETCH_CHAPTER_FAIL = 'FETCH_QURAN_CHAPTER_FAIL';
export const FETCH_CHAPTER_SUCCESS = 'FETCH_QURAN_CHAPTER_SUCCESS';
export const FETCH_ALL_CHAPTER_FAIL = 'FETCH_ALL_QURAN_CHAPTER_FAIL';
export const FETCH_ALL_CHAPTER_SUCCESS = 'FETCH_ALL_QURAN_CHAPTER_SUCCESS';

export const getAllChapter = () => ({ type: FETCH_ALL_CHAPTERS });
export const getChapter = payload => ({ type: FETCH_CHAPTER, payload });
export const getAllChapterFail = payload => ({ type: FETCH_ALL_CHAPTER_FAIL, payload });
export const getChapterFail = payload => ({ type: FETCH_CHAPTER_FAIL, payload });
export const getAllChapterSuccess = payload => ({ type: FETCH_ALL_CHAPTER_SUCCESS, payload });
export const getChapterSuccess = payload => ({ type: FETCH_CHAPTER_SUCCESS, payload });

const initialState = {
  isFetchingAllChapters: false,
  chapters: [],
  surah: [],
  isFetchingChapter: false,
  error: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CHAPTER:
      return {
        ...state,
        error: false,
        isFetchingChapter: true,
      }
    case FETCH_ALL_CHAPTERS:
      return {
        ...state,
        error: false,
        isFetchingAllChapters: true,
      }
    case FETCH_ALL_CHAPTER_SUCCESS:
      return {
        ...state,
        chapters: action.payload,
        error: false,
        isFetchingAllChapters: false,
      }
    case FETCH_CHAPTER_SUCCESS:
      return {
        ...state,
        surah: action.payload,
        error: false,
        isFetchingChapter: false,
      }
    case FETCH_ALL_CHAPTER_FAIL:
      return {
        ...state,
        isFetchingAllChapters: false,
        error: true,
      }
    case FETCH_CHAPTER_FAIL:
      return {
        ...state,
        isFetchingChapter: false,
        error: true,
      }
    default:
      return state;
  }
}
