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
/* GET home page. */
router.get('/', function(req, res, next) {
  var user_id= ''
  var grade = ''
  var name = ''
  console.log(req.user);
  if(req.user){
      user_id =req.user.user_id;
      grade = req.user.grade;
      name = req.user.name;
      console.log('##################'+name);
      console.log(req.user);
  }; 
    res.render('index', {login_check:user_id , grade: grade,name:name});
  });

  
router.get('/logout', function(req, res){                                                                          
    req.logout();
    res.redirect('/login');
  });
   


module.exports = router;
