/*
 * @Author: 孙晓东
 * @Date: 2021-05-17 23:54:51
 * @LastEditTime: 2021-05-19 10:52:26
 */
function getUsersCode(code, resolve, reject) {
  $.ajax({
    type: "GET",
    url: `/api/oauth/access_token?code=${code}`,
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function(data) {
      resolve(data);
    },
    error: function(error) {
      reject(error);
    }
  });
}

function getUserInfo(resolve, reject) {
  $.ajax({
    type: "GET",
    url: `/api/oauth/user_info`,
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function(data) {
      resolve(data);
    },
    error: function(error) {
      reject(error);
    }
  });
}

function init() {
  var code = window.location.search.substring(6);
  getUsersCode(
    code,
    function(data) {
      if (data.code === 200) {
        getUserInfo(
          function(res) {
            if (res.code === 200) {
              var login = res.data.login;
              var followers = res.data.followers;
              var github = res.data.html_url;
              $("#login").text(login);
              $("#followers").text(followers);
              $("#github").text(github);
            } else {
              alert("获取用户信息失败，请重新登录");
              window.location.href = "/login";
            }
          },
          function() {
            alert("git授权失败，请重新登录");
            window.location.href = "/login";
          }
        );
      } else {
        alert("获取用户信息失败，请重新登录");
        window.location.href = "/login";
      }
    },
    function() {
      alert("获取用户信息失败，请重新登录");
      window.location.href = "/login";
    }
  );
}
$(function() {
  init();

  $(".button").on("click", function() {
    init();
  });
});
