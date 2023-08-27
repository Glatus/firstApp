import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Home from './views/Home';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#48c71e" barStyle="light-content" />
      <Navigator></Navigator>
    </>
  );
};

export default App;
