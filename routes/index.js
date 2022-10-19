const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const ErrorNotFound = require('../errors/ErrorNotFound');
const { validateUserBody, validateAuthentification } = require('../middlewares/validators');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  app.post('/signup', validateUserBody, createUser);
  app.post('/signin', validateAuthentification, login);

  app.use('/users', auth, usersRouter);
  app.use('/movies', auth, moviesRouter);

  app.use((req, res, next) => {
    next(new ErrorNotFound('Пути не существует'));
  });
};
