import React, { useEffect, useState } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';

const url ='https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {
  const [mediaArray, setMediaArray] = useState([])

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setMediaArray(json)
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
