"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("answers", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      taskId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tasks",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      optionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "task_options",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      sessionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "sessions",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("answers", ["sessionId", "taskId"], {
      unique: true,
      name: "uniq_answers_session_task",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("answers");
  },
};
