import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './ListItem';
import { useMedia } from "../hook/ApiHooks";



const List = (props) => {
  const { mediaArray } = useMedia();
  return (
    <FlatList
      data={mediaArray}
      renderItem={({ item }) => (
        <ListItem navigation={props.navigation} singleMedia={item} />
      )}
    />
  );
};

export default List;
