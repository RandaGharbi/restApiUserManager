
/* eslint-disable prefer-destructuring */
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import getPriveteKey from './getPriveteKey';
import config from '../config';

const verifyToken = promisify(jwt.verify);

const getToken = (params) => {
  const accessToken =
    params.body.token ||
    params.query.token ||
    params.headers['x-access-token'] ||
    params.headers.authorization ||
    params.session.token;
  if (!accessToken) {
    return false;
  } else if (accessToken.startsWith('Bearer ')) {
    const [, newtoken] = accessToken.trim().split(" ");
    return newtoken;
  } else {
    return accessToken;
  }
};

export default async (req, res, next) => {
  try {
    const secretKey = await getPriveteKey(config.secretFile);
    const accessToken = getToken(req);
    if (accessToken) {
      const user = await verifyToken(accessToken, secretKey);
      if (!user) {
        return res.status(401).send({
          message: 'Failed to authenticate, please update your token.',
        });
      }
      req.user = user;
      next();
      return null;
    }
    return res.status(403).send({
      message: 'No token provided.',
    });
  } catch (err) {
    return res.status(500).send({
      error: err,
    });
  }
};
