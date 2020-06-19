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
/* GET home page. */
router.get('/', function(req, res, next) {
  var user_id= ''
  var grade = ''
  var name = ''
  var id=''
  var passwd=''
  var tel=''
  var address=''
  var major=''
  var book_id = ''
  
  console.log(req.user);
  if(req.user){
      user_id =req.user.order_id;
      grade = req.user.id;
      name = req.user.order_date;
       id=req.user.address;
   passwd=req.user.pirce;
  tel=req.user.title;
  booK_id = req.user.booK_id;
  
  }; 
     pool.getConnection(function(err, connection){
    var sqlForSelectList = "SELECT order_id, id, order_date, address, price, title, book_id FROM data_base.i_order";
      connection.query(sqlForSelectList, function(err, rows){
        if(err) console.error("err: "+ err);
        console.log("rows : " + JSON.stringify(rows));
          
    res.render('afterbuy', {rows:rows, user_id:user_id , grade: grade,name:name, id:id, passwd:passwd, address:address, tel:tel, major:major, booK_id:book_id});
  }
          
          );
});
});

router.post('/delete', function(req,res,next){
 
    var order_id=''
    order_id=req.body.order_id;

    var datas = [order_id];

    pool.getConnection(function(err,connection)
    {
        var sql = "delete from i_order where order_id=?";
     
        connection.query(sql,datas,function(err,result)
        {
            console.log(result);
            if(err) console.error("글 삭제 중 에러 발생 err : ",err);
            
            else
            {
                res.redirect('/product_page');
            }
            connection.release();
        });
    });   
  });






module.exports = router;



