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
  //  res.render('product_page', { title: 'Express' });
    res.redirect('/product_page/list/1');
});

router.get('/list/:page',function(req,res,next){
    pool.getConnection(function(err,connection){
console.log("ㅁㅇ내냥매ㅓㄴㅁ애ㅑㄴㅇ먀ㅐㅗㄴㅁ애ㅑㅗ먀ㅐ놰ㅗㅑㅁㄴ애ㅗㅑㄴㅇㅁ");
  
    var sqlForlist = "SELECT book_id,title,price FROM i_book";
    connection.query(sqlForlist,function(err,rows){
        if(err) console.error("err: "+err);
        console.log("rows : "+JSON.stringify(rows));
        res.render('list',{title: '상품목록',rows:rows});
        connection.release();
    });
    });
});
router.get('/review_list/:review_id',function(req,res,next){
    pool.getConnection(function(err,connection){
console.log("리뷰!!");
  
    var sqlForlist = "SELECT review_id, name, title, avg_star, review FROM i_review";
    connection.query(sqlForlist,function(err,rows){
        if(err) console.error("err: "+err);
        console.log("rows : "+JSON.stringify(rows));
        res.render('review_list',{title: '리뷰목록',rows:rows});
        connection.release();
    });
    });
});


router.get('/read/:book_id',function(req,res,next)
{
    var book_id = req.params.book_id;
    pool.getConnection(function(err,connection)
    {
        var sql = "SELECT book_id,published_date,title,publisher,pdf,book_page,price,sales,major,author,avg_star FROM i_book where book_id=?";
        connection.query(sql,[book_id],function(err,rows)
        {
            if(err)console.error(err);
            console.log("제품 확인: ",rows);
            res.render('read',{title: "제품 조회",rows:rows[0]});
            connection.release();
        });
    });
});

router.get('/read/:review_id',function(req,res,next)
{
    var book_id = req.params.review_id;
    pool.getConnection(function(err,connection)
    {
        var sql = "SELECT review_id, name, title, avg_star, review FROM i_review where review_id=?";
        connection.query(sql,[book_id],function(err,rows)
        {
            if(err)console.error(err);
            console.log("제품 확인: ",rows);
            res.render('review',{title: "리뷰 조회",rows:rows[0]});
            connection.release();
        });
    });
});




router.get('/write',function(req,res,next){
    res.render('write',{title : "상품 등록"});
});
router.get('/about',function(req,res,next){
    res.render('about',{title : "소개"});
});
router.get('/contact',function(req,res,next){
    res.render('contact',{title : "연락처"});
});
router.post('/write', function(req, res, next) {
    var title = req.body.title;
    var published_date = req.body.published_date;
    var price = req.body.price;
    var book_page = req.body.book_page;
    var major = req.body.major;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var pdf = req.body.pdf;
    var sales = req.body.sales;
    var datas = [published_date,title,publisher,book_page,price,major,author,pdf,sales];
    pool.getConnection(function(err, connection)
    {
        var sqlForInsertITEM = "insert into i_book(published_date,title,publisher,book_page,price,major,author,pdf,sales) values(?,?,?,?,?,?,?,?,?)";
        connection.query(sqlForInsertITEM,datas, function(err, rows){
            if(err) console.error("err : "+err);
            console.log("rows : "+JSON.stringify(rows));
                res.redirect('/product_page');
                connection.release();
            });
            });
        });
//     });
// });

router.get('/update',function(req,res,next){
    var  book_id = req.query.book_id;
    console.log('ㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅㅅ'+ book_id);
    pool.getConnection(function(err,connection){
        {
            if(err) console.error("커넥션 에러 : ",err);

            var sql = "select book_id,published_date,title,publisher,book_page,price,major,author,pdf,sales from i_book where book_id=?";
            connection.query(sql,[book_id],function(err,rows)
            {
                if(err) console.error(err);
                console.log("update 결과 확인" ,rows);
                res.render('update',{title: "글 수정",rows:rows[0]});
                connection.release();
            })
        }
    })
})





router.post('/update',function(req,res,next)
{
    var book_id = req.body.book_id;
    var title = req.body.title;
    var published_date = req.body.published_date;
    var price = req.body.price;
    var book_page = req.body.book_page;
    var major = req.body.major;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var pdf = req.body.pdf;
    var sales = req.body.sales;
    
    var datas = [published_date,title,publisher,book_page,price,major,author,pdf,sales,book_id];
    console.log(datas);
    pool.getConnection(function(err,connection)
    {
        var sql = "update i_book set published_date=?, title=?, publisher=?, book_page=?, price=?, major=?, author=?, pdf=?, sales=? where book_id=?";
        connection.query(sql, datas ,function(err,result)
        {
            console.log(result);
            if(err) console.error("수정 중 에러 발생 err: ",err);
            else
                res.redirect('/product_page/list/1');
            
            
            connection.release();
        });
    });
});


router.post('/delete', function(req,res,next){
 
 
    var book_id=req.body.book_id;

    var datas = [book_id];

    pool.getConnection(function(err,connection)
    {
        var sql = "delete from i_book where book_id=?";
     
        connection.query(sql,datas,function(err,result)
        {
            console.log(result);
            if(err) console.error("글 삭제 중 에러 발생 err : ",err);
            
            else
            {
                res.redirect('/');
            }
            connection.release();
        });
    });   
  });

  router.get('/buy',function(req,res,next){
    res.render('read',{});
});




router.post('/buy', function(req, res, next) {
    
    
     var title = req.body.title;
    var order_date = new Date();
     var address = '서울';
     var price = req.body.price;
     var id = 'edoll1843';
     var book_id = req.body.book_id;
    var datas = [id,order_date,address,price,title,book_id];
    
      pool.getConnection(function(err, connection)
    {
                
      console.log('시이이이이이이')
   
console.log(title);
  console.log(order_date);
    console.log(address);
    console.log(price);
    console.log(book_id);
    console.log(id);
          
        var sqlForInsertITEM = "insert into i_order(id,order_date,address,price,title,book_id) values(?,?,?,?,?,?)";
        connection.query(sqlForInsertITEM,datas, function(err, rows){
            if(err) console.error("err : "+err);
            console.log("rows : "+JSON.stringify(rows));
                res.redirect('/afterbuy');
                connection.release();
            });
            });
        });

module.exports = router;




