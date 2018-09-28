
const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');
const async = require('async');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');

router.post('/', async (req, res, next) => {
    let { palace_id, ticket_title, ticket_start, ticket_end, ticket_person, ticket_special, ticket_jongro } = req.body;
    let {user_id} = req.header;
    let result;
    let Query =
        `
        INSERT INTO ticket(user_id, palace_id, ticket_title, ticket_start, ticket_end, ticket_person, ticket_special, ticket_jongro)
        VALUES(?,?,?,?,?,?,?,?)
        `
    try {
        result = await db.Query(Query, [user_id, palace_id, ticket_title, ticket_start, ticket_end, ticket_person, ticket_special, ticket_jongro]);
        } catch (error) {
        return next(error);
    }


    return res.r(result);
});




module.exports = router;
