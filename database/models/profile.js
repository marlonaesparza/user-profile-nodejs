const { connection, sequelize } = require('./../index');
const User = require('./user');

const Profile = connection.define('Profile', {
  id: {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  picture: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  banner: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  cover_letter: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  website: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  age: {
    type: sequelize.DataTypes.INTEGER,
    allowNull: true,
    unique: false
  }
}, {
  tableName: 'profiles'
});

Profile.belongsTo(User, { foreignKey: 'uuid', targetKey: 'uuid'})

Profile.sync({ force: true })
  .then(() => {
    console.log('Profiles table recreated succesfully');
  });

module.exports = Profile;
