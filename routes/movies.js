const moviesRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validateMovieBody } = require('../middlewares/validators');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovieBody, createMovie);
moviesRouter.delete('/:movieId', deleteMovie);

module.exports = moviesRouter;
