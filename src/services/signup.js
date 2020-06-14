import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';

import models from '../database/models';
import getPriveteKey from '../utils/getPriveteKey';
import config from '../config';

const signToken = promisify(jwt.sign);


export default async (req) => {
  try {
    const { body: { email, password }, body } = req;
    const secretKey = await getPriveteKey(config.secretFile);
    const User = await models.User.findOne({ where: { email } });


    if (User) {
      return {
        status: 400,
        message: 'Email already exists',
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await models.User.create({
      ...body,
      password: hashedPassword,
      // lastLoginDate: new Date(),
    });

    const accessToken = await signToken({ data: newUser }, secretKey, { expiresIn: '1h' }); // 1 hour

    return {
      status: 200,
      message: 'User created successfully',
      accessToken,
      user: newUser,
    };

  } catch (error) {
    let status;
    switch (error.details[0].message) {
      case 'Email non valide !' || 'Password non valide !': {
        status = 401;
        break;
      }
      default:
        status = 401;
        break;
    }
    return ({
      status,
      result: {
        message: error.details[0].message,
      },
    }
    );
  }
};
