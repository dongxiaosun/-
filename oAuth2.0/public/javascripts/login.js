/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 23:16:37
 * @LastEditTime: 2021-05-17 23:48:09
 */

const client_id = "fee2adc180fd1abcb0ee";
const client_secret = "7e0a6d55483fc9086a53bea10dc67239a0b6d205";
const redirect_uri = "http://localhost:3300/users/oauth";

$(function() {
  $(".login").on("click", function() {
    window.location.href = `//github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
  });
});
