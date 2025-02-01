### 日期处理
>- 日期格式化
>- 相对日期文本格式化
>- diff日期

````
import {
  formatDate,
  DateTools,
  diffDate
}
from 'web-tools-fn/date'

or
import {
  formatDate,
  DateTools,
  diffDate
}
from 'web-tools-fn/date-types'
````

### 日期格式化
```
/**
 * 将日期格式化为指定的格式。
 * @param {Date | string | number} date - 可选的日期参数，可以是 Date 对象、日期字符串或时间戳。
 * @param {string} fmt - 可选的日期格式字符串，默认为 'YYYY-MM-DD hh:mm:ss'。
 * @returns {string} 返回格式化后的日期字符串。
 */

formatDate(date: Date | string | number, fmt: string = 'YYYY-MM-DD hh:mm:ss'): string
```

### 相对日期文本格式化
```
/**
 * DateTools 类提供了日期格式化、相对时间文本和日期差异计算的功能。
 * @param {Date | string | number} date - 可选的日期参数，可以是 Date 对象、日期字符串或时间戳。
 * @returns {Object} 返回一个包含 format、relativeTimeText 和 diff 方法的对象。
 */

const datetool = DateTools(date: Date | string | number)

datetool.format(fmt: string = 'YYYY-MM-DD hh:mm:ss'): string

datetool.relativeTimeText(): string

datetool.diff(): {
  years: number;
  months: number;
  days: number; 
  hours: number;
  minutes: number;
  seconds: number;
  weekDay1:number;
  weekDay2:number;
  unit:string;
}
```

### diff日期
```
/**
 * 计算两个日期之间的时间差。
 * @param {Date | string | number} startDate - 开始日期，可以是 Date 对象、日期字符串或时间戳。
 * @param {Date | string | number} endDate - 结束日期，可以是 Date 对象、日期字符串或时间戳。
 * @returns {Object} 返回一个包含时间差的对象。
 * @property {number} years - 年的时间差。
 * @property {number} months - 月的时间差。
 * @property {number} days - 日的时间差。
 * @property {number} hours - 小时的时间差。
 * @property {number} minutes - 分钟的时间差。
 * @property {number} seconds - 秒的时间差。
 * @property {number} weekDay1 - 开始日期的星期几。
 * @property {number} weekDay2 - 结束日期的星期几。
 * @property {string} unit - 时间差的单位。
 */

diffDate(startDate: Date | string | number, endDate: Date | string | number): {
  years: number;
  months: number;
  days: number; 
  hours: number;
  minutes: number;
  seconds: number
  weekDay1:number;
  weekDay2:number;
  unit:string;
}
```