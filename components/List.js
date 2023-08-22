import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from "./ListItem";

const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
let mediaArray = [];
const loadMedia = async () => {
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
};

loadMedia();

const List = () => {
  return (
    <FlatList
      data={mediaArray}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    />
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    height: 10,
  },
});

export default List;
