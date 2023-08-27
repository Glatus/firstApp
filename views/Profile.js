import React, { useContext } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import styles from '../components/style';
import { MainContext } from '../contexts/MainContext';

const Profile = ({ navigation }) => {
  // TODO: get isLoggedIn and setIsLoggedIn from MainContext
  let [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log('profile isLoggedIn', isLoggedIn);
  const logout = () => {
    // TODO: set isLoggedIn to false;
    setIsLoggedIn(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};
export default Profile;
