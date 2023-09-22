import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import styles from '../components/style';
import { mediaUrl } from '../utils/app-config';
import { Video, ResizeMode } from 'expo-av';
import { useUser } from '../hook/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({ route, navigation }) => {

  const { getUserById } = useUser();
  const [owner, setOwner] = useState({});


  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const ownerData = await getUserById(user_id, token);
      setOwner(ownerData);
    } catch (error) {
      console.error(error.message);
    }
  };
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

  useEffect(() => {
    fetchOwner();
  });

  let fileExtension = filename.split('.').pop();
  return (
    <SafeAreaView style={styles.Scontainer}>
      <Text style={styles.Stitle}>{title}</Text>
      {fileExtension === 'jpg' ? (
        <Image style={styles.Simage} source={{ uri: mediaUrl + filename }} />
      ) : (
        <Video
          style={styles.Simage}
          source={{ uri: mediaUrl + filename }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      )}
      <Text style={styles.Stext}>{description}</Text>
      <Text style={styles.Stext}>{owner.username}</Text>
      <Text style={styles.Stext}>{formattedDate}</Text>
    </SafeAreaView>
  );
};

export default Single;
