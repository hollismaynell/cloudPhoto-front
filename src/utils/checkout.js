//  身份证校验
const idCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
const email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
const phone = /^1[34578]\d{9}$/


export {
  idCard,
  email,
  phone,
}
