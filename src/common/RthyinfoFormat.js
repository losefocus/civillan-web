// 水雨情数据格式化

export const RthyinfoFormat = {
    /**
     * 保留数字的小数位。
     *
     * @param v
     *            被保留的数字。
     * @param len
     *            小数位长度。
     * @return 保留结果。
     */
    round: function(v, len) {
      console.log(v, len);
        if (v == null || v == "" || isNaN(v)) {
            return "";
        }
        if (isNaN(len) || len == null) {
            len = 0;
        } else if (len < 0) {
            len = 0;
        }
        var n = Math.round(v * Math.pow(10, len)) / Math.pow(10, len);

        if (len === 0) {
            return n;
        }
        var s = n.toString();
        var pos = s.indexOf(".");
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
    }, // end round

    /**
     * 格式化水位的输出。
     *
     * @param v
     *            水位值。
     */
    formatZ: function(v) {
      console.log(v);

        if (v == null || v == "" || isNaN(v)) {
            return "";
        }
        return this.round(v, 2);
    },

    /**
     * 格式化雨量的输出。
     *
     * @param v
     *            雨量值。
     */
    formatP: function(v) {
      console.log(v);
        if (v == 0) return "0.0";
        if (isNaN(v) || v == null ||v == "") {
            return "";
        }
        return this.round(v, 1);
    }
};
