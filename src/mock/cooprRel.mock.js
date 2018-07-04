const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|100': [
    {
      'isValid|1': [
        'true',
        'false',
      ],
      'key|+1': 1,
      'cooprSeq|+1': 1,
      'relationSeq|+1': /[a-z][A-Z][0-9]{4}$/,
      'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
      cnName () {
        return Mock.Random.csentence(5, 8)
      },
      'enName|+1': /[a-z][A-Z]{14}$/,
      'unifiedSocialCrCde|+1': /[a-z][A-Z][0-9]{4}$/,
      legalRepName () {
        return Mock.Random.cname()
      },
      regDt () {
        return Mock.mock('@date')
      },
      regAddr: ['北京', '北京市', '东城区'],
      'relationTyp|1': [
        '0',
        '1',
        '2',
      ],
      relationTypSel: [
        {
          typCde: 0,
          typName () {
            return '第0种类型'
          },
        },
        {
          typCde: 2,
          typName () {
            return '第2种类型'
          },
        },
        {
          typCde: 1,
          typName () {
            return '第1种类型'
          },
        },
      ],
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})
let mgrListData = Mock.mock({
  'data|100': [
    {
      'isValid|1': [
        'true',
        'false',
      ],
      'cooprSeq|+1': 1,
      'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
      'mgrSeq|+1': /[a-z][A-Z][0-9]{4}$/,
      mgrName () {
        return Mock.Random.cname()
      },
      'status|1': [
        '0',
        '1',
      ],
      'mgrTyp|1': [
        '0',
        '1',
        '2',
      ],
      mgrTypSel: [
        {
          mgrCde: 0,
          mgrName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          mgrCde: 2,
          mgrName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          mgrCde: 1,
          mgrName () {
            return Mock.Random.csentence(5, 8)
          },
        },
      ],
      'idTyp|1': [
        '0',
        '1',
        '2',
      ],
      idTypSel: [
        {
          idrCde: 0,
          idName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          idrCde: 2,
          idName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          idrCde: 1,
          idName () {
            return Mock.Random.csentence(5, 8)
          },
        },
      ],
      'idNo|+1': /[a-z][A-Z]{18}$/,
      'gender|1': [
        '女',
        '男',
      ],
      'eduDegree|1': [
        '0',
        '1',
        '2',
      ],
      eduDegreeSel: [
        {
          eduCde: 0,
          eduName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          eduCde: 2,
          eduName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          eduCde: 1,
          eduName () {
            return Mock.Random.csentence(5, 8)
          },
        },
      ],
      birthday () {
        return Mock.mock('@now')
      },
      'workSts|1': [
        '0',
        '1',
        '2',
      ],
      workStsSel: [
        {
          workCde: 0,
          workName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          workCde: 2,
          workName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          workCde: 1,
          workName () {
            return Mock.Random.csentence(5, 8)
          },
        },
      ],
      workDt () {
        return Mock.mock('@now')
      },
      leaveDt () {
        return Mock.mock('@now')
      },
      liveAddr: ['北京', '北京市', '东城区'],
      telNo: /^1[34578]\d{9}$/,
      cellNo: /^1[34578]\d{9}$/,
      email: '@email',
      isBadRec: '否',
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})
let shareHolderListData = Mock.mock({
  'data|100': [
    {
      'isValid|1': [
        'true',
        'false',
      ],
      'cooprSeq|+1': 1,
      'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
      'seq|+1': /[a-z][A-Z][0-9]{4}$/,
      name () {
        return Mock.Random.cname()
      },
      'investTyp|1': [
        '0',
        '1',
        '2',
      ],
      investTypSel: [
        {
          investCde: 0,
          investName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          investCde: 2,
          investName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          investCde: 1,
          investName () {
            return Mock.Random.csentence(5, 8)
          },
        },
      ],
      'investCurTyp|1': [
        '0',
        '1',
        '2',
      ],
      investCurTypSel: [
        {
          curCde: 0,
          curName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          curCde: 2,
          curName () {
            return Mock.Random.csentence(5, 8)
          },
        },
        {
          curCde: 1,
          curName () {
            return Mock.Random.csentence(5, 8)
          },
        },
      ],
      'unifiedSocialCrCde|+1': /[a-z][A-Z]{18}$/,
      legalRepName () {
        return Mock.Random.cname()
      },
      investAmt: /[1-9]{8}$/,
      relInvestAmt: /[1-9]{8}$/,
      shareHoldingRatio: /[0-1]{5}$/,
      investDt () {
        return Mock.mock('@now')
      },
      // workSts: [
      //   {
      //     'workCde|+1': /[a-z][A-Z][0-9]{14}$/,
      //     workName () {
      //       return Mock.Random.csentence(5, 8)
      //     },
      //   },
      // ],
      workDt () {
        return Mock.mock('@now')
      },
      leaveDt () {
        return Mock.mock('@now')
      },
      liveAddr () {
        return Mock.Random.city()
      },
      telNo: /^1[34578]\d{9}$/,
      cellNo: /^1[34578]\d{9}$/,
      email: '@email',
      isBadRec: '否',
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})

let database = usersListData.data
let mgrDatabase = mgrListData.data
let shDatabase = shareHolderListData.data

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
  [`GET ${apiPrefix}/cooprShareholder`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = shDatabase
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
  [`GET ${apiPrefix}/cooprMgr`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = mgrDatabase
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
  [`GET ${apiPrefix}/cooprRel`] (req, res) {
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
  // 合作机构-关联方信息查询某个
  [`GET ${apiPrefix}/queryCooprRelOnly`] (req, res) {
    let { cooprSeq } = req.query
    let newdata = []
    let obj = []
    obj = usersListData.data.filter((item) => {
      return item.cooprSeq.toString() === cooprSeq.toString()
    })
    if (obj.length > 0) newdata = obj
    let data = {}
    data.data = newdata[0]
    console.log(data)
    if (newdata) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  // 合作机构-股东信息查询某个
  [`GET ${apiPrefix}/queryCooprShareholderOnly`] (req, res) {
    let { cooprSeq } = req.query
    let newdata = []
    let obj = []
    obj = shareHolderListData.data.filter((item) => {
      return item.cooprSeq.toString() === cooprSeq.toString()
    })
    if (obj.length > 0) newdata = obj
    let data = {}
    data.data = newdata[0]
    if (newdata) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  // 合作机构-高管查询某个
  [`GET ${apiPrefix}/queryCooprMgrOnly`] (req, res) {
    let { cooprSeq } = req.query
    let newdata = []
    let obj = []
    obj = mgrListData.data.filter((item) => {
      return item.cooprSeq.toString() === cooprSeq.toString()
    })
    if (obj.length > 0) newdata = obj
    let data = {}
    data.data = newdata[0]
    if (newdata) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/cooprRel`] (req, res) {
    const { ids } = req.body
    database = database.filter((item) => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },

  [`POST ${apiPrefix}/cooprRel`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },
/* 股东*/
  [`GET ${apiPrefix}/cooprShareholder/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(shDatabase, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  /* 关联*/
  [`GET ${apiPrefix}/cooprRel/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  /* 高管*/
  [`GET ${apiPrefix}/cooprMgr/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(mgrDatabase, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  /* 关联 删除 */
  [`DELETE ${apiPrefix}/cooprRel/del`] (req, res) {
    const { cooprSeq } = req.body
    const data = queryArray(database, cooprSeq, 'cooprSeq')
    if (data) {
      database = database.filter((item) => item.cooprSeq !== cooprSeq)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  /* 高管 删除 */
  [`DELETE ${apiPrefix}/cooprMgr/del`] (req, res) {
    const { cooprSeq } = req.body
    const data = queryArray(mgrDatabase, cooprSeq, 'cooprSeq')
    if (data) {
      mgrDatabase = mgrDatabase.filter((item) => item.cooprSeq !== cooprSeq)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  /* 股东 删除 */
  [`DELETE ${apiPrefix}/cooprShareholder/del`] (req, res) {
    const { cooprSeq } = req.body
    const data = queryArray(shDatabase, cooprSeq, 'cooprSeq')
    if (data) {
      shDatabase = shDatabase.filter((item) => item.cooprSeq !== cooprSeq)
      console.log(data)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
