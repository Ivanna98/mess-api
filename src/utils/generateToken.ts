import jwt from 'jsonwebtoken';
import { config } from '../config';

const { secretKey, jwtExpiration } = config;

export const generateToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, secretKey, { expiresIn: jwtExpiration },
    (err, token) => {
      if (err) {
        reject(Error('Error token'));
      }
      resolve(token);
    });
});
