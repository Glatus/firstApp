import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import styles from '../components/style';

const Login = ({ navigation }) => {
  let [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log('login isLoggedIn', isLoggedIn);
  const logIn = async () => {
    try {
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', 'abc');
    } catch (error) {
      console.error('Error while logging in:', error);
    }
  };


  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token', userToken);
      if (userToken === 'abc') {
        setIsLoggedIn(true);
        navigation.navigate('Tabs');
      }
    } catch (error) {
      console.error('Error reading userToken from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
