import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';


const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placebeard.it/400x300' }}
        style={styles.banner}
      />
      <Text style={styles.bannerText}> Tässä on kuvateksti</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  banner: {
    width: 400,
    height: 300,
  },
  bannerText: {
    position: 'absolute',
    bottom: '10%',
    color: 'lime',
    backgroundColor: 'darkblue',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 15,
    padding: 7,
  },
  image: {
    position: 'absolute',
  },
});

export default Header;
