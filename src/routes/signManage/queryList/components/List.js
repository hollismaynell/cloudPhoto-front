import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import AnimTableBody from '../../../../components/DataTable/AnimTableBody'
const List = ({ onDeleteItem, dispatch, pagination, isMotion, ...tableProps }) => {
  const columns = [
    {
      title: '核算流水号',
      dataIndex: 'bizPk',
      key: 'bizPk',
    }, {
      title: '付款人名称',
      dataIndex: 'pyAcctName',
      key: 'pyAcctName',
    }, {
      title: '付款人证件号',
      dataIndex: 'pyAcctCtfNo',
      key: 'pyAcctCtfNo',
    }, {
      title: '签约状态',
      dataIndex: 'txnStsDesc',
      key: 'txnStsDesc',
    }, {
      title: '签约通道',
      dataIndex: 'pchCde',
      key: 'pchCde',
    }, {
      title: '签约时间',
      dataIndex: 'timeString',
      key: 'timeString',
    }, {
      title: '交易流水号',
      dataIndex: 'trcNo',
      key: 'trcNo',
    }, {
      title: '付款账户开户行',
      dataIndex: 'depBnkDesc',
      key: 'depBnkDesc',
    }, {
      title: '手机号',
      dataIndex: 'mblNo',
      key: 'mblNo',
    },
  ]
  const getBodyWrapperProps = {
    page: pagination.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  const title = () => { return <h3>签约交易记录</h3> }
  return (
    <div>
      <Table
        {...tableProps}
        title={title}
        bordered
        columns={columns}
        rowKey={record => record.pkgSeq}
        pagination={pagination}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  dispatch: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  pagination: PropTypes.object,
  Visible: PropTypes.bool,
}

export default List
