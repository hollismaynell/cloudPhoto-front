import modelExtend from 'dva-model-extend'
// import { message } from 'antd'
import { query } from '../../services/signManage/queryList.service'
// import { querySys } from '../../services/organizManage/usersManage.service'
import { pageModel } from '../common'
import { config } from '../../utils'
import moment from 'moment'
const { prefix } = config
const { webUrl } = config
export default modelExtend(pageModel, {
  namespace: 'queryListDetail',

  state: {
    currentItem: {},
    Visible: false,
    modalType: 'create',
    selectedRowKeys: [],
    updateData: {},
    updateFlag: false,
    updateDataDetail: {},
    complianceSel: [],
    modalKey: 1,
    sysSel: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    disabledDate: false,
    initTime: [moment('00:00:00', 'HH:mm:ss'), moment()],
    pyAcctNameD: '',
    pyAcctCtfNoD: '',
    bizPkD: '',
    txnStsD: '11',
  },
// pathname 菜单路径
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === `${webUrl}/querySignList`) {
          dispatch({
            type: 'query',
            payload: {
              ...location.query,
              page: Number(location.query.page) || 1,
              pageSize: Number(location.query.pageSize) || 10,
            },
          })
          if (location.search === '') {
            dispatch({
              type: 'initTime',
              payload: {
                initTime: [moment('00:00:00', 'HH:mm:ss'), moment()],
                pyAcctNameD: '',
                pyAcctCtfNoD: '',
                bizPkD: '',
                txnStsD: '',
              },
            })
          }
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
              total: data.extendMap.total,
            },
          },
        })
      }
    },
    *queryExport ({ payload = {} }) {
      const { pyAcctTime } = payload
      if (pyAcctTime && pyAcctTime.length) {
        payload.timeEarlier = [pyAcctTime[0].format('YYYY-MM-DD HH:mm:ss')]
        payload.timeLater = [pyAcctTime[1].format('YYYY-MM-DD HH:mm:ss')]
        delete payload.pyAcctTime
      }
      const txnSts = (`txnSts=${payload.txnSts !== undefined ? payload.txnSts : ''}`)
      const pyAcctName = (`pyAcctName=${payload.pyAcctName !== undefined ? payload.pyAcctName : ''}`)
      const pyAcctCtfNo = (`pyAcctCtfNo=${payload.pyAcctCtfNo !== undefined ? payload.pyAcctCtfNo : ''}`)
      const timeEarlier = (`timeEarlier=${payload.timeEarlier !== undefined ? payload.timeEarlier : ''}`)
      const timeLater = (`timeLater=${payload.timeLater !== undefined ? payload.timeLater : ''}`)
      yield window.location.href = `${location.origin}/poros-web/importSignExcel?${pyAcctName}&${pyAcctCtfNo}&${timeEarlier}&${timeLater}&${txnSts}`
    },
  },

  reducers: {

    showAddModal (state, { payload }) {
      return { ...state, ...payload, Visible: true, updateFlag: payload.updateFlag || false, modalKey: state.modalKey + 1 }
    },

    hideAddModal (state) {
      return { ...state, Visible: false, updateData: {}, updateData2: {} }
    },
    disabledDate (state, { payload }) {
      const { disabledDate } = payload
      return {
        ...state,
        disabledDate,
      }
    },
    initTime (state, { payload }) {
      const { initTime, txnStsD, pyAcctNameD, pyAcctCtfNoD } = payload
      return {
        ...state,
        initTime,
        txnStsD,
        pyAcctNameD,
        pyAcctCtfNoD,
      }
    },
    queryUpdateDataSuccess (state, { payload }) {
      return { ...state, updateData: payload.updateData, updateDataDetail: payload.updateDataDetail }
    },
  },
})
