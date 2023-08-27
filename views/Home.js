import React from 'react';
import { SafeAreaView } from 'react-native';
import List from '../components/List';
import Header from '../components/header';
import styles from '../components/style';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} />
      <List />
    </SafeAreaView>
  );
};
export default Home;
