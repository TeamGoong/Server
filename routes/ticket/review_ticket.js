
const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');
const async = require('async');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');


//후기작성
//POST
router.post('/', async (req, res, next) => {
    let { palace_id, review_traffic, review_crowd, review_attraction, ticket_id } = req.body;
    let {user_id} = req.header;
    let result;
    let review_total = (review_traffic + review_crowd + review_attraction)/3;
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

//후기작성
//GET
router.get('/:palace_id', async (req, res,next) => {
    console.log(req.params.palace_id);

    let selectQuery =
        `
        SELECT avg(review_total) AS total, avg(review_traffic) AS traffic, avg(review_crowd) AS crowd, avg(review_attraction) AS attraction
        FROM review
        WHERE palace_id = ?
        `;

    let result, selectResult ={};
    try {
        selectResult = await db.Query(selectQuery, [req.params.palace_id]);
        selectResult[0].total = selectResult[0].total.toPrecision(2);
    } catch (error) {
        return next(error)
    }
    return res.r(selectResult);
});



module.exports = router;
  