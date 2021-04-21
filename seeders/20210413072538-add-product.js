'use strict';

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
     await queryInterface.bulkInsert('Products', 
     [
       {
        id: 1,
        name: "Beras bulog 5kg",
        image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/8/30/0f422c4c-00c6-4432-b59f-8940cb14e1e2.jpg",
        price: 59500,
        stock: 5,
        category: "Bulog",
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        id: 2,
        name: "Beras bulog 15kg",
        image_url: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/9/27/9c156ef5-74cb-4c94-baa4-b672a1ae8373.jpg",
        price: 135000,
        stock: 10,
        category: "Bulog",
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
     await queryInterface.bulkDelete('Products', null, {});
  }
};
