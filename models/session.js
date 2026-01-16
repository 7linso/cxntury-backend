export default (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "Session",
    {
      id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
      token: { type: DataTypes.STRING(64), allowNull: false, unique: true },
      validTill: { type: DataTypes.DATE, allowNull: true },
    },
    { tableName: "sessions" }
  );

  Session.associate = (models) => {
    Session.hasMany(models.Answer, { foreignKey: "sessionId" });
  };

  return Session;
};
