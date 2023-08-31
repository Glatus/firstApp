import { useEffect, useState } from 'react';
import { doFetch } from '../Utils/functions';
import { apiUrl } from '../Utils/app-config';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const json = await doFetch(apiUrl + 'media');
      const imageFile = await Promise.all(
        json.map(async (item) => {
          const fileData = await doFetch(apiUrl + 'media/' + item.file_id);
          return fileData;
        }));
      setMediaArray(imageFile);
    } catch (error) {
      console.error('loadMedia failed' + error);
    }
  };
  useEffect(() => { loadMedia(); }, []);
  return { mediaArray };
};
const useAuthentication = () => {
  const postLogin = async (userCredentials) => { // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const json = await doFetch(apiUrl + 'login', options);
      console.log(json);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return { postLogin };
};
const useUser = () => {

  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: { 'x-access-token': token },
      };
      const response = await fetch(apiUrl + 'users/user', options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getUserByToken };
};


export { useMedia, useAuthentication, useUser };
