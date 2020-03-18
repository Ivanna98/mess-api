
import customEnv from 'custom-env';

customEnv.env(true);

export const config = {
  db: {
    url: process.env.DB_URL || '',
  },
  port: process.env.PORT || 3002,
  feUrl: process.env.FE_URL || '',
  cbUrl: process.env.CB_URL || '',
  googleSecret: process.env.GOOGLE_SECRET || '',
  googleId: process.env.GOOGLE_ID || '',
  secretKey: process.env.SECRET || '',
  jwtExpiration: 5184000,
};
