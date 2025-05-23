import userList from './user/index.js';
import project from './project/index.js';
import tableList from './list/table-list.js';

const db = () => {
  const api = {
    userList,
    project,
    tableList,
  };
  return api;
};

export default db;
