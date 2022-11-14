const User = require('../../database/models/user');
const utils = require('./../lib/hashUtils');

class UserDAO {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.findUser = this.findUser.bind(this);
  };

  createUser(regInfo) {
    let { username, password } = regInfo;
    let salt = utils.createRandom32String();

    let user = {
      username,
      password: utils.createHash(password, salt),
      salt
    };

    return this.findUser(username)
      .then(result => {
        if (result) {
          throw result;
        };

        return User.create(user)
      });
  };

  getAllUsers(offset) {
    return User.findAll();
  }

  findUser(username) {
    return User.findOne({ where: { username: username }});
  };

  compare(attempted, password, salt) {
    return utils.compareHash(attempted, password, salt);
  };
};


module.exports = new UserDAO;
