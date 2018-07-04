import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { List, AddModal, Filter } from './components'

const JobLogDetail = ({ location, dispatch, jobLogDetail, loading }) => {
  const { list, pagination, effectFlag, invalidFlag, modalKey, Visible, updateData, updateDataDetail, initTime, txnStsD, pyAcctCtfNoD, pyAcctNameD, bizPkD } = jobLogDetail
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
        type: 'jobLogDetail/queryExport',
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
    title: '批量查询详情',
    updateData,
    updateDataDetail,
    modalKey,
    visible: Visible,
    dispatch,
    onOk () {
      dispatch({
        type: 'jobLogDetail/hideAddModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'jobLogDetail/hideAddModal',
      })
    },
    loading,
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps} key={Math.random()} />
      <List {...listProps} />
      <AddModal {...addModalProps} />
    </div>
  )
}

JobLogDetail.propTypes = {
  jobLogDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ jobLogDetail, loading }) => ({ jobLogDetail, loading: loading.models.jobLogDetail }))(JobLogDetail)
