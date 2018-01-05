import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { FETCH_ALL_CHAPTERS, FETCH_CHAPTER, getAllChapterSuccess, getAllChapterFail, getChapterSuccess, getChapterFail } from '../ducks/chapterRedux';
import { quranApi } from '../../api';

function* fetchAllChapters() {
  try {
    const { code, status, data } = yield call(quranApi.getAllQuranChapters);
    if (code === 200 && status === 'OK' && data) {
      yield put(getAllChapterSuccess(data));
    }
  } catch(e) {
    yield put(getAllChapterFail(e));
  }
}

function* fetchChapter({ payload }) {
  try {
    const { quran } = yield call(quranApi.getQuranChapter, payload);
    if (!isEmpty(quran)) {
      yield put(getChapterSuccess(Object.values(quran['quran-uthmani'])));
    }
  } catch(e) {
    yield put(getChapterFail(e));
  }
}

function* watchFetchAllChapter() {
  yield takeLatest(FETCH_ALL_CHAPTERS, fetchAllChapters);
}

function* watchFetchChapter() {
  yield takeLatest(FETCH_CHAPTER, fetchChapter);
}

export default function* chapter() {
  yield all([
    fork(watchFetchAllChapter),
    fork(watchFetchChapter),
  ])
}