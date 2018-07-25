import { query, create, remove, queryOneNode, saveOneNode, queryLevs, queryParentLev } from '../../services/node/nodeInfo.service'
import modelExtend from 'dva-model-extend'
// import { config } from '../../utils'
// const { webUrl } = config
export default modelExtend({
  namespace: 'nodeInfos',
  state: {
    nodeArray: [],
    levs: [],
    nodeLevSel: [],
    parentLev: [],
    selectId: null,
    nodeList: {},
    nodeListShow: false,
    editable: false,
    visible: false,
  },
  reducers: {
    // 查询node节点
    querySuccess (state, action) {
      const { nodeArray } = action.payload
      return {
        ...state,
        nodeArray,
      }
    },
    queryLevsSuccess (state, action) {
      const { levs } = action.payload
      return {
        ...state,
        levs,
      }
    },
    queryParentLevSuccess (state, action) {
      const { parentLev } = action.payload
      return {
        ...state,
        parentLev,
        nodeLevSel: parentLev,
      }
    },
    // 查询node节点
    queryOneNodeSuccess (state, action) {
      const { nodeList } = action.payload
      return {
        ...state,
        nodeList,
        nodeLevSel: nodeList.nodeParentSel,
        nodeListShow: true,
        editable: true,
      }
    },
    // 查询node节点
    nodeListHide (state) {
     // const { nodeList } = action.payload
      return {
        ...state,
        nodeListShow: false,
      }
    },
    // 切换编辑模式
    changeType (state, action) {
      return {
        ...state,
        editable: action.payload.editable,
      }
    },
    showModalL (state) {
      return {
        ...state,
        visible: true,
      }
    },
    hideModal (state) {
      return {
        ...state,
        visible: false,
      }
    },
  },

  effects: {
    *showModal ({ payload }, { call, put }) {
      yield put({ type: 'showModalL' })
      const data = yield call(queryLevs)
      yield put({
        type: 'queryLevsSuccess',
        payload: {
          levs: data.data.data,
        },
      })
    },
    *queryParentLev ({ payload }, { call, put }) {
      if (payload) {
        const data = yield call(queryParentLev, payload)
        if (data.success) {
          yield put({
            type: 'queryParentLevSuccess',
            payload: {
              parentLev: data.data.data,
            },
          })
        }
      } else {
        yield put({
          type: 'queryParentLevSuccess',
          payload: {
            parentLev: [],
          },
        })
      }
    },
    *query ({ payload }, { call, put }) {
      const data = yield call(query)
      const queryLevsData = yield call(queryLevs)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            nodeArray: data.data.data,
          },
        })
        yield put({
          type: 'queryLevsSuccess',
          payload: {
            levs: queryLevsData.data.data,
          },
        })
      } else {
        throw data
      }
    },
    // 查看某个node节点的详细信息
    *queryOneNode ({ payload }, { call, put }) {
      const menuId = {
        menuId: payload.menuId[0],
      }
      if (menuId.menuId !== undefined) {
        const data = yield call(queryOneNode, { menuId: menuId.menuId })
        if (data.success) {
          yield put({
            type: 'queryOneNodeSuccess',
            payload: {
              nodeList: data.data.data,
              nodeListShow: true,
            },
          })
        } else {
          throw data
        }
      }
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put }) {
      const nodeList = { ...payload.nodeList }
      const data = yield call(saveOneNode, nodeList)
      if (data.success) {
        yield put({
          type: 'changeType',
          payload: {
            editable: payload.editable,
          },
        })
        yield put({ type: 'query' })
        const oneData = yield call(queryOneNode, { menuId: payload.nodeList.menuId })
        if (oneData.success) {
          yield put({
            type: 'queryOneNodeSuccess',
            payload: {
              nodeList: oneData.data.data,
              nodeListShow: true,
            },
          })
        }
        // yield put({ type: 'nodeListHide' })
      } else {
        throw data
      }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current,
            },
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
        console.log(location.pathname)
        if (location.pathname === '/cloudPhoto/node/nodeInfo') {
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },
})
