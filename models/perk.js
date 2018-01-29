'use strict';
module.exports = (sequelize, DataTypes) => {
  var Perk = sequelize.define('Perk', {
    title: DataTypes.STRING,
    amount_donated: DataTypes.STRING,
    items: DataTypes.TEXT,
    IdeaId: DataTypes.INTEGER
  });

  Perk.associate = function(models){
    Perk.belongsTo(models.Idea, {foreignKey: "IdeaId"})
  }
  return Perk;
};