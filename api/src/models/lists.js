module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define('Lists', {
    data: DataTypes.STRING,
    updatedAt: DataTypes.TIME,
  },
  {
    indexes: [
      {
        fields: ['userId'],
      },
    ],
  });

  Lists.associate = (models) => {
    Lists.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Lists;
};
