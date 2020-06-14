export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
      },
      familyName: {
        field: 'family_name',
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      lastLoginDate: {
        field: 'last_login_date',
        type: DataTypes.DATE,
      }
    },
    { underscored: true, sequelize, modelName: 'user' },
  );
  return User;
};
