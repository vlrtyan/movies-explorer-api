const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля - 2 символа',
        'string.max': 'максимальная длина поля - 30 символов',
        'string.required': 'поле должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'поле должно содержать email',
        'string.required': 'поле должно быть заполнено',
      }),
    password: Joi.string().required().min(6)
      .messages({
        'string.min': 'минимальная длина пароля - 6 символа',
        'string.required': 'поле должно быть заполнено',
      }),
  }),
});

module.exports.validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'number.required': 'поле должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть url-адресом');
    })
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть url-адресом');
    })
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть url-адресом');
    })
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.required': 'поле должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.required': 'поле должно быть заполнено',
      }),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля - 2 символа',
        'string.max': 'максимальная длина поля - 30 символов',
        'string.required': 'поле должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'поле должно содержать email',
        'string.required': 'поле должно быть заполнено',
      }),
  }),
});

module.exports.validateAuthentification = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'поле должно содержать email',
        'string.required': 'поле должно быть заполнено',
      }),
    password: Joi.string().required().min(6)
      .messages({
        'string.min': 'минимальная длина пароля - 6 символа',
        'string.required': 'поле должно быть заполнено',
      }),
  }),
});

module.exports.validateMovieDeletion = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});
