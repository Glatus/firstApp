import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import List from './components/List';
import Header from './components/header';
import styles from './components/style';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#48c71e" barStyle="light-content" />
      <Header style={styles.header} />
      <List />
    </SafeAreaView>
  );
};

export default App;
