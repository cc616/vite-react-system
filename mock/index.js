const jsonServer = require('json-server');
const db = require('./db.js');

const host = '0.0.0.0';
const port = '3001';
const mockToken = 'Bearer mock jwt'

const server = jsonServer.create();
const router = jsonServer.router(db());
const middlewares = jsonServer.defaults();

const createToken = () => {
  return mockToken;
}

const isAuthorized = (token) => {
  return token === mockToken;
}

let role

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
  if (req.url === '/api/user/login') {
    const { username, password } = req.body
    role = username.toLocaleUpperCase()
    if ((username === 'admin' || username === 'user') && password === 'vite.react') {
      return res.jsonp({
        code: "SUCCESS",
        data: createToken(req.body),
        message: "success",
      });
    }

    return res.sendStatus(401);
  }
  if (!isAuthorized(req.headers['authorization'])) {
    return res.status(401).jsonp({
      code: 'UNAUTHORIZED',
      message: 'unauthorized'
    });
  }

  if (req.url === '/api/user/profile') {
    return res.jsonp({
      code: "SUCCESS",
      data: { username: '吴彦祖', role, id: '1111', position: '高级搬砖专家' },
      message: "success",
    });
  }

  next();
})

router.render = (req, res) => {
  res.jsonp({
    code: "SUCCESS",
    data: res.locals.data,
    message: "success"
  });
}

server.use(jsonServer.rewriter(
  {
    "/api/": "/",
    "/api/user/list": "/api/userList",
    "/api/project": "/api/project",
  }
));
server.use('/api', router);

server.listen({
  host,
  port,
}, function() {
  console.log(`JSON Server is running in http://${host}:${port}`);
});
