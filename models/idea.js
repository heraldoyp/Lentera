'use strict';
module.exports = (sequelize, DataTypes) => {
  var Idea = sequelize.define('Idea', {
    overview: DataTypes.STRING,
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    total_funding: DataTypes.INTEGER,
    goal_funding: DataTypes.INTEGER
  });

  Idea.associate = function(models){
    Idea.hasMany(models.Perk)
    Idea.belongsToMany(models.User, {through:"UserIdea"})
    // Idea.hasMany(models.UserIdea)
  }

  Idea.prototype.progress = function() {
    return Math.floor((this.total_funding/this.goal_funding)*100)
  }
  return Idea;
};