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
    return queryInterface.bulkInsert('Perks', [{
      title: "Bronze",
      amount_donated: "15000",
      items: `<li>USB Cable</li>`,
      IdeaId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Silver",
      amount_donated: "25000",
      items: `<li>Travel Pouch</li>
      <li>USB Cable</li>
      <li>Dustless Cloth</li>
      <li>Stickers & Postcards</li>`,
      IdeaId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Gold",
      amount_donated: "50000",
      items: `<li>MUZEN OTR Wood - RC Edition</li>
      <li>Travel Pouch</li>
      <li>USB Cable</li>
      <li>Dustless Cloth</li>
      <li>Stickers & Postcards</li>`,
      IdeaId:1,
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
    return queryInterface.bulkDelete('Perks', null, {});
  }
};
