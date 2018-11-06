module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('Items', {
    listId: DataTypes.STRING,
    data: DataTypes.STRING,
    updatedAt: DataTypes.TIME,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'listId'],
      },
    ],
  });

  Items.associate = (models) => {
    Items.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Items;
};
