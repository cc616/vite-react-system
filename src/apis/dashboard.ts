import axios from 'axios';

export const getChinaGeo = async () => {
  const res = await axios.get('/vite-react-system/china.json');
  return res.data;
};
