module.exports = [
  {
    id: 1,
    icon: 'laptop',
    bpid: 1,
    name: '首页',
    router: '/dashboard',
    clickAble: true,
  },
  {
    id: 2,
    bpid: 1,
    name: '系统管理',
    icon: 'setting',
    router: '/sysConfig',
    // clickAble: false,
  },
  {
    id: 3,
    bpid: 1,
    name: '签约管理',
    icon: 'user',
    router: '/user',
    clickAble: true,
  },
  {
    id: 4,
    bpid: 1,
    name: '收款管理',
    icon: 'user',
    router: '/user',
    clickAble: true,
  },
  {
    id: 4,
    bpid: 1,
    name: '状态管理',
    icon: 'user',
    router: '/user',
    clickAble: true,
  },
  {
    id: 31,
    bpid: 3,
    mpid: 3,
    name: 'serviceParams',
    icon: 'setting',
    router: '/sysConfig/serviceParams',
    // clickAble: false,
  },
  {
    id: 311,
    bpid: 31,
    mpid: 31,
    name: 'loanTypes',
    icon: 'setting',
    router: '/sysConfig/serviceParams/loanTypes',
    // clickAble: false,
  },
  {
    id: 312,
    bpid: 31,
    mpid: 31,
    name: 'eCharts',
    icon: 'area-chart',
    router: '/sysConfig/serviceParams/eCharts',
    // clickAble: false,
  },
]