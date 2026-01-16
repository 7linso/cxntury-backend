export default (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    "Answer",
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
      optionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      sessionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { tableName: "answers" }
  );

  Answer.associate = (models) => {
    Answer.belongsTo(models.Session, { foreignKey: "sessionId" });
    Answer.belongsTo(models.Task, { foreignKey: "taskId" });
    Answer.belongsTo(models.Option, { foreignKey: "optionId" });
  };

  return Answer;
};
