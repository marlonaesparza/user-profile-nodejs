const User = require('../../database/models/user');

class UserDAO {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.findUser = this.findUser.bind(this);
  };

  createUser(params) {
    // params = { firstName, middleName, lastName, email, password }

    // 1. Check if user exists
    //    - If yes respond w/ error message.
    //    - If no, continue.
    // 2. Create a user.
    // 3. Use results:
    //    - results.insertId to get uuid
    //    - OR, get uuid from results itself
    // 4. Respond with uuid.

    let { firstName, middleName, lastName, email, password } = params;

    return this.findUser(email)
      .then(user => {
        console.log('Create User (1):', user);
        if (user) {
          throw user;
        };

        return User.create({ firstName, middleName, lastName, email, password })
      });
  };

  findUser(email) {
    console.log('Find User:', email);
    return User.findOne({ where: { email: email }});
  };
};

module.exports = new UserDAO;
