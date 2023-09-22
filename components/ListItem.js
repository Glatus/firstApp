import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { mediaUrl } from '../utils/app-config';
import styles from './style';
import { Card } from '@rneui/themed';
import { Avatar, Button } from '@rneui/base';
import { useMedia } from '../hook/ApiHooks';
import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListItem = ({ singleMedia, navigation, userId }) => {

  const { deleteMedia } = useMedia();
  const { update, setUpdate } = useContext(MainContext);

  const deleteFile = async () => {
    Alert.alert('Delete', `file id: ${singleMedia.file_id}, Are your sure?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          console.log('deleting file', singleMedia.file_id);
          try {
            const token = await AsyncStorage.getItem('userToken');
            const result = await deleteMedia(singleMedia.file_id, token);
            console.log('deleteFile()', result.message);
            // update view after deleting a file
            setUpdate(!update);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  const modifyFile = async () => {
    console.log('modifying file', singleMedia.file_id);
    navigation.navigate('Modify file', singleMedia);
  };

  return (
    <Card>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Single', singleMedia);
        }}
      >
        <Avatar
          style={styles.image}
          source={{ uri: mediaUrl + singleMedia.thumbnails.w160 }}
        />
        <View>
          <Text style={styles.title}>{singleMedia.title}</Text>
          <Text style={styles.content}>{singleMedia.description}</Text>
        </View>
        {singleMedia.user_id == userId && (
          <>
            <Button size="sm" onPress={modifyFile}>
              Modify
            </Button>
            <Button size="sm" onPress={deleteFile} color={'error'}>
              Delete
            </Button>
          </>
        )}
      </TouchableOpacity>
    </Card>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnails: PropTypes.shape({
      w160: PropTypes.string.isRequired,
    }).isRequired,
    filename: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
