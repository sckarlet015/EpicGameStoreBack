const server = require('./src/app.js');
const {
  conn
} = require('./src/db.js');

// Syncing all the models at once.
conn.sync({
  force: true
}).then(async () => {
  server.listen(3001, () => {
    console.log('Servidor en el puerto 3001'); // eslint-disable-line no-console
  });
}); 