var express = require('express');
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'data_base',
    password: 'anjfqhkzz1'
});

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.user)
  {
    res.send('<script type="text/javascript">alert("로그인 후 이용해주세요");</script>');
  }
  var id=req.user.user_id;
  console.log(id);
  var sqlForCartPrint="select * from i_book join i_cart on i_book.book_id = i_cart.cart_id where i_cart.id=?";
  pool.getConnection(function(err,connection){
    connection.query(sqlForCartPrint,[id],function(err,rows){
      res.render('cart', { title: 'Express',results:rows });
    });
  });

});

router.get('/:cart_id', function(req, res, next) {
  if (!req.user)
  {
    res.send('<script type="text/javascript">alert("로그인 후 이용해주세요");</script>');
  }
  var id=req.params.cart_id;
  console.log(id);
  pool.getConnection(function(err,connection){
    var sqlForDelete= "delete from i_cart where cart_id=?";
    var sqlForCartPrint="select * from i_book join i_cart on i_book.title = i_cart.title where i_cart.id=?";
    connection.query(sqlForDelete,[id],function(err,row){
      connection.query(sqlForCartPrint,[req.user.user_id],function(err,rows){
        res.render('cart',{rows:row , results:rows});
      });
    });
  });
  //res.redirect('back');
});

router.post('/',function(req,res,next){
  if (!req.user)
  {
    res.send('<script type="text/javascript">alert("로그인 후 이용해주세요");</script>');
  }
  var id=req.query.id;
  var price = req.query.price;
  var data = [id,req.user.user_id,1,price]
  console.log(id,price);
  console.log(req.user.user_id);
  pool.getConnection(function(err,connection){
    var sqlForCartList="INSERT INTO i_cart(book_id,id,title,total_price) values(?,?,?,?);"
    var sqlForCartPrint="select * from i_book join i_cart on i_book.id = i_cart.id where i_cart.id=?";
    var sqlGetId="SELECT book_id FROM i_cart where id=?";
    connection.query(sqlForCartList,data,function(err,rows){
        connection.query(sqlGetId,[req.user.user_id],function(err,ids){
            connection.query(sqlForCartPrint,[req.user.user_id],function(err,cart_list){
              console.log(JSON.stringify(cart_list));
              res.render('cart',{rows:rows , results:cart_list});
            });
        });
//      connection.query(sqlForCartPrint,rows)
    });
    connection.release();
  });

});

router.post('/:total_price', function(req, res, next) {
  if (!req.user)
  {
    res.send('<script type="text/javascript">alert("로그인 후 이용해주세요");</script>');
  }
  var total_price = req.params.total_price;
  var name = req.body.user_name;
  var address = req.body.checkout_comment;
  var user_id = req.user.user_id;
  var newDate=new Date();
  var time= newDate.toFormat('YYYY-MM-DD');
  var data=[user_id,time,address,total_price];

//  console.log(time+'###############'+JSON.stringify(req.body));
    pool.getConnection(function (err, connection){
      var sqlForDelete="DELETE from i_cart where id=?";
      var sqlForInsertOrder="INSERT INTO i_order (id,order_date,address,price) values(?,?,?,?)";
      var sqlForSelectOrderId="SELECT order_id FROM i_order ORDER BY order_id DESC limit 1";
      //var sqlForInsertOrderdetail="INSERT INTO t_orderdetail (item_id, item_quantity) SELECT item_id, item_quantity FROM t_cart WHERE user_id= ?";
      //var sqlForUpdateDetail="UPDATE t_orderdetail SET order_id=? where order_id IS NULL";
      connection.query(sqlForInsertOrder,data,function(err,row){
          if (err) console.log(err);
       // connection.query(sqlForInsertOrderdetail,[user_id],function(err,orderid){
        //    if (err) console.log(err);
          connection.query(sqlForSelectOrderId,function(err,orderid){
                if (err) console.log(err);
             // connection.query(sqlForUpdateDetail,[orderid[0].order_id],function(err,row2){
               //   if (err) console.log(err);
                connection.query(sqlForDelete,[user_id],function(err,rows3){
                    if (err) console.log(err);
                    res.redirect('../index');
                });

              });
                //console.log(__dirname+'\\index'+'#############################')
              });
          });
       });
  //  });

//});




module.exports = router;
