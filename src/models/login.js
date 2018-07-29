import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import Cookies from 'js-cookie'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    *login ({
              payload,
            }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      debugger
      const data = JSON.parse(yield call(login, payload))
      debugger
      if (data.success) {
        debugger
        yield put({ type: 'hideLoginLoading' })
        // yield put({ type: 'app/query' })
        if (payload.isRem === 'checked') {
          const days = 10
          debugger
          const now = new Date()
          Cookies
          // console.log(now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000))
          // console.log(now.toTimeString)
          debugger
          Cookies.set('token', data, now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000)) // 设置过期时间为10天
        }
        yield put(routerRedux.push('/cloudPhoto/routes/dashboard'))
      } else {
        throw data.msg
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
