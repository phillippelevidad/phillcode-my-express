const routes = [];

function addRoute(path, method, handler) {
  // /api/data > /\/api\/data/g
  // /api/data/{index}/outro/{parametro} > /\/api\/data\/([^/]+)\/outro\/([^/]+)/g
  const params = [];
  const regexPath = path.replace(/{(\w+)}/g, (match, param) => {
    params.push(param);
    return "([^/]+)";
  });
  const regex = new RegExp(`^${regexPath}$`);

  routes.push({ path: regex, params, method, handler });
}

function handleRequest(req, res) {
  const route = routes.find(
    (route) => route.path.test(req.url) && req.method === route.method
  );

  if (route) {
    req.params = {};
    if (route.params.length) {
      const match = route.path.exec(req.url);
      route.params.forEach((param, index) => {
        const value = match[index + 1];
        req.params[param] = value;
      });
    }

    route.handler(req, res);
    return true;
  }

  return false;
}

module.exports = {
  addRoute,
  handleRequest,
};
