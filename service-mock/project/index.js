const allProjects = [
  {
    id: '10001',
    team: 'REACT',
    description: '生命就像一盒巧克力，结果往往出人意料',
    publishedAt: '5年前',
  },
  {
    id: '10002',
    team: 'VUE',
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    publishedAt: '5年前',
  },
  {
    id: '10003',
    team: 'ANGULAR',
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    publishedAt: '5年前',
  },
  {
    id: '10004',
    team: 'ANT_DESIGN',
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    publishedAt: '5年前',
  },
  {
    id: '10005',
    team: 'BOOTSTRAP',
    description: '凛冬将至',
    publishedAt: '5年前',
  },
  {
    id: '10006',
    team: 'VITE_PRO',
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    publishedAt: '5年前',
  },
];

export const getProjects = (req, res) => {
  return allProjects;
};
