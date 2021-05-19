/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:12:22
 * @LastEditTime: 2021-05-19 15:44:36
 */
var express = require("express");
var session = require("../session");
var router = express.Router();

// 二维码登录 检查是否有 uuid
router.get("/qrcode-check", function(req, res, next) {
  const { uuid } = req.query;
  if (uuid === "1") {
    session.setStatus(true);
    // 登录状态保持两秒
    session.destroyStatus(1000 * 2);
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

// 登录查询
router.get("/query", function(req, res, next) {
  const { uuid } = req.query;
  if (uuid === "1" && session.getStatus()) {
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
