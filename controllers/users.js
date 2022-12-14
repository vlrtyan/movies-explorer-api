const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../config');

const MONGO_DUPLICATE_ERROR_CODE = 11000;

module.exports.getUser = (req, res, next) => {
  Users.findById(req.user._id)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  Users.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('E-mail занят'));
      } else if
        (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        next(new ConflictError('E-mail занят'));
      } else {
        const {
          name, about, avatar, email, password,
        } = req.body;
        bcrypt
          .hash(password, 10)
          .then((hash) => Users.create({
            name, about, avatar, email, password: hash,
          })
            .then((newUser) => Users.findOne({ _id: newUser._id }))
            .then((newUser) => res.send({ data: newUser })));
      }
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError('E-mail занят'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email }).select('+password')
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, foundUser.password)
        .then((matched) => {
          if (!matched) { return Promise.reject(new UnauthorizedError('Неправильные почта или пароль')); }
          return jwt.sign(
            { _id: foundUser._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
        })
        .then((token) => {
          res.send({ token });
        });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        next(new UnauthorizedError('Неправильные почта или пароль'));
      } else {
        next(err);
      }
    });
};
