/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 19:32:44
 * @LastEditTime: 2021-05-17 20:27:35
 */
var jws = require("jws");

const secret = "sxd123456";
const tpy = "JWT";
const alg = "HS256";

module.exports = {
  secret: secret,
  header: {
    typ: tpy,
    alg: alg
  },
  verifySign: function(signature) {
    return jws.verify(signature, alg, secret);
  }
};
