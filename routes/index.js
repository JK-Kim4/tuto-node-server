var express = require('express');
var router = express.Router();

const maria = require('../maria');

/* GET home page. 
* response로 전송되는 data는 json format으로 전송됨
*/

router.get('/', function(req, res, next) {
  maria.query('select * from user', function(err, rows, fields){
    //parameter로 작성한 쿼리로 데이터 조회 후
    //error 발생하지 않았을 경우
    if(!err){ 
      res.send(rows);
    }
    //error 발생 경우
    else{
      console.log("index error : " + err);
      res.send(err);
    }
  });
});

module.exports = router;
