# [ 2018년 서울시 앱 공모전 출품작, 이궁저궁 - Server]
서울시 내의 4대궁(경복궁, 창덕궁, 창경궁, 덕수궁) 및 종묘의 특별한 행사 정보 제공, 궁 입장권 예매 서비스입니다.

## [ Logo ]
![playstore_icon](https://user-images.githubusercontent.com/23414861/46255272-0920f380-c4d6-11e8-9147-2c9d7522c376.png)

## [ Workflow ]

![kakaotalk_photo_2018-09-30-17-33-32](https://user-images.githubusercontent.com/23414861/46255356-083c9180-c4d7-11e8-8615-c2576c8c5a31.jpeg)

## [ System Architecture & explanation ]
![architecture](https://github.com/TeamGoong/Server/blob/master/public_data/architecture.png)
1. AWS EC2를 사용하여 서버 배포
2. [PM2](https://github.com/Unitech/pm2) 를 사용하여 NodeJS process 관리 및 application  실행
3. AWS S3 스토리지에 Images 저장
4. AWS RDS MYSQL 사용 - Static Data 저장 

## [ 사용 모듈 ]

* [multer](https://github.com/expressjs/multer)

* [jwt](https://github.com/lcobucci/jwt)

* [async/await](https://github.com/Anwesh43/aync-await-js)

## [ 개발자 ]
- [권재림](https://github.com/jaeleum)
- [김민경](https://github.com/minkyoe)
- [권서연](https://github.com/seoyeonKKK)
