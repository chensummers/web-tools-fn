
/**
 * 将日期格式化为指定的格式。
 * @param {Date | string | number} date - 可选的日期参数，可以是 Date 对象、日期字符串或时间戳。
 * @param {string} fmt - 可选的日期格式字符串，默认为 'YYYY-MM-DD hh:mm:ss'。
 * @returns {string} 返回格式化后的日期字符串。
 */
export function formatDate(date?: Date | string | number,fmt = 'YYYY-MM-DD hh:mm:ss') {
    date = new Date(date || Date.now());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let dateObj:any = {
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
        s: seconds,
    };

    return fmt.replace(/YYYY|YY|MM|M|DD|D|hh|h|mm|m|ss|s/g, (match) => {
        return dateObj[match] || match;
    });
    
}

/**
 * DateTools 类提供了日期格式化、相对时间文本和日期差异计算的功能。
 * @param {Date | string | number} date - 可选的日期参数，可以是 Date 对象、日期字符串或时间戳。
 * @returns {Object} 返回一个包含 format、relativeTimeText 和 diff 方法的对象。
 */
export function DateTools(date?: Date | string | number) {
    date = new Date(date || Date.now());
    return {
        /**
         * 将日期格式化为指定的格式。
         * @param {string} fmt - 可选的日期格式字符串，默认为 'YYYY-MM-DD hh:mm:ss'。
         * @returns {string} 返回格式化后的日期字符串。
         */
        format(fmt = 'YYYY-MM-DD hh:mm:ss') {
            return formatDate(date,fmt)
        },
        /**
         * 获取相对时间的文本描述。
         * @returns {string} 返回相对时间的文本描述。
         */
        relativeTimeText() {
            const now = new Date();
            const {
                seconds,
                minutes,
                hours,
                days,
                months,
                years,
                weekDay1:d0,
                weekDay2:d1,
            } = diffDate(date,now);
						
           // 具体的文本格式需要根据具体的业务场景来配置
            if (seconds < 60) {
                return '刚刚';
            } else if (minutes < 60) {
                return `${minutes}分钟前`;
            } else if (hours < 24) {
                return `${hours}小时前`;
            } else if (days === 1) {
                return '昨天';
            } else if (days === 2) {
                return '前天';
            } else if (days < 7) {
                return `${d0>=d1?'上':d0===0?'上':''}周${['日', '一', '二', '三', '四', '五', '六'][d0]}`;
            } else if (days < d1+7) {
                return `上周${['日', '一', '二', '三', '四', '五', '六'][d0]}`;
            } else if (days < 30) {
                return `${days}天前`;
            } else if (months < 12) {
                return `${months}个月前`;
            } else {
                return `${years}年前`;
            }
        },
        /**
         * 计算当前日期与传入日期的差异。
         * @param {Date | string | number} d - 可选的日期参数，可以是 Date 对象、日期字符串或时间戳。
         * @returns {Object} 返回包含差异信息的对象。
         */
        diff(d?:Date|string|number) {
            const now = d||new Date();
            const diff = diffDate(date,now);
            
            return {
                ...diff
            }
        }
    };
}

/**
 * 计算两个日期之间的差异。
 * @param {Date | string | number} date1 - 第一个日期，可以是 Date 对象、日期字符串或时间戳。
 * @param {Date | string | number} date2 - 第二个日期，可以是 Date 对象、日期字符串或时间戳。
 * @returns {Object} 返回一个包含差异信息的对象。
 */
export function diffDate(date1: Date | string | number, date2: Date | string | number) {
    date1 = Math.min(+date1, +date2);
    date2 = Math.max(date1, +date2);
    const diff = date2 - date1;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const weekDay1 = (new Date(date1)).getDay();
    const weekDay2 = (new Date(date2)).getDay();

    const units = ['seconds', 'minutes', 'hours', 'days', 'months', 'years']
    const unitsVales = [seconds,minutes, hours, days,months, years]
    let index = 0
    while(unitsVales.length>0){
        const val = unitsVales.shift()
        
        if(val===0){
            if(index!==0){
                index--
            }
            break
        }
        index++
    }

    return {
        seconds,
        minutes,
        hours,
        days,
        months,
        years,
        weekDay1,
        weekDay2,
        unit:units[index]
    }
}


