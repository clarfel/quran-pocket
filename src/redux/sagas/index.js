import { all, fork } from 'redux-saga/effects';
import chapterSaga from './chapterSaga';
import translationSaga from './translationSaga';

export default function* rootSaga() {
  yield all([
    fork(chapterSaga),
    fork(translationSaga),
  ]);
}
