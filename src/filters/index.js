//数据精度
function round (v, len) {
  if (v == null || v == "" || isNaN(v)) {
    return "";
  }
  if (isNaN(len) || len == null) {
    len = 0;
  } else if (len < 0) {
    len = 0;
  }
  let n = Math.round(v * Math.pow(10, len)) / Math.pow(10, len);

  if (len === 0) {
    return n;
  }
  let s = n.toString();
  let pos = s.indexOf(".");
  //如果小数位数不到指定的个数则在后面补0
  if (pos < 0) {
    s += ".";
    for (var i = 0; i < len; i++) {
      s += "0";
    }
  } else {
    var digitLen = s.substring(pos + 1).length;
    for (var i = digitLen; i < len; i++) {
      s += "0";
    }
  }
  return s;
} // end round

 export  function formatZ(v) {
  if (v == null || v == "" || isNaN(v)) {
    return "";
  }
  return round(v, 2);
}

export function formatP (v) {
  if (v == 0) return "0.0";
  if (isNaN(v) || v == null ||v == "") {
    return "";
  }
  return round(v, 1);
}

//时间格式转换
export function dateFormat(date) {
  let format = 'yyyy-MM-dd hh:mm:ss';
  if (date != 'Invalid Date') {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';
}
