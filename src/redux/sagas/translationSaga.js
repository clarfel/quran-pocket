import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { FETCH_TRANSLATION, getTranslationFail, getTranslationSuccess, getChapterFail } from '../ducks/translationRedux';
import { quranApi } from '../../api';

function* fetchTranslation({ payload }) {
  try {
    const { code, status, data } = yield call(quranApi.getTranslation, payload);
    if (code === 200 && status === 'OK') {
      yield put(getTranslationSuccess(data.ayahs));
    } else {
      yield put(getTranslationFail('Unable to load translation'));
    }
  } catch(e) {
    console.log(e);
    yield put(getTranslationFail(e));
  }
}

function* watchFetchTranslation() {
  yield takeLatest(FETCH_TRANSLATION, fetchTranslation);
}

export default function* translation() {
  yield all([
    fork(watchFetchTranslation),
  ])
}
