import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Modal } from 'antd'
import { Filter } from './components'
const confirm = Modal.confirm
const JobStatusDetail = ({ location, dispatch, webSingleTrade, loading }) => {
  const { effectFlag, invalidFlag } = webSingleTrade
  const filterProps = {
    effectFlag,
    invalidFlag,
    loading,
    filter: {
      ...location.query,
    },

    onFilterChange (value) {
      confirm({
        title: '确定要提交吗？',
        onOk () {
          dispatch({
            type: 'webSingleTrade/query',
            payload: {
              ...value,
            },
          })
        },
      })
      // const fields = value()
      // for (let item in fields) {
      //   if ({}.hasOwnProperty.call(fields, item)) {
      //     if (fields[item] instanceof Array) {
      //       fields[item] = []
      //     } else {
      //       fields[item] = undefined
      //     }
      //   }
      // }
    },
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps} />
    </div>
  )
}

JobStatusDetail.propTypes = {
  webSingleTrade: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ webSingleTrade, loading }) => ({ webSingleTrade, loading: loading.models.webSingleTrade }))(JobStatusDetail)
