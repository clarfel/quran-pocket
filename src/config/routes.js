import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ChapterScreen from '../screens/ChapterScreen';

export const Routes = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Chapter: {
    screen: ChapterScreen,
  },
},
{
  headerMode: 'none',
});
