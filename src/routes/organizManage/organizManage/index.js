import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
/*
import Filter from './Filter'
*/
import Modal from './Modal'
import { FormattedMessage } from 'react-intl'
const User = ({ location, dispatch, organizManage, loading, app }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, colNum, instuNameSel } = organizManage
  const modalProps = {
    app,
    instuNameSel,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['organizManage/update'],
    title: modalType === 'create' ? <FormattedMessage id={app.format.add} /> : <FormattedMessage id={app.format.update} />,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `organizManage/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'organizManage/hideModal',
      })
    },
    colNum,
    modalType,
  }
  const onAdd = () => {
    dispatch({
      type: 'organizManage/queryNull',
      payload: {
        modalType: 'create',
      },
    })
    /* 查一遍 所属机构*/
    dispatch({
      type: 'organizManage/instuList',
      payload: {
        modalType: 'create',
      },
    })
  }
  const listProps = {
    onAdd,
    app,
    dataSource: list,
    colNum,
    loading: loading.effects['organizManage/query'],
    pagination,
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
    onDeleteItem (instuCde) {
      dispatch({
        type: 'organizManage/delete',
        payload: instuCde,
      })
    },
    onDeleteDeptNo (deptNo) {
      dispatch({
        type: 'organizManage/deleteDeptNo',
        payload: deptNo,
      })
    },
    onEditItem (item) {
      /* 查一遍 所属机构*/
      dispatch({
        type: 'organizManage/instuListUpdate',
        payload: {
          modalType: 'update',
        },
      })
      dispatch({
        type: 'organizManage/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  /*  const filterProps = {
    isMotion,
    app,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch({
        type: 'organizManage/query',
        payload: {
          page: location.query.page === undefined ? 1 : Number(location.query.page),
          pageSize: pageSize,
          instuName: value.instuName,
        },
      })
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/organizManage',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/organizManage',
      }))
    },
    switchIsMotion () {
      dispatch({ type: 'organizManage/switchIsMotion' })
    },
    colNum,
  }*/

  return (
    <div className="content-inner">
    {/*  <Filter {...filterProps} />*/}
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

User.propTypes = {
  organizManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ organizManage, loading, app }) => ({ organizManage, loading, app }))(User)
