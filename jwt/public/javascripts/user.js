/*
 * @Author: 孙晓东
 * @Date: 2021-05-18 22:35:23
 * @LastEditTime: 2021-05-19 00:31:58
 */
function fetchUserInfo(resolve, reject) {
  var Authorization = window.location.search.substring(11);
  $.ajax({
    type: "GET",
    url: "/api/user",
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: Authorization
    },
    success: function(data) {
      resolve(data);
    },
    error: function(error) {
      reject(error);
    }
  });
}

function getUserInfo() {
  fetchUserInfo(
    function(res) {
      var code = res.code;
      if (code === 200) {
        var name = res.data.name;
        var age = res.data.age;
        var country = res.data.country;
        $("#name").text(name);
        $("#age").text(age);
        $("#country").text(country);
      } else {
        alert("请求失败");
      }
    },
    function(error) {
      if (error.status === 401) {
        window.location.href = "/login";
      } else {
        alert("请求失败");
      }
    }
  );
}

$(function() {
  getUserInfo();

  $(".button").on("click", function() {
    getUserInfo();
  });
});
