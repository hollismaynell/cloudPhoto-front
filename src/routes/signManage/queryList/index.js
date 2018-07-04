import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { List, Filter } from './components'

const QueryList = ({ location, dispatch, queryListDetail, loading }) => {
  const { list, pagination, effectFlag, invalidFlag, disabledDate, initTime, txnStsD, pyAcctCtfNoD, pyAcctNameD } = queryListDetail
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
    txnStsD,
    initTime,
    pyAcctCtfNoD,
    pyAcctNameD,
    disabledDate,
    dispatch,
    effectFlag,
    invalidFlag,
    filter: {
      ...location.query,
    },
    handleSubmitExport (value) {
      dispatch({
        type: 'queryListDetail/queryExport',
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
        delete value.pyAcctTime
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
  return (
    <div className="content-inner">
      <Filter {...filterProps} key={Math.random()} />
      <List {...listProps} /></div>
  )
}

QueryList.propTypes = {
  queryListDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ queryListDetail, loading }) => ({ queryListDetail, loading: loading.models.queryList }))(QueryList)
