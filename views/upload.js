import { Card, Input } from '@rneui/themed';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@rneui/base';
import { Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMedia } from '../hook/ApiHooks';
import { MainContext } from '../contexts/MainContext';
import { placeholderImage, appId } from '../utils/app-config';
import { useContext } from 'react';
import style from '../components/style';

const Upload = () => {
  const { update, setUpdate } = useContext(MainContext);
  const [image, setImage] = useState(placeholderImage);
  const [type, setType] = useState('image');
  const { postMedia, loading } = useMedia();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const upload = async (uploadData) => {
    console.log('upload', uploadData);
    const formData = new FormData();
    formData.append('title', uploadData.title);
    formData.append('description', uploadData.description);
    const filename = image.split('/').pop();

    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: filename,
      type: `${type}/${fileExtension}`,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('lataus', response);
      const tagResponse = await postTag(
        {
          file_id: response.file_id,
          tag: appId,
        },
        token,
      );
      console.log('postTag', tagResponse);
      setUpdate(!update);
      Alert.alert('Upload', `${response.message} (id: ${response.file_id})`, [
        {
          text: 'Ok',
          onPress: () => {
            resetForm();
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.log(error.message);
      Alert.alert("Median lataus epäonnistui!");
    }
  };
  const resetForm = () => {
    setImage(placeholderImage);
    setType('image');
    reset();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    // Korjaa sen oudon Cancelled errorin
    delete result.cancelled;
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type);
    }
  };

  return (
    <Card>
      {type === 'image' ? (
        <Card.Image
          source={{ uri: image }}
          style={style.Uimage}
          onPress={pickImage}
        />
      ) : (
        <Video
          source={{ uri: image }}
          style={style.image}
          useNativeControls={true}
          resizeMode="cover"
        />
      )}
      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'is required' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          minLength: { value: 10, message: 'min 10 characters' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Description (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
        name="description"
      />
      <Button title="Choose Media" onPress={pickImage} />
      <Button title="Reset Form" onPress={resetForm()} />
      <Button loading={loading} title="Upload" onPress={handleSubmit(upload)} disabled={image == placeholderImage || errors.description || errors.title} />
    </Card>
  );
};
export default Upload;
