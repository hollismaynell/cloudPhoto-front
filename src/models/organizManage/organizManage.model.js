import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, remove, update, removeDeptNo, query, queryInstuList } from '../../services/organizManage/organizManage.service'
import { pageModel } from '../common'
import { config } from '../../utils'
import Cookies from 'js-cookie'
const { prefix } = config
const { webUrl } = config


export default modelExtend(pageModel, {
  namespace: 'organizManage',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    colNum: JSON.parse(Cookies.get('token')).usrLev,
    selectedRowKeys: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    instuNameSel: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === `${webUrl}/organizManage/organizManage`) {
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
    /* 清空新增时 数据*/
    *queryNull ({ payload = {} }, { put }) {
      yield put({
        type: 'queryUpdateSuccess',
        payload: {
          item: '',
          modalType: 'create',
        },
      })
    },
    /* 所属机构*/
    *instuList ({ payload }, { call, put }) {
      const data = yield call(queryInstuList, payload)
      if (data) {
        yield put({
          type: 'showModal',
          payload: {
            instuNameSel: data.data.data,
          },
        })
      }
    },

    *instuListUpdate ({ payload }, { call, put }) {
      const data = yield call(queryInstuList, payload)
      if (data) {
        yield put({
          type: 'showModal',
          payload: {
            instuNameSel: data.data.data,
            modalType: 'update',
          },
        })
      }
    },

    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { instuCde: payload })
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({
          type: 'query',
          payload: {
            page: 1,
            pageSize: 10,
          },
        })
      } if (data.message === '当前机构有关联数据，不能进行修改操作') {
        message.info('当前机构有关联数据，不能进行修改操作')
      } else {
        throw data
      }
    },

    *'deleteDeptNo' ({ payload }, { call, put }) {
      const data = yield call(removeDeptNo, { deptNo: payload })
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

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ organizManage }) => organizManage.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
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

  },

  reducers: {
    queryUpdateSuccess (state, { payload }) {
      return {
        ...state,
        dataItem: payload.item,
        modalType: payload.modalType,
      }
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
