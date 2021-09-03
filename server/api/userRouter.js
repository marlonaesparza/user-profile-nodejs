const express = require('express');
const UserDAO = require('./../dao/user');

const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
  let params = req.body;
  console.log('User Router - / :', params);

  return UserDAO.createUser(params)
    .then(({ uuid }) => {
      return res.json({ uuid })
    })
});

module.exports = userRouter;
