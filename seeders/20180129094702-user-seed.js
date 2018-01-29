'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      firstName: "Heraldo",
      lastName: "Yusron",
      email: "heraldoyusrontris@gmail.com",
      username: "heraldoyp",
      password: "heraldoyp",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: "Awtian",
      lastName: "Akbar",
      email: "awtianakbar@gmail.com",
      username: "awtiantian",
      password: "awtiantian",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
