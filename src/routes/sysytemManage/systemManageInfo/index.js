import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { List, AddModal, Filter } from './components'

const SystemManage = ({ location, dispatch, systemManage, loading }) => {
  const { list, pagination, isMotion, modalVisible, updateData, updateFlag, modalType, modalKey, effectFlag, invalidFlag } = systemManage
  const { pageSize } = pagination
  const listProps = {
    dataSource: list,
    dispatch,
    loading,
    pagination,
    onChangeRadio () {},
    location,
    isMotion,
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
    onDeleteItem (record) {
      dispatch({
        type: 'systemManage/delete',
        payload: {
          sysId: record.sysId,
        },
      })
    },
  }
  const filterProps = {
    isMotion,
    effectFlag,
    invalidFlag,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/systemInfo',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/systemInfo',
      }))
    },
    onAdd () {
      dispatch({
        type: 'systemManage/showAddModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }
  const addModalProps = {
    title: `${modalType === 'create' ? '新增系统信息' : '修改系统信息'}`,
    modalKey,
    dispatch,
    modalType,
    updateData: modalType === 'create' ? {} : updateData,
    visible: modalVisible,
    updateFlag,
    onCancel () {
      dispatch({
        type: 'systemManage/hideAddModal',
      })
    },
    loading,
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      <AddModal key={modalKey} {...addModalProps} />
    </div>
  )
}

SystemManage.propTypes = {
  systemManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ systemManage, loading }) => ({ systemManage, loading: loading.models.systemManage }))(SystemManage)
