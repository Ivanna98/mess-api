import jwt from 'jsonwebtoken';
import { config } from '../config';

const { secretKey, jwtExpiration } = config;

interface Payload {
  id: string;
}

export const generateToken = (payload: Payload) => new Promise<string>((resolve, reject) => {
  jwt.sign(payload, secretKey, { expiresIn: jwtExpiration },
    (err, token: string) => {
      if (err) {
        reject(Error('Error token'));
      }
      resolve(token);
    });
});
