/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:12:22
 * @LastEditTime: 2021-05-17 20:28:49
 */
var express = require("express");
var jws = require("jws");
var signature = require("../signature");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  const { username, password } = req.query;
  if (username === "admin" && password === "123456") {
    var _signature = jws.sign({
      header: signature.header,
      payload: {
        username: username,
        email: "sxd.08@163.com",
        exp: new Date()
      },
      secret: signature.secret
    });
    res.json({
      message: "登录成功",
      jwt: _signature
    });
  } else {
    res.json({
      message: "登录失败"
    });
  }
});

module.exports = router;
