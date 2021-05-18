/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:12:22
 * @LastEditTime: 2021-05-19 00:25:45
 */
var express = require("express");
var jws = require("jws");
var signature = require("../signature");
var router = express.Router();

/* GET users listing. */
router.post("/", function(req, res, next) {
  const { account, password } = req.body;
  if (account === "admin" && password === "123456") {
    // jws 的核心点
    var _signature = jws.sign({
      header: signature.header,
      payload: {
        account: account,
        email: "sxd.08@163.com",
        exp: new Date().valueOf()
      },
      secret: signature.secret
    });
    
    res.json({
      code: 200,
      message: "登录成功",
      data: {
        jwt: _signature
      }
    });
  } else {
    res.json({
      code: 400,
      message: "登录失败"
    });
  }
});

module.exports = router;
