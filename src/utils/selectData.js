// 合作机构 合作状态
const cooprStsSel = [
  {
    name: '未合作',
    value: '1',
  },
  {
    name: '合作中',
    value: '2',
  },
  {
    name: '已冻结',
    value: '3',
  },
]
// 限额设置 - 设置项目
const setPrjtSel = [
  {
    name: '规模上限',
    value: '01',
  },
  {
    name: '逾期率上限',
    value: '02',
  },
  {
    name: '不良率上限',
    value: '03',
  },
]
// 合作机构 主体评级方式
const rankSeqSel = [
  {
    name: '内部评级',
    value: '1',
  },
  {
    name: '外部评级',
    value: '2',
  },
  {
    name: '其他',
    value: '9',
  },
]
// 合作机构 主体评级方式
const relationTypSel = [
  { value: '01', name: '控股' },
  { value: '02', name: '被控股' },
  { value: '03', name: '参股' },
  { value: '04', name: '被参股' },
  { value: '05', name: '高管兼职' },
  { value: '06', name: '高管间亲属' },
  { value: '07', name: '担保' },
  { value: '08', name: '被担保' },
  { value: '09', name: '生产经营控制' },
  { value: '10', name: '生产经营被控制' },
  { value: '11', name: '生产经营影响' },
  { value: '12', name: '生产经营被影响' },
  { value: '13', name: '转出（按非公允价格）' },
  { value: '14', name: '转入（按非公允价格）' },
  { value: '15', name: '其他实际控制' },
  { value: '16', name: '其他实际被控制' },
  { value: '99', name: '其他关联关系' },
]
// 合作机构 高管类别
const mgrTypSel = [
  {
    mgrCde: '01',
    mgrName: '法定代表人',
  }, {
    mgrCde: '02',
    mgrName: '董事长',
  }, {
    mgrCde: '03',
    mgrName: '总经理/行政负责人',
  }, {
    mgrCde: '04',
    mgrName: '财务负责人',
  }, {
    mgrCde: '05',
    mgrName: '董事',
  }, {
    mgrCde: '06',
    mgrName: '监事',
  }, {
    mgrCde: '07',
    mgrName: '副总经理',
  }, {
    mgrCde: '99',
    mgrName: '其他',
  },
]
// 合作机构 证件类型
const idTypSel = [
  {
    idCde: '00',
    idName: '员工代码',
  },
  {
    idCde: '20',
    idName: '身份证',
  },
  {
    idCde: '22',
    idName: '护照',
  },
  {
    idCde: '23',
    idName: '军官证',
  },
  {
    idCde: '25',
    idName: '港澳居民来往内地通行证',
  },
  {
    idCde: '26',
    idName: '台湾居民来往大陆通行证',
  },
  {
    idCde: '2X',
    idName: '其他证件',
  },
  {
    idCde: '30',
    idName: '组织机构代码证',
  },
  {
    idCde: '31',
    idName: '营业执照',
  },
]
// 合作机构 任职状态
const workStsSel = [
  {
    workCde: '2',
    workName: '在职',
  }, {
    workCde: '1',
    workName: '离职',
  },
]
// 合作机构 文化程度
const eduDegreeSel = [
  {
    eduCde: '00',
    eduName: '硕士及以上',
  }, {
    eduCde: '10',
    eduName: '本科',
  }, {
    eduCde: '20',
    eduName: '大专',
  }, {
    eduCde: '30',
    eduName: '高中',
  }, {
    eduCde: '40',
    eduName: '初中及以下',
  },
]
// 合作机构 投资币种
const investTypSel = [
  {
    investCde: '01',
    investName: '资金',
  },
  {
    investCde: '02',
    investName: '实物',
  },
  {
    investCde: '03',
    investName: '知识产权',
  },
  {
    investCde: '04',
    investName: '劳务',
  },
  {
    investCde: '99',
    investName: '其他',
  },
]
// 合作机构 投资方式
const investCurTypSel = [
  {
    curName: '人民币',
    curCde: 'CNY',
  },
  {
    curName: '欧元',
    curCde: 'EUR',
  },
  {
    curName: '英镑',
    curCde: 'GBP',
  },
  {
    curName: '法郎',
    curCde: 'FRF',
  },
  {
    curName: '美元',
    curCde: 'USD',
  },
  {
    curName: '澳大利亚元',
    curCde: 'AUD',
  },
  {
    curName: '新西兰元',
    curCde: 'NZD',
  },
  {
    curName: '加拿大元',
    curCde: 'CAD',
  },
  {
    curName: '瑞士法郎',
    curCde: 'CHF',
  },
  {
    curName: '瑞典克朗',
    curCde: 'SEK',
  },
  {
    curName: '挪威克朗',
    curCde: 'NOK',
  },
  {
    curName: '丹麦克朗',
    curCde: 'DKK',
  },
  {
    curName: '泰国铢',
    curCde: 'THB',
  },
  {
    curName: '新加坡元',
    curCde: 'SGD',
  },
  {
    curName: '菲律宾比索',
    curCde: 'PHP',
  },
  {
    curName: '港币',
    curCde: 'HKD',
  },
  {
    curName: '日元',
    curCde: 'JPY',
  },
  {
    curName: '澳门元',
    curCde: 'MOP',
  },
]
// 菜单等级
const menuLevel = [
  {
    value: 1,
    name: '1',
  }, {
    value: 2,
    name: '2',
  },
]
// 菜單失效
const menuActive = [
  {
    value: 'A',
    name: '是',
  }, {
    value: 'I',
    name: '否',
  },
]
// 评级信息是否有效
const isValidSel = [
  {
    value: 'Y',
    name: '是',
  }, {
    value: 'N',
    name: '否',
  },
]

// 用户状态
const usrStsSel = [
  {
    usrSts: 'A',
    name: '正常',
  }, {
    usrSts: 'N',
    name: '失效',
  },
]

// 证件类型
const usrIdTypSel = [
  {
    usrIdTyp: '00',
    name: '员工代码',
  }, {
    usrIdTyp: '20',
    name: '身份证',
  }, {
    usrIdTyp: '22',
    name: '护照',
  }, {
    usrIdTyp: '23',
    name: '军官证',
  }, {
    usrIdTyp: '25',
    name: '港澳居民来往内地通行证',
  }, {
    usrIdTyp: '26',
    name: '台湾居民来往大陆通行证',
  }, {
    usrIdTyp: '2X',
    name: '其他证件',
  }, {
    usrIdTyp: '30',
    name: '组织机构代码证',
  }, {
    usrIdTyp: '31',
    name: '营业执照',
  },
]
// 基础资产类型
const basicAssetTypSel = [
  {
    comCde: '01',
    comCnDesc: '汽车贷',
  }, {
    comCde: '02',
    comCnDesc: '房抵贷',
  }, {
    comCde: '03',
    comCnDesc: '消费贷',
  },
]
// 产品类型
const prodTypSel = [
  {
    comCde: '01',
    comCnDesc: '信贷资产证券化',
  }, {
    comCde: '02',
    comCnDesc: '企业资产证券化',
  }, {
    comCde: '03',
    comCnDesc: '资产支持票据',
  }, {
    comCde: '04',
    comCnDesc: '保险资产证券化',
  },
]
// 产品状态
const prodStsSel = [
  {
    comCde: '01',
    comCnDesc: '发行申请',
  }, {
    comCde: '02',
    comCnDesc: '挂牌交易',
  }, {
    comCde: '03',
    comCnDesc: '停牌',
  }, {
    comCde: '04',
    comCnDesc: '复牌',
  }, {
    comCde: '05',
    comCnDesc: '摘牌',
  },
]
// 菜单等级
const pkgStsRel = [
  {
    value: '01',
    name: '未关联资产',
  }, {
    value: '02',
    name: '已关联资产待生效',
  }, {
    value: '03',
    name: '已生效',
  },
]
// 限额类型
const limitationTypSel = [
  {
    value: '01',
    name: '单一合作机构限额',
  }, {
    value: '02',
    name: '单一资产类型限额',
  }, {
    value: '03',
    name: '整体限额',
  },
]
// 资产类型
const assetTypSel = [
  {
    value: '01',
    name: '汽车贷',
  }, {
    value: '02',
    name: '房抵贷',
  }, {
    value: '03',
    name: '消费贷',
  },
]
// 资产类型
const sexSel = [
  { value: '10', name: '男' },
  { value: '20', name: '女' },
]
// 权限等级
const usrLevSel = [
  { value: '1', name: '系统管理权限' },
  { value: '2', name: '机构管理权限' },
  { value: '3', name: '普通权限' },
]

// 资产类型
const rankRet = [
  { value: 1, name: '惠誉信用评级' },
  { value: 2, name: '标普信用评级' },
  { value: 3, name: 'Capital Intelligence评级' },
  { value: 4, name: '穆迪信用评级' },
  { value: 5, name: '国内信用评级' },
]
// 资产类型
const rankRetSel = {
  1: [
    { value: '0111', name: 'AAA' },
    { value: '0112', name: 'AA+' },
    { value: '0113', name: 'AA' },
    { value: '0114', name: 'AA-' },
    { value: '0115', name: 'A+' },
    { value: '0116', name: 'A' },
    { value: '0117', name: 'A-' },
    { value: '0121', name: 'BBB+' },
    { value: '0122', name: 'BBB' },
    { value: '0123', name: 'BBB-' },
    { value: '0124', name: 'BB+' },
    { value: '0125', name: 'BB' },
    { value: '0126', name: 'BB-' },
    { value: '0127', name: 'B+' },
    { value: '0128', name: 'B' },
    { value: '0129', name: 'B-' },
    { value: '0131', name: 'CCC+' },
    { value: '0132', name: 'CCC' },
    { value: '0133', name: 'CCC-' },
    { value: '0134', name: 'CC' },
    { value: '0135', name: 'C' },
    { value: '0139', name: 'RD' },
    { value: '0141', name: 'D' },
  ],
  2: [
    { value: '0211', name: 'AAA' },
    { value: '0212', name: 'AA+' },
    { value: '0213', name: 'AA' },
    { value: '0214', name: 'AA-' },
    { value: '0215', name: 'A+' },
    { value: '0216', name: 'A' },
    { value: '0217', name: 'A-' },
    { value: '0221', name: 'BBB+' },
    { value: '0222', name: 'BBB' },
    { value: '0223', name: 'BBB-' },
    { value: '0224', name: 'BB+' },
    { value: '0225', name: 'BB' },
    { value: '0226', name: 'BB-' },
    { value: '0227', name: 'B+' },
    { value: '0228', name: 'B' },
    { value: '0229', name: 'B-' },
    { value: '0231', name: 'CCC+' },
    { value: '0232', name: 'CCC' },
    { value: '0233', name: 'CCC-' },
    { value: '0234', name: 'CC' },
    { value: '0235', name: 'C' },
    { value: '0238', name: 'R' },
    { value: '0239', name: 'SD' },
    { value: '0241', name: 'D' },
  ],
  3: [
    { value: '0311', name: 'AAA' },
    { value: '0312', name: 'AA+' },
    { value: '0313', name: 'AA' },
    { value: '0314', name: 'AA-' },
    { value: '0315', name: 'A+' },
    { value: '0316', name: 'A' },
    { value: '0317', name: 'A-' },
    { value: '0321', name: 'BBB+' },
    { value: '0322', name: 'BBB' },
    { value: '0323', name: 'BBB-' },
    { value: '0324', name: 'BB+' },
    { value: '0325', name: 'BB' },
    { value: '0326', name: 'BB-' },
    { value: '0327', name: 'B+' },
    { value: '0328', name: 'B' },
    { value: '0329', name: 'B-' },
    { value: '0331', name: 'CCC+' },
    { value: '0332', name: 'CCC' },
    { value: '0333', name: 'CCC-' },
    { value: '0334', name: 'CC' },
    { value: '0335', name: 'C' },
    { value: '0341', name: 'RS' },
    { value: '0351', name: 'SD' },
    { value: '0361', name: 'D' },
  ],
  4: [
    { value: '0411', name: 'Aaa' },
    { value: '0412', name: 'Aa1' },
    { value: '0413', name: 'Aa2' },
    { value: '0414', name: 'Aa3' },
    { value: '0415', name: 'A1' },
    { value: '0416', name: 'A2' },
    { value: '0417', name: 'A3' },
    { value: '0421', name: 'Baa1' },
    { value: '0422', name: 'Baa2' },
    { value: '0423', name: 'Baa3' },
    { value: '0424', name: 'Ba1' },
    { value: '0425', name: 'Ba2' },
    { value: '0426', name: 'Ba3' },
    { value: '0427', name: 'B1' },
    { value: '0428', name: 'B2' },
    { value: '0429', name: 'B3' },
    { value: '0431', name: 'Caa1' },
    { value: '0432', name: 'Caa2' },
    { value: '0433', name: 'Caa3' },
    { value: '0434', name: 'Ca' },
    { value: '0435', name: 'C' },
    { value: '0441', name: 'D' },
  ],
  5: [
    { value: '0501', name: 'AAA' },
    { value: '0502', name: 'AA' },
    { value: '0503', name: 'A' },
    { value: '0504', name: 'BBB' },
    { value: '0505', name: 'BB' },
    { value: '0506', name: 'B' },
    { value: '0507', name: 'CCC' },
    { value: '0508', name: 'CC' },
    { value: '0509', name: 'C' },
  ],
}
// 入池条件设置 条件项
const conditionCde = [
  { value: 'L0000001', name: '借款人年龄' },
  { value: 'L0000002', name: '单笔贷款期限（月）' },
  { value: 'L0000003', name: '新车首付比例' },
  { value: 'L0000004', name: '二手车首付比例' },
  { value: 'L0000005', name: '单笔贷款余额' },
  { value: 'L0000006', name: '单笔贷款余额占比' },
  { value: 'L0000007', name: '单笔贷款逾期天数' },
]
// 不良信息处置 处置方式
const displMtd = [
  { value: '01', name: '公开拍卖' },
  { value: '02', name: '公开招标' },
  { value: '03', name: '公开招标' },
  { value: '04', name: '产权交易所挂牌' },
  { value: '05', name: '证券交易所交易' },
  { value: '06', name: '协议转让' },
  { value: '99', name: '其他' },
]
// 不良信息处置 处置方式
const displSts = [
  { value: '01', name: '已登记' },
  { value: '02', name: '已登记' },
  { value: '03', name: '处置终止' },
  { value: '04', name: '处置终止' },
]
// 产品发行
// 计息期规则
const interestBearRuleMapSel = [
  { bearRuleCde: '01', bearRuleName: '30/360' },
  { bearRuleCde: '02', bearRuleName: 'ACT/360' },
  { bearRuleCde: '03', bearRuleName: 'ACT/365' },
]
// 付息频率
const paymPeriodSel = [
  { paymCde: '01', paymName: '月付' },
  { paymCde: '02', paymName: '季付' },
  { paymCde: '03', paymName: '半年付' },
  { paymCde: '04', paymName: '年付' },
  { paymCde: '05', paymName: '其他支付频率' },
]
// 还本方式
const principalPaymMtdSel = [
  { paymMtdCde: '1', paymMtdName: '计划摊还型' },
  { paymMtdCde: '2', paymMtdName: '过手偿付型' },
]
// 证券分层等级
const securityHierarchySel = [
  { hierarchyCde: '01', hierarchyName: '优先A1级' },
  { hierarchyCde: '02', hierarchyName: '优先A2级' },
  { hierarchyCde: '03', hierarchyName: '优先A3级' },
  { hierarchyCde: '04', hierarchyName: '优先A4级' },
  { hierarchyCde: '05', hierarchyName: '优先A5级' },
  { hierarchyCde: '06', hierarchyName: '优先A6级' },
  { hierarchyCde: '07', hierarchyName: '优先A7级' },
  { hierarchyCde: '08', hierarchyName: '优先A8级' },
  { hierarchyCde: '09', hierarchyName: '优先A9级' },
  { hierarchyCde: '10', hierarchyName: '优先A10级' },
  { hierarchyCde: '11', hierarchyName: '优先B级' },
  { hierarchyCde: '12', hierarchyName: '优先次级' },
]
// 核查结果
const checkRsltSel = [
  { checkRslt: '01', checkRsltName: '未核查' },
  { checkRslt: '02', checkRsltName: '已核查未匹配' },
  { checkRslt: '03', checkRsltName: '已核查且匹配' },
]

// 权益类型类型
const rghtandintTypSel = [
  { rghtandintTyp: '01', rghtandintTypName: '非次级' },
  { rghtandintTyp: '02', rghtandintTypName: '次级' },
]
// 投放标的类型
const putonTrgtTypSel = [
  { putonTrgtTyp: '01', putonTrgtTypName: '信托计划' },
  { putonTrgtTyp: '02', putonTrgtTypName: '资管计划' },
  { putonTrgtTyp: '03', putonTrgtTypName: '有限合伙份额' },
]
// 作业类型
const jobTypeSel = [
  { jobType: '1', jobTypeName: 'SHELL类型' },
  { jobType: '2', jobTypeName: 'JAVA类型' },
  { jobType: '9', jobTypeName: '其他类型' },
]
// 系统id
const jobSystemSel = [
  { jobType: '01', jobTypeName: '资产管理平台' },
  { jobType: '02', jobTypeName: '马达贷' },
  { jobType: '03', jobTypeName: '信贷系统' },
  { jobType: '04', jobTypeName: '泰美斯' },
  { jobType: '05', jobTypeName: '工厂项目' },
  { jobType: '06', jobTypeName: '催收项目' },
]
const JobGroupTypeSel = [
  { JobGroupType: 'Y', JobGroupName: '是' },
  { JobGroupType: 'N', JobGroupName: '否' },
]
const JobGroupTypeSelect = [
  { value: '2', name: '启用' },
  { value: '3', name: '停用' },
]
//  作业链与作业关系定义-位置标识
const jobGroupPosition = [
  { jobGroupPosition: '1', jobGroupPositionDesc: '首节点' },
  { jobGroupPosition: '2', jobGroupPositionDesc: '末节点' },
  { jobGroupPosition: '3', jobGroupPositionDesc: '其他' },
]
const yn = [
  { value: 'Y', name: '是' },
  { value: 'N', name: '否' },
]
// 通知类型
const noticeTypeSel = [
  { noticeType: '01', noticeTypeDesc: '正常' },
  { noticeType: '02', noticeTypeDesc: '异常' },
  { noticeType: '03', noticeTypeDesc: '全部' },
]
// 通知方式
const noticeModeSel = [
  { noticeMode: '01', noticeModeDesc: '短信' },
  { noticeMode: '02', noticeModeDesc: '邮件' },
  { noticeMode: '03', noticeModeDesc: '全部' },
]
// const usrSel = [
//   { userId: '01', userName: '临时责任人1' },
//   { userId: '02', userName: '临时责任人2' },
//   { userId: '03', userName: '临时责任人3' },
// ]
export {
  // usrSel,
  noticeTypeSel,
  noticeModeSel,
  JobGroupTypeSelect,
  yn,
  jobGroupPosition,
  rghtandintTypSel,
  putonTrgtTypSel,
  checkRsltSel,
  displSts,
  displMtd,
  rankRet,
  conditionCde,
  rankRetSel,
  pkgStsRel,
  sexSel,
  cooprStsSel,
  rankSeqSel,
  mgrTypSel,
  relationTypSel,
  idTypSel,
  workStsSel,
  eduDegreeSel,
  investCurTypSel,
  investTypSel,
  menuLevel,
  menuActive,
  isValidSel,
  usrIdTypSel,
  usrStsSel,
  basicAssetTypSel,
  prodTypSel,
  prodStsSel,
  limitationTypSel,
  assetTypSel,
  setPrjtSel,
  usrLevSel,
  interestBearRuleMapSel,
  paymPeriodSel,
  principalPaymMtdSel,
  securityHierarchySel,
  jobTypeSel,
  JobGroupTypeSel,
  jobSystemSel,
}
