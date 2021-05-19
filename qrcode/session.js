/*
 * @Author: 孙晓东
 * @Date: 2021-05-19 15:19:52
 * @LastEditTime: 2021-05-19 15:43:37
 */

module.exports = (function() {
  var status = false;
  var timer;

  function setStatus(val) {
    status = val;
  }

  function getStatus() {
    return status;
  }

  function destroyStatus(time) {
    timer = setTimeout(function() {
      setStatus(false);
      clearTimeout(timer);
    }, time);
  }

  return {
    setStatus: setStatus,
    getStatus: getStatus,
    destroyStatus: destroyStatus
  };
})();
