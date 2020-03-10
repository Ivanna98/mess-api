const configApp = require('./app');

const PORT = process.env.PORT || 3002;

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

const server = init();

module.exports = server;
