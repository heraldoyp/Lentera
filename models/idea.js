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

  Idea.prototype.koma = function(angka){
    var string = angka.toString();
    let nu = ''
    let x = 1;
    for(let i = string.length-1; i > -1; i--){
      nu += string[i]
      if(x%3 === 0 && i!==0) nu += ',';
      x++
    }
    return nu.split('').reverse().join('')
  }
  return Idea;
};