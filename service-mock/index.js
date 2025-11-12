import jsonServer from 'json-server';

import { getTableList } from './list/index.js';
import { getOngoingProjects } from './project/index.js';
import { getUserProfile, login } from './user/index.js';

import wrapResponse from './utils/response.js';

const host = '0.0.0.0';
const port = '3001';
const mockToken = 'Bearer mock jwt';

const server = jsonServer.create();
const router = jsonServer.router({});
const middlewares = jsonServer.defaults();

const isAuthorized = (token) => {
  return token === mockToken;
};

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
  const responseTime = Math.floor(Math.random() * 1000) + 200;
  setTimeout(() => {
    if (!isAuthorized(req.headers['authorization']) && req.url !== '/api/user/login') {
      return res.status(401).jsonp({
        code: 'UNAUTHORIZED',
        message: 'unauthorized',
      });
    }
    next();
  }, responseTime);
});

server.post('/api/user/login', login);
server.get('/api/user/profile', wrapResponse(getUserProfile));

server.get('/api/list/table-list', wrapResponse(getTableList));
server.get('/api/project/ongoing', wrapResponse(getOngoingProjects));

server.use('/api', router);

server.listen(
  {
    host,
    port,
  },
  function () {
    console.log(`JSON Server is running in http://${host}:${port}`);
  },
);
