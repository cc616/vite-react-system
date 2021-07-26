const Mock = require('mockjs');
const userList = require('./user/index.js');
const profile = require('./user/profile.js');

const data1 = Mock.mock({
  'id1|+1': 0,
});

const data2 = Mock.mock({
  'id2|+1': 0,
});

module.exports = function () {
  const api = {
    userList
  };
  return api;
};
