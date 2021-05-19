/*
 * @Author: 孙晓东
 * @Date: 2021-05-18 22:35:18
 * @LastEditTime: 2021-05-19 15:46:30
 */
var timer;

function loginQuery(resolve, reject) {
  $.ajax({
    type: "GET",
    url: "/api/login/query",
    data: { uuid: 1 },
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
  if (timer) clearTimeout(timer);
  loginQuery(
    function(res) {
      if (res.code === 200) {
        window.location.href = "/user";
      } else {
        timer = setTimeout(init, 1000);
      }
    },
    function() {
      timer = setTimeout(init, 1000);
    }
  );
}

$(function() {
  init();
});
