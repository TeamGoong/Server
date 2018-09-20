/*
 Declare module
 */
const express = require('express');
const router = express.Router();
const _crypto = require('crypto');
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
// const upload = require('../../module/multer.js');
const secretKey = require('../../config/secretKey').key;


function encrypt(u_password) {
    const encrypted = _crypto.createHmac('sha512', secretKey).update(u_password).digest('base64');
    return encrypted;
}

router.get('/', async (req, res, next) => {
    const chkToken = jwt.verify(req.headers.authorization);
    if (chkToken == undefined) {
        return next("10403")
    }
    let user_id = chkToken.user_id;
    let getTicketInfoQuery =
        `
        SELECT palace.palace_name, ticket.ticket_people, ticket.ticket_special, ticket.ticket_start,
               ticket.ticket_end, ticket.ticket_review
        FROM palace, ticket
        WHERE ticket.user_id = ? and palace.palace_id = ticket.palace_id
        `;
    try {
        let getTicketInfoResult = await db.Query(getTicketInfoQuery, [user_id]);
        result = getTicketInfoResult[0];
        result.palace_name = getTicketInfoResult[0].palace_name;
        result.ticket_people = getTicketInfoResult[0].ticket_people;
        result.ticket_special = getTicketInfoResult[0].ticket_special;
        result.ticket_start = getTicketInfoResult[0].ticket_start;
        result.ticket_end = getTicketInfoResult[0].ticket_end;
        result.ticket_review = getTicketInfoResult[0].ticket_review;
    } catch (error) {
        return next(error);
    }
    return res.r(result);
});



module.exports = router;
