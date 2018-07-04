const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|10': [
    {
      'id|+1': 1,
      cooper: {
        'cooprSeq|+1': 1,
        'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
        cnName () {
          return Mock.Random.csentence(5, 8)
        },
        cnShortName () {
          return Mock.Random.csentence(1, 3)
        },
        'enName|+1': /[a-z][A-Z]{10}$/,
        'enShortName|+1': /[a-z][A-Z]{5}$/,
        'unifiedSocialCrCde|+1': /[a-z][A-Z][0-9]{15}$/,
        legalRepName () {
          return Mock.Random.cname()
        },
        cooprSts () {
          return Mock.Random.cname()
        },
        regDt () {
          return Mock.mock('@date')
        },
        regAddr: ['北京', '北京市', '东城区'],
        cooprStsSel: [
          {
            stsCde: /[a-z][A-Z]{10}$/,
            stsName () {
              return Mock.Random.cname()
            },
          },
        ],
        operCde: /[a-z][A-Z][0-9]{10}$/,
        operName () {
          return Mock.Random.csentence(5, 8)
        },
        operDt () {
          return Mock.mock('@date')
        },
      },
      cooprRank: {
        'cooprSeq|+1': 1,
        'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
        'rankSeq|+1': /[a-z][A-Z][0-9]{4}$/,
        rankSeqSel: [
          {
            'rankCde|+1': /[a-z][A-Z][0-9]{4}$/,
            rankName () {
              return Mock.Random.csentence(5, 8)
            },
          },
        ],
        rankRet () {
          return Mock.Random.csentence(5, 8)
        },
        rankDt () {
          return Mock.mock('@date')
        },
        'isValid|1': [
          '有效',
          '失效',
        ],
        'operCde|+1': /[a-z][A-Z][0-9]{4}$/,
        operName () {
          return Mock.Random.csentence(5, 8)
        },
        operDt () {
          return Mock.mock('@date')
        },
      },
      cooprRel: [
        {
          'cooprSeq|+1': 1,
          'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
          'relation_seq|+1': /[a-z][A-Z][0-9]{4}$/,
          cnName () {
            return Mock.Random.csentence(5, 8)
          },
          'en_name|+1': /[a-z][A-Z]{14}$/,
          'unifiedSocialCrCde|+1': /[a-z][A-Z][0-9]{4}$/,
          legalRepName () {
            return Mock.Random.cname()
          },
          regDt () {
            return Mock.mock('@now')
          },
          regAddr () {
            return Mock.Random.city()
          },
          // relationTyp: [
          //   {
          //     'typCde|+1': /[a-z][A-Z][0-9]{4}$/,
          //     typName () {
          //       return Mock.Random.csentence(5, 8)
          //     },
          //   },
          // ],
        },
      ],
      cooprMgr: [
        {
          'cooprSeq|+1': 1,
          'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
          'mgrSeq|+1': /[a-z][A-Z][0-9]{4}$/,
          mgrName () {
            return Mock.Random.cname()
          },
          mgrTyp: [
            {
              'mgrCde|+1': /[a-z][A-Z][0-9]{4}$/,
              mgrName () {
                return Mock.Random.csentence(5, 8)
              },
            },
          ],
          idTyp: [
            {
              'idCde|+1': /[a-z][A-Z][0-9]{14}$/,
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
          eduDegree: [
            {
              'eduCde|+1': /[a-z][A-Z][0-9]{14}$/,
              eduName () {
                return Mock.Random.csentence(5, 8)
              },
            },
          ],
          birthday () {
            return Mock.mock('@now')
          },
          workSts: [
            {
              'workCde|+1': /[a-z][A-Z][0-9]{14}$/,
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
          liveAddr () {
            return Mock.Random.city()
          },
          telNo: /^1[34578]\d{9}$/,
          cellNo: /^1[34578]\d{9}$/,
          email: '@email',
          isBadRec: '否',
          operCde: /[a-z][A-Z][0-9]{14}$/,
          operName () {
            return Mock.Random.csentence(5, 8)
          },
          operDt () {
            return Mock.mock('@now')
          },
        },
      ],
      cooprShareHoler: [
        {
          'cooprSeq|+1': 1,
          'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
          'seq|+1': /[a-z][A-Z][0-9]{4}$/,
          name () {
            return Mock.Random.cname()
          },
          'unifiedSocialCrCde|+1': /[a-z][A-Z][0-9]{4}$/,
          legalRepName () {
            return Mock.Random.cname()
          },
          investTyp: [
            {
              'investCde|+1': /[a-z][A-Z][0-9]{4}$/,
              investName () {
                return Mock.Random.csentence(5, 8)
              },
            },
          ],
          investCurTyp: [
            {
              'curCde|+1': /[a-z][A-Z][0-9]{4}$/,
              curName () {
                return Mock.Random.csentence(5, 8)
              },
            },
          ],
          'investAmt|+1': /[0-9]{5}$/,
          'relInvestAmt|+1': /[0-9]{5}$/,
          'shareHoldingRatio|+1': /[0-1]{3}$/,
          investDt () {
            return Mock.mock('@now')
          },
          'operCde|+1': /[a-z][A-Z][0-9]{4}$/,
          operName () {
            return Mock.Random.cname()
          },
          operDt () {
            return Mock.mock('@now')
          },
        },
      ],
      cooprFin: {
        'cooprSeq|+1': 1,
        'cooprCde|+1': /[a-z][A-Z][0-9]{4}$/,
        'totalAssetAmt|+1': /[0-9]{5}$/,
        'totalSaleAmt|+1': /[0-9]{5}$/,
        'revenue|+1': /[0-9]{5}$/,
        'totalTaxAmt|+1': /[0-9]{5}$/,
        'totalOwnEquity|+1': /[0-9]{5}$/,
        'totalProfit|+1': /[0-9]{5}$/,
        'netProfit|+1': /[0-9]{5}$/,
        'totalDebt|+1': /[0-9]{5}$/,
        mem () {
          return Mock.Random.csentence(5, 8)
        },
        'operCde|+1': /[a-z][A-Z][0-9]{4}$/,
        operName () {
          return Mock.Random.csentence(5, 8)
        },
        operDt () {
          return Mock.mock('@now')
        },
      },
      /*
      "data": {
       "cooper": {
       "cooprSeq": "string,唯一id",-
       "cooprCde": "string,合作机构代码",-
       "cnName": "string,合作机构中文名",-
       "cnShortName": "string,合作机构中文简称",-
       "enName": "string,合作机构英文名称",-
       "enShortName": "string,合作机构英文简称",-
       "unifiedSocialCrCde": "string,统一社会信用代码或组织机构代码",-
       "legalRepName": "string,法定代表人姓名",-
       "regDt": "string,注册或批准成立日期",-
       "regAddr": "string,注册地址",-
       "cooprSts": [
       {
       "stsCde": "string,状态编码",
       "stsName": "string,状态描述"
       }
       ],
       "operCde": "string,操作机构代码",
       "operName": "string,操作机构姓名",
       "operDt": "string,操作日期"
       },
       "cooprRank": {
       "cooprSeq": "string,唯一id",
       "cooprCde": "string,合作机构代码",
       "rankSeq": "string,评级序号",
       "rankMhd": [
       {
       "mhdCde": "string,评级编码",
       "mhdName": "string,评级描述"
       }
       ],
       "rankRet": "string,主体评级结果",
       "rankDt": "string,主体评级r日期",
       "isValid": "string,是否有效",
       "operCde": "string,操作机构代码",
       "operName": "string,操作机构姓名",
       "operDt": "string,操作日期"
       },
       "cooprRel": [
       {
       "cooprSeq": "string,唯一id",
       "cooprCde": "string,合作机构代码",
       "relation_seq": "string, 关联方序号",
       "cn_name": "string,关联方中文名称",
       "en_name": "string,关联方英文名称",
       "unifiedSocialCrCde": "string,统一社会信用代码或组织机构代码",
       "legalRepName": "string,法定代表人姓名",
       "regDt": "string,注册或批准成立日期",
       "regAddr": "string,注册地址",
       "relationTyp": [
       {
       "typCde": "string,关系编码",
       "typName": "string,关系描述"
       }
       ]
       }
       ],
       "cooprMgr": [
       {
       "cooprSeq": "string,唯一id",
       "cooprCde": "string,合作机构代码",
       "mgrSeq": "string,高管序号",
       "mgrName": "string,高管姓名",
       "mgrTyp": [
       {
       "mgrCde": "string,类别编码",
       "mgrName": "string,类别名称"
       }
       ],
       "idTyp": [
       {
       "idCde": "string,证件编码",
       "idName": "string,证件名称"
       }
       ],
       "idNo": "string,证件号码",
       "gender": "string,性别",
       "eduDegree": [
       {
       "eduCde": "string,学历代码",
       "eduName": "string,学历名称"
       }
       ],
       "birthday": "string,出生日期",
       "workSts": [
       {
       "workCde": "string,任职状态代码",
       "workName": "string,任职状态名称"
       }
       ],
       "workDt": "string,任职日期",
       "leaveDt": "string,离职日期",
       "liveAddr": "string,长期居住地址",
       "telNo": "string,固定电话",
       "cellNo": "string,手机号码",
       "email": "string,电子邮箱",
       "isBadRec": "是否有不良记录",
       "operCde": "string,操作机构代码",
       "operName": "string,操作机构姓名",
       "operDt": "string,操作日期"
       }
       ],
       "cooprShareHoler": [
       {
       "cooprSeq": "string,唯一id",
       "cooprCde": "string,合作机构代码",
       "seq": "string,股东序号",
       "name": "string,股东姓名",
       "unifiedSocialCrCde": "string,股东统一社会信用代码或组织机构代码",
       "legalRepName": "string,股东法定代表人姓名",
       "investTyp": [
       {
       "investCde": "string,投资方式代码",
       "investName": "string,投资方式描述"
       }
       ],
       "investCurTyp": [
       {
       "curCde": "string,币种代码",
       "curName": "string,币种描述"
       }
       ],
       "investAmt": "int,投资金额",
       "relInvestAmt": "int,实际到位投资金额",
       "shareHoldingRatio": "int,投资人持股比例",
       "investDt": "string,投资日期",
       "operCde": "string,操作机构代码",
       "operName": "string,操作机构姓名",
       "operDt": "string,操作日期"
       }
       ],
       "cooprFin": {
       "cooprSeq": "string,唯一id",
       "cooprCde": "string,合作机构代码",
       "totalAssetAmt": "number,资产总额",
       "totalSaleAmt": "number,销售总额",
       "revenue": "number,营业总收入中主营业务收入",
       "totalTaxAmt": "number,纳税总额",
       "totalOwnEquity": "number,所有者权益合计",
       "totalProfit": "number,利润总额",
       "netProfit": "number,净利润",
       "totalDebt": "number,负债总额",
       "mem": "string,附注说明",
       "operCde": "string,操作机构代码",
       "operName": "string,操作机构姓名",
       "operDt": "string,操作日期"
       }
       }
       */
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

  [`GET ${apiPrefix}/coopr`] (req, res) {
    const { query } = req
    let { ...other } = query
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
      data: newData[0],
    })
  },
  [`GET ${apiPrefix}/coopr/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
