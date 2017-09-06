const https = require('https');
const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '../public')
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});


app.get('/recebimento/bundle.js', (req, res) => {
  const bundle = fs.readFileSync(path.join(__dirname, '../public/bundle.js'));
  res.send(bundle);
});

app.get('/recebimento/style.css', (req, res) => {
  const bundle = fs.readFileSync(path.join(__dirname, '../public/style.css'));
  res.send(bundle);
});


app.use(jsonServer.rewriter({
  '/discovery/api/commands/*': '/$1',
  '/discovery/api/queries/searchs': '/searchs',
  '/discovery/api/*': '/$1',
  '/identidades/oauth/token': '/token',
  '/identidades/user': '/user'
}));

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
