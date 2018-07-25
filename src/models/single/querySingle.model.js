import modelExtend from 'dva-model-extend'
import React from 'react'
import { FormattedMessage } from 'react-intl'
// import { message } from 'antd'
import { query, queryOne } from '../../services/single/querySingle.service'
// import { querySys } from '../../services/organizManage/usersManage.service'
import { pageModel } from '../common'
import { config } from '../../utils'
import moment from 'moment'
const { prefix } = config
const { webUrl } = config

export default modelExtend(pageModel, {
  namespace: 'jobStatusDetail',

  state: {
    currentItem: {},
    Visible: false,
    modalType: 'create',
    selectedRowKeys: [],
    updateData: [],
    updateFlag: false,
    updateDataDetail: [],
    paginationDetail: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => <span><FormattedMessage id="pageTotal" /> {total} <FormattedMessage id="pageItem" /> </span>,
      current: 1,
      total: 0,
    },
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
    currentRecordRowCode: '',
  },
// pathname 菜单路径
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === `${webUrl}/querySingle`) {
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
    // 查一条
    *queryOne ({ payload = {} }, { call, put, select }) {
      const { currentRecordRowCode } = yield select(({ jobStatusDetail }) => jobStatusDetail)
      currentRecordRowCode === '' ? yield put({ type: 'showAddModal', payload }) : yield put({ type: 'updateAddModal', payload })
      const data = yield call(queryOne, payload)
      if (data) {
        yield put({ type: 'queryDataSuccess', payload: { updateData: data.data.dataOne[0], updateDataDetail: data.data.dataTwo, paginationDetail: {
          current: Number(payload.page) || 1,
          pageSize: Number(payload.pageSize) || 5,
          total: data.extendMap.total,
        } } })
      }
    },


    *queryExport ({ payload = {} }) {
      const { pyAcctTime } = payload
      if (pyAcctTime && pyAcctTime.length) {
        payload.timeEarlier = [pyAcctTime[0].format('YYYY-MM-DD HH:mm:ss')]
        payload.timeLater = [pyAcctTime[1].format('YYYY-MM-DD HH:mm:ss')]
        delete payload.pyAcctTime
      }
      const bizPk = (`bizPk=${payload.bizPk !== undefined ? payload.bizPk : ''}`)
      const txnSts = (`txnSts=${payload.txnSts !== undefined ? payload.txnSts : ''}`)
      const pyAcctName = (`pyAcctName=${payload.pyAcctName !== undefined ? payload.pyAcctName : ''}`)
      const pyAcctCtfNo = (`pyAcctCtfNo=${payload.pyAcctCtfNo !== undefined ? payload.pyAcctCtfNo : ''}`)
      const timeEarlier = (`timeEarlier=${payload.timeEarlier !== undefined ? payload.timeEarlier : ''}`)
      const timeLater = (`timeLater=${payload.timeLater !== undefined ? payload.timeLater : ''}`)
      console.log(pyAcctName)
      yield window.location.href = `${location.origin}/cloudPhoto-web/importSingleExcel?${bizPk}&${pyAcctName}&${pyAcctCtfNo}&${timeEarlier}&${timeLater}&${txnSts}`
    },
  },

  reducers: {

    // 记录对应明细modal显示,产生新的modal，并更新数据
    showAddModal (state, { payload }) {
      return { ...state, ...payload, Visible: true, updateFlag: payload.updateFlag || false, modalKey: state.modalKey + 1 }
    },
    // 记录对应明细modal显示,只更新数据，不再产生新的modal
    updateAddModal (state, { payload }) {
      return { ...state, ...payload, Visible: true, updateFlag: payload.updateFlag || false }
    },
    hideAddModal (state) {
      return { ...state, Visible: false, updateData: [], updateDataDetail: [], paginationDetail: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => <span><FormattedMessage id="pageTotal" /> {total} <FormattedMessage id="pageItem" /> </span>,
        current: 1,
        total: 0,
      }, currentRecordRowCode: '' }
    },
    queryDataSuccess (state, { payload }) {
      const { paginationDetail, updateData, updateDataDetail } = payload
      return {
        ...state,
        updateData,
        updateDataDetail,
        paginationDetail,
      }
    },
    initTime (state, { payload }) {
      const { initTime, txnStsD, pyAcctNameD, pyAcctCtfNoD, bizPkD } = payload
      return {
        ...state,
        initTime,
        txnStsD,
        pyAcctNameD,
        pyAcctCtfNoD,
        bizPkD,
      }
    },
    changeCurrentRecordRowCode (state, { payload }) {
      console.log(payload)
      return {
        ...state,
        ...payload,
      }
    },
  },
})
