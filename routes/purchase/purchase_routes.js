/*
 Default module
*/
const express = require('express');
const router = express.Router();


router.use('/pay_ticket', require('./pay_ticket'));

module.exports = router;
