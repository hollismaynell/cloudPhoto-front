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

const List = ({ dispatch, pagination, isMotion, ...tableProps }) => {
  const changeDescToCode = (dealStsDesc) => {
    switch (dealStsDesc) {
      case '处理完成':
        return '43'
      case '处理中':
        return '42'
      case '未处理':
        return '41'
      case '忽略':
        return '00'
      default:
        return '11'
    }
  }
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      dispatch({
        type: 'queryBatTxnTimeout/queryOne',
        payload: {
          page: 1,
          pageSize: 10,
          trcNo: record.trcNo,
        },
      })
      dispatch({
        type: 'queryBatTxnTimeout/changeCurrentRecordRowCode',
        payload: {
          currentRecordRowCode: record.trcNo,
        },
      })
    } else if (e.key === '2') {
      dispatch({
        type: 'queryBatTxnTimeout/showSynchIgnoreModal',
        payload: {
          modalType: 'synch',
        },
      })
      dispatch({
        type: 'queryBatTxnTimeout/changeCurrentRecordRowCode',
        payload: {
          currentRecordRowCode: record.trcNo,
          currentRecordRowStatus: changeDescToCode(record.dealStsDesc),
        },
      })
    } else {
      dispatch({
        type: 'queryBatTxnTimeout/showSynchIgnoreModal',
        payload: {
          modalType: 'ignore',
        },
      })
      dispatch({
        type: 'queryBatTxnTimeout/changeCurrentRecordRowCode',
        payload: {
          currentRecordRowCode: record.trcNo,
          currentRecordRowStatus: changeDescToCode(record.dealStsDesc),
        },
      })
    }
  }

  const columns = [
    {
      title: '平台交易流水号',
      dataIndex: 'trcNo',
      key: 'trcNo',
    }, {
      title: '交易标题',
      dataIndex: 'txnTtl',
      key: 'txnTtl',
    }, {
      title: '交易时间',
      dataIndex: 'txnTimeString',
      key: 'txnTimeString',
    }, {
      title: '处理状态',
      dataIndex: 'dealStsDesc',
      key: 'dealStsDesc',
    }, {
      title: '超时时间',
      dataIndex: 'overTimeString',
      key: 'overTimeString',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={(record.dealStsDesc === '未处理') ? [{ key: '1', name: '查看' }, { key: '2', name: '同步' }, { key: '3', name: '忽略' }] : [{ key: '1', name: '查看' }]} />
      },
    },
  ]
  const getBodyWrapperProps = {
    page: pagination.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  const title = () => { return <h3>超时批量处理</h3> }
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
  isMotion: PropTypes.bool,
  pagination: PropTypes.object,
}

export default List
