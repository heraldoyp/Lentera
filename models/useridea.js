'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserIdea = sequelize.define('UserIdea', {
    UserId: DataTypes.INTEGER,
    IdeaId: DataTypes.INTEGER,
    invoice: DataTypes.STRING
  });

  UserIdea.associate = function(models){
    UserIdea.belongsTo(models.User)
    UserIdea.belongsTo(models.Idea)
  }
  return UserIdea;
};