const configApp = require('./app');
const config = require('./config');

const PORT = config.port;

const init = async () => {
  try {
    const server = await configApp();

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT} `);
    });
  } catch (error) {
    console.log(error.message);
  }
};
init();
