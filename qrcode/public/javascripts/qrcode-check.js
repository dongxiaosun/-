/*
 * @Author: 孙晓东
 * @Date: 2021-05-19 14:22:03
 * @LastEditTime: 2021-05-19 14:35:02
 */

function login(resolve, reject) {
  var uuid = window.location.search.substring(6);
  $.ajax({
    type: "GET",
    url: "/api/login/qrcode-check",
    data: { uuid: uuid },
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
    login(
      function(res) {
        if (res.code === 200) {
          alert("登录成功");
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
