export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      instruction: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { tableName: "tasks" }
  );

  Task.associate = (models) => {
    Task.hasMany(models.Option, { foreignKey: "taskId", as: "task_options" });
    Task.hasMany(models.Answer, { foreignKey: "taskId" });
  };

  return Task;
};
