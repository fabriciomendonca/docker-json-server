const https = require('https');
const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '/custom/db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, './public')
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

const customStaticsFilePath = path.join(__dirname, '/custom/statics.json');
if (fs.existsSync(customStaticsFilePath)) {
  const requests = JSON.parse(fs.readFileSync(customStaticsFilePath));
  requests.forEach((request) => {
    app[request.method](request.url, (req, res) => {
      let filePath = request.file.path;
      if (request.file.is_relative) {
        filePath = path.join(__dirname, filePath);

        res.send(fs.readFileSync(filePath));
      } else {
        https.get(filePath, response => {
          let body = '';
          response.on('data', (content) => {
            body += content;
          });

          response.on('end', () => {
            res.send(body);
          })
        });
      }
    });
  });
}

const routesFilePath = path.join(__dirname, '/custom/routes.json');
if (fs.existsSync(routesFilePath)) {
  const routes = fs.readFileSync(routesFilePath);
  app.use(jsonServer.rewriter(JSON.parse(routes)));
}

app.use(middlewares);
app.use(router);

const options = {
  key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem'))
};

const server = https.createServer(options, app);

server.listen(8000, () => {
  console.log('Listening on port 8000');
});
