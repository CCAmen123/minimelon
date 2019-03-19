const express = require('express');
var router = express.Router();
var query = require('./query');
var pool = require('../pool');
// //新增订单 -----跨表插入 未解决！
// router.get("/add",(req,res)=>{
//   var { address_id,pid,count}=req.query;
//    var uid=1;
//   // var address_id=2;
//   var order_time=new Date().toLocaleString();
//   // var pid=3;
//   // var count=3;
//   var sql = `INSERT INTO orders( uid,address_id, order_time ) VALUES (?,?,?)`;
//   pool.query(sql,[uid,address_id, order_time],(err,result)=>{
//     if(err){throw err;}
//     else{
//       var sql=`SELECT ordid from orders where uid=? AND address_id=? AND order_time=?`;
//       query(sql,[uid,address_id,order_time]).then(result=>{
//         if(result.length!=""){          
//           var sql = `insert into order_detail(ordid,pid,count) VALUES(?,?,?)`;
//           pool.query(sql,[result,pid,count],(err,result)=>{
//             if(err)throw err;
//             res.send(result);
//           })
          
//         }else{
//           throw err;
//         }
//       })
//     }
//   })
  
// })
// 所有订单
router.get("/order",(req,res)=>{
  var uid = 1;
  var sql = `SELECT order_detail.ordid, status, order_time,order_detail.count,title,price FROM orders,order_detail,products WHERE orders.ordid=order_detail.ordid AND orders.uid=? AND order_detail.pid=products.pid`;
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// status  #订单状态  1-等待付款  2-等待发货  3-配送中  4-已签收  5-已取消
router.get("/status",(req,res)=>{
  var status = 2;
  var uid = 1;
  var sql = `SELECT order_detail.ordid, status, order_time,order_detail.count,title,price FROM orders,order_detail,products WHERE orders.ordid=order_detail.ordid AND orders.uid=? AND order_detail.pid=products.pid AND status=?`;
  pool.query(sql,[uid,status],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// 配送信息
router.get("/dispatch",(req,res)=>{
  var ordid = 2;
  var sql = `SELECT  deliver_time,received_time,orders.address_id,address,cellphone,receiver FROM orders,receiver_address WHERE orders.address_id=receiver_address.address_id AND ordid=?`;
  pool.query(sql,[ordid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// 订单信息
router.get("/ordetail",(req,res)=>{
  var ordid = 2;
  var sql = `SELECT ordid,order_time FROM orders WHERE ordid=?`;
  pool.query(sql,[ordid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
module.exports = router;