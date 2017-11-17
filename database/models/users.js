const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {

  let users = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,

      }
    },
    birthday: DataTypes.DATE,
    phone: DataTypes.INTEGER,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_confirmation: DataTypes.VIRTUAL,
  }, {
    hooks: {
      beforeCreate: user => {
        if (user.password != user.password_confirmation) {
          throw "error passwords don't match";
        }
        let salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  return users;
};
