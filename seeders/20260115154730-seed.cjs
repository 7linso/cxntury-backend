"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const t1 = {
      id: uuidv4(),
      instruction: "Which of the following is NOT an OOP paradigm?",
      createdAt: now,
      updatedAt: now,
    };
    const t2 = {
      id: uuidv4(),
      instruction: "Which one is a JS framework?",
      createdAt: now,
      updatedAt: now,
    };
    const t3 = {
      id: uuidv4(),
      instruction: "HTTP status code for Not Found?",
      createdAt: now,
      updatedAt: now,
    };

    await queryInterface.bulkInsert("tasks", [t1, t2, t3]);

    await queryInterface.bulkInsert("task_options", [
      // ========= Task 1 (OOP paradigm) =========
      {
        id: uuidv4(),
        taskId: t1.id,
        text: "Encapsulation",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t1.id,
        text: "Inheritance",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t1.id,
        text: "Polymorphism",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t1.id,
        text: "Recursion",
        isCorrect: true,
        createdAt: now,
        updatedAt: now,
      },

      // ========= Task 2 (JS framework) =========
      {
        id: uuidv4(),
        taskId: t2.id,
        text: "React",
        isCorrect: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t2.id,
        text: "Django",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t2.id,
        text: "Blazor",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t2.id,
        text: "Angular 2",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },

      // ========= Task 3 (HTTP Not Found) =========
      {
        id: uuidv4(),
        taskId: t3.id,
        text: "401",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t3.id,
        text: "204",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t3.id,
        text: "404",
        isCorrect: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        taskId: t3.id,
        text: "500",
        isCorrect: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("answers", null, {});
    await queryInterface.bulkDelete("task_options", null, {});
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
