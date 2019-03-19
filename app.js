//使用express构建web服务器
const express = require('express');
const session = require('express-session');
const bodyPaser = require('body-parser');
//引入路由模块
var products=require("./routes/products");
var users=require("./routes/users");
var carts=require("./routes/carts");
var orders=require("./routes/orders")

var app = express();
var server = app.listen(3000);
app.use(bodyPaser.urlencoded({extended:false}));
//静态资源托管目录
app.use(express.static('public'));
app.use(session({
  secret:'随机字符串',
  cookie:{maxAge:60*1000*30},//过期时间ms
  resave:false,
  saveUninitialized:true
}));
// 路由
app.use("/products",products);
app.use("/users",users);
app.use("/carts",carts);
app.use("/orders",orders);