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
      'typVer|+1': 1,
      typDesc () {
        return Mock.Random.csentence(3, 5)
      },
      'typGrp|1': [
        '耐用消费品贷款',
        '一般消费贷款',
        '汽车消费贷款',
      ],
      /* 反欺诈 */
      cooprSeq: '@string("number", 7, 9)',
      cooprCde: '@string("number", 7, 9)',
      loanNo: '@string("number", 7, 9)',
      custId: '@string("number", 7, 9)',
      loanAmt: '@string("number", 4, 6)',
      loanRest: '@string("number", 4, 6)',
      custName: '@name',
      productName () {
        return Mock.Random.csentence(3, 5)
      },
      'assetTyp|1': [
        '耐用消费品贷款',
        '一般消费贷款',
        '汽车消费贷款',
      ],
      'curTyp|1': [
        '人民币',
        '美元',
        '欧元',
      ],
      'guaranteeFlg|1': [
        '是',
        '否',
      ],
      'guaranteeSum|1-10': 1,
      enShortName: '@county(true)',
      unifiedSocialCrCde: '@county(true)',
      legalRepName: '@last',
      lastChgDt: '@datetime',
      loanEndDt: '@datetime',
      loanStartDt: '@datetime',
      capitalSrc () {
        return Mock.Random.csentence(3, 5)
      },
      /* 反欺诈 */
      acctNo: '@string("number", 7, 9)',
      origPrcp: '@string("number", 4, 6)',
      loanOsPrcp: '@string("number", 4, 6)',
      psRemPrcp: '@string("number", 4, 6)',
      actualRemPrcp: '@string("number", 4, 6)',
      setlPrcp: '@string("number", 4, 6)',
      setlNormInt: '@string("number", 4, 6)',
      monSetlOdIntAmt: '@string("number", 4, 6)',
      setlCommOdInt: '@string("number", 4, 6)',
      monSetlFeeAmt: '@string("number", 4, 6)',
      'psPerdNo|1-10': 1,
      astDueDay: '@datetime',
      loanActvDt: '@datetime',
      /* 反欺诈 */
    },
  ],
  page: {
    total: 100,
    current: 1,
  },
})

let loanListData = dataKey

module.exports = {

  [`GET ${apiPrefix}/loanTypes`] (req, res) {
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

  'POST /api/loanTypes' (req, res) {
    const newData = JSON.parse(req.body)
    newData.entryTime = Mock.mock('@now')

    newData.id = loanListData.data.length + 1
    loanListData.data.unshift(newData)

    loanListData.page.total = loanListData.data.length
    loanListData.page.current = 1

    global[dataKey] = loanListData

    res.json({ success: true, data: loanListData.data, page: loanListData.page })
  },

  'DELETE /api/loanTypes' (req, res) {
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

  'PUT /api/loanTypes' (req, res) {
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
