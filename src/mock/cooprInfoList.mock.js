const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|100': [
    {
      'key|123.1-50': 1,
      'cooprSeq|+1': 1,
      'cooprCde|123.1-10': 1,
      'operCde|123.1-10': 1,
      'unifiedSocialCrCde|123.1-10': 1,
      cnName () {
        return Mock.Random.csentence(3, 5)
      },
      cnShortName () {
        return Mock.Random.csentence(3, 5)
      },
      cooprSts () {
        return Mock.Random.csentence(3, 5)
      },
      regDt () {
        return Mock.Random.date()
      },
      operDt () {
        return Mock.Random.date()
      },
      enName: '@name',
      enShortName: '@name',
      legalRepName: '@name',
      operName: '@name',
      regAddr: '@address',
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})


let database = usersListData.data

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8007/request',
}

module.exports = {

  [`GET ${apiPrefix}/cooprInfo`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`DELETE ${apiPrefix}/cooprdel`] (req, res) {
    const { cooprSeq } = req.body
    const data = queryArray(database, cooprSeq, 'cooprSeq')
    console.log(data)
    if (data) {
      database = database.filter((item) => item.cooprSeq !== cooprSeq)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
