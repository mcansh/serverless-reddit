const polka = require('polka');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { PORT = 4000 } = process.env;

app
  .prepare()
  .then(() => {
    const server = polka();

    server.get('/r/:fetch', (req, res) => {
      const actualPage = '/';
      const queryParams = { fetch: req.params.fetch };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
