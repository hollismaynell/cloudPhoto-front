import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { List, AddModal, Filter, SynchAndIgnoreModal } from './components'

const QueryBatTxnTimeout = ({ location, dispatch, queryBatTxnTimeout, loading }) => {
  const { list, pagination, effectFlag, invalidFlag, modalKey, synchIgnoreModalKey, modalType, Visible, SynchIgnoreVisible, updateData, paginationDetail, initTime, dealSts, currentRecordRowCode, currentRecordRowStatus } = queryBatTxnTimeout
  const { pageSize } = pagination
  const listProps = {
    dataSource: list,
    dispatch,
    loading,
    pagination,
    onChangeRadio () {},
    location,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
  }
  const filterProps = {
    dealSts,
    initTime,
    dispatch,
    effectFlag,
    invalidFlag,
    filter: {
      ...location.query,
    },
    handleSubmitExport (value) {
      dispatch({
        type: 'queryBatTxnTimeout/queryExport',
        payload: {
          ...value,
        },
      })
    },
    onFilterChange (value) {
      const { txnTime } = value
      if (txnTime && txnTime.length) {
        let a = [txnTime[0].format('YYYY-MM-DD')]
        let b = [txnTime[1].format('YYYY-MM-DD')]
        value.timeEarlier = [`${a} 00:00:00`]
        value.timeLater = [`${b} 23:59:59`]
    /*    value.timeEarlier = [txnTime[0].format('YYYY-MM-DD HH:mm:ss')]
        value.timeLater = [txnTime[1].format('YYYY-MM-DD HH:mm:ss')]*/
        // delete value.txnTime
      }
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
  }
  const onSynchIgnoreOk = () => {
    modalType === 'synch' ?
    dispatch({
      type: 'queryBatTxnTimeout/synchOne',
      payload: {
        trcNo: currentRecordRowCode,
        dealSts: currentRecordRowStatus,
      },
    }) : dispatch({
      type: 'queryBatTxnTimeout/ignoreOne',
      payload: {
        trcNo: currentRecordRowCode,
        dealSts: currentRecordRowStatus,
      },
    })
  }

  // 超时记录对应明细的modal
  const addModalProps = {
    title: '批量查询详情',
    updateData,
    paginationDetail,
    key: modalKey,
    modalType,
    visible: Visible,
    dispatch,
    currentRecordRowCode,
    onOk () {
      dispatch({
        type: 'queryBatTxnTimeout/hideAddModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'queryBatTxnTimeout/hideAddModal',
      })
    },
    loading,
  }

  // 同步或者忽略操作对应的modal
  const synchIgnoreModalProps = {
    title: `${modalType === 'synch' ? '同步操作' : '忽略操作'}`,
    key: synchIgnoreModalKey,
    modalType,
    visible: SynchIgnoreVisible,
    dispatch,
    onOk: onSynchIgnoreOk,
    onCancel () {
      dispatch({
        type: 'queryBatTxnTimeout/hideSynchIgnoreModal',
      })
    },
    loading,
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} key={Math.random()} />
      <List {...listProps} />
      <AddModal {...addModalProps} key={modalKey} />
      <SynchAndIgnoreModal {...synchIgnoreModalProps} key={synchIgnoreModalKey} />
    </div>
  )
}

QueryBatTxnTimeout.propTypes = {
  queryBatTxnTimeout: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ queryBatTxnTimeout, loading }) => ({ queryBatTxnTimeout, loading: loading.models.queryBatTxnTimeout }))(QueryBatTxnTimeout)
