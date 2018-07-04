import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query } from '../../services/webSingleTrade/queryBatch.service'
// import { querySys } from '../../services/organizManage/usersManage.service'
import { pageModel } from '../common'
import { config } from '../../utils'
const { prefix } = config
const { webUrl } = config
export default modelExtend(pageModel, {
  namespace: 'webSingleTrade',

  state: {
    modalType: 'create',
    selectedRowKeys: [],
    updateFlag: true,
    forbid: '',
    complianceSel: [],
    modalKey: 1,
    sysSel: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },
// pathname 菜单路径
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === `${webUrl}/webSingleTrade`) {
          dispatch({
            type: 'queryNull',
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload = {} }, { call }) {
      const data = yield call(query, payload)
      if (data.success === true) {
        message.info('操作成功')
      } else {
        message.info('操作失败')
      }
    },
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
  reducers: {

    showAddModal (state, { payload }) {
      return { ...state, ...payload, Visible: true, updateFlag: payload.updateFlag || false, modalKey: state.modalKey + 1 }
    },

    hideAddModal (state) {
      return { ...state, Visible: false, updateData: {}, updateDataDetail: {} }
    },
    queryUpdateSuccess (state, { payload }) {
      return {
        ...state,
        dataItem: payload.item,
        modalType: payload.modalType,
      }
    },
  },
})
