/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 15:11:20
 * @LastEditTime: 2021-05-19 00:01:31
 */
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect(301, "/login");
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Express" });
});

router.get("/user", function(req, res, next) {
  res.render("user", { title: "Express" });
});

module.exports = router;
