/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:12:22
 * @LastEditTime: 2021-05-17 20:28:40
 */
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  const { username, password } = req.query;
  if (username === "admin" && password === "123456") {
    res.cookie("token", username, {
      expires: new Date(Date.now() + 1000 * 60 * 1),
      httpOnly: true
    });
    res.json({
      message: "登录成功"
    });
  } else {
    res.json({
      message: "登录失败"
    });
  }
});

module.exports = router;
