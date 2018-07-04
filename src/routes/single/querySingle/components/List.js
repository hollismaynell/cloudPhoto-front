import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import AnimTableBody from '../../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../../components/index'
// import { JobGroupTypeSelect } from '../../../../utils/selectData'

// const confirm = Modal.confirm
// const style = {
//   marginTop: '15%',
// }

const List = ({ onDeleteItem, dispatch, pagination, isMotion, ...tableProps }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      dispatch({
        type: 'jobStatusDetail/queryOne',
        payload: {
          trcNo: record.trcNo,
          page: 1,
          pageSize: 5,
        },
      })
      dispatch({
        type: 'jobStatusDetail/changeCurrentRecordRowCode',
        payload: {
          currentRecordRowCode: record.trcNo,
        },
      })
    }
  }
  const columns = [
    {
      title: '核算流水号',
      dataIndex: 'bizPk',
      key: 'bizPk',
    }, {
      title: '交易流水号',
      dataIndex: 'trcNo',
      key: 'trcNo',
    }, {
      title: '付款人名称',
      dataIndex: 'pyAcctName',
      key: 'pyAcctName',
    }, {
      title: '付款人证件号',
      dataIndex: 'pyAcctCtfNo',
      key: 'pyAcctCtfNo',
    }, {
      title: '证件类型',
      dataIndex: 'pyACtfTypDesc',
      key: 'pyACtfTypDesc',
    }, {
      title: '付款账户开户行',
      dataIndex: 'depBnkDesc',
      key: 'depBnkDesc',
    }, {
      title: '应收金额',
      dataIndex: 'pyAmt',
      render: (text, record) => (record.pyAmt.toFixed(2)),
      key: 'pyAmt',
    }, {
      title: '实收金额',
      dataIndex: 'rcvdAmt',
      render: (text, record) => (record.rcvdAmt.toFixed(2)),
      key: 'rcvdAmt',
    }, {
      title: '币种',
      dataIndex: 'cryTypDesc',
      key: 'cryTypDesc',
    }, {
      title: '交易状态',
      dataIndex: 'txnStsDesc',
      key: 'txnStsDesc',
    }, {
      title: '交易时间',
      dataIndex: 'timeString',
      key: 'timeString',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '查看' }]} />
      },
    },
  ]
  const getBodyWrapperProps = {
    page: pagination.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  const title = () => { return <h3>单笔收款交易记录</h3> }
  return (
    <div>
      <Table
        {...tableProps}
        title={title}
        bordered
        columns={columns}
        rowKey={record => record.trcNo}
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
