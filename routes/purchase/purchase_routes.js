/*
 Default module
*/
const express = require('express');
const router = express.Router();


router.use('/purchase', require('./purchase'));

module.exports = router;
