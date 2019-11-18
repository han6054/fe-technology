import Vue from 'vue'

function ValideRule() {
  let me = this;

  /**
   * [_rules 常用验证规则定义]
   * @type {Object}
   */
  this._rules = {
    required: function(val) {
      return !!(val && !/^(?:\s|\u3000)+$/.test(val));
    },
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
    mobile: "^(13|14|15|17|18)[0-9]{9}$",
    mobileOrtel: "(^(14|15|17|18)[0-9]{9}$)|(^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$)",
    mobileOrEmail: "(^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$)|(^(13|14|17|15|18)[0-9]{9}$)",
    tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",
    telephone: "^[0-9]{6,12}$", // 渠道内网座机校验规则：6-12位数字
    url: "^http[s]?:\\/\\/\.*$",
    username: "^\\w+$",
    qq: "^[1-9]\\d{5,}$",
    number: "^\\d+$",
    num: "^([+-]?)\\d*\\.?\\d+$", //数字
    num1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
    num2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
    intege: "^-?[1-9]\\d*$",
    intege1: "^[1-9]\\d*$",
    positiveDecimal: "/^[\+]?\d*(\.\d+)?$/",
    decmal: "^[0-9]\\d*(\\.\\d{1,2})?$", //正浮点数
    decmal2: "^[0-9]\\d*(\\.\\d{1,2})?$", //正浮点数,
    idcard: "^[1-9]([0-9]{14})|[0-9]{17}([0-9]|[A-Za-z])$",
    letterAndNum: "(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$",
    onlyCH: "^[\\u2E80-\\u9FFF]+$",
    onlyNum: "^[0-9]\\d*|0$", //可以0开头
    idCardNumber: function(sId, opt) {
      let iSum = 0;
      let info = "";
      let idReg = new RegExp("^[1-9]([0-9]{14})|[0-9]{17}([0-9]|[A-Za-z])$");
      let aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
      if (!idReg.test(sId)) {
        return false;
      }
      sId = sId.replace(/x$/i, "a");
      if (aCity[parseInt(sId.substr(0, 2))] == null) {
        return false;
      }
      let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
      let d = new Date(sBirthday.replace(/-/g, "/"));
      if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
        return false;
      }
      for (let i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
      }
      if (iSum % 11 != 1) {
        return false;
      };
      return true;
    },
    maxlength: function(val, opt) {
      return me.__getByteLength(val) <= opt;
    },
    minlength: function(val, opt) {
      return me.__getByteLength(val) >= opt;
    },
    rangelength: function(val, opt) {
      return val.length >= opt[0] && val.length <= opt[1];
    },
    equal: function(val, opt) {
      return val === (typeof opt == "function" ? opt() : opt);
    }
  };
}

ValideRule.prototype = {
  __getRule: function(name) {
    return this._rules[name];
  },
  __getByteLength: function(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) >= 0x4e00 && str.charCodeAt(i) <= 0x9fa5) {
        len += 2;
      } else {
        len++;
      }
    }
    return len;
  },
  /**添加一个验证规则*/
  addRule: function(name, handler) {
    this._rules[name] = handler;
  },
  __match: function(name, val, item, callback, opt, options) {
    let me = this,
      rule = me.__getRule(name),
      param = opt && opt.param,
      ctx = options.ctx;

    if (typeof param == "function") {
      callback(param(val, ctx));
    } else {
      if (typeof val == "string") {
        val = val.trim();
      }
      if (typeof rule == "function") {
        if (name == "required" && item.def) {
          callback(rule(val, param) && item.def != val);
        } else {
          callback(rule(val, param));
        }
      } else {
        callback(new RegExp(rule).test(val));
      }

    }
  }
};

/**
 验证类
 formId 要验证的表单,
 ruleConfig 验证规则配置,
 opt 其他配置
 */

function Validate(ruleConfig, formData, opt) {

  this.ruleConfig = ruleConfig;
  this._validRule = new ValideRule()
  this.formData = formData
  this._opt = opt || {}
  if (!this.ruleConfig) return;

}

Validate.prototype = {
  getValidRule: function() {
    return this._validRule;
  },
  addRule: function(va, name, func) {
    this._validRule.addRule(name, function() {
      func && func();
    });
  },
  appendRuleConfig: function(config) {
    this.ruleConfig.push(config);
  },
  getRuleConfig: function() {
    return this.ruleConfig;
  },
  deleteRuleConfig: function(id) {
    let ruleConfigs = this.ruleConfig;
    for (let i = 0; i < ruleConfigs.length; i++) {
      if (ruleConfigs[i].id == id) {
        ruleConfigs.splice(i, 1);
        break;
      }
    }
    this.ruleConfig = ruleConfigs;
  },
  updateRule: function(ruleConfig) {
    this.ruleConfig = ruleConfig;
  },
  /***
   对表单的所有控件进行验证
   callback 验证完成后回调
   */
  validate: function(callback) {
    let me = this,
      keyList = me.ruleConfig,
      resultList = [],
      params = {},
      result = false;
    keyList.forEach(item => {
      me.__validateField(item, (val, rs, list) => {
        if (list.length > 0) {
          resultList = resultList.concat(list.shift());
          return false;
        }
        if (rs) {
          params[item.ref] = `${val}`.trim();
        }
      });
      if (resultList.length > 0) {
        if (resultList[0].message) {
          Vue.prototype.$toast(resultList[0].message);
        }
        return false;
      }
    });
    result = resultList.length <= 0 ? true : false;
    typeof callback == "function" && callback(params, result, resultList);
  },

  /**
   验证单个控件
   */

  __validateField: function(item, callback) {
    let me = this,
      fieldRule = item.rule,
      refId = item.ref,
      value,
      entry, resultList = [],
      itemCallback = item.callback;
    if (fieldRule && refId) {
      value = `${this.formData[refId]}`.trim();
      for (let key in fieldRule) {
        entry = fieldRule[key];
        if (fieldRule["required"] || value != "") {
          me._validRule.__match(key, value, item, function(rs) {
            if (!rs) {
              resultList.push({
                type: key,
                field: refId,
                result: rs,
                errorCallback: item.errorCallback,
                message: entry.message
              });
            }
          }, {
            param: entry.hasOwnProperty('param') ? entry.param : entry
          }, me._opt);
        }
        if (resultList.length > 0) {
          if (resultList[0].message) {
            console.log(resultList[0].message)
            Vue.prototype.$toast(resultList[0].message)
          }
          break;
        }
      }
    }
    itemCallback && itemCallback(value, resultList.length <= 0);
    typeof callback == "function" && callback(value, resultList.length <= 0, resultList);
  }
};
export default Validate;
