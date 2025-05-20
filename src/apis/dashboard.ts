import axios from 'axios';

export const getChinaGeo = async () => {
  const res = await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full');
  return res.data;
};
