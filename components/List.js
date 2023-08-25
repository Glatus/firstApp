import React, { useEffect, useState } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';
import { useMedia } from "../hook/ApiHooks";



const List = () => {
  const {mediaArray} = useMedia()
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

const styles = StyleSheet.create({
});

export default List;
