/**
 * @Author: xuwenkang
 * @Date: 2017-11-22 10:23:58
 * @Last Modified by: xuwenkang
 * @Last Modified time: 2020-05-04 15:02:25
 * @description 此处存放通用的数据格式/类型处理的方法
 */
import _ from 'lodash';

const data = {
    /**
     * 计算字符串的字节长度
     * @param {String} str 需要计算长度的字符串
     * @returns {Number}
     */
    getStrLen(str) {
        let len = 0;
        // eslint-disable-next-line
        for (let i = 0; i < str.length; i++) {
            const c = str.charCodeAt(i);
            // 单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
                // eslint-disable-next-line
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    },

    /**
     * 数字转换成26个字母，1输出A
     * @param {*number} num 需要转换的数字
     */
    convertNumToLetter(num) {
        const result = [];
        let n = num;
        while (n) {
            let t = n % 26;
            if (!t) {
                t = 26;
                --n; // eslint-disable-line
            }
            result.push(String.fromCodePoint(t + 64));
            n = ~~(n / 26); // eslint-disable-line
        }
        return result.reverse().join('');
    },

    /**
     * 将数字转成成百分比
     * @param {*number} num 当前需要转换的数字
     * @param {*} toFixedNum 当前需要保留的位数
     */
    toPercent(num, toFixedNum = 0) {
        return `${(Math.round(num * 10000) / 100).toFixed(toFixedNum)}%`;
    },

    /**
     *
     * 给数组data补足时使用空行数据补足，用于在表格上默认显示几行
     * @param {Array} list 原始数据
     * @param {number} [padNum=10]
     */
    padEmptyDataForList(list = [], padNum = 10) {
        const size = _.size(list);
        if (size >= padNum) {
            return list;
        }
        let emptyRowNum = padNum - size;
        const newData = [...list];
        while (emptyRowNum > 0) {
            const uuid = this.uuid();
            newData.push({
                // 空白行标志
                flag: true,
                key: `empty_row_${uuid},`,
            });
            --emptyRowNum; // eslint-disable-line
        }
        return newData;
    },

    /**
     * 截取超长字符串，使用...
     * @param {Sting} str 原始字符串
     * @param {Number} length 截取字符串字符数
     * @return {Object} dot
     * @return {Boolean} dot.isSubstr 是否被截取了
     * @return {String} dot.value 如果被截取了，则为截取后的值
     * @return {String} dot.origin 如果被截取了，则为原始值
     */
    dotdotdot(str, length) {
        if (!_.isString(str) || _.isEmpty(str)) {
            return {
                isSubstr: false,
                value: str,
                origin: str,
            };
        }
        if (str.length > length) {
            return {
                isSubstr: true,
                value: `${str.substr(0, length)}...`,
                origin: str,
            };
        }
        return {
            isSubstr: false,
            value: str,
            origin: str,
        };
    },
};

export default data;

export const { getStrLen, convertNumToLetter, toPercent, uuid } = data;
