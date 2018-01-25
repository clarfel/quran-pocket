import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/screens/HomeScreen';
import { Routes } from './src/config/routes';
import store from './src/config/store';

class App extends Component {
  componentWillMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />    
      </Provider>
    );
  }
}

export default App;