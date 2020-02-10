const customEnv = require('custom-env');

customEnv.env(true);

const config = {
  db: {
    url: process.env.DB_URL || '',
  },
  googleSecret: process.env.GOOGLE_SECRET,
  googleId: process.env.GOOGLE_ID,
};
module.exports = config;
