import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hook/ApiHooks';
import {mediaUrl} from '../utils/app-config';
import styles from '../components/style';


const Profile = (props) => {
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user} = useContext(MainContext);
  const logOut = async () => {
    console.log('profile, logout');
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };
  const loadAvatar = async () => {
    try {
      const avatars = await getFilesByTag('avatar_' + user.user_id);
      if (avatars.length > 0) {
        setAvatar(mediaUrl + avatars.pop().filename);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadAvatar();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile view</Text>
      <Image style={styles.Pimage} source={{uri: avatar}}></Image>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>{user.full_name}</Text>
      <Button title="Log out!" onPress={logOut} />
    </SafeAreaView>
  );
};
export default Profile;
