const express = require('express');
const userControl = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', userControl.signup);
router.post('/login', userControl.login);
router.post('/games', userControl.saveGame);
router.get('/games/:id', userControl.fetchGames);

module.exports = router;