/**
 * [util 工具类]
 * @type {Object}
 */
import h5toNative from "./h5toNative";
const util = {
    log(msg) {
        if (typeof msg === 'string') {
            console.log(msg)
        } else {
            console.log(JSON.stringify(msg))
        }
    },
    page: {
        getWidth: function() {
            let doc = document,
                body = doc.body,
                html = doc.documentElement,
                client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;
            return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
        },
        getHeight: function() {
            let doc = document,
                body = doc.body,
                html = doc.documentElement,
                client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;
            return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
        },
        getViewWidth: function() {
            let doc = document,
                client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
            return client.clientWidth;
        },
        getViewHeight: function() {
            let doc = document || doc,
                client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
            return client.clientHeight;
        }
    },
    loadScript: function(src) {
        return new Promise(function(resolve, reject) {
            if (document.querySelector('script[src="' + src + '"]')) {
                resolve();
                return;
            }

            const el = document.createElement('script');

            el.type = 'text/javascript';
            el.async = true;
            el.src = src;

            el.addEventListener('load', resolve);
            el.addEventListener('error', reject);
            el.addEventListener('abort', reject);

            document.head.appendChild(el);
        })
    },
    /**
     * [getParam 获取地址栏指定参数]
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    getParam(o) {
        const reg = new RegExp(`(^|\\?|&|#)${o}=([^&#]*)(&|\x24|#)`, '')
        const url = location.href
        const match = url.match(reg)
        if (match) {
            return decodeURIComponent(match[2])
        }
    },
    objectToQuery(query) {
        const params = [];
        for (let n in query) {
            params.push(n + "=" + query[n]);
        }
        return params.join("&");
    },
    getQueryUrl(url, params) {
        const query = this.objectToQuery(params);
        if (url.indexOf('?') >= 0) {
            return `${url}&${query}`;
        }
        return `${url}?${query}`;
    },
    hasStorage() {
        const testKey = 'isEnable'
        const storage = window.localStorage
        let isEnable = false
        try {
            storage.setItem(testKey, '1')
            storage.removeItem(testKey)
            isEnable = true
        } catch (error) {
            console.info(error)
        }
        return isEnable
    },
    removeStorage(key) {
        return this.hasStorage && localStorage.removeItem(key)
    },
    /**
     * set local storage
     * @key string 必须
     * @val string || object 必须
     * @expires timesTamp 可选，如未传入则默认为永久有效(如浏览器不支持storage则录入cookie中，三年有效)
     */
    setStorage(key, val, nEn, expires) {
        if (!this.hasStorage()) {
            return
        }
        if (typeof val !== 'string') {
            val = JSON.stringify(val)
        }
        // 加密字符串值
        if (!nEn) {
            val = this.enString(val, key)
        }
        // 如果有有效时长，写入有效期
        if (expires) {
            const date = new Date()
            date.setTime(date.getTime() + (expires * 1e3))
            expires = `;expires:${date.toGMTString()}`
        } else {
            expires = ''
        }
        if (nEn) {
            localStorage.setItem(key, val + expires)
        } else {
            localStorage.setItem(key, `en:/str;${val + expires}`)
        }
    },
    /**
     * [date 日期相关操作]
     * @type {Object}
     */
    date: {
        /**
         * [pad 日期补0]
         * @param  {[type]} source [description]
         * @param  {[type]} length [description]
         * @return {[type]}        [description]
         */
        pad: function(source, length) {
            let pre = "",
                negative = (source < 0),
                string = String(Math.abs(source));
            length = length || 2;
            if (string.length < length) {
                pre = (new Array(length - string.length + 1)).join('0');
            }

            return (negative ? "-" : "") + pre + string;
        },
        dateAdd(day) {
            const d = new Date();
            d.setDate(d.getDate() + 3);
            return d;
        },
        toDate(str) {
            if (str) {
                return str.toString().replace(/(\d{4})(\d{2})/, "$1/$2/");
            }
        },
        /**
         * [format 日期格式化]
         * @param  {[type]} source  [description]
         * @param  {[type]} pattern [description]
         * @return {[type]}         [description]
         */
        format(source, pattern) {
            if ('string' != typeof pattern) {
                return source.toString();
            }

            function replacer(patternPart, result) {
                pattern = pattern.replace(patternPart, result);
            }

            let pad = util.date.pad,
                year = source.getFullYear(),
                month = source.getMonth() + 1,
                date2 = source.getDate(),
                hours = source.getHours(),
                minutes = source.getMinutes(),
                seconds = source.getSeconds();

            replacer(/yyyy/g, pad(year, 4));
            replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
            replacer(/MM/g, pad(month, 2));
            replacer(/M/g, month);
            replacer(/dd/g, pad(date2, 2));
            replacer(/d/g, date2);

            replacer(/HH/g, pad(hours, 2));
            replacer(/H/g, hours);
            replacer(/hh/g, pad(hours % 12, 2));
            replacer(/h/g, hours % 12);
            replacer(/mm/g, pad(minutes, 2));
            replacer(/m/g, minutes);
            replacer(/ss/g, pad(seconds, 2));
            replacer(/s/g, seconds);

            return pattern;
        }
    },
    /**
     * 解密字符串
     * @str 待解密字符串
     * @key 密钥
     */
    deString(str, key) {
        str = Base64.decode(str)
        const keyLen = key.length
        const strLen = str.length
        let Str = ''
        let i = 0
        for (; i < strLen; i += 1) {
            Str += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % keyLen))
        }
        try {
            return decodeURIComponent(Base64.decode(Str))
        } catch (e) {
            return ''
        }
    },
    /**
     * 加密字符串
     * @str 待加密字符串
     * @key 密钥  可选，若无密钥传入，则会生成一枚随机密钥，并在结果中传出
     */
    enString(str, key) {
        // 如果没有key, 取一个随机数做为密钥
        key = key || this.getRandom()
        // 将经过url编码的字符串进行base64位编码
        str = Base64.encode(encodeURIComponent(str))
        // 加密操作
        const keyLen = key.length
        const strLen = str.length
        let Str = ''
        let i = 0
        for (; i < strLen; i += 1) {
            Str += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % keyLen))
        }
        // 如果有key, 传出base64编码后的加密字符串, 如果没有key, 传出加密字符串与key
        return key ? Base64.encode(Str) : {
            str: Base64.encode(Str),
            key,
        }
    },
    getStorage(key) {
        if (!this.hasStorage()) {
            return
        }
        let val = localStorage.getItem(key)
        let data
        if (!val) {
            return
        }
        if (val.indexOf(';expires:') > 0) {
            data = val.split(';expires:')
            val = data[0]
            // 有效期判断
            if (new Date().getTime() >= new Date(data[1]).getTime()) {
                return this.removeStorage(key)
            }
        }
        // 判断是否加密，如未加密则清除本条内容
        if (val.indexOf('en:/str;') === 0) {
            val = this.deString(val.slice(8), key)
        }
        try {
            return JSON.parse(val)
        } catch (err) {
            return (val)
        }
    },
    cookie(name, value, options) {
        if (typeof value !== 'undefined') {
            options = options || {}
            if (value === null) {
                value = ''
                options.expires = -1
            }
            let expires = ''
            if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
                let date
                if (typeof options.expires === 'number') {
                    date = new Date()
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
                } else {
                    date = options.expires
                }
                expires = `; expires=${date.toUTCString()}`
            }
            const path = options.path ? `; path=${options.path}` : ''
            const domain = options.domain ? `; domain=${options.domain}` : ''
            const secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', value, expires, path, domain, secure].join('')
        } else {
            let cookieValue = null
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';')
                for (let i = 0; i < cookies.length; i += 1) {
                    const cookie = cookies[i].trim()
                    if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                        break
                    }
                }
            }
            return cookieValue
        }
    },
    orderChannel(platform, utm_source) {
        let orderChannel = 1
        if (!platform) { // platform不存在降级处理通过utm_source判断
            if (utm_source === 'A01_006_003') {
                platform = 'ios'
            }
            else if (utm_source === 'A01_006_006') {
                platform = 'android'
            } else if(!platform && !utm_source) {
                h5toNative.getPlatform((result) => {
                    platform = result
                    if (platform == 'ios') {
                        orderChannel = 1
                    } else if (platform == 'android') {
                        orderChannel = 2
                    } else {
                        orderChannel = 3
                    }
                    return orderChannel
                })
            }
        }
        if (platform == 'ios') {
            orderChannel = 1
        } else if (platform == 'android') {
            orderChannel = 2
        } else {
            orderChannel = 3
        }
        return orderChannel
    }
};
export default util
