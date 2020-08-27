const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const homeController = require('../controllers/home.controller');

// Home page
router.get('/', auth, homeController.index);

module.exports = router;
