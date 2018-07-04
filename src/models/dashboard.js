import { query, logout, singleSignOut } from '../services/app'
import { parse } from 'qs'
import { config } from '../utils'
import { routerRedux } from 'dva/router'
import Cookies from 'js-cookie'
import { webUrl } from '../utils/config'
export default {
  namespace: 'dashboard',
  state: {},
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 3000)
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
          window.location = `${location.origin}${webUrl}/login`
        }
      } else {
        const data = yield call(query, parse(payload))
        if (data.success && data.user) {
          yield put({
            type: 'querySuccess',
            payload: data.user,
          })
          if (location.pathname === '/poros/login') {
            yield put(routerRedux.push('poros/dashboard'))
          }
        } else {
          /* 当config.openPages配置多个页面时，比如openPages: ['/login', '/home']，但是进入/home页面仍然要先登录，所以在app model中如果query不成功需要判断当前页面是否被设置成openPages，再决定是否跳转到/login*/
          if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
            let from = location.pathname
            window.location = `${location.origin}${webUrl}/login`
          }
        }
      }
    },

    *logout ({
               payload,
             }, { call, put }) {
      const SignOut = yield call(singleSignOut)
      if (SignOut.status === 'logout') {
        const data = yield call(logout, parse(payload))
        if (data.success) {
          yield put({ type: 'query' })
        } else {
          throw (data)
        }
      }
    },

  },
  reducers: {
    querySuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },
  },
}
