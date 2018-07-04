import modelExtend from 'dva-model-extend'
// import { message } from 'antd'
import { query, queryOne } from '../../services/batch/queryBatch.service'
// import { querySys } from '../../services/organizManage/usersManage.service'
import { pageModel } from '../common'
import moment from 'moment'
import { config } from '../../utils'
const { prefix } = config
const { webUrl } = config

export default modelExtend(pageModel, {
  namespace: 'jobLogDetail',

  state: {
    modalType: 'create',
    selectedRowKeys: [],
    updateData: {},
    updateDataDetail: {},
    updateFlag: false,
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
        if (location.pathname === `${webUrl}/queryBatch`) {
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
          // const { initTime, txnStsD, pyAcctNameD, pyAcctCtfNoD, bizPkD } = payload
          // debugger
          // dispatch({
          //   type: 'initTime',
          //   payload: {
          //     initTime,
          //     txnStsD,
          //     bizPkD,
          //     pyAcctNameD,
          //     pyAcctCtfNoD,
          //   },
          // })
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
      const bizPk = (`bizPk=${payload.bizPk !== undefined ? payload.bizPk : ''}`)
      const pyAcctName = (`pyAcctName=${payload.pyAcctName !== undefined ? payload.pyAcctName : ''}`)
      const pyAcctCtfNo = (`pyAcctCtfNo=${payload.pyAcctCtfNo !== undefined ? payload.pyAcctCtfNo : ''}`)
      const timeEarlier = (`timeEarlier=${payload.timeEarlier !== undefined ? payload.timeEarlier : ''}`)
      const timeLater = (`timeLater=${payload.timeLater !== undefined ? payload.timeLater : ''}`)
      // yield window.open (`http://10.10.10.196:8002/poros-web/importBatchExcel?${bizPk}&${pyAcctName}&${pyAcctCtfNo}&${timeEarlier}&${timeLater}&${txnSts}`)
      console.log(location.origin)
      yield window.location.href = `${location.origin}/poros-web/importBatchExcel?${bizPk}&${pyAcctName}&${pyAcctCtfNo}&${timeEarlier}&${timeLater}&${txnSts}`
    },
    // 查一条
    *queryOne ({ payload = {} }, { call, put }) {
      yield put({ type: 'showAddModal', payload })
      const data = yield call(queryOne, payload)
      console.log(payload)
      if (data) {
        yield put({ type: 'queryDataSuccess', payload: { updateData: data.data.dataOne, updateDataDetail: data.data.dataTwo } })
      }
    },
  },

  reducers: {

    showAddModal (state, { payload }) {
      return { ...state, ...payload, Visible: true, updateFlag: payload.updateFlag || false, modalKey: state.modalKey + 1 }
    },

    hideAddModal (state) {
      return { ...state, Visible: false, updateData: {}, updateDataDetail: {} }
    },

    disabledDate (state, { payload }) {
      const { disabledDate } = payload
      return {
        ...state,
        disabledDate,
      }
    },
    queryDataSuccess (state, { payload }) {
      const { updateData, updateDataDetail } = payload
      return {
        ...state,
        updateData,
        updateDataDetail,
      }
    },
    initTime (state, { payload }) {
      const { initTime, txnStsD, pyAcctNameD, pyAcctCtfNoD, bizPkD } = payload
      return {
        ...state,
        initTime,
        txnStsD,
        bizPkD,
        pyAcctNameD,
        pyAcctCtfNoD,
      }
    },
  },
})
