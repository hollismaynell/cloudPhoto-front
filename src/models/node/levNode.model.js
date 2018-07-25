import { query, create, remove, queryOneNode, update } from '../../services/node/levNode.service'
import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { pageModel } from '../common'
import { message } from 'antd'


export default modelExtend(pageModel, {
  namespace: 'levNode',
  state: {
    nodeArray: [],
    defaultCheckedKeys: [],
    selectId: null,
    // maxLev: null,
    usrLev: null,
    nodeList: {},
    nodeListShow: false,
    visible: false,
    isMotion: true,
    checkStrictly: false,
    addMenuModalVisible: false,
  },
  reducers: {
    // 查询node节点
    queryOneNodeSuccess (state, action) {
      const { nodeList, defaultCheckedKeys, checkStrictly, usrLev } = action.payload
      return {
        ...state,
        usrLev,
        nodeList,
        defaultCheckedKeys,
        nodeListShow: true,
        checkStrictly: checkStrictly,
      }
    },
    // 是否关联父节点选中
    checkStrictly (state, action) {
      const { checkStrictly } = action.payload
      return {
        ...state,
        checkStrictly,
      }
    },
    // 查询node节点
    queryMaxLevSuccess (state, action) {
      const { maxLev } = action.payload
      return {
        ...state,
        maxLev,
      }
    },
    // 切换编辑模式
    changeType (state, action) {
      return {
        ...state,
        editable: action.payload.editable,
      }
    },
    showModal (state) {
      return {
        ...state,
        visible: true,
      }
    },
    hideModal (state) {
      return {
        ...state,
        visible: false,
        nodeArray: [],
      }
    },
    showAddMenuModal (state) {
      return {
        ...state,
        addMenuModalVisible: true,
      }
    },
    hideAddMenuModal (state) {
      return {
        ...state,
        addMenuModalVisible: false,
      }
    },
    pushData (state, action) {
      const { defaultCheckedKeys } = action.payload
      return {
        ...state,
        defaultCheckedKeys,
      }
    },
  },

  effects: {
    *changeCheckArr ({ payload }, { put }) {
      yield put({
        type: 'pushData',
        payload: {
          defaultCheckedKeys: payload.defaultCheckedKeys,
        },
      })
    },
    *query ({ payload }, { call, put }) {
      const data = yield call(query, parse(payload))
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
    // 查看某个node节点的详细信息
    *queryOneNode ({ payload }, { call, put }) {
      const data = yield call(queryOneNode, payload)
      if (data.success) {
        yield put({
          type: 'queryOneNodeSuccess',
          payload: {
            nodeList: data.data,
            defaultCheckedKeys: data.data.selectedKeys,
            checkStrictly: true,
            usrLev: payload.usrLev,
          },
        })
      } else {
        throw data
      }
    },
    // 查看某个node节点的详细信息
    // *queryMaxLev ({ payload }, { call, put }) {
    //   yield put({
    //     type: 'showAddMenuModal',
    //   })
    //   const data = yield call(queryMaxLev, payload)
    //   if (data.success) {
    //     yield put({
    //       type: 'queryMaxLevSuccess',
    //       payload: {
    //         maxLev: data.data.data,
    //       },
    //     })
    //   } else {
    //     throw data
    //   }
    // },
    *create ({ payload }, { call, put }) {
      // yield put({ type: 'hideAddMenuModal' })
      const data = yield call(create, payload)
      if (data.success) {
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
      yield put({ type: 'hideModal' })
      const data = yield call(update, payload)
      if (data.success) {
        message.success('更新成功')
        yield put({
          type: 'changeType',
          payload: {
            editable: payload.editable,
          },
        })
      } else {
        throw data
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload.id })
      if (data.success) {
        yield put({
          type: 'query',
          payload: {
            page: payload.page,
            pageSize: payload.pageSize,
          },
        })
      } else {
        throw data
      }
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cloudPhoto/node/levNode') {
          dispatch({
            type: 'query',
            payload: {
              page: location.query.page === undefined ? 1 : Number(location.query.page),
              pageSize: 10,
            },
          })
        }
      })
    },
  },
})
