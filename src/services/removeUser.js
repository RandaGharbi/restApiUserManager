import models from '../database/models';

const removeUser = async ({ params: { id = '' } }) => {
  try {
    const deleteUser = await models.User.destroy({
      where: {
        id
      }
    });
    if (deleteUser) {
      return {
        status: 200,
        result: {
          message: 'User deleted successfully',
        },
      };
    }
    return {
      status: 404,
      result: {
        message: 'User not found',
      },
    };
  } catch (error) {
    return {
      status: 500,
      result: {
        message: 'Server Fail',
      },
    };
  }
};

export default removeUser;
