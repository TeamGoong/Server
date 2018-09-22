/*
 Method : POST
 */
// Written By 서연
// 카카오 로그인 사용자 정보 가져오기
const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');
const async = require('async');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const request = require('request-promise');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/', async(req, res, next) => {
  // 카카오톡 access token
  let accessToken = req.body.accessToken;
  if(!accessToken){
    return next("401");
  }

  let option = {
    method : 'GET',
    uri: 'https://kapi.kakao.com/v2/user/me',
    json : true,
    headers : {
      'Authorization': "Bearer " +  accessToken
    }
  }

  try {
    let kakaoResult = await request(option);

    let result = {};

    result.thumbnail_image = kakaoResult.properties.thumbnail_image;
    result.age_range = kakaoResult.properties.age_range;

    var user_img = kakaoResult.properties.thumbnail_image;
    var user_age = kakaoResult.properties.age_range;
    var user_email= kakaoResult.properties.email;

    var token;

    var chkToken;

    if(req.headers.authorization != undefined){
      chkToken = jwt.verify(req.headers.authorization);
    }

    console.log(chkToken);
    console.log(jwt.verify(chkToken));

    let checkEmailQuery =
    `
    SELECT * FROM user
    WHERE user_email = ?
    `;

    let insertQuery =
    `
    INSERT INTO user (user_age, user_img, user_email)
    VALUES (?, ?, ?);
    `;

    if(chkToken != undefined){ // 토큰이 이미 있는 경우 (로그인 되어있는 경우)
      console.log("토큰이 있습니다");
      if(chkToken.email == user_email){
        console.log("성공적으로 로그인 되었습니다");
        token = jwt.sign(user_email);
        res.status(200).send({
            result : {
            message : "success",
            token : req.headers.authorization
            }   
        });
      } else { // 토큰이 만료된 경우 재발급
        console.log("기간이 만료되었습니다. 재발급 합니다");
        token = jwt.sign(user_email);
        res.status(200).send({
            "result" : {
            message : "your token ended and reissue new token",
            token : token
            }
          });
        } 
    }
    else { // 토큰이 없는 경우
        let checkEmail = await db.queryParamCnt_Arr(checkEmailQuery,[user_email]);

        if(checkid.length != 0){ // 기기를 변경했을 경우
            console.log("다른기기에서 접속했습니다");
            token = jwt.sign(user_email);
            res.status(200).send({
                "result" : {
                    message : "new device login",
                    token : token
                }
            });
        } else{ // 다른 기기이고 회원이 아닐때
            console.log("비회원입니다.")

            
            await db.queryParamCnt_Arr(insertQuery, [user_age, user_img, user_,email]);
            let insertResult = await db.queryParamCnt_Arr(insertQuery,[user_age, user_img ,user_email]); 

            token = jwt.sign(user_email);
            console.log(token);
            
            res.status(200).send({
                "result" : {
                    message : "sign up success",
                    token : token
                    }
                })
            }
        }
    }
    catch(err) {
        console.log("kakao Error => " + err);
        next(err);
    }
    finally {
        console.log('finally');
    }
});

module.exports = router;