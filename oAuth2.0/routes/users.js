/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:11:20
 * @LastEditTime: 2021-05-18 10:37:20
 */

/* 
 * git 接口参考资料
 * https://docs.github.com/cn/developers/apps/authorizing-oauth-apps
 */
var express = require("express");
var router = express.Router();
var axios = require("axios");
const client_id = "fee2adc180fd1abcb0ee";
const client_secret = "7e0a6d55483fc9086a53bea10dc67239a0b6d205";
let access_token;

/* GET users listing. */
router.get("/code", async function(req, res, next) {
  const { code } = req.query;
  try {
    const response = await axios({
      url: `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
      method: "post",
      headers: {
        accept: "application/json"
      }
    });
    access_token = response.data.access_token;

    res.json({
      message: "请求成功",
      access_token: access_token
    });
  } catch (error) {
    res.json({
      message: error || "获取token失败"
    });
  }
});

router.get("/info", async function(req, res, next) {
  try {
    const response = await axios({
      url: `https://api.github.com/users/dongxiaosun`,
      headers: {
        Authorization: `token ${access_token}`
      }
    });

    res.json({
      message: "请求成功",
      result: response.data
    });
  } catch (error) {
    res.json({
      message: error || "获取用户信息失败"
    });
  }
});

module.exports = router;
