import config from './config'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'
import lodash from 'lodash'
import editCell from './editCell'
import moment from 'moment'


// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  let str = r.input.substring(5, r.input.length)
  if (r != null) return decodeURI(str)
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

const handleFields = (data) => {
  const dataArr = Reflect.enumerate(data)._k
  dataArr.forEach((item) => {
    if (data[item] instanceof moment) {
      data[item] = data[item].format('YYYYMMDD')
    }
  })
  return data
}
/* 翻译后台数据*/
const translateData = (index, item) => {
  const obj = item.find((itemm) => {
    return itemm.value === index
  })
  return obj.name
}

/* 处理金额 */
/**
 * @param data 需要处理的数据对象
 * @param arr 需要处理的数据字段的数组集合
 * @param float 精确度（默认为2）
 * @returns {*}
 */
const floatNumber = (data, arr, float = 2) => {
  arr.forEach((item) => {
    const numberData = data[item]
    if (data[item] !== undefined) {
      data[item] = parseFloat(numberData).toFixed(float)
    }
  })
 /* const dataArr = Reflect.enumerate(data)._k
  dataArr.forEach((item) => {
    arr.forEach((arrItem) => {
      if (arrItem === item) {
        data[arrItem] = data[arrItem].toFixed(2)
      }
    })
  })*/
  // console.log(data)
  return data
}

// 比例格式化
const formatterPecent = {
  formatter: value => `${value}%`,
  parser: value => value.replace('%', ''),
}

const getRowKey = (record, text) => {
  let str = ''
  if (text instanceof Array) {
    text.forEach((item) => {
      str += record[item]
    })
  } else if (text instanceof String) {
    str = record[text]
  } else if (text === null) {
    str = record.id
  }
  return str
}
/**
 * 保存表格选中的数据
 * @param payload 表格参数对象
 * @param stateData 当前state下的选中数据
 * @returns {*}
 */
const saveSelectedData = (payload, stateData) => {
  if (payload.selectedRow instanceof Array) {
    if (payload.record === true) {
      payload.selectedRow.forEach((index) => {
        stateData = stateData.filter((item) => {
          return item.key !== index.key
        })
      })
      stateData = stateData.concat(payload.selectedRow)
      console.log(stateData)
    } else {
      payload.changeRows.forEach((index) => {
        stateData = stateData.filter((item) => {
          return item.key !== index.key
        })
      })
    }
  } else {
    if (payload.record === true) {
      stateData.push(payload.selectedRow)
    } else {
      stateData = stateData.filter((item) => {
        return item.key !== payload.selectedRow.key
      })
    }
  }
  return stateData
}

module.exports = {
  getRowKey,
  saveSelectedData,
  formatterPecent,
  handleFields,
  floatNumber,
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  editCell,
  translateData,
}
