import { simpleFaker } from '@faker-js/faker';
import { formatResponse } from '../utils/response.js';

let role;

export const getUserProfile = () => {
  return {
    username: '吴彦祖',
    role,
    id: simpleFaker.string.uuid(),
    position: '高级搬砖专家',
    department: '后台管理系统体验技术部',
    projectCount: 56,
    projectVisitCount: 2123,
    teamTotal: 24,
    teamRanking: 8,
  };
};

const mockToken = 'Bearer mock jwt';
export const createToken = () => {
  return mockToken;
};

export const login = (req, res) => {
  const { username, password } = req.body;
  role = username.toLocaleUpperCase();
  if ((username === 'admin' || username === 'user') && password === 'vite.react') {
    return res.jsonp(formatResponse(createToken(req.body)));
  }

  return res.sendStatus(401);
};
