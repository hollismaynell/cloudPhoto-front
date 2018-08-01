import modelExtend from 'dva-model-extend'
import { query } from '../services/albumShow.service'
import { pageModel } from './common'
import { config } from '../utils'
const { webUrl } = config

export default modelExtend(pageModel, {
  namespace: 'albumShow',
  state: {
    namespace: 'albumShow',
    list: [],
  },
// pathname 菜单路径
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === `${webUrl}/routes/albumShow`) {
          debugger
          dispatch({
            type: 'query',
            payload: {
              page: Number(location.query.page) || 1,
              size: Number(location.query.pageSize) || 10,
            },
          })
        }
      })
    },
  },
  effects: {
    *query ({ payload = {} }, { call, put }) {
      const data = JSON.parse(yield call(query, payload))
      debugger
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      return {
        ...state,
        list: payload.list,
      }
    },
  },
})
