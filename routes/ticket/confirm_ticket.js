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
    let result,real_result;
    let getTicketInfoQuery =
        `
        SELECT palace.palace_name, ticket.ticket_people, ticket.ticket_special, ticket.ticket_start,
               ticket.ticket_end, ticket.ticket_review
        FROM palace, ticket
        WHERE ticket.user_id = ? and palace.palace_id = ticket.palace_id
        `;
    try {
        let getTicketInfoResult = await db.Query(getTicketInfoQuery, [user_id]);
        for(let i=0; i<getTicketInfoResult.length; i++){
          result = getTicketInfoResult[i];
          result.palace_name = getTicketInfoResult[i].palace_name;
          result.ticket_people = getTicketInfoResult[i].ticket_people;
          result.ticket_special = getTicketInfoResult[i].ticket_special;
          result.ticket_start = getTicketInfoResult[i].ticket_start;
          result.ticket_end = getTicketInfoResult[i].ticket_end;
          result.ticket_review = getTicketInfoResult[i].ticket_review;
          real_result.push(result);
        }

    } catch (error) {
        return next(error);
    }
    return res.r(real_result);
});



module.exports = router;
