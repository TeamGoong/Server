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
    let tmp_result,result,end_flag;
    let today = new Date();
    // 오늘 날짜를 YYYYMMDD형식으로 변환
    today = today.toISOString().slice(0,10).replace(/-/g,"");

    let getTicketInfoQuery =
        `
        SELECT palace.palace_name, ticket.ticket_people, ticket.ticket_title, ticket.ticket_flag, ticket.ticket_start,
               ticket.ticket_end, ticket.ticket_review
        FROM palace, ticket
        WHERE ticket.user_id = ? and palace.palace_id = ticket.palace_id
        `;
    try {
        let getTicketInfoResult = await db.Query(getTicketInfoQuery, [user_id]);


        for(let i=0; i<getTicketInfoResult.length; i++){
          tmp_result = getTicketInfoResult[i];
          tmp_result.palace_name = getTicketInfoResult[i].palace_name;
          tmp_result.ticket_people = getTicketInfoResult[i].ticket_people;
          tmp_result.ticket_title = getTicketInfoResult[i].ticket_title;
          tmp_result.ticket_flag = getTicketInfoResult[i].ticket_flag;
          tmp_result.ticketStart = getTicketInfoResult[i].ticket_start;
          tmp_result.ticketEnd = getTicketInfoResult[i].ticket_end;
          tmp_result.ticket_review = getTicketInfoResult[i].ticket_review;

          getTicketInfoResult[i].ticket_end = getTicketInfoResult[i].ticket_end.toISOString().slice(0,10).replace(/-/g,"");
          if(today < getTicketInfoResult[i].ticket_end) end_flag = 0;
          else end_flag = 1;
          
          tmp_result.end_flag = end_flag;
          result.push(tmp_result);
        }

    } catch (error) {
        return next(error);
    }
    return res.r(real_result);
});



module.exports = router;
