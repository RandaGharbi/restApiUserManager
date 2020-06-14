import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';

import models from '../database/models';
import getPriveteKey from '../utils/getPriveteKey';
import config from '../config';

const signToken = promisify(jwt.sign);

const login = async (req) => {
  const { body: { email, password } } = req;
  try {
    const secretKey = await getPriveteKey(config.secretFile);
    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return {
        status: 400,
        message: 'Invalid password',
      };
    }

    const accessToken = await signToken({ data: user }, secretKey, { expiresIn: '1h' });
    await models.User.update({
      ...user,
      lastLoginDate: new Date(),
    }, { where: { email } });

    return {
      status: 200,
      accessToken,
      user,
    };
  } catch (err) {
    return {
      status: 500,
      message: err.message,
    };
  }
};

export default login;


