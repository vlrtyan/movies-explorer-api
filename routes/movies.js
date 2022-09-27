const router = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validateMovieBody } = require('../middlewares/validators');

router.get('/movies', getMovies);
router.post('/movies', validateMovieBody, createMovie);
router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
