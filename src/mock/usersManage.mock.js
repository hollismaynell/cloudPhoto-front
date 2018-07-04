const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|80-100': [
    {
      /* "instuCde": "string,所属机构",
       "usrCde": "string,用户cde",
       "depCde": "string,所属机构或部门",
       "usrName": "string,用户名称",
       "usrIdTyp": "string,证件类型",
       "usrIdNo": "string,证件号码",
       "quGrd": "string,用户权限",
       "usrPassword": "string,用户密码",
       "usrTel": "string,手机",
       "usrEmail": "string,邮箱",
       "usrSts": "string,用户状态"*/
      instuCde () {
        return Mock.Random.csentence(4, 6)
      },
      usrCde () {
        return Mock.Random.cname()
      },
      depCde: '长安新生',
      usrName () {
        return Mock.Random.cname()
      },
      'usrIdTyp|1': [
        '身份证',
        '港澳通行证',
      ],
      usrIdNo () {
        return Mock.mock('@id')
      },
      'quGrd|1': [
        '一级管理员',
        '二级管理员',
      ],
      usrPassword: '*******',
      usrTel: /^1[34578]\d{9}$/,
      usrEmail: '@email',
      'usrSts|1': [
        '正常',
        '失效',
      ],
    },
  ],
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

  [`GET ${apiPrefix}/usersManages`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
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

  [`DELETE ${apiPrefix}/usersManages`] (req, res) {
    const { ids } = req.body
    database = database.filter((item) => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${apiPrefix}/usersManage`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/usersManage/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/usersManage/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter((item) => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/usersManage/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
