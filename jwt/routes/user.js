/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:11:20
 * @LastEditTime: 2021-05-19 00:37:05
 */
var express = require("express");
var verifySign = require("../signature").verifySign;
var jws = require("jws");
var router = express.Router();

/* GET users listing. */
router.get("/", async function(req, res, next) {
  const { authorization } = req.headers;
  var signature = jws.decode(authorization); // 解密，获取 payload 信息
  var exp = (signature && signature.payload && signature.payload.exp) || 0;
  var isExp = exp + 1000 > new Date().valueOf(); // 令牌有效时间设置为 1 分钟
  // 验证令牌是否合法，以及是否过期
  if (authorization && verifySign(authorization) && isExp) {
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
      message: "登录失效，请重新登录"
    });
  }
});

module.exports = router;
