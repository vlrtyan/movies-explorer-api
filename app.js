require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  login, createUser,
} = require('./controllers/users');
const { validateUserBody, validateAuthentification } = require('./middlewares/validators');
const { isAuthorised } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const ErrorNotFound = require('./errors/ErrorNotFound');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(cors());

app.use(requestLogger);

app.post('/signup', validateUserBody, createUser);
app.post('/signin', validateAuthentification, login);

app.use(isAuthorised);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.use((req, res, next) => {
  next(new ErrorNotFound('Пути не существует'));
});

app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованная обработка ошибок
app.use(errorHandler);

app.listen(PORT);
