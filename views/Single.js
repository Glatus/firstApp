import React from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import styles from '../components/style';
import { mediaUrl } from '../Utils/app-config';

const Single = ({ route, navigation }) => {
  const { title, filename } = route.params;
  return (
    <SafeAreaView style={styles.Vcontainer}>
      <Text>{title}</Text>
      <Image
        style={styles.Simage}
        source={{ uri: mediaUrl + filename }}
      />
    </SafeAreaView>
  );
};

export default Single;
