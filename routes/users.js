const express = require('express');
var router = express.Router();
var pool = require('../pool');
// 所有用户信息
router.get("/",(req,res)=>{
  var sql = `SELECT uid, uname, avatar, age, gender, phone, wechatId FROM users`;
  pool.query(sql,[],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
//新增用户
router.get("/add",(req,res)=>{
  var {uname,avatar,age,gender,phone,wechatId}=req.body;
  var sql = `INSERT INTO users( uname, avatar, age, gender, phone, wechatId) VALUES (?,?,?,?,?,?)`;
  pool.query(sql,[uname,avatar,age,gender,phone,wechatId],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
// 修改用户信息
router.get("/update",(req,res)=>{
  var {uid,uname,avatar,age,gender,phone,wechatId}=req.query;
  var sql = `UPDATE users SET uname=?,avatar=?,age=?,gender=?,phone=?,wechatId=? WHERE uid=?`;
  pool.query(sql,[uname,avatar,age,gender,phone,wechatId,uid],(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
//新增地址
// router.get("/address",(req,res)=>{
//   // var {uid,receiver,province,city,county,address,cellphone,is_default}=req.query;
//   var uid = 1;
//   var receiver="随鼠";
//   var province="浙江省";
//   var city="宁波市";
//   var county="月湖街道";
//   var address="102号3楼";
//   var cellphone="1234567890";
//   var is_default = 0;
//   var sql = `INSERT INTO receiver_address(uid, receiver, province, city, county, address, cellphone, is_default) VALUES (?,?,?,?,?,?,?,?)`;
//   pool.query(sql,[uid,receiver,province,city,county,address,cellphone,is_default],(err,result)=>{
//     if(err)throw err;
//     res.send(result);
//   })
// })

module.exports = router;