
const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');
const async = require('async');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');


//후기작성

router.post('/', async (req, res, next) => {
    let { palace_id, review_traffic, review_crowd, review_attraction, ticket_id } = req.body;
    let {user_id} = req.header;
    let result;
    let review_total = parseInt((review_traffic + review_crowd + review_attraction)/3, 10);
    let Query = 
        ` 
        INSERT INTO review(palace_id, review_total, review_traffic, review_crowd, review_attraction, ticket_id)
        VALUES(?,?,?,?,?,?)
        `
    try {
        result = await db.Query(Query, [palace_id, review_total, review_traffic, review_crowd, review_attraction, ticket_id]);    
        let ticketQuery = ` 
               UPDATE goongs.ticket SET ticket_review = '1'
               WHERE (ticket_id = ?);
             `

        await db.Query(ticketQuery, [ticket_id]);
        } catch (error) {
        return next(error);
    }

        
    return res.r(result);
});

module.exports = router;
  