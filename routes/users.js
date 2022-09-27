const router = require('express').Router();

const {
  getUser, updateUser,
} = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/validators');

router.get('/users/me', getUser);
router.patch('/users/me', validateUserUpdate, updateUser);

module.exports = router;
