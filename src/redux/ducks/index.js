import { combineReducers } from 'redux';
import quran from './chapterRedux';
import setting from './settingRedux';

export default combineReducers({
  quran,
  setting,
});
