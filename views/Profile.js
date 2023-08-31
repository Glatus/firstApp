import React, { useContext } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import styles from '../components/style';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  // TODO: get isLoggedIn and setIsLoggedIn from MainContext
  let [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log('profile isLoggedIn', isLoggedIn);
  const logout = async () => {
    try {
      // TODO: set isLoggedIn to false;
      setIsLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};
export default Profile;
