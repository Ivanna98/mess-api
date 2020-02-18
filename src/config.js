const customEnv = require('custom-env');

customEnv.env(true);

const config = {
  db: {
    url: process.env.DB_URL || '',
  },
  googleSecret: process.env.GOOGLE_SECRET,
  googleId: process.env.GOOGLE_ID,
  secretKey: process.env.SECRET,
  jwtExpiration: 60,
  testToken: process.env.TOKEN,
};
module.exports = config;
