import { formatResponse } from '../utils/response.js';

let role;

export const getUserAccount = () => {
  return { username: '吴彦祖', role, id: '1111', position: '高级搬砖专家' };
};

export const login = (req, res) => {
  const { username, password } = req.body;
  role = username.toLocaleUpperCase();
  if ((username === 'admin' || username === 'user') && password === 'vite.react') {
    return res.jsonp(formatResponse(createToken(req.body)));
  }

  return res.sendStatus(401);
};
