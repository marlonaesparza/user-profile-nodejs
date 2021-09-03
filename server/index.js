require('dotenv').config({path: __dirname + '/../.env'});
require('./../database/index');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8002;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const userRouter = require('./api/userRouter');
const profileRouter = require('./api/profileRouter');

app.use('/user', userRouter);
app.use('/profile', profileRouter);

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
