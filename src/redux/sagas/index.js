import { all, fork } from 'redux-saga/effects';
import chapterSaga from './chapterSaga';

export default function* rootSaga() {
  yield all([
    fork(chapterSaga),
  ]);
}
