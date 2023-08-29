import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import styles from '../components/style';



const Login = ({ navigation }) => { // props is needed for navigation
  // TODO: get isLoggedIn and setIsLoggedIn from MainContext
  let [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log('login isLoggedIn', isLoggedIn);
  const logIn = async () => {
    // TODO: set isLoggedIn to true;
    setIsLoggedIn(true);
    await AsyncStorage.setItem('userToken', 'abc');
    console.log(setIsLoggedIn);
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};
const checkToken = async () => {
  // TODO: save the value of userToken saved in AsyncStorage as userToken
  const userToken = await AsyncStorage.getItem('userToken');
  console.log('token', userToken);
  if (userToken === 'abc') {
    // TODO if the content of userToken is 'abc'), set isLoggedIn to true and navigate to Tabs
    isLoggedIn(true);
    navigation.navigate('Tabs');
  }
};

useEffect(() => {
  checkToken();
}, []);

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
