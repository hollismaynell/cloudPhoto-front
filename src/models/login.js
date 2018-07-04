import { login } from '../services/login'
import { routerRedux } from 'dva/router'
// import { queryURL } from '../utils'

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
      const data = yield call(login, payload)
      data
      yield put({ type: 'hideLoginLoading' })
      // 暂时跳过验证，直接去首页
      yield put(routerRedux.push('/poros/dashboard'))
      // if (data.success) {
      //   yield put({ type: 'app/query' })
      //   yield put(routerRedux.push('/poros/dashboard'))
      // } else {
      //   throw data
      // }
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
