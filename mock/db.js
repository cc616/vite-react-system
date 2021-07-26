const userList = require('./user/index.js');
const project = require('./project/index.js');

module.exports = function () {
  const api = {
    userList,
    project
  };
  return api;
};
