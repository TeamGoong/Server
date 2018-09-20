/*
 Default module
*/
const express = require('express');
const router = express.Router();


router.use('/pay_ticket', require('./pay_ticket'));
router.use('/confirm_ticket', require('./confirm_ticket'));

module.exports = router;
