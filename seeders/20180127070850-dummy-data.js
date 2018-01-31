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

    return queryInterface.bulkInsert('Ideas', [ {
      overview: `MUZEN OTR Wood (Radio Caroline Edition) is a desktop radio speaker that embrace the  traditional design of old radios with modern wireless technology. Crafted with heart with a big mission. <br>
      Small Body with Big Sound <br>
      Vintage Design <br>
      Made from Natural Wood <br>
      Sophisticated Craftsmanship <br>
      Bluetooth & FM Receiver <br>
      10-hour Playtime`,
      image: 'https://i.imgur.com/RiDEmq4.png',
      title: "Muzen OTR Wood",
      total_funding: 0,
      goal_funding: 5000000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      overview: `WHO'S WATCHING YOUR STUFF WHEN YOU'RE NOT AROUND?<br>
      <br>
      Duo by Simtek is the ONLY portable, all-in-one security sensor that allows you to instantly secure any space, and get text alerts when there's a problem. You don't need wifi, external power, or hubs. <br>
      <br>
      An extra layer of security where you need it most. Keep important things safe - medicine cabinet, home safe, hotel luggage, storage unit, cars and trailers and much more.<br>
      <br>
      NOTE: On mobile, click "READ THE STORY."`,
      image: 'https://i.imgur.com/X9q3pA3.jpg',
      title: "Duo By Simtek",
      total_funding: 0,
      goal_funding: 2000000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});


  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Ideas', null, {});
  }
};
