import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import styles from './style';

const Header = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={{ uri: 'https://placebeard.it/400x300' }}
        style={styles.banner}
      />
      <Image source={require('../assets/trash-2.png')} style={styles.icon} />
      <Text style={styles.bannerText}> Tässä on kuvateksti</Text>
    </View>
  );
};

export default Header;
