const express = require('express');
const UserDAO = require('./../dao/user');

const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
  let regInfo = req.body;

  return UserDAO.createUser(regInfo)
    .then(result => {
      let { uuid } = result.dataValues;
      return res.json({ uuid })
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = userRouter;
