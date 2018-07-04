import modelExtend from 'dva-model-extend'
import { create, remove, update, queryDept, queryRole, query, queryDetail, querySys } from '../../services/organizManage/usersManage.service'
import { pageModel } from '../common'
import { config } from '../../utils'
import { usrIdTypSel, usrStsSel } from '../../utils/selectData'
const { prefix } = config
const { webUrl } = config

export default modelExtend(pageModel, {
  namespace: 'usersManage',

  state: {
    dataItem: {},
    dataDept: [],
    dataRole: [],
    departmentSel: [],
    sysSel: [],
    usrIdTypSel: usrIdTypSel,
    usrStsSel: usrStsSel,
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    userFlag: 'none',
    displayFlag: 'none',
    requiredFlag: false,
    patternReg: '',
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === `${webUrl}/organizManage/usersManage`) {
          dispatch({
            type: 'query',
            payload: {
              page: location.query.page || 1,
              pageSize: location.query.pageSize || 10,
            },
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.extendMap.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },
    *queryDtl ({ payload }, { call, put }) {
      const dataDept = yield call(queryDept, payload)
      if (dataDept) {
        yield put({
          type: 'showModal',
          payload: {
            dataDept: dataDept.data.data,
            departmentSel: dataDept.data.departmentSel,
            modalType: 'update',
          },
        })
      }
      const dataRole = yield call(queryRole, { quGrd: payload.quGrd })
      if (dataRole) {
        yield put({
          type: 'showModal',
          payload: {
            dataRole: dataRole.extendMap.data,
            modalType: 'update',
          },
        })
      }
      const data = yield call(queryDetail, payload)
      if (data) {
        yield put({
          type: 'updateModal',
          payload: {
            dataItem: data.data.data,
            modalType: 'update',
            displayFlag: data.data.data.quGrd === '1' ? 'none' : 'block',
          },
        })
      }
    },
    *querySel ({ payload }, { call, put }) {
      const dataDept = yield call(queryDept, payload)
      if (dataDept) {
        yield put({
          type: 'showModal',
          payload: {
            dataDept: dataDept.data.data,
            departmentSel: dataDept.data.data,
          },
        })
      }
      const dataRole = yield call(queryRole, payload)
      if (dataRole) {
        yield put({
          type: 'showModal',
          payload: {
            dataRole: dataRole.data.data,
          },
        })
      }
    },
    *querySysSel ({ payload }, { call, put }) {
      const dataSys = yield call(querySys, payload)
      if (dataSys) {
        yield put({
          type: 'showModal',
          payload: {
            sysSel: dataSys.data.data,
          },
        })
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { payload })
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            page: location.query.page === undefined ? 1 : Number(location.query.page),
            pageSize: 10,
          },
        })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({
          type: 'query',
          payload: {
            page: 1,
            pageSize: 10,
          },
        })
      } else {
        throw data
      }
    },

    *update ({ payload }, { call, put }) {
      const data = yield call(update, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({
          type: 'query',
          payload: {
            page: 1,
            pageSize: 10,
          },
        })
      } else {
        throw data
      }
    },
    *queryNull ({ payload = {} }, { put }) {
      yield put({
        type: 'queryUpdateSuccess',
        payload: {
          dataItem: '',
          modalType: 'create',
        },
      })
    },

  },

  reducers: {
    queryUpdateSuccess (state, { payload }) {
      return {
        ...state,
        dataItem: payload.dataItem,
        modalType: payload.modalType,
      }
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    updateModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true, displayFlag: payload.displayFlag }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

    setUserFlag (state, { payload }) {
      return {
        ...state,
        userFlag: payload.setUserFlag,
        requiredFlag: payload.setRequiredFlag,
      }
    },

    patternRegFunc (state, { payload }) {
      return { ...state, ...payload, patternReg: payload.patternReg }
    },
  },
})
