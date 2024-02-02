const http = require("http");

function myExpress() {
  const app = {};
  const routes = [];
  const middlewares = [];

  app.use = (middleware) => {
    middlewares.push(middleware);
  };

  app.get = (path, handler) => {
    routes.push({ path, method: "GET", handler });
  };

  app.post = (path, handler) => {
    routes.push({ path, method: "POST", handler });
  };

  app.listen = (port, callback) => {
    const server = http.createServer((req, res) => {
      let i = 0;
      function next() {
        const middleware = middlewares[i++];
        if (middleware) {
          middleware(req, res, next);
          return;
        }

        const route = routes.find(
          (route) => req.url === route.path && req.method === route.method
        );

        if (route) {
          route.handler(req, res);
          return;
        }

        res.statusCode = 404;
        res.end("Not Found");
      }

      next();
    });

    server.listen(port, callback);
  };

  return app;
}

module.exports = myExpress;
