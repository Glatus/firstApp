import React from 'react';
import { SafeAreaView } from 'react-native';
import List from '../components/List';
import styles from '../components/style';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} />
      <List navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
