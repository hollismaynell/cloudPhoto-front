import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { DropOption } from '../../../components'
import AddModal from './showLevNode.modal'
import AddMenuModal from './addMenu.modal'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { FormattedMessage } from 'react-intl'
import './index.less'
const confirm = Modal.confirm

function LevNode ({ levNode, dispatch, loading }) {
  const { list, visible, isMotion, nodeList, addMenuModalVisible, checkStrictly, defaultCheckedKeys, pagination, usrLev } = levNode
  const onEditItem = (item) => {
    dispatch({
      type: 'levNode/showModal',
      payload: {
        modalType: 'update',
      },
    })
    dispatch({
      type: 'levNode/queryOneNode',
      payload: {
        usrLev: item.id,
      },
    })
  }
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除这条信息?',
        onOk () {
          dispatch({
            type: 'levNode/delete',
            payload: {
              id: record.id,
              page: pagination.current,
              pageSize: pagination.pageSize,
            },
          })
        },
      })
    }
  }
  // 表头信息
  const columns = [
    {
      title: '权限名称',
      dataIndex: 'levName',
    },
    {
      title: '权限等级',
      dataIndex: 'usrLev',
    },
    {
      title: '创建日期',
      dataIndex: 'dateCreated',
    }, {
      title: '创建人',
      dataIndex: 'operator',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]
  const addModalProps = {
    title: <FormattedMessage id="view" />,
    dispatch,
    nameSpace: 'levNode',
    visible,
    onOk () {
      let str = ''
      defaultCheckedKeys.forEach((item) => {
        str = `${item},${str}`
      })
      str = str.substring(0, str.length - 1)
      dispatch({
        type: 'levNode/update',
        payload: {
          selectedKeys: str,
          usrLev: usrLev,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'levNode/hideModal',
      })
    },
    loading,
    nodeList,
    defaultCheckedKeys,
    checkStrictly,
    usrLev,
  }
  const addMenuModalProps = {
    title: <FormattedMessage id="addLevel" />,
    nodeList,
    dispatch,
    visible: addMenuModalVisible,
    onCancel () {
      dispatch({
        type: 'levNode/hideAddMenuModal',
      })
    },
    loading,
  }
  const handleAddMenu = () => {
    dispatch({
      type: 'levNode/showAddMenuModal',
    })
  }
  const onPageChange = (page) => {
    dispatch({
      type: 'levNode/query',
      payload: {
        page: page.current,
        pageSize: page.pageSize,
      },
    })
  }
  const getBodyWrapperProps = {
    page: pagination.page,
    current: pagination.current,
  }
  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }
  return (
    <div className="content-inner">
      <Button style={{ marginBottom: '20px' }} type="primary" onClick={handleAddMenu}><FormattedMessage id="addLevel" /></Button>
      <AddModal {...addModalProps} />
      <AddMenuModal {...addMenuModalProps} />
      <Table
        bordered
        rowKey={record => record.nodeId}
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={pagination}
        onChange={onPageChange}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

LevNode.propTypes = {
  levNode: PropTypes.object,
  app: PropTypes.object,
  pagination: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  location: PropTypes.object,
}

export default connect(
  ({ levNode, loading, app }) => (
    { levNode, loading: loading.models.levNode, app }
  ))(LevNode)
