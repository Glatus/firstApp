import React, { useEffect, useState } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';
import { apiUrl } from '../Utils/app-config';


const List = () => {
  const [mediaArray, setMediaArray] = useState([])

  const loadMedia = async () => {
    try {
      const response = await fetch(apiUrl + 'media');
      const json = await response.json();
      console.log(json);
      const imageFile = await Promise.all(
        json.map(async (item) => {
        const response = await fetch(apiUrl + 'media/' + item.file_id)
        const fileData = await response.json()
        return fileData
     }));
      setMediaArray(imageFile)
    } catch (error) {
      console.error('loadMedia failed');
    }
  };
  useEffect(() => {loadMedia()}, []);
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
