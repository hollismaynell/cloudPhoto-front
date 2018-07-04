import { query, logout } from '../services/app'
import * as menusService from '../services/menus'
import { parse } from 'qs'
import { config } from '../utils'
import { routerRedux } from 'dva/router'
import Cookies from 'js-cookie'
const { prefix, webUrl } = config
import zHcN from '../utils/zh_CN'
import eNuS from '../utils/en_US'
import enUS from 'antd/lib/locale-provider/en_US'
// import zhCN from 'antd/lib/locale-provider/zh_TW'

export default {
  namespace: 'app',
  state: {
    user: {},
    formatType: 'zh_CN',
    formatAntdType: 'zhCN',
    menu: [],
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
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {
    *query ({
              payload,
            }, { call, put }) {
      let token = Cookies.get('token')
      if (token === undefined) {
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          yield put(routerRedux.push({
            // 暂时跳过验证，直接去首页
            pathname: `${webUrl}/dashboard`,
            // pathname: `${webUrl}/login`,
          }))
        }
      } else {
        const data = yield call(query, parse(payload))
        if (data.success && data.data) {
          const menusData = yield call(menusService.query, { formatType: 'zh_CN', formatAntdType: 'zhCN' })
          if (menusData.success && menusData.data) {
            console.log(menusData.data.data)
            yield put({
              type: 'querySuccess',
              payload: {
                user: data.data,
                menu: menusData.data.data,
              },
            })
          }
          yield put({
            type: 'signParam',
            payload: payload,
          })
          console.log(location.pathname)
          if (location.pathname === '/poros/login') {
            yield put(routerRedux.push(`${webUrl}dashboard`))
          }
        } else {
          /* 当config.openPages配置多个页面时，比如openPages: ['/login', '/home']，但是进入/home页面仍然要先登录，所以在app model中如果query不成功需要判断当前页面是否被设置成openPages，再决定是否跳转到/login*/
          if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
            window.location = `${location.origin}${webUrl}/login`
          }
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
      const { app } = yield(select(_ => _))
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
