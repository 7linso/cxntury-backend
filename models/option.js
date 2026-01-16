export default (sequelize, DataTypes) => {
  const Option = sequelize.define(
    "Option",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      taskId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { tableName: "task_options" }
  );

  Option.associate = (models) => {
    Option.belongsTo(models.Task, { foreignKey: "taskId" });
    Option.hasMany(models.Answer, { foreignKey: "optionId" });
  };

  return Option;
};
