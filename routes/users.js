const usersRouter = require('express').Router();

const {
  getUser, updateUser,
} = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/validators');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', validateUserUpdate, updateUser);

module.exports = usersRouter;
