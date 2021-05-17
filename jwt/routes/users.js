/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:11:20
 * @LastEditTime: 2021-05-17 20:27:47
 */
var express = require("express");
var verifySign = require("../signature").verifySign;
var router = express.Router();

/* GET users listing. */
router.get("/", async function(req, res, next) {
  const { authentication } = req.headers;
  if (verifySign(authentication)) {
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
