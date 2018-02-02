'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { 
        isAlpha: {
          args: true,
          msg: "first name hanya boleh menggunakan huruf a-z!"
        }
       }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: { 
        isAlpha: {
          args: true,
          msg: "last name hanya boleh menggunakan huruf a-z atau kosong!"
        }
       }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: { 
        isEmail: true,
        isUnique(value, next) {
          User.findOne({where: {email: value}})
          .then(data => {
            data ? next('email yang anda gunakan telah dipakai!') : next();
        })}
       }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
      validate: {
        isLowercase: {
          args: true,
          msg: "username harus menggunakan huruf kecil!"
        }, 
        isAlpha: {
          args: true,
          msg: "username hanya boleh menggunakan huruf a-z!"
        },
        isUnique(value, next) {
          User.findOne({where: {username: value}})
          .then(data => {
            data ? next('username yang anda inginkan telah dipakai!') : next();
        })},
       }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null
    }
  });

  User.associate = function(models){
    // User.hasMany(models.UserIdea)
    User.belongsToMany(models.Idea, {through:"UserIdea"})
    // User.hasMany(models.Idea)
  }

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
    .then(hash=>{
      user.password = hash;
    })
  })


  User.beforeUpdate((instance, options)=>{
    bcrypt.hash(user.password, 10)
    .then(hash=>{
      user.password =hash;
    })
  })
  return User;
};