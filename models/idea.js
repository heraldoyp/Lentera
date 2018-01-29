'use strict';
module.exports = (sequelize, DataTypes) => {
  var Idea = sequelize.define('Idea', {
    overview: DataTypes.STRING,
    image: DataTypes.STRING,
    title: DataTypes.STRING
  });

  Idea.associate = function(models){
    Idea.hasMany(models.Perk)
    Idea.belongsToMany(models.User, {through:"UserIdea"})
    Idea.hasMany(models.UserIdea)
  }
  return Idea;
};