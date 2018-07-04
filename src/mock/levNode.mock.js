const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let dataKey = Mock.mock({
  'data|100': [
    {
      'key|123.1-50': 1,
      'id|+1': 1,
      'usrLev|123.1-10': 1,
      levName () {
        return Mock.Random.csentence(3, 5)
      },
      dateCreated () {
        return Mock.Random.date()
      },
      operator: '@name',
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})

let levNode = Mock.mock({
  'data|9': [
    {
      'key|1-100': 1,
      'id|+1': 1,
      menuName () {
        return Mock.Random.csentence(3, 5)
      },
      dateCreater () {
        return Mock.Random.date()
      },
      nodeCreater () {
        return Mock.Random.csentence(3, 5)
      },
      'nodeLev|1-2': 1,
      'nodeLevSel|5': [
        {
          'nodeLev|+1': 1,
          nodeLevDec () {
            return Mock.Random.csentence(3, 5)
          },
        },
      ],
      nodeUrl: Mock.Random.url(),
      'nodePraentId|1-5': 1,
      'nodeOrder|1-100': 1,
      'nodeActv|1-2': true,
      'nodePraenSel|5': [
        {
          'nodePraentId|+1': 1,
          nodePraenDec () {
            return Mock.Random.csentence(3, 5)
          },
        },
      ],
      'children|1-5': [
        {
          'key|50-100': 1,
          'id|+10': 1,
          menuName () {
            return Mock.Random.csentence(3, 5)
          },
          dateCreater () {
            return Mock.Random.date()
          },
          nodeCreater () {
            return Mock.Random.csentence(3, 5)
          },
          'nodeLev|1-2': 1,
          'nodeLevSel|5': [
            {
              'nodeLev|+1': 1,
              nodeLevDec () {
                return Mock.Random.csentence(3, 5)
              },
            },
          ],
          nodeUrl: Mock.Random.url(),
          'nodePraentId|1-5': 1,
          'nodeOrder|1-100': 1,
          'nodeActv|1-2': true,
          'nodePraenSel|5': [
            {
              'nodePraentId|+1': 1,
              nodePraenDec () {
                return Mock.Random.csentence(3, 5)
              },
            },
          ],
        },
      ],
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})

let nodeInfo = dataKey


module.exports = {

  [`GET ${apiPrefix}/node/levNode`] (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1
    let data
    let newPage
    let query1 = req.query
    let { ...other } = query1
    let newData1 = nodeInfo.data
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData1 = newData1.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'typcde1') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }
    data = newData1
    newPage = {
      current: currentPage,
      total: newData1.length,
    }
    res.json({
      success: true,
      data,
      page: {
        pageSize: Number(pageSize),
        current: newPage.current,
        total: data.total,
      },
    })
  },
  [`GET ${apiPrefix}/getOneLevNode`] (req, res) {
    res.json({
      success: true,
      data: levNode.data,
    })
  },
  [`PATCH ${apiPrefix}/updateOneNode`] (req, res) {
    res.status(201).end()
  },
}
