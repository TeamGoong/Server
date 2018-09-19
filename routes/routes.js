/*
 Default module
*/
const express = require('express');
const router = express.Router();

router.use('/mypage', require('./mypage/mypage_routes'));
router.use('/user', require('./user/user_routes'));
router.use('/purchase', require('./user/user_routes'));

module.exports = router;
