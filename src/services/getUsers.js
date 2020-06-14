import models from '../database/models';

const getUsers = async () => {
  try {
    const users = await models.User.findAll();
    if (users.length) {
      return {
        status: 200,
        users,

      };
    }
    return {
      status: 404,
      message: 'Table is empty',
    };
  } catch (err) {
    return {
      status: 500,
      error: err.message,
    };
  }
};

export default getUsers;
