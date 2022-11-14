const express = require('express');
const UserDAO = require('./../dao/user');

const userRouter = express.Router();

userRouter.get('/all', (req, res) => {
  const offset = req.query.offset;

  return UserDAO.getAllUsers()
    .then((result) => {
      console.log('Get All Users...:', result)
      const users = result.map(({ dataValues }) => {
        return {
          uuid: dataValues.uuid,
          username: dataValues.username
        };
      });

      return res.status(200).send(users);
    })
    .catch(error => {
      console.log(error);
      return res.status(500);
    });
});

userRouter.post('/register', (req, res) => {
  let regInfo = req.body;

  return UserDAO.createUser(regInfo)
    .then(({ dataValues }) => {
      const user = {
        uuid: dataValues.uuid,
        username: dataValues.username
      };
      return res.json(user)
    })
    .catch(error => {
      console.log(error);
    });
});

userRouter.post('/auth', (req, res) => {
  let { username } = req.body;
  let uuid;

  return UserDAO.findUser(username)
    .then(({ dataValues }) => {
      if (!dataValues) {
        throw dataValues;
      };

      uuid = dataValues.uuid;

      let { password, salt } = dataValues;
      return UserDAO.compare(req.body.password, password, salt);
    })
    .then(decision => {
      if (!decision) {
        throw decision;
      };

      return res.json({ uuid })
    })
    .catch(() => {
      res.json({});
    });
});

module.exports = userRouter;
