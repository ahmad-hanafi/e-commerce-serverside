'use strict';
const {hashPassword} = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', 
     [
       {
         email: 'aman@kak.com',
         password: hashPassword("aman"),
         roles: "admin",
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        email: 'budi@mail.com',
        password: hashPassword("budi"),
        roles: "Customer",
        createdAt: new Date(),
        updatedAt: new Date()
       }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
