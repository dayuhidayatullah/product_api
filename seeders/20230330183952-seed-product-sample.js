"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          id: 3000000000000,
          name: "Celana",
          qty: 2,
          picture:
            "data:image/jpeg;base64,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",
          expiredAt: new Date("2023-04-26"),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
