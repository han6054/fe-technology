validate
=
validate.js是一个轻量级Javascript表单验证库

#### 特点：
- 应用于几十条常见的表单规则
- 不需要处理业务，自带错误提示功能
- 自定义消息
- 自定义验证回调
- 在vue项目中使用

#### 如何使用

```
   
   // template -----------------------------
   
  <input type="number" class="tel-input" placeholder="请输入手机号" maxlength="11" v-model="formData.mobile">
  
  
  // js ---------------------------------
  
      data() {
        return {
          formData: {
            mobile: ''
          }
        }
      },
 methods: {
           initValidate() {
              const config = [{
                  ref: "mobile",
                  rule: {
                    required: {
                      message: "请输入联系人手机号"
                    },
                    mobile: {
                      message: '请输入正确的手机号'
                    }
                  }
                }]
              this.va = new Validate(config, this.formData);
            }  
 }，
 mounted() {
      this.initValidate()
    }

```
Validate 第一个参数是一个数组，通过`config`中的 `ref`找到传入`formData`中对应的key进行修改

`rule`可以配置多个对象, 其中每一个对象的`key`值（`required`、`mobile`）代表着验证规则 `required`表示不能为空，`mobile`代表为手机号验证规则

检验常用规则如下：

| 验证规则   |     验证方法  | 
|----------|:-------------:|
| 不为空 |  required | 
| 邮箱|  email   | 
| mobile | 电话号 | 
| tel | 座机电话 | 
| url | http https | 
| username | 用户名 | 
| qq | qq | 
| num | 数字 | 
| num1 | 正数 | 
| num2 | 负数 | 
|decmal | 正浮点数 | 
|decmal2 | 负浮点数 |
|idcard | 身份证号 |

最后一步：在提交的时候出发`validate`方法进行校验, 并且对外暴露出一个回调函数，当`result`为`true`时,检验通过，处理接下来的业务逻辑。

```
 submit() {
        this.va.validate((params, result) => {
          if(result) {
            ...
          }
        })
      },
```

