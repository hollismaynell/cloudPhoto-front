const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|80-100': [
    {
      /* " instuCde": "string,机构代码",
       "instuName": "string,机构名称",
       "optUsr": "string,操作人",
       "optTime": "string,操作时间",
       "deptMangerNum": "string,机构人数",
       "is_stop": "string,启用状态",
       "deptLev": "string,机构部门标志"
       "deptManager": "string,部门名称",
       "deptName": "string,部门负责人",
       "deptPerNum": "string,部门人数",
       */
      'key|+1': 1,
      instuCde: /[a-z][A-Z][0-9]{4}$/,
      instuName () {
        return Mock.Random.csentence(4, 6)
      },
      optUsr: '测试用户',
      optTime () {
        return Mock.Random.date('yyyy-MM-dd')
      },
      'deptMangerNum|1-50': 1,
      'is_stop|1': [
        '启用',
        '未启用',
      ],
      'deptLev|1': [
        '普通',
        '二级管理员',
      ],
      'flagNum|1': [
        '1',
      ],
      deptName () {
        return Mock.Random.cname()
      },
      deptManager: '运营部',
      deptPerNum: '2',
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

  [`GET ${apiPrefix}/organizManages`] (req, res) {
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

  [`DELETE ${apiPrefix}/organizManages`] (req, res) {
    const { ids } = req.body
    database = database.filter((item) => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${apiPrefix}/organizManage`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/organizManage/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/organizManage/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter((item) => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/organizManage/:id`] (req, res) {
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
