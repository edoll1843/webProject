var express = require('express');
var app = express();
var router = express.Router();

var session = require('express-session');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;;


var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'data_base',
    password: 'anjfqhkzz1'
});

router.post('/delete', function(req,res,next){
 
    var user_id=''
    user_id=req.body.user_id;

    var datas = [user_id];

    pool.getConnection(function(err,connection)
    {
        var sql = "delete from i_user where user_id=?";
     
        connection.query(sql,datas,function(err,result)
        {
            console.log(result);
            if(err) console.error("글 삭제 중 에러 발생 err : ",err);
            
            else
            {
                res.redirect('/managerJoin');
            }
            connection.release();
        });
    });   
  });



router.get('/', function(req, res, next) {
  var user_id= ''
  var grade = ''
  var name = ''
  var id=''
  var passwd=''
  var tel=''
  var address=''
  var major=''
  
  console.log(req.user);
  if(req.user){
      user_id =req.user.user_id;
      grade = req.user.grade;
      name = req.user.name;
       id=req.user.id;
   passwd=req.user.passwd;
  tel=req.user.tell;
  address=req.user.address;
  major=req.user.major;
      console.log('##################'+name);
      console.log(req.user);
  }; 
     pool.getConnection(function(err, connection){
    var sqlForSelectList = "SELECT user_id, id, passwd, name, tel, grade, address, major FROM data_base.i_user";
      connection.query(sqlForSelectList, function(err, rows){
        if(err) console.error("err: "+ err);
        console.log("rows : " + JSON.stringify(rows));
          
    res.render('managerJoin', {rows:rows, user_id:user_id , grade: grade,name:name, id:id, passwd:passwd, address:address, tel:tel, major:major});
  }
          
          );
});
});
/*
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection){
  
        var sqlForSelectList = "SELECT idx, creator_id, title, hit FROM board";
      connection.query(sqlForSelectList, function(err, rows){
        if(err) console.error("err: "+ err);
        console.log("rows : " + JSON.stringify(rows));
  
        res.render('managerJoin',{title: '회원정보 관리', rows: rows});
        connection.release();
  
      });
    });
  });

*/

router.post('/',passport.authenticate('local-login',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}));


//사용자 인증 성공시 호출
passport.serializeUser(function(user,done){
    console.log('serializeUser() 호출');
    console.dir(user);

    done(null,user);
});

//패스포트 로그인 설정

passport.use('local-login',new LocalStrategy({
    usernameField: 'id',
    passwordField: 'passwd',
    passReqToCallback: true
},  function(req,id,password,done){
        pool.getConnection(function(err,connection) {
        var id = req.body.id;
        var passwd = req.body.passwd;
        connection.query('select *from `i_user` where `id` = ?', id, function (err, result) {
            console.log(result[0].passwd);
            console.log(passwd);
            if (err) {
                console.log('err :' + err);
                return done(false, null);
            } else {
                if (result.length === 0) {
                    console.log('해당 유저가 없습니다');
                    return done(false, null);
                } else {
                    if (passwd != result[0].passwd) {
                        console.log('패스워드가 일치하지 않습니다');
                        return done(false, null);
                    } else {
                        console.log('로그인 성공');
                        return done(null, {
                            user_id: result[0].user_id,
                            grade:result[0].grade,
                            name:result[0].name
                        });
                    }
                }
            }
        });
    });
}));


//사용자 인증 이후 사용자 요청이 있을 때마다 호출
passport.deserializeUser(function(user,done){
    console.log('deserializeUser() 호출');
    console.log(user);
    done(null,user);
});

function isLoggedIn(req,res,next){
    console.log("isloggedIN 미들웨어 호출");

    if(req,isAuthenticated()){
        return next();
    }

    res.redirect('/');
}


//로그인 접근 시 권환 확인 함수

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

//로그아웃 함수

 

module.exports = router;