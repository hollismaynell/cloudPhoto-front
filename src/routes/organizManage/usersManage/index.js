import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import Cookies from 'js-cookie'
import { FormattedMessage } from 'react-intl'
const User = ({ location, dispatch, usersManage, loading, app }) => {
  const { list, pagination, dataItem, modalVisible, requiredFlag, modalType, isMotion, selectedRowKeys, dataDept, userFlag, displayFlag, dataRole, departmentSel, usrIdTypSel, usrStsSel, sysSel } = usersManage
  const { pageSize } = pagination
  /* 获取用户角色*/
  const usrLev = JSON.parse(Cookies.get('token')).usrLev
  const modalProps = {
    usrLev,
    app,
    dataItem: modalType === 'create' ? {} : dataItem,
    dataDept,
    dataRole,
    departmentSel,
    sysSel,
    usrIdTypSel,
    usrStsSel,
    modalType,
    dispatch,
    userFlag,
    requiredFlag,
    displayFlag,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['usersManage/update'],
    title: modalType === 'create' ? <FormattedMessage id={app.format.add} /> : <FormattedMessage id={app.format.update} />,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `usersManage/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'usersManage/hideModal',
      })
    },
  }
  const listProps = {
    usrLev,
    app,
    dataSource: list,
    loading: loading.effects['usersManage/query'],
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
    onEditItem (record) {
      dispatch({
        type: 'usersManage/queryDtl',
        payload: {
          modalType: 'update',
          usrCde: record.usrCde,
          quGrd: record.quGrd,
        },
      })
    },
  /*  rowSelection: {             /!* 多选*!/
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'usersManage/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },*/
  }

  const filterProps = {
    app,
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch({
        type: 'usersManage/query',
        payload: {
          page: location.query.page === undefined ? 1 : Number(location.query.page),
          pageSize: pageSize,
          usrName: value.usrName,
        },
      })
    },
    onAdd () {
      dispatch({
        type: 'usersManage/queryNull',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: 'usersManage/querySel',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'usersManage/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'usersManage/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {
         selectedRowKeys.length > 0 &&
           <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
             <Col>
               {`Selected ${selectedRowKeys.length} items `}
               <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
                 <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>
               </Popconfirm>
             </Col>
           </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

User.propTypes = {
  usersManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  app: PropTypes.object,
  userFlag: PropTypes.string,
  displayFlag: PropTypes.string,
}

export default connect(({ usersManage, loading, app }) => ({ usersManage, loading, app }))(User)
