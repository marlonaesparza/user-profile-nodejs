const User = require('../../database/models/user');

class UserDAO {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.findUser = this.findUser.bind(this);
  };

  createUser(params) {
    let { firstName, middleName, lastName, email, password } = params;

    return this.findUser(email)
      .then(user => {
        if (user) {
          throw user;
        };

        return User.create({ firstName, middleName, lastName, email, password })
      });
  };

  findUser(email) {
    return User.findOne({ where: { email: email }});
  };
};

module.exports = new UserDAO;
