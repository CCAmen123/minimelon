const express = require('express');
var router = express.Router();
var pool = require('../pool');
// 所有商品
router.get("/",(req,res)=>{
  var sql = `SELECT pid, title, price, count, is_onsale, img_url FROM products`;
  pool.query(sql,[],(err,result)=>{
    if(err){
      throw err;
    }
    else{
      res.send(result);
    }
  })
});
//按品类显示
router.get("/recom",(req,res)=>{
  var category="mel";
  var sql = `SELECT pid, title, price, count, is_onsale, img_url FROM products WHERE category=?`;
  pool.query(sql,[category],(err,result)=>{
    if(err){
      throw err;
    }else{
      res.send(result);
    }
  })
})
//按价格 降序（DESC），升序（ASC）
router.get("/price",(req,res)=>{
  var sql = `SELECT pid, title, price, count, is_onsale, img_url FROM products ORDER BY price ASC`;
  pool.query(sql,[],(err,result)=>{
    if(err){
      throw err;
    }else{
      res.send(result);
    }
  })
})
// 商品增加
router.get("/add",(req,res)=>{
  var {title, price, count, is_onsale, img_url, category}=req.body;
  var sql = `INSERT INTO products( title, price, count, is_onsale, img_url, category)VALUES (?,?,?,?,?,?)`;
  pool.query(sql,[title, price, count, is_onsale, img_url, category],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// 商品删除
router.get("/del",(req,res)=>{
  var {pid}=req.query;
  var sql = `DELETE FROM products WHERE pid=?`;
  pool.query(sql,[pid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// 商品信息修改
router.get("/update",(req,res)=>{
  var {pid}=req.query;
  var {title,price,count,is_onsale,img_url,category}=req.body;
  var sql=`UPDATE products SET title=?,price=?,count=?,is_onsale=?,img_url=?,category=? WHERE pid=?`;
  pool.query(sql,[title,price,count,is_onsale,img_url,category,pid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})


module.exports = router;
