module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  });

  return Users;
};
