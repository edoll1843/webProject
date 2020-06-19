var express = require('express');
var mysql = require('mysql');

var router = express.Router();
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'data_base',
    password: 'anjfqhkzz1'
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/read/:user_id',function(req,res,next)
{
    var user_id = req.params.user_id;
    console.log("dsdsdsd");
    pool.getConnection(function(err,connection)
    {
        var sql = "SELECT user_id,id,name,tel,grade,address,major FROM i_user where user_id=?";
        connection.query(sql,[user_id],function(err,rows)
        {
            if(err)console.error(err);
            console.log("사용자 확인: ",rows);
            res.render('mypage',{title: "사용자 조회",rows:rows[0]});
            connection.release();
        });
    });
});

module.exports = router;
