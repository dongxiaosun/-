/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 23:54:51
 * @LastEditTime: 2021-05-18 09:58:59
 */
function getUsersCode(code, callback) {
  $.ajax({
    url: `/users/code?code=${code}`,
    method: "get",
    success: function() {
      callback();
    }
  });
}

function getUserInfo() {
  $.ajax({
    url: `/users/info`,
    method: "get",
    success: function(data) {
      console.log(data);
    }
  });
}

$(function() {
  var code = window.location.search.substring(6);
  getUsersCode(code, getUserInfo);
});
