const customEnv = require('custom-env');

customEnv.env(true);

const config = {
  db: {
    url: process.env.DB_URL || '',
  },
};
module.exports = config;
