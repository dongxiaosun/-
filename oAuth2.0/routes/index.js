/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 22:51:09
 * @LastEditTime: 2021-05-19 14:32:45
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

module.exports = router;
