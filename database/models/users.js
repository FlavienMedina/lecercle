module.exports = (sequelize, DataTypes) => {

  let users = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    phone: DataTypes.INTEGER,
    password: DataTypes.STRING
  });

  return users;
};
