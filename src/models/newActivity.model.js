import modelExtend from 'dva-model-extend'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import queryString from 'query-string'
// import { message } from 'antd'
import { query, queryOne, synchOne, ignoreOne } from '../services/newActivity.service'
// import { querySys } from '../../services/organizManage/usersManage.service'
import { pageModel } from './common'
import moment from 'moment'
import { config } from '../utils'
const { prefix } = config
const { webUrl } = config

export default modelExtend(pageModel, {
  namespace: 'newActivity',

  state: {
    currentItem: {},
    // 超时记录对应明细的modal的visible
    Visible: false,
    // 同步或者忽略操作对应的modal的visible
    SynchIgnoreVisible: false,
    modalType: 'synch',
    selectedRowKeys: [],
    updateData: [],
    paginationDetail: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => <span><FormattedMessage id="pageTotal" /> {total} <FormattedMessage id="pageItem" /> </span>,
      current: 1,
      total: 0,
    },
    updateFlag: false,
    complianceSel: [],
    modalKey: 1,
    synchIgnoreModalKey: 1,
    sysSel: [],
    isMotion: localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    disabledDate: false,
    initTime: [moment('00:00:00', 'HH:mm:ss'), moment()],
    dealSts: '11',
    currentRecordRowCode: '',
    currentRecordRowStatus: '',
    currentPage: 1,
    currentPageSize: 10,
    tabPaneTitle: '设置基本信息',
  },
// pathname 菜单路径
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === `${webUrl}/queryBatTxnTimeout`) {
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
                dealSts: '',
              },
            })
          }
        }
      })
    },
  },
  effects: {

    *setTabPaneTitle ({ payload }, { put }) {
      debugger
      yield put({
        type: 'setTabPaneTitlesu',
        payload: payload,
      })
    },

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
      const { txnTime } = payload
      if (txnTime && txnTime.length) {
        payload.timeEarlier = [txnTime[0].format('YYYY-MM-DD HH:mm:ss')]
        payload.timeLater = [txnTime[1].format('YYYY-MM-DD HH:mm:ss')]
        delete payload.txnTime
      }
      const dealSts = (`dealSts=${payload.dealSts !== undefined ? payload.dealSts : ''}`)
      const timeEarlier = (`timeEarlier=${payload.timeEarlier !== undefined ? payload.timeEarlier : ''}`)
      const timeLater = (`timeLater=${payload.timeLater !== undefined ? payload.timeLater : ''}`)
      // yield window.open (`http://10.10.10.196:8002/poros-web/importBatchExcel?${dealSts}&${timeEarlier}&${timeLater}&${dealSts}`)
      console.log(location.origin)
      yield window.location.href = `${location.origin}/poros-web/importBatchExcel?&${timeEarlier}&${timeLater}&${dealSts}`
    },
    // 查一条
    *queryOne ({ payload = {} }, { call, put, select }) {
      const { currentRecordRowCode } = yield select(({ newActivity }) => newActivity)
      currentRecordRowCode === '' ? yield put({ type: 'showAddModal', payload }) : yield put({ type: 'updateAddModal', payload })
      // yield put({ type: 'showAddModal', payload })
      const data = yield call(queryOne, payload)
      if (data) {
        yield put({ type: 'queryDataSuccess', payload: { updateData: data.data.data, paginationDetail: {
          current: Number(payload.page) || 1,
          pageSize: Number(payload.pageSize) || 10,
          total: data.extendMap.total,
        } } })
      }
    },
    // 同步操作
    *synchOne ({ payload = {} }, { call, put }) {
      // yield put({ type: 'showSynchIgnoreModal', payload })
      const data = yield call(synchOne, payload)
      window.location.query = queryString.parse(window.location.search)
      if (data.success) {
        yield put({ type: 'hideSynchIgnoreModal' })
        yield put({
          type: 'query',
          payload: {
            ...window.location.query,
            page: Number(window.location.query.page) || 1,
            pageSize: Number(window.location.query.pageSize) || 10,
          },
        })
      } else {
        throw data
      }
    },
    // 忽略操作
    *ignoreOne ({ payload = {} }, { call, put }) {
      // yield put({ type: 'showSynchIgnoreModal', payload })
      // console.log(`'modalType: '${state.modalType}`)
      const data = yield call(ignoreOne, payload)
      window.location.query = queryString.parse(window.location.search)
      if (data.success) {
        yield put({ type: 'hideSynchIgnoreModal' })
        yield put({
          type: 'query',
          payload: {
            ...window.location.query,
            page: Number(window.location.query.page) || 1,
            pageSize: Number(window.location.query.pageSize) || 10,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {

    setTabPaneTitlesu (state, { payload }) {
      return { ...state, ...payload }
    },

    // 超时记录对应明细modal显示
    showAddModal (state, { payload }) {
      return { ...state, ...payload, Visible: true, updateFlag: payload.updateFlag || false, modalKey: state.modalKey + 1 }
    },

    // 超时记录对应明细modal显示
    updateAddModal (state, { payload }) {
      return { ...state, ...payload, Visible: true, updateFlag: payload.updateFlag || false }
    },

    // 超时记录对应明细modal隐藏
    hideAddModal (state) {
      return { ...state, Visible: false, updateData: [], paginationDetail: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => <span><FormattedMessage id="pageTotal" /> {total} <FormattedMessage id="pageItem" /> </span>,
        current: 1,
        total: 0,
      }, currentRecordRowCode: '' }
    },

    disabledDate (state, { payload }) {
      const { disabledDate } = payload
      return {
        ...state,
        disabledDate,
      }
    },

    // 同步忽略modal显示
    showSynchIgnoreModal (state, { payload }) {
      return { ...state, ...payload, SynchIgnoreVisible: true, synchIgnoreModalKey: state.synchIgnoreModalKey + 1 }
    },

    // 同步忽略modal隐藏
    hideSynchIgnoreModal (state) {
      return { ...state, SynchIgnoreVisible: false }
    },

    queryDataSuccess (state, { payload }) {
      const { updateData, paginationDetail } = payload
      updateData.forEach((item, index) => {
        item.key = (paginationDetail.current * paginationDetail.pageSize + index).toString()
      })
      return {
        ...state,
        updateData,
        paginationDetail: {
          ...state.paginationDetail,
          ...paginationDetail,
        },
      }
    },

    changeCurrentRecordRowCode (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    initTime (state, { payload }) {
      const { initTime, dealSts } = payload
      return {
        ...state,
        initTime,
        dealSts,
      }
    },
  },
})
