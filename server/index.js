const express = require('express');
const compression = require('compression');
const next = require('next');
const routes = require('../routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const admin = require('firebase-admin');
const serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://svpp-1532e.firebaseio.com',
});

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, err => {
      if (err) throw err;
      console.log('> Ready on port ' + PORT);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
