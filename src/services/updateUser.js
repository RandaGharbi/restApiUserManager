import models from '../database/models';

const updateUser = async ({ params: { id = '' }, body = {} }) => {
  try {
    const getProfile = await models.User.findByPk(id);
    if (!getProfile) {
      return {
        code: 404,
        error: `User (${id}) not found`,
      };
    }
    const profile = await getProfile.toJSON();
    const updatedProfil = { ...profile, ...body };
    const userUpdated = await models.User.update(updatedProfil, {
      where: { id: profile.id },
    });
    return {
      status: 200,
      message: 'User updated successfully',
      userUpdated,
    };
  } catch (err) {
    return {
      status: 500,
      error: err.message,
    };
  }
};

export default updateUser;
