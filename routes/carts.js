const express = require('express');
var router = express.Router();
var query = require('./query');
var pool = require('../pool');
// 显示购物车内容 
router.get("/cart",(req,res)=>{
  var uid = 1;
  var sql = `SELECT pid, count, is_checked FROM cart WHERE uid=?`;
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// 添加到购物车
router.get("/add",(req,res)=>{
  // var {uid, pid, count} = req.query;
  var uid = 1;
  var pid = 5;
  var count = 3;
  var sql = `select * from cart where uid=? and pid=?`;
  query(sql,[uid,pid]).then(result=>{
    if(result.length==0){
      var sql =  `INSERT INTO cart(uid, pid, count) VALUES (?,?,?)`;
      pool.query(sql,[uid,pid,count],(err,result)=>{
        if(err)throw err;
        res.send({ok:1});
      })
    }else{
      var sql =`update cart set count=count+? where uid=? and pid=?`;
      pool.query(sql,[count,uid,pid],(err,result)=>{
        if(err)throw err;
        res.send({ok:1})
      })
    }
  })
  
})
// 从购物车删除
router.get("/del",(req,res)=>{
  var cid = 2;
  // var cid=req.query;
  var sql = `DELETE FROM cart WHERE cid=?`;
  pool.query(sql,[cid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
//购物车修改数量
router.get("/update",(req,res)=>{
  var {cid,count}=req.query;
    if(count>0){//购物车商品数量大于0，修改数量
      var sql = "update cart set count=? where cid=?";
      pool.query(sql,[count,cid],(err,result)=>{
        if(err)throw err;
          res.send();
      })
    }else{//等于0，删除商品
      var sql ="delete from cart where cid=?";
      pool.query(sql,[cid],(err,result)=>{
        if(err)throw err;
          res.send();
      })
    }
})
module.exports = router;