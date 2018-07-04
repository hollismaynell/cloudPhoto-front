const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let dataKey = Mock.mock({
  'data|100': [
    {
      'id|+1': 1,
      typCde: '@string("number", 7, 9)',
      'typSts|1': [
        '0',
        '1',
        '2',
      ],
      startDt: '@datetime',
      /* 反欺诈 */
      cooprSeq: '@name',
      cooprCde: '@string("number", 7, 9)',
      cnName: '@string("number", 7, 9)',
      enName: '@string("number", 7, 9)',
      enShortName: '@county(true)',
      unifiedSocialCrCde: '@county(true)',
      legalRepName: '@last',
      lastChgDt: '@datetime',
      /* 反欺诈 */
      'typVer|+1': 1,
      typDesc: '@cname',
      reson () {
        return Mock.Random.csentence(3, 15)
      },
      'typGrp|1': [
        '耐用消费品贷款',
        '一般消费贷款',
        '汽车消费贷款',
      ],
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})

let loanListData = dataKey

module.exports = {

  [`GET ${apiPrefix}/assetCheck`] (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1
    let data
    let newPage
    let query1 = req.query
    let { ...other } = query1
    let newData1 = loanListData.data
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

  'POST /api/assetCheck' (req, res) {
    const newData = JSON.parse(req.body)
    newData.entryTime = Mock.mock('@now')

    newData.id = loanListData.data.length + 1
    loanListData.data.unshift(newData)

    loanListData.page.total = loanListData.data.length
    loanListData.page.current = 1

    global[dataKey] = loanListData

    res.json({ success: true, data: loanListData.data, page: loanListData.page })
  },

  'DELETE /api/assetCheck' (req, res) {
    const deleteItem = JSON.parse(req.body)
    const usersListData = loanListData

    usersListData.data = usersListData.data.filter((item) => {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    usersListData.page.total = usersListData.data.length

    global[dataKey] = usersListData

    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  'PUT /api/assetCheck' (req, res) {
    const editItem = JSON.parse(req.body)

    const usersListData = loanListData

    editItem.entryTime = Mock.mock('@now')

    usersListData.data = usersListData.data.map((item) => {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

}
