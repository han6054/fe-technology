import util from './util'

const ua = window.navigator.userAgent.toLowerCase();
// 调用原生方法注册回调函数机制
const JKBridgeEvent = {
    _listeners: {},
    addEvent: function (type, fn) {
        if (typeof fn === "function") {
            this._listeners[type] = fn;
        }
        return this;
    },
    removeEvent: function (type) {
        const fn = this._listeners[type];
        if (typeof fn === "function") {
            delete this._listeners[type];
        }
        return this;
    },
    fireEvent: function (type, param, keep) {
        const fn = this._listeners[type];
        if (typeof fn === "function") {
            fn(param);
            if (!keep) {
                delete this._listeners[type];
            }
        }
        return this;
    },
};
const d = +new Date();
const PLAT_CALLBACKID = 'getPlat_callBackID'.toLowerCase() + '_' + d; // 获取平台的回调
const BACK_CALLBACKID = 'getBackEvent_callBackID'.toLowerCase() + '_' + d; //app点击返回按钮的回调

const HSHC_H5  = {
    /**
     * [callbacks app回调的方法]
     * @type {Object}
     */
    callbacks: {
        setBackEvent(result) {
            JKBridgeEvent.fireEvent(BACK_CALLBACKID, result, true)
        }
    },
    /**
     * [setLoginLog description]queryStoreListByspel
     * @param  {Function} callback [接口返回-2登录时通知APP setLoginLog]
     * @return {[type]}            [description]
     */
    setLoginLog(data) {
        HSHC_H5.callNativeFunc('setLoginLog', {
            token: data
        });
    },
    isAndroid() {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        return isAndroid === true ? true : false
    },
    /**
     * [getBackEvent 拦截app原始的返回按钮]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    getBackEvent(callback) {
        JKBridgeEvent.addEvent(BACK_CALLBACKID, (result) => {
            callback && callback(result);
        });
    },
    /**
     * [getPlat 获取来源]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    getPlat(callback) {
        JKBridgeEvent.addEvent(PLAT_CALLBACKID, (param) => {
            callback && callback(param);
        })
        const utm_source = util.getParam('utm_source')
        const platform = util.getParam('platform')
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            JKBridgeEvent.fireEvent(PLAT_CALLBACKID, 'weixin');
        } else if (platform === 'ios' || platform === 'android') {
            JKBridgeEvent.fireEvent(PLAT_CALLBACKID, 'app');
        } else if (window.__wxjs_environment != undefined && window.__wxjs_environment === 'miniprogram') {
            JKBridgeEvent.fireEvent(PLAT_CALLBACKID, 'miniprogram');
        } else {
            JKBridgeEvent.fireEvent(PLAT_CALLBACKID, 'wap');
        }
    },
    /**
     * [callNativeFunc 通用调用app方法的函数]
     * @param  {[type]} funcName [description]
     * @param  {[type]} data     [description]
     * @return {[type]}          [description]
     */
    callNativeFunc(funcName, data, callback) {
        let strData;
        let message;
        if (data) {
            strData = JSON.stringify(data);
        }
        if (this.isAndroid()) {
            // 如果为true 就是安卓
            try {
                let retVal;
                if (strData) {
                    retVal = hshc[funcName](strData);
                } else {
                    retVal = hshc[funcName]();
                }
                callback && callback(retVal);
            } catch (error) {
                callback && callback(false);
            }
        } else {
            let callBackID;
            message = {
                'methodName': funcName,
            }
            if (callback) {
                callBackID = (funcName + '_callBackID').toLowerCase();
                message.callBackID = callBackID;
                JKBridgeEvent.addEvent(callBackID, function (d) {
                    callback && callback(d);
                });
            }
            if (data) {
                message.params = data;
            }
            // 否则是ios
            try {
                message = JSON.stringify(message);
                if (window.webkit.messageHandlers && window.webkit.messageHandlers.HsEventHandler) {
                    window.webkit.messageHandlers.HsEventHandler.postMessage(message);
                } else {
                    callback && callback(false);
                }
            } catch (error) {

            }
        }
    },
    getLoginToken(callback) {
        this.callNativeFunc('getToken', null, (token) => {
            callback && callback(token);
        });
    }
}
window.HSHC_H5 = HSHC_H5;
window.JKBridgeEvent = JKBridgeEvent;
export default HSHC_H5
