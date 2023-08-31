import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Home from './views/Home';
import Navigator from './navigators/Navigator';
import { MainProvider } from './contexts/MainContext';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#48c71e" barStyle="light-content" />
      <MainProvider>
        <Navigator></Navigator>
      </MainProvider>
    </>
  );
};

export default App;
