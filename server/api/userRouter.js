const express = require('express');
const UserDAO = require('./../dao/user');

const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
  let regInfo = req.body;

  return UserDAO.createUser(regInfo)
    .then(({ dataValues }) => {
      let { uuid } = dataValues;
      return res.json({ uuid })
    })
    .catch(error => {
      console.log(error);
    });
});

userRouter.post('/auth', (req, res) => {
  let { email } = req.body;
  let uuid;

  return UserDAO.findUser(email)
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
