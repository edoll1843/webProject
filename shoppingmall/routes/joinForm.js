var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'data_base',
    password: 'anjfqhkzz1'
});

router.get('/', function(req, res, next) {
    res.render('joinForm',{title:'Join Form!'});
});
router.post('/',function(req,res,next){
    console.log(req.body);

    var id= req.body.id;
    var pass = req.body.pass;
    var name = req.body.name;
    var tel = req.body.tel;
    var grade = req.body.grade;
    var major = req.body.major;
    var address = req.body.address;
    var datas = [id,pass,name,tel,grade,address,major];

    pool.getConnection(function(err,connection){
        var sql="insert into i_user(id,passwd,name,tel,grade,address,major) values(?,?,?,?,?,?,?)";
        connection.query(sql,datas,function(err,rows){
            if(err) console.error(err);
            res.redirect('/login');
            connection.release();
        });
    });
});
module.exports = router;


