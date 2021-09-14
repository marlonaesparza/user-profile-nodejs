const User = require('../../database/models/user');
const utils = require('./../lib/hashUtils');

class UserDAO {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.findUser = this.findUser.bind(this);
  };

  createUser(regInfo) {
    let { firstName, middleName, lastName, email, password } = regInfo;
    let salt = utils.createRandom32String();

    let user = {
      firstName,
      middleName,
      lastName,
      email,
      password: utils.createHash(password, salt),
      salt
    };

    return this.findUser(email)
      .then(result => {
        if (result) {
          throw result;
        };

        return User.create(user)
      });
  };

  findUser(email) {
    return User.findOne({ where: { email: email }});
  };

  compare(attempted, password, salt) {
    return utils.compareHash(attempted, password, salt);
  };
};

module.exports = new UserDAO;
