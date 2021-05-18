/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:41:39
 * @LastEditTime: 2021-05-18 23:36:03
 */
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  if (req.cookies.token === "admin") {
    res.json({
      code: 200,
      message: "获取数据成功",
      data: {
        name: "管理员",
        age: 18,
        country: "火星"
      }
    });
  } else {
    res.status(401).json({
      code: "400",
      message: "登录失效，请重新登录",
      data: {}
    });
  }
});

module.exports = router;
