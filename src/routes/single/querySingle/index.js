import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { List, AddModal, Filter } from './components'

const JobStatusDetail = ({ location, dispatch, jobStatusDetail, loading }) => {
  const { list, pagination, effectFlag, invalidFlag, modalKey, Visible, updateData, updateDataDetail, paginationDetail, initTime, txnStsD, pyAcctCtfNoD, pyAcctNameD, bizPkD, currentRecordRowCode } = jobStatusDetail
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
    bizPkD,
    txnStsD,
    initTime,
    pyAcctCtfNoD,
    pyAcctNameD,
    dispatch,
    effectFlag,
    invalidFlag,
    filter: {
      ...location.query,
    },
    handleSubmitExport (value) {
      dispatch({
        type: 'jobStatusDetail/queryExport',
        payload: {
          ...value,
        },
      })
    },
    onFilterChange (value) {
      const { pyAcctTime } = value
      if (pyAcctTime && pyAcctTime.length) {
        let a = [pyAcctTime[0].format('YYYY-MM-DD')]
        let b = [pyAcctTime[1].format('YYYY-MM-DD')]
        value.timeEarlier = [`${a} 00:00:00`]
        value.timeLater = [`${b} 23:59:59`]
    /*    value.timeEarlier = [pyAcctTime[0].format('YYYY-MM-DD HH:mm:ss')]
        value.timeLater = [pyAcctTime[1].format('YYYY-MM-DD HH:mm:ss')]*/
        // delete value.pyAcctTime
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
  const addModalProps = {
    updateData,
    updateDataDetail,
    modalKey,
    paginationDetail,
    visible: Visible,
    currentRecordRowCode,
    dispatch,
    onOk () {
      dispatch({
        type: 'jobStatusDetail/hideAddModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'jobStatusDetail/hideAddModal',
      })
    },
    loading,
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps} key={Math.random()} />
      <List {...listProps} />
      <AddModal title="单笔详情查询" key={modalKey} {...addModalProps} />
    </div>
  )
}

JobStatusDetail.propTypes = {
  jobStatusDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ jobStatusDetail, loading }) => ({ jobStatusDetail, loading: loading.models.jobStatusDetail }))(JobStatusDetail)
