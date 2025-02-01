"use strict";

// npx babel dist/date/format-date.js --out-file dist/date/index.cjs --copy-files --verbose
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTools = DateTools;
exports.diffDate = diffDate;
exports.formatDate = formatDate;
//Mon Jan 27 2025 16:03:34 GMT+0800 (中国标准时间)

/**
 * 将日期格式化为指定的格式。
 * @param {Date | string | number} date - 可选的日期参数，可以是 Date 对象、日期字符串或时间戳。
 * @param {string} fmt - 可选的日期格式字符串，默认为 'YYYY-MM-DD hh:mm:ss'。
 * @returns {string} 返回格式化后的日期字符串。
 */
function formatDate(date) {
  var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm:ss';
  date = new Date(date || Date.now());
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var dateObj = {
    YYYY: year,
    YY: year.toString().slice(-2),
    MM: String(month).padStart(2, '0'),
    M: month,
    DD: String(day).padStart(2, '0'),
    D: day,
    hh: String(hours).padStart(2, '0'),
    h: hours,
    mm: String(minutes).padStart(2, '0'),
    m: minutes,
    ss: String(seconds).padStart(2, '0'),
    s: seconds
  };
  return fmt.replace(/YYYY|YY|MM|M|DD|D|hh|h|mm|m|ss|s/g, function (match) {
    return dateObj[match] || match;
  });
}
/**
 * DateTools 类提供了日期格式化、相对时间文本和日期差异计算的功能。
 * @param {Date | string | number} date - 可选的日期参数，可以是 Date 对象、日期字符串或时间戳。
 * @returns {Object} 返回一个包含 format、relativeTimeText 和 diff 方法的对象。
 */
function DateTools(date) {
  date = new Date(date || Date.now());
  return {
    /**
     * 将日期格式化为指定的格式。
     * @param {string} fmt - 可选的日期格式字符串，默认为 'YYYY-MM-DD hh:mm:ss'。
     * @returns {string} 返回格式化后的日期字符串。
     */
    format: function format() {
      var fmt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'YYYY-MM-DD hh:mm:ss';
      return formatDate(date, fmt);
    },
    /**
     * 获取相对时间的文本描述。
     * @returns {string} 返回相对时间的文本描述。
     */
    relativeTimeText: function relativeTimeText() {
      var now = new Date();
      var _diffDate = diffDate(date, now),
        seconds = _diffDate.seconds,
        minutes = _diffDate.minutes,
        hours = _diffDate.hours,
        days = _diffDate.days,
        months = _diffDate.months,
        years = _diffDate.years,
        d0 = _diffDate.weekDay1,
        d1 = _diffDate.weekDay2;
      // 具体的文本格式需要根据具体的业务场景来配置
      if (seconds < 60) {
        return '刚刚';
      } else if (minutes < 60) {
        return "".concat(minutes, "\u5206\u949F\u524D");
      } else if (hours < 24) {
        return "".concat(hours, "\u5C0F\u65F6\u524D");
      } else if (days === 1) {
        return '昨天';
      } else if (days === 2) {
        return '前天';
      } else if (days < 7) {
        return "".concat(d0 >= d1 ? '上' : d0 === 0 ? '上' : '', "\u5468").concat(['日', '一', '二', '三', '四', '五', '六'][d0]);
      } else if (days < d1 + 7) {
        return "\u4E0A\u5468".concat(['日', '一', '二', '三', '四', '五', '六'][d0]);
      } else if (days < 30) {
        return "".concat(days, "\u5929\u524D");
      } else if (months < 12) {
        return "".concat(months, "\u4E2A\u6708\u524D");
      } else {
        return "".concat(years, "\u5E74\u524D");
      }
    },
    /**
     * 计算当前日期与传入日期的差异。
     * @param {Date | string | number} d - 可选的日期参数，可以是 Date 对象、日期字符串或时间戳。
     * @returns {Object} 返回包含差异信息的对象。
     */
    diff: function diff(d) {
      var now = d || new Date();
      var diff = diffDate(date, now);
      return Object.assign({}, diff);
    }
  };
}
/**
 * 计算两个日期之间的差异。
 * @param {Date | string | number} date1 - 第一个日期，可以是 Date 对象、日期字符串或时间戳。
 * @param {Date | string | number} date2 - 第二个日期，可以是 Date 对象、日期字符串或时间戳。
 * @returns {Object} 返回一个包含差异信息的对象。
 */
function diffDate(date1, date2) {
  date1 = Math.min(+date1, +date2);
  date2 = Math.max(date1, +date2);
  var diff = date2 - date1;
  var seconds = Math.floor(diff / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);
  var weekDay1 = new Date(date1).getDay();
  var weekDay2 = new Date(date2).getDay();
  var units = ['seconds', 'minutes', 'hours', 'days', 'months', 'years'];
  var unitsVales = [seconds, minutes, hours, days, months, years];
  var index = 0;
  while (unitsVales.length > 0) {
    var val = unitsVales.shift();
    if (val === 0) {
      if (index !== 0) {
        index--;
      }
      break;
    }
    index++;
  }
  return {
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
    months: months,
    years: years,
    weekDay1: weekDay1,
    weekDay2: weekDay2,
    unit: units[index]
  };
}
