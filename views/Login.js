import React, { useContext, useEffect } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hook/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import styles from '../components/style';

const Login = ({ navigation }) => {
  // props is needed for navigation
  const { setIsLoggedIn, setUser } = useContext(MainContext);
  const { getUserByToken } = useUser();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      // hardcoded token validation
      const userData = await getUserByToken(token);
      console.log('userdata', userData);
      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      console.log('checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1 }}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text>Login</Text>
        <LoginForm />
        <Text>Register</Text>
        <RegisterForm />
      </KeyboardAvoidingView>
    </TouchableOpacity>

  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
