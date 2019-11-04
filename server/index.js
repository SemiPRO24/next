const express = require('express');
const compression = require('compression');
const next = require('next');
const routes = require('../routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

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
