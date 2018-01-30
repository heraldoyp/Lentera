'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { 
        isAlpha: true
       }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { 
        isAlpha: true
       }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { 
        isEmail: true
       }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: {
        isLowercase: true, 
        isAlpha: true
       }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: {
        isAlphanumeric: true
       }
    }
  });

  User.associate = function(models){
    User.hasMany(models.UserIdea)
    User.belongsToMany(models.Idea, {through:"UserIdea"})
  }
  return User;
};