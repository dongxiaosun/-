/*
 * @Author: 孙晓东
 * @Date: 2021-05-18 22:35:18
 * @LastEditTime: 2021-05-19 00:16:37
 */

function login(data, resolve, reject) {
  $.ajax({
    type: "POST",
    url: "/api/login",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify(data),
    dataType: "json",
    success: function(data) {
      resolve(data);
    },
    error: function(error) {
      reject(error);
    }
  });
}

$(function() {
  $("#login").on("click", function() {
    var account = $("#account").val();
    var password = $("#password").val();
    login(
      { account, password },
      function(res) {
        if (res.code === 200) {
          window.location.href = "/user?signature=" + res.data.jwt;
        } else {
          alert("登录失败");
        }
      },
      function() {
        alert("登录失败");
      }
    );
  });
});
