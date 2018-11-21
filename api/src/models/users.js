module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.TEXT,
    name: DataTypes.TEXT,
    salt: DataTypes.TEXT,
    password: DataTypes.TEXT,
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
