import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import styles from '../components/style';
import { mediaUrl } from '../utils/app-config';
import { Video, ResizeMode } from 'expo-av';
import { useUser, useFavorite } from '../hook/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Icon, Text, ListItem, Button } from '@rneui/themed';
import { MainContext } from '../contexts/MainContext';
import { useContext } from 'react';


const Single = ({ route, navigation }) => {
  const [userLike, setUserLike] = useState(false);
  const { getUserById } = useUser();
  const { user } = useContext(MainContext);
  const { postLike, removeLike, getLikesById } = useFavorite();
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const ownerData = await getUserById(user_id, token);
      setOwner(ownerData);
    } catch (error) {
      console.error(error.message);
    }
  };
  const {
    title,
    description,
    filename,
    user_id,
    file_id,
    time_added = new Date(),
    media_type,
  } = route.params;
  const formattedDate = new Date(time_added).toLocaleString('en-US', {
    hour12: false,
  });
  useEffect(() => {
    fetchOwner();
  });
  const like = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postLike({ file_id }, token);
      response && setUserLike(true);
      Alert.alert("Like added");
    } catch (error) {
      console.error(error.message);
    }
  };

  const dislike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await removeLike(file_id, token);
      response && setUserLike(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getLikes = async () => {
    try {
      const likesData = await getLikesById(file_id);
      console.log(likesData);
      setLikes(likesData);
      likesData.forEach((like) => {
        if (like.user_id === user.user_id) {
          setUserLike(true);
        }
      });

    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getLikes();
  }, [userLike]);
  return (
    <SafeAreaView style={styles.Scontainer}>
      <Text style={styles.Stitle}>{title}</Text>
      {media_type === 'video' ? (
        <Video style={styles.Simage} source={{ uri: mediaUrl + filename }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        />
      ) : (
        <Card.Image style={styles.Simage} source={{ uri: mediaUrl + filename }} />
      )}
      <Text style={styles.Stext}> {likes.length}</Text>
      {userLike ? (<Button onPress={dislike} title={'Remove like'} />
      ) : (<Button onPress={like} title={'Like'} />)}
      {description.length === 0 ? (<Text style={styles.Stext}>{"Description"}</Text>
      ) : (<Text style={styles.Stext}>{description}</Text>)}
      <Text style={styles.Stext}>{owner.username}</Text>
      <Text style={styles.Stext}>{formattedDate}</Text>
    </SafeAreaView >
  );
};

export default Single;
