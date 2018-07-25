import { login } from '../services/login'
// import { routerRedux } from 'dva/router'
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
      if (data.success) {
        // yield put({ type: 'hideLoginLoading' })
        // yield put({ type: 'app/query' })
        debugger
        // yield put(routerRedux.push('/cloudPhoto/dashboard'))
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
