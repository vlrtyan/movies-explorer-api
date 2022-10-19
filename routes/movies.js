const moviesRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validateMovieBody, validateMovieDeletion } = require('../middlewares/validators');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovieBody, createMovie);
moviesRouter.delete('/:movieId', validateMovieDeletion, deleteMovie);

module.exports = moviesRouter;
