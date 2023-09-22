import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { mediaUrl } from '../utils/app-config';
import styles from './style';
import { Card } from '@rneui/themed';


const ListItem = ({ singleMedia, navigation }) => {
  return (
    <Card>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Single', singleMedia);
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
