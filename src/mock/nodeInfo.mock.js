// const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let dataKey = Mock.mock({
  'data|9': [
    {
      'key|123.1-10': 1,
      'nodeId|123.1-10': 1,
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
          'key|123.1-10': 1,
          'nodeId|123.1-10': 1,
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

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8007/request',
}

module.exports = {

  [`GET ${apiPrefix}/node/nodeInfo`] (req, res) {
    res.json({
      success: true,
      data: nodeInfo.data,
    })
  },
  [`GET ${apiPrefix}/getOneNode`] (req, res) {
    let { nodeId } = req.query
    // nodeId = Number(nodeId)
    console.log(nodeId)
    let newdata = []
    let dddd = []
    let obj = []
    obj = nodeInfo.data.filter((item) => {
      return item.nodeId.toString() === nodeId.toString()
    })
    if (obj.length > 0) newdata = obj
    nodeInfo.data.forEach((item) => {
      dddd = item.children.filter((index) => {
        return index.nodeId.toString() === nodeId.toString()
      })
      if (dddd.length > 0) newdata = dddd
    })
    // console.log(newdata)
    // res.status(200).json(data)
    let data = {}
    data.data = newdata[0]
    console.log(1)
    if (newdata) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  [`PATCH ${apiPrefix}/updateOneNode`] (req, res) {
    console.log(req.body)
    res.status(201).end()
  },
}
