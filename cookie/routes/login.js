/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:12:22
 * @LastEditTime: 2021-05-18 23:44:19
 */
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/", function(req, res, next) {
  const { account, password } = req.body;
  if (account === "admin" && password === "123456") {
    res.cookie("token", account, {
      expires: new Date(Date.now() + 1000 * 60 * 1), // 时效 1 分钟
      httpOnly: true
    });
    res.json({
      code: 200,
      message: "登录成功"
    });
  } else {
    res.json({
      code: 400,
      message: "登录失败"
    });
  }
});

module.exports = router;
