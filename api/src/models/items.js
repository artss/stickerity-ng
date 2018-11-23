module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('Items', {
    listId: DataTypes.TEXT,
    data: DataTypes.TEXT,
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
