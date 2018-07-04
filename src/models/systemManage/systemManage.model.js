import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, query, remove, update, queryOne, setValid, querySelect } from '../../services/systemManage/systemManage.service'
import { pageModel } from '../common'
import { config } from '../../utils'
const { prefix } = config
const { webUrl } = config

export default modelExtend(pageModel, {
  namespace: 'systemManage',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    updateData: {},
    updateFlag: false,
    systemSel: [],
    modalKey: 1,
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },
// pathname 菜单路径
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === `${webUrl}/node/systemManage`) {
          dispatch({
            type: 'query',
            payload: {
              ...location.query,
              page: Number(location.query.page) || 1,
              pageSize: Number(location.query.pageSize) || 10,
            },
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },
    // 生效-失效状态
    *setValid ({ payload = {} }, { call, put, select }) {
      const { pagination } = yield select(({ systemManage }) => systemManage)
      const data = yield call(setValid, payload)
      if (data) {
        message.success('修改状态成功', 2)
        yield put({
          type: 'query',
          payload: {
            page: pagination.current,
            pageSize: pagination.pageSize,
          },
        })
      }
    },
    // 查一条
    *queryOne ({ payload = {} }, { call, put }) {
      yield put({ type: 'showAddModal', payload: { modalType: 'update', updateFlag: true } })
      const data = yield call(queryOne, { sysId: payload.sysId })
      if (data) {
        yield put({ type: 'queryUpdateDataSuccess', payload: { updateData: data.data.data } })
      }
    },
    // 查下拉框
    *systemQuery ({ payload = {} }, { call, put }) {
      const data = yield call(querySelect, payload)
      if (data) {
        yield put({ type: 'showAddModalsystemSel', payload: { systemSel: data.data.data.systemSel } })
      }
    },
    // 删除
    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, payload)
      const { pagination } = yield select(({ systemManage }) => systemManage)
      if (data.success) {
        yield put({ type: 'query', payload: { page: pagination.current, pageSize: pagination.pageSize } })
      } else {
        throw data.message
      }
    },
    // 新增
    *create ({ payload }, { call, put, select }) {
      const data = yield call(create, payload)
      const { pagination } = yield select(({ systemManage }) => systemManage)
      if (data.success) {
        yield put({ type: 'hideAddModal' })
        yield put({ type: 'query', payload: { page: pagination.current, pageSize: pagination.pageSize } })
      } else {
        throw data
      }
    },
    // 修改
    *update ({ payload }, { call, put, select }) {
      const { pagination } = yield select(({ systemManage }) => systemManage)
      const data = yield call(update, payload)
      if (data.success) {
        yield put({ type: 'hideAddModal' })
        yield put({ type: 'query', payload: { page: pagination.current, pageSize: pagination.pageSize } })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showAddModalcmplTstCdSel (state, { payload }) {
      return { ...state, ...payload, modalVisible: true, cmplTstCdSel: payload.cmplTstCdSel, updateFlag: payload.updateFlag || false, modalKey: state.modalKey + 1 }
    },

    showAddModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true, updateFlag: payload.updateFlag || false, modalKey: state.modalKey + 1 }
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideAddModal (state) {
      return { ...state, modalVisible: false, updateData: {} }
    },

    queryUpdateDataSuccess (state, { payload }) {
      return { ...state, updateData: payload.updateData, modalType: payload.modalType }
    },

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

    upperDownData (state, { payload }) {
      const { maxValue = 0, minValue = 0 } = payload
      return {
        ...state,
        maxValue,
        minValue,
      }
    },

  },
})
