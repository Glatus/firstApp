import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { mediaUrl } from '../Utils/app-config';
import styles from './style';


const ListItem = ({ singleMedia }) => {
  return (
    <TouchableOpacity style={styles.item}>
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
};


export default ListItem;
