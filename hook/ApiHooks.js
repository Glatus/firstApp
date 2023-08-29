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
export { useMedia };
