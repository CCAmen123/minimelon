SET NAMES UTF8;
DROP DATABASE IF EXISTS melon;
CREATE DATABASE melon CHARSET=UTF8;
USE melon;

CREATE TABLE products(  /*产品*/
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,         #主标题
  price DECIMAL(10,2) NOT NULL,        #价格
  count INT NOT NULL,                  #数量
  is_onsale BOOLEAN           #是否促销中
);
CREATE TABLE users(/*用户*/
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(128) NOT NULL,         #用户名
  avatar VARCHAR(128),        #头像图片路径
  age INT,                    #年龄
  gender INT,                 #性别
  phone VARCHAR(16)           #手机号
);
CREATE TABLE receiver_address( /*地址信息*/
  address_id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT NOT NULL,                    #用户编号
  receiver VARCHAR(16) NOT NULL,       #接收人姓名
  province VARCHAR(16),       #省
  city VARCHAR(16),           #市
  county VARCHAR(16),         #县
  address VARCHAR(128) NOT NULL,       #详细地址
  cellphone VARCHAR(16) NOT NULL,      #手机
  is_default BOOLEAN,         #是否为当前用户的默认收货地址
  FOREIGN KEY (uid) REFERENCES users(uid)
);
CREATE TABLE cart(/*购物车*/
  cid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT NOT NULL,            #用户编号
  pid INT NOT NULL,            #商品编号
  count INT NOT NULL,          #购买数量
  is_checked BOOLEAN, #是否已勾选，确定购买
  FOREIGN KEY (uid) REFERENCES users(uid),
  FOREIGN KEY (pid) REFERENCES products(pid)
);
CREATE TABLE orders(/*订单*/
  ordid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT NOT NULL,                #用户id
  address_id INT NOT NULL,         #收货地址
  status INT,             #订单状态  1-等待付款  2-等待发货  3-配送中  4-已签收  5-已取消
  order_time BIGINT,      #下单时间
  pay_time BIGINT,        #付款时间
  deliver_time BIGINT,    #发货时间
  received_time BIGINT,    #签收时间
  FOREIGN KEY (uid) REFERENCES users(uid),
  FOREIGN KEY (address_id) REFERENCES receiver_address(address_id)
);
CREATE TABLE order_detail(/*订单详情*/
  did INT PRIMARY KEY AUTO_INCREMENT,
  ordid INT NOT NULL,            #订单编号
  pid INT NOT NULL,              #产品编号
  count INT NOT NULL,            #数量
  FOREIGN KEY (ordid) REFERENCES orders(ordid),
  FOREIGN KEY (pid) REFERENCES products(pid)
);
CREATE TABLE img(  /*图片*/
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(128) NOT NULL,   #图片路径
  pid INT  NOT NULL,               #产品id
  FOREIGN KEY (pid) REFERENCES products(pid)
);
CREATE TABLE comment(  /*评论*/
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(128) NOT NULL,      #用户名
  content VARCHAR(255) NOT NULL,    #内容 
  add_time BIGINT,                  #发表时间
  ordid INT  NOT NULL,              #订单号
  pid INT NOT NULL,                 #产品id
  FOREIGN KEY (pid) REFERENCES products(pid),
  FOREIGN KEY (ordid) REFERENCES orders(ordid)
);

