import { View, Text, TextInput, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../hook/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Button, Input} from '@rneui/themed';
import {PropTypes} from 'prop-types';


const RegisterForm = () => {
  const {postUser, checkUsername} = useUser();
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: '', email: '', full_name: ''},
    mode: 'onBlur',
  });

  const register = async (RegisterData) => {
    try {
      console.log("RegisterData: " + RegisterData);
      delete RegisterData.confirm_password
      const registerResponse = await postUser(RegisterData);
      console.log('register response', registerResponse);
      Alert.alert('Success', 'Your account has been created successfully.');
      // TODO: fix dofetch() to display errors from API (e.g. when bad user/pw)
      // use loginResponse.user for storing token & userdata
      await AsyncStorage.setItem('userToken', registerResponse.token);
      setToggleRegister(false);
    } catch (error) {
      console.error(error);
      // TODO: notify user about failed login?
    }
  };

  return (
    <Card>
      <Card.Title>Registration Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'min length is 3 characters'},
          validate: async (value) => {
            try {
              const isAvailable = await checkUsername(value);
              console.log('username available?', value, isAvailable);
              return isAvailable ? isAvailable : 'Username taken';
            } catch (error) {
              console.error(error);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 5, message: 'min length is 5 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: (value) => {
            const {password} = getValues();
            // console.log('getValues password', password);
            return value === password ? true : 'Passwords dont match!';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          pattern: {
            // TODO: add better regexp for email
            value: /\S+@\S+\.\S+$/,
            message: 'must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{minLength: {value: 3, message: 'min length is 3 characters'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.full_name?.message}
          />
        )}
        name="full_name"
      />
      <Button title="Register!" onPress={handleSubmit(register)} />
    </Card>
  );
};
RegisterForm.propTypes = {
  setToggleRegister: PropTypes.func,
};

export default RegisterForm;
