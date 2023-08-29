import React from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import styles from '../components/style';
import { mediaUrl } from '../Utils/app-config';

const Single = ({ route, navigation }) => {
  const {
    title,
    filename,
    description,
    user_id,
    time_added = new Date(),
  } = route.params;

  const formattedDate = new Date(time_added).toLocaleString('en-US', {
    hour12: false,
  });

  return (
    <SafeAreaView style={styles.Scontainer}>
      <Text style={styles.Stitle}>{title}</Text>
      <Image style={styles.Simage} source={{ uri: mediaUrl + filename }} />
      <Text style={styles.Stext}>{description}</Text>
      <Text style={styles.Stext}>{user_id}</Text>
      <Text style={styles.Stext}>{formattedDate}</Text>
    </SafeAreaView>
  );
};


export default Single;
