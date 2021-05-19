/*
 * @Author: 孙晓东
 * @Date: 2021-05-19 13:57:04
 * @LastEditTime: 2021-05-19 14:32:27
 */
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect(301, "/login");
});

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.get("/user", function(req, res, next) {
  res.render("user");
});

router.get("/qrcode-check", function(req, res, next) {
  res.render("qrcode-check");
});

module.exports = router;
