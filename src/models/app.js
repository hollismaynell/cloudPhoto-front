// import { query, logout } from '../services/app'
import { logout } from '../services/app'
import * as menusService from '../services/menus'
import { parse } from 'qs'
import { config } from '../utils'
import { routerRedux } from 'dva/router'
import Cookies from 'js-cookie'
const { prefix, webUrl, openPages, dashboardPages } = config
import zHcN from '../utils/zh_CN'
import eNuS from '../utils/en_US'
import enUS from 'antd/lib/locale-provider/en_US'
// import zhCN from 'antd/lib/locale-provider/zh_TW'
const menuList = require('../utils/menu.js')

export default {
  namespace: 'app',
  state: {
    user: {},
    formatType: 'zh_CN',
    formatAntdType: 'zhCN',
    menu: menuList,
    signN: '',
    signP: '',
    keyy: 1,
    changeLanguage: 'zh_CN',
    format: zHcN,
    formatAntdObj: {},
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: ['logo', '首页', '相册展示'],
    // 默认展开的菜单
    // navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      // let tid
      // window.onresize = () => {
      //   clearTimeout(tid)
      //   tid = setTimeout(() => {
      //     dispatch({ type: 'changeNavbar' })
      //   }, 300)
      // }
    },
  },
  effects: {
    // 定向到活动管理页面
    *goToActivityManege ({ payload }, { put }) {
      yield put(routerRedux.push({
        pathname: `${webUrl}/routes/activityManage`,
      }))
    },

    * query ({
      payload,
    }, { put }) {
      debugger
      if (dashboardPages.indexOf(location.pathname) !== -1) {
        debugger
        yield put(routerRedux.push({
          pathname: `${webUrl}/routes/pageHome`,
        }))
        // window.location = `${location.origin}${webUrl}/routes/pageHome`
        return
      }
      let token = Cookies.get('token')
      if (token === undefined) {
        debugger
        if (openPages && openPages.indexOf(location.pathname) < 0) {
          debugger
          yield put(routerRedux.push({
            pathname: `${webUrl}/login`,
          }))
        }
      }
    },

    *queryMenu ({ payload }, { call, put }) {
      const data = yield call(menusService.query, payload)
      yield put({
        type: 'changeLanguageData',
        payload: {
          changeLanguage: payload.formatType,
        },
      })
      if (data) {
        yield put({
          type: 'querySuccessMenu',
          payload: {
            formatType: payload.formatType,
            formatAntdType: payload.formatAntdType,
            menu: data.data.data,
          },
        })
      }
    },
    *logout ({
      payload,
    }, { call }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        window.location = location.origin
        // yield put({ type: 'query' })
      } else {
        throw (data)
      }
      // const SignOut = yield call(singleSignOut)
      // if (SignOut.status === 'logout') {
      // }
    },

    *changeNavbar ({
      payload,
    }, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    signParam ({ payload }) {
      return {
        signN: payload.username,
        signP: payload.password,
      }
    },
    querySuccess (state, { payload }) {
      return {
        ...state,
        user: payload.user,
        menu: payload.menu,
      }
    },

    querySuccessMenu (state, { payload }) {
      let format = {}
      let formatAntdObj = {}
      if (payload.formatType === 'zh_CN') {
        format = zHcN
        formatAntdObj = {}
      } else {
        format = eNuS
        formatAntdObj = enUS
      }
      return {
        ...state,
        format,
        formatAntdObj,
        keyy: state.keyy + 1,
        menu: payload.menu,
        formatType: payload.formatType,
        formatAntdType: payload.formatAntdType,
      }
    },

    switchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },
    changeLanguageData (state, { payload }) {
      const { changeLanguage } = payload.changeLanguage
      return {
        ...state,
        changeLanguage,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
