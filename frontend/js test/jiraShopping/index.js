/**
 * @format
 */
/*
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
*/

import React from 'react';
import { AppRegistry } from 'react-native';
import { StrictMode } from 'react';
import App from './App';
import { name as appName } from './app.json';

const StrictApp = () => (
  <StrictMode>
    <App />
  </StrictMode>
);

AppRegistry.registerComponent(appName, () => StrictApp);
