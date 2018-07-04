import modelExtend from 'dva-model-extend'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => <span><FormattedMessage id="pageTotal" /> {total} <FormattedMessage id="pageItem" /> </span>,
      current: 1,
      total: 0,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      let { list, pagination } = payload
      console.log(list)
      console.log(pagination)
      list.forEach((item, index) => {
        item.key = (pagination.current * pagination.pageSize + index).toString()
      })
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
    queryJobSuccess (state, { payload }) {
      let { list, pagination } = payload
      list.forEach((item, index) => {
        item.key = (pagination.current * pagination.pageSize + index).toString()
      })
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },

})


module.exports = {
  model,
  pageModel,
}
