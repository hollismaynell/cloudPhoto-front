const APIV1 = '/poros-web'
const localMock = '/api'
const local = ''
// const local = '/poros'
module.exports = {
  webUrl: '/poros',
  webUrl1: '/poros',
  name: 'poros',
  prefix: 'Poros',
  footerText: '云摄影 版权所有',
  logo2: `${local}/blsLogo.png`,
  logo1: `${local}/blsLogo-2.png`,
  smallLogo: `${local}/small-logo.png`,
  loginLogo: `${local}/loginLogo.png`,
  banner1: `${local}/banner-1.png`,
  banner2: `${local}/banner-2.png`,
  banner3: `${local}/banner-3.png`,
  iconFontCSS: `${local}/iconfont.css`,
  iconFontJS: `${local}/iconfont.js`,
  iconMenuCSS: `${local}/menuIcon/iconfont.css`,
  iconMenuJS: `${local}/menuIcon/iconfont.js`,
  baseURL: ['http://localhost:8000'],
  YQL: ['http://www.zuimeitianqi.com'],
  htmlSrc: `${local}/ifram.html`,
  homeBg: `${local}/home_bg/index.html`,
  CORS: [],
  openPages: ['/poros/login'],
  apiPrefix: '/api',
  carouselImg1: `${local}/carouselImg1.png`,
  carouselImg2: `${local}/carouselImg2.png`,
  carouselImg3: `${local}/carouselImg3.png`,
  carouselImg4: `${local}/carouselImg4.png`,
  bannerplatform: `${local}/banner-platform.png`,
  partner1: `${local}/partner1.png`,
  partner2: `${local}/partner2.png`,
  partner3: `${local}/partner3.png`,
  partner4: `${local}/partner4.png`,
  partner5: `${local}/partner5.png`,
  erCode: `${local}/erCode.png`,
  waterMark: `${local}/waterMark.png`,
  cat: `${local}/cat.png`,
  black: `${local}/black.png`,
  TopBanner: `${local}/TopBanner.png`,
  api: {
    /* **** 登录 *******/
    // 用户登录
    userLogin: `${APIV1}/user/login`,
    // 用户退出
    userLogout: `${APIV1}/loginout`,
    // 校验用户
    userToken: `${APIV1}/user/inspection`,
    // 国际化菜单
    menus: `${APIV1}/menuGlobal`,
    menusLocalMock: `${localMock}/menus`,
    // 首页
    dashboard: `${APIV1}/dashboard`,

    /* **** 系统-用户管理 *******/
    // 列表查询
    usersManages: `${APIV1}/usr`,
    // 修改
    usersManagesUpdate: `${APIV1}/usr/update`,
    // 查询详细
    usersManagesDetail: `${APIV1}/usrDetail`,
    // 新增
    usersManagesCreate: `${APIV1}/usr`,

    /* **** 系统-菜单管理 *******/
    // 列表查询
    nodeInfo: `${APIV1}/menu`,
    // 修改
    nodeInfoUpdate: `${APIV1}/menu/update`,
    // 删除
    nodeInfoDelete: `${APIV1}/menu/delete`,
    // 菜单等级
    menuLevs: `${APIV1}/menuLevs`,
    // 所属菜单
    parentLev: `${APIV1}/menuSel`,
    // 查询详细
    getOneNode: `${APIV1}/menu/:menuId`,

    /* **** 系统-权限管理 *******/
    // 列表查询
    levNode: `${APIV1}/role`,
    // 修改
    levNodeUpdate: `${APIV1}/role/update`,
    // 删除
    levNodeDel: `${APIV1}/role/delete`,
    // 获取最大权限
    getMaxLev: `${APIV1}/getMaxLev`,
    // 权限管理集合查询
    dataRole: `${APIV1}/role/select`,
    // getOneLevNode: `${localMock}/getOneLevNode`,
    // 根据等级查询权限集合
    getOneLevNode: `${APIV1}/role/:usrLev`,

    /* **** 系统-机构管理 *******/
    // 列表查询
    organizManages: `${APIV1}/dept`,
    // 新增
    organizManageCreate: `${APIV1}/dept`,
    // 集合获取
    dataDept: `${APIV1}/dept/select`,
    // 修改
    organizManageUpdate: `${APIV1}/dept/update`,
    // 删除
    organizManageDelete: `${APIV1}/dept/delete`,

    /* **** 批量查询 *******/
    queryBatch: `${APIV1}/queryBatch`,
    BatchQueryOne: `${APIV1}/QueryBatchBybizPk`,
    BatchExport: `${APIV1}/importBatchExcel`,
    /* **** 超时批量查询 *******/
    // 查询超时交易记录表
    queryBatTxnTimeout: `${APIV1}/queryBatTxnTimeout`,
    // 查询超时记录对应明细
    queryBatDtlTimeout: `${APIV1}/queryBatDtlTimeout`,
    // 超时批量交易忽略操作
    ignoreBatTxnTimeout: `${APIV1}/ignoreBatTxnTimeout`,
    // 超时批量交易同步操作
    synchBatTxnTimeout: `${APIV1}/synchBatTxnTimeout`,
    /* **** 单笔查询 *******/
    querySingle: `${APIV1}/querySingle`,
    SingleQueryOne: `${APIV1}/querySingleBybizPk`,
    SingleExport: `${APIV1}/importSingleExcel`,
    /* **** 签约查询 *******/
    querySignListDale: `${APIV1}/querySignList`,
    queryExport: `${APIV1}/importSignExcel`,
    /* **** 收录 *******/
    querySingleTrade: `${APIV1}/webSingleTrade`,
  },
}
