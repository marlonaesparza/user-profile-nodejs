const { connection, sequelize } = require('./../index');

const User = connection.define('User', {
  uuid: {
    type: sequelize.DataTypes.UUID,
    defaultValue: sequelize.DataTypes.UUIDV4,
    unique: true,
    primaryKey: true
  },
  firstName: {
    type: sequelize.DataTypes.STRING(50),
    allowNull: false,
    unique: false
  },
  middleName: {
    type: sequelize.DataTypes.STRING(50),
    allowNull: true,
    unique: false
  },
  lastName: {
    type: sequelize.DataTypes.STRING(50),
    allowNull: false,
    unique: false
  },
  email: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: sequelize.DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  verified: {
    type: sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'users'
});

User.sync({ force: true })
  .then(() => {
    console.log('Users table recreated succesfully');
  });

module.exports = User;