import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    )
  };
}

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  HomeScreen: HomeScreen,
  RegisterScreen: RegisterScreen,
  TestScreen: TestScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);