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
    res.render('product', { title: '리뷰' });
});
module.exports = router;

router.post('/', function(req, res, next) {
    var title = req.body.title;
    var name = req.body.name;
    var avg_star = req.body.avg_star;
    var review = req.body.review;
    var datas = [title,name,avg_star,review]

    pool.getConnection(function(err, connection)
    {
        var sqlForInsertITEM = "insert into i_review(title,name,avg_star,review) values(?,?,?,?)";
        connection.query(sqlForInsertITEM,datas, function(err, rows){
            if(err) console.error("err : "+err);
            console.log("rows : "+JSON.stringify(rows));
                res.redirect('/product');
                connection.release();
            });
            });
        });
//     });

// router.post('/review_form',function(req, res, next) {
//     //console.log(req.file.filename);
//     var name = req.body.user_name;
//     var email = req.body.user_email;
//     var star = req.body.user_star;
//     var text = req.body.review_form_text;
//     var id=req.body.id;
//     var datas = [id,email,name,text,star];
//     console.log('DATA!!!!!!\n'+datas);
//     pool.getConnection(function(err, connection)
//     {
//         var sqlForInsertBoard = "insert into t_review (item_id, email,title,contents,score) values(?,?,?,?,?)";
//         connection.query(sqlForInsertBoard,datas, function(err, rows){
//             if(err) console.error(err);
//             console.log(JSON.stringify(rows));
//             //res.redirect('/'+id);
//             var getAVGScore = "Select AVG(score) AS avg_score FROM T_REVIEW WHERE item_id = ?"
//             connection.query(getAVGScore,id, function(err, result){
//                 if(err) console.err(err);
//                 var setAVGscore = "UPDATE T_ITEM SET avg_star =? where item_id =?";
//                 var star = result[0].avg_score;
//                 var data = [star, id];

//                 connection.query(setAVGscore,data, function(err,result2){
//                     if(err) console(err);

//                     res.redirect('back');
//                     connection.release();
//                 });//end of last query
//             });//end of second query
//         });//end of fist query
//     });//end of pool
// });
// module.exports = router;
module.exports = router;
