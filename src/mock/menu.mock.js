const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    name: '首页',
    mpid: '-1',
    clickAble: true,
    icon: 'icon iconfont icon-shouye',
    route: '/dashboard',
  },
  {
    id: '2',
    name: '首页',
    clickAble: true,
    icon: 'icon iconfont icon-shouye',
    route: '/dashboard',
  },
  {
    id: '3',
    name: '机构',
    mpid: '1',
    bpid: '1',
    icon: 'icon iconfont icon-jigou',
    route: '/coopr',
  },
  {
    id: '4',
    name: '合作机构维护',
    mpid: '3',
    bpid: '3',
    icon: 'icon iconfont icon-jigou',
    route: '/coopr/cooprInfo',
  },
  {
    id: '5',
    name: '合作机构维护详情',
    mpid: '-1',
    bpid: '4',
    icon: 'icon iconfont icon-jigou',
    route: '/coopr/cooprInfo/detail',
  },
  {
    id: '6',
    name: '合作机构维护修改',
    mpid: '-1',
    bpid: '4',
    icon: 'icon iconfont icon-jigou',
    route: '/coopr/cooprInfo/modify',
  },
  {
    id: '7',
    name: '合作机构维护添加',
    mpid: '-1',
    bpid: '4',
    icon: 'icon iconfont icon-jigou',
    route: '/coopr/cooprInfo/add',
  },
  {
    id: '8',
    name: '预警监测',
    mpid: '3',
    bpid: '3',
    icon: 'icon iconfont icon-jigou',
    route: '/agency/warningMonitor',
  },
  {
    id: '9',
    name: '预警条件设置',
    mpid: '8',
    bpid: '8',
    icon: 'icon iconfont icon-jigou',
    route: '/agency/warningMonitor/setting',
  },
  {
    id: '10',
    name: '预警结果分析',
    mpid: '8',
    bpid: '8',
    icon: 'icon iconfont icon-jigou',
    route: '/agency/warningMonitor/query',
  },
  {
    id: '11',
    name: '信贷',
    mpid: '1',
    bpid: '1',
    icon: 'icon iconfont icon-xindaiyewu',
    route: '/asset',
  },
  {
    id: '12',
    name: '入池条件设置',
    mpid: '11',
    bpid: '11',
    icon: 'icon iconfont icon-xindaiyewu',
    route: '/asset/assetCondition',
  },
  {
    id: '13',
    name: '入池确认',
    mpid: '11',
    bpid: '11',
    icon: 'icon iconfont icon-xindaiyewu',
    route: '/asset/confirm',
  },
  {
    id: '14',
    name: '限额设置',
    mpid: '11',
    bpid: '11',
    icon: 'icon iconfont icon-xindaiyewu',
    route: '/asset/limitSettings',
  },
  {
    id: '15',
    name: '限额监测',
    mpid: '11',
    bpid: '11',
    icon: 'icon iconfont icon-xindaiyewu',
    route: '/asset/limitMonitor',
  },
  {
    id: '16',
    name: '信贷检查',
    mpid: '11',
    bpid: '11',
    icon: 'icon iconfont icon-xindaiyewu',
    route: '/asset/check',
  },
  {
    id: '17',
    name: '资金',
    mpid: '1',
    bpid: '1',
    icon: 'icon iconfont icon-zijin',
    route: '/capital',
  },
  {
    id: '18',
    name: '放款管理',
    mpid: '17',
    bpid: '17',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/loanManage',
  },
  {
    id: '19',
    name: '放款条件检验',
    mpid: '18',
    bpid: '18',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/loanManage/check',
  },
  {
    id: '20',
    name: '还款管理',
    mpid: '17',
    bpid: '17',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/repay',
  },
  {
    id: '21',
    name: '机构账户设置',
    mpid: '20',
    bpid: '20',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/account/settings',
  },
  {
    id: '22',
    name: '逾期监测',
    mpid: '20',
    bpid: '20',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/repay/overdueMonitor',
  },
  {
    id: '25',
    name: '投资管理',
    mpid: '17',
    bpid: '17',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/investManage',
  },
  {
    id: '26',
    name: '融资管理',
    mpid: '17',
    bpid: '17',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/financeManage',
  },
  {
    id: '27',
    name: '资产',
    mpid: '1',
    bpid: '1',
    icon: 'icon iconfont icon-zichan',
    route: '/property',
  },
  {
    id: '28',
    name: '数据统计',
    mpid: '27',
    bpid: '27',
    icon: 'icon iconfont icon-zichan',
    route: '/property/dataStatistics',
  },
  {
    id: '29',
    name: '异常检验',
    mpid: '27',
    bpid: '27',
    icon: 'icon iconfont icon-zichan',
    route: '/property/exception',
  },
  {
    id: '30',
    name: '抽查数据录入',
    mpid: '29',
    bpid: '29',
    icon: 'icon iconfont icon-zichan',
    route: '/property/exception/check',
  },
  {
    id: '31',
    name: '资产表现对比',
    mpid: '29',
    bpid: '29',
    icon: 'icon iconfont icon-zichan',
    route: '/property/exception/assetContrast',
  },
  {
    id: '32',
    name: '反欺诈',
    mpid: '29',
    bpid: '29',
    icon: 'icon iconfont icon-zichan',
    route: '/property/exception/antiFraud',
  },
  {
    id: '33',
    name: '打分卡',
    mpid: '29',
    bpid: '29',
    icon: 'icon iconfont icon-zichan',
    route: '/property/exception/scoreCard',
  },
  {
    id: '34',
    name: '压力测试',
    mpid: '27',
    bpid: '27',
    icon: 'icon iconfont icon-zichan',
    route: '/property/stressTest',
  },
  {
    id: '35',
    name: '不良处置',
    mpid: '27',
    bpid: '27',
    icon: 'icon iconfont icon-zichan',
    route: '/property/badDisposal',
  },
  {
    id: '36',
    name: '不良处置信息维护',
    mpid: '35',
    bpid: '35',
    icon: 'icon iconfont icon-zichan',
    route: '/property/badDisposal/info',
  },
  {
    id: '37',
    name: '资产筛选',
    mpid: '27',
    bpid: '27',
    icon: 'icon iconfont icon-zichan',
    route: '/property/out',
  },
  {
    id: '38',
    name: '产品',
    mpid: '1',
    bpid: '1',
    icon: 'icon iconfont icon-chanpin',
    route: '/product',
  },
  {
    id: '39',
    name: '资产包管理',
    mpid: '38',
    bpid: '38',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/assetPackage',
  },
  {
    id: '40',
    name: '资产包维护',
    mpid: '39',
    bpid: '39',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/assetPackage/packageInfo',
  },
  {
    id: '41',
    name: '资产包维护详情',
    mpid: '-1',
    bpid: '39',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/assetPackage/packageInfo/:id',
  },
  {
    id: '42',
    name: '现金流测算',
    mpid: '39',
    bpid: '39',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/assetPackage/measure',
  },
  {
    id: '43',
    name: '产品管理',
    mpid: '38',
    bpid: '38',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/manage',
  },
  {
    id: '44',
    name: '产品设计',
    mpid: '43',
    bpid: '43',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/manage/productInfo',
  },
  {
    id: '45',
    name: '产品发行',
    mpid: '43',
    bpid: '43',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/manage/productIssueInfo',
  },
  {
    id: '46',
    name: '压力测试',
    mpid: '43',
    bpid: '43',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/manage/streeTest',
  },
  {
    id: '47',
    name: '报告',
    mpid: '1',
    bpid: '1',
    icon: 'icon iconfont icon-baogao',
    route: '/report',
  },
  {
    id: '48',
    name: '重大异常报告',
    mpid: '47',
    bpid: '47',
    icon: 'icon iconfont icon-baogao',
    route: '/report/exception',
  },
  {
    id: '49',
    name: '资产池信息',
    mpid: '47',
    bpid: '47',
    icon: 'icon iconfont icon-baogao',
    route: '/report/assetPool',
  },
  {
    id: '50',
    name: '资产池表现分析',
    mpid: '47',
    bpid: '47',
    icon: 'icon iconfont icon-baogao',
    route: '/report/assetAnalysis',
  },
  {
    id: '51',
    name: '常规压力测试结果',
    mpid: '47',
    bpid: '47',
    icon: 'icon iconfont icon-baogao',
    route: '/report/stressTest',
  },
  {
    id: '52',
    name: '合作机构信息',
    mpid: '47',
    bpid: '47',
    icon: 'icon iconfont icon-baogao',
    route: '/report/coopr',
  },
  {
    id: '53',
    name: '信托贷款服务机构报告',
    mpid: '47',
    bpid: '47',
    icon: 'icon iconfont icon-baogao',
    route: '/report/loan',
  },
  {
    id: '54',
    name: '资产服务机构报告',
    mpid: '47',
    bpid: '47',
    icon: 'icon iconfont icon-baogao',
    route: '/report/asset',
  },
  {
    id: '55',
    name: '报表',
    mpid: '1',
    bpid: '1',
    icon: 'icon iconfont icon-baobiao',
    route: '/fineReport',
  },
  {
    id: '56',
    name: '报表查询',
    mpid: '55',
    bpid: '55',
    icon: 'icon iconfont icon-baobiao',
    route: '/fineReport/list',
  },
  {
    id: '57',
    name: '系统',
    mpid: '1',
    bpid: '1',
    icon: 'icon iconfont icon-xitong',
    route: '/node',
  },
  {
    id: '58',
    name: '菜单管理',
    mpid: '57',
    bpid: '57',
    icon: 'icon iconfont icon-xitong',
    route: '/node/nodeInfo',
  },
  {
    id: '59',
    name: '权限管理',
    mpid: '57',
    bpid: '57',
    icon: 'icon iconfont icon-xitong',
    route: '/node/levNode',
  },
  {
    id: '61',
    name: '机构管理',
    mpid: '57',
    bpid: '57',
    icon: 'icon iconfont icon-xitong',
    route: '/organizManage/organizManage',
  },
  {
    id: '62',
    name: '用户管理',
    mpid: '57',
    bpid: '57',
    icon: 'icon iconfont icon-xitong',
    route: '/organizManage/usersManage',
  },
  {
    id: '67',
    name: '入池条件设置详情',
    mpid: '-1',
    bpid: '12',
    icon: 'icon iconfont icon-xindaiyewu',
    route: '/asset/assetCondition/detail',
  },
  {
    id: '68',
    name: '报表详情',
    mpid: '-1',
    bpid: '55',
    icon: 'icon iconfont icon-baobiao',
    route: '/fineReprot/list/:id',
  },
  {
    id: '70',
    name: ' 资产包关联',
    mpid: '-1',
    bpid: '40',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/assetPackage/packageRelInfo',
  },
  {
    id: '901',
    name: '不良信息维护详情',
    mpid: '-1',
    bpid: '36',
    icon: 'icon iconfont icon-zichan',
    route: '/property/badDisposal/detail',
  },
  {
    id: '902',
    name: '限额设置新增',
    mpid: '-1',
    bpid: '14',
    icon: 'icon iconfont icon-xindaiyewu',
    route: '/asset/limitSettings/add',
  },
  {
    id: '903',
    name: '产品设计',
    mpid: '-1',
    bpid: '44',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/manage/productInfo/ProdAlter',
  },
  {
    id: '904',
    name: '产品发行新增',
    mpid: '-1',
    bpid: '45',
    icon: 'icon iconfont icon-chanpin',
    route: '/product/productIssueInfo/ProdIssueAdd',
  },
  {
    id: '905',
    name: '机构账户设置新增',
    mpid: '-1',
    bpid: '21',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/account/settings/add',
  },
  {
    id: '906',
    name: '还款借贷匹配',
    mpid: '20',
    bpid: '20',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/payLoan/match',
  },
  {
    id: '907',
    name: '报表详情',
    mpid: '-1',
    bpid: '56',
    icon: 'icon iconfont icon-baobiao',
    route: '/fineReport/list/detail',
  },
  {
    id: '908',
    name: '合规条件检验设置',
    mpid: '26',
    bpid: '26',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/financeManage/check',
  },
  {
    id: '909',
    name: '融资信息维护',
    mpid: '26',
    bpid: '26',
    icon: 'icon iconfont icon-zijin',
    route: '/capital/financeManage/finaceInfo',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json({
      data: database,
    })
  },
}