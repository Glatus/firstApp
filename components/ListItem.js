import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { mediaUrl } from '../Utils/app-config';
import styles from './style';

const ListItem = ({ singleMedia, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Single', { title: singleMedia.title, filename: singleMedia.filename });
      }}
    >
      <Image
        style={styles.image}
        source={{ uri: mediaUrl + singleMedia.thumbnails.w160 }}
      />
      <View>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={styles.content}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
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
