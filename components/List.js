import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from './ListItem';
import { useMedia } from "../hook/ApiHooks";
import { MainContext } from '../contexts/MainContext';
import { useContext } from 'react';


const List = (props) => {
  const { update } = useContext(MainContext);
  const { mediaArray } = useMedia(update);
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
