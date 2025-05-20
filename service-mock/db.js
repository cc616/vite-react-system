import userList from './user/index.js';
import project from './project/index.js';

const db = () => {
  const api = {
    userList,
    project,
  };
  return api;
};

export default db;
