/*
 Default module
*/
const express = require('express');
const router = express.Router();

router.use('/mypage', require('./mypage/mypage_routes'));
router.use('/user', require('./user/user_routes'));
router.use('/ticket', require('./ticket/ticket_routes'));

module.exports = router;
