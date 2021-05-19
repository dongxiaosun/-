/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:12:22
 * @LastEditTime: 2021-05-19 10:50:05
 */
var express = require("express");
var router = express.Router();
var axios = require("axios");
const { response } = require("express");
const client_id = "fee2adc180fd1abcb0ee";
const client_secret = "7e0a6d55483fc9086a53bea10dc67239a0b6d205";
var access_token;

// 获取 access_token
router.get("/access_token", async function(req, res, next) {
  const { code } = req.query;
  try {
    const data = await axios({
      url: `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
      method: "POST",
      headers: {
        accept: "application/json"
      }
    }).then(response => response.data);

    if (data && data.access_token) {
      access_token = data.access_token;
      res.json({
        code: 200,
        message: "获取数据成功",
        data: {
          access_token: access_token
        }
      });
    } else {
      throw new Error("获取access_token失败");
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "获取access_token失败"
    });
  }
});

// 根据 access_token 获取用户信息
router.get("/user_info", async function(req, res, next) {
  try {
    const data = await axios({
      url: `https://api.github.com/users/dongxiaosun`,
      method: "GET",
      headers: {
        Authorization: `token ${access_token}`
      }
    }).then(response => response.data);

    res.json({
      code: 200,
      message: "获取数据成功",
      data: data
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "获取用户信息失败"
    });
  }
});

module.exports = router;
