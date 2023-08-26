import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { mediaUrl } from '../Utils/app-config';



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

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'green',
    flexDirection: 'row',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: '94%',
    margin: 5,
    borderBottomLeftRadius: 50,
  },
  title: {
    fontWeight: 'bold'
  },
  content: {
    height: 100
  },
});

export default ListItem;
