import { combineReducers } from 'redux';
import quran from './chapterRedux';
import setting from './settingRedux';
import translation from './translationRedux';

export default combineReducers({
  quran,
  setting,
  translation,
});
