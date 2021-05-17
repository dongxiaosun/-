/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:41:39
 * @LastEditTime: 2021-05-17 15:58:08
 */
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  if (req.cookies.token) {
    res.json({
      name: "管理员"
    });
  } else {
    res.status(401).json({
      message: "登录失效，请重新登录"
    });
  }
});

module.exports = router;
