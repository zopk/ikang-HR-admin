import Cookies from 'js-cookie'

let globals = {
  mockEnv: 'test',
  payment: 'http://uat.paynew.ikang.com/', // 统一支付
  host: 'http://test.ikapp.ikang.com/', // 接口地址
  domain: '.ikang.com',
  paymentServe: {
    test: 'http://192.168.99.152:8080/', // test支付
    uat: 'http://newuat.paynew.ikang.com/', // UAT支付
    pre: 'http://paynew.ikang.com/', // 没有pre支付
    prod: 'http://paynew.ikang.com/' // prod支付
  },
  hostServe: {
    test: 'http://test.ee.ikang.com/service/v1/', // 测试服务器
    // test: 'http://192.168.99.77:7777/service/v1/', // 俊庆本地
    // test: 'http://172.172.172.63:13000/service/v1/', // 测试服务器
    // test: 'http://192.168.98.75:7777/service/v1/', // 测试本地
    // test: 'http://192.168.99.125:7777/service/v1/', // 潘岩本地
    // test: 'http://172.16.98.61:7777/service/v1/', // 任孟本地
    uat: 'http://uat.ee.ikang.com/service/v1/', // sever UAT环境
    pre: 'http://pre.ee.ikang.com/service/v1/',
    prod: 'http://ee.ikang.com/service/v1/' //  远程服务器体检宝prod 环境
  },
  domainServe: '.ikang.com',
  cookieProp: {path: '/'},
  origin: '',
  loginCall (afterLoginTarget) {
    // let newPath = afterLoginTarget
    window.sessionStorage.clear()
    Cookies.remove('access_token', {domain: globals.domain, path: '/'})
    Cookies.remove('mainDatabase')
    // Cookies.set('afterLoginTarget', newPath)
    window.location.href = '/admin/Login'
  },
  format (date) {
    let data = new Date(date)
    let month = data.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = data.getDate()
    if (day < 10) {
      day = '0' + day
    }
    return data.getFullYear() + '-' + month + '-' + day
  },
  repeat (str, num) {
    return (1 << (num - 1).toString(2).replace(/./g, str))
  },
  Reg: {
    verifyMobile: /(^(13\d|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/,
    verifyIdno: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    verifyAccount: /[\u4E00-\u9FA5]/,
    verifyEmail: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
    verifyNumber: /^[0-9]*$/
    // verifyEmail: /^([a-zA-Z0-9_-])+(\.\w+)*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  },
  interface () {
    let nowHostValue = window.location.hostname
    let preIndex = nowHostValue.indexOf('.')
    let preHostName = nowHostValue.substring(0, preIndex)
    if (nowHostValue === 'localhost' || nowHostValue.indexOf('192.168.') > -1 || nowHostValue.indexOf('172.16.') > -1 || nowHostValue === 'ite.my.ikang.com') {
      let mockEnv = globals.mockEnv
      globals.host = globals.hostServe[mockEnv]
      console.log(globals.hostServe[mockEnv])
      globals.domain = ''
    } else if (preHostName === 'ee' || preHostName === 'pre') {
      globals.host = globals.hostServe['prod']
      globals.domain = globals.domainServe['prod']
    } else {
      globals.host = globals.hostServe[preHostName]
      globals.domain = globals.domainServe[preHostName]
    }
    console.log(globals.host)
  },
  showAlipay: window.navigator.userAgent.search(/MicroMessenger/i) === -1
}
export default globals
