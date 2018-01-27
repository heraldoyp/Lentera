'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ideas = sequelize.define('Ideas', {
    overview: DataTypes.STRING,
    image: DataTypes.STRING,
    option: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ideas;
};