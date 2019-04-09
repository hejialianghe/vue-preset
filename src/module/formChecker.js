/* eslint-disable */
/**
 * Created by ezreally on 29/12/2016.
 */
function FormChecker () {
};
FormChecker.prototype = {
  regex_phone: /^1\d{10}$/, 
  regex_auth_code: /[a-zA-Z0-9]{4}/,
  regex_ver_code: /\d{6}/,
  regex_password: /[a-zA-Z0-9!"\#$%&'()*+,-./:;<=>?@\[\\\]^_`\{\|\}\~]{6,}/,
  checkPhone: function (phone) {
    return this.regex_phone.test(phone)
  }, 
  checkAuthCode: function (authCode) {
    return this.regex_auth_code.test(authCode)
  },
  checkVerCode: function (verCode) {
    return this.regex_ver_code.test(verCode)
  },
  checkPassword: function (password) {
    return this.regex_password.test(password)
  },
  checkPhoneAndVerCode: function (phone, verCode) {
    return this.checkPhone(phone) && this.checkVerCode(verCode)
  },
  checkPhoneAndPassword: function (phone, password) {
    return this.checkPhone(phone) && this.checkPassword(password)
  }
}
let formChecker = new FormChecker()
export default formChecker
