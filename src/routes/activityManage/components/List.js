import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Modal } from 'antd'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
// import { DropOption } from '../../../components/index'
// import { JobGroupTypeSelect } from '../../../../utils/selectData'

const confirm = Modal.confirm
// const style = {
//   marginTop: '15%',
// }

const List = ({ dispatch, pagination, isMotion, ...tableProps }) => {
  const handleShareClick = () => {
    confirm({
      content: '确认分享吗？',
      onOk () {},
      onCancel () {},
    })
  }

  const handleSetClick = () => {
    dispatch({
      type: 'acticityManage/changeData',
      payload: {
        visible: true,
      },
    })
  }

  const columns = [
    {
      title: '相册名称',
      dataIndex: 'trcNo',
      key: 'trcNo',
    }, {
      title: '日期',
      dataIndex: 'txnTtl',
      key: 'txnTtl',
    }, {
      title: '地点',
      dataIndex: 'txnTimeString',
      key: 'txnTimeString',
    }, {
      title: '照片数',
      dataIndex: 'dealStsDesc',
      key: 'dealStsDesc',
    }, {
      title: '照片点击数',
      dataIndex: 'overTimeString',
      key: 'overTimeString',
    }, {
      title: '所属用户',
      dataIndex: 'belongToUser',
      key: 'belongToUser',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: '操作',
      key: 'operation',
      width: '8vw',
      render: (text, record) => {
        return <div><Button size="small" record={record} text={text} type="primary" onClick={handleShareClick} >分享</Button>&nbsp;&nbsp;&nbsp;<Button size="small" type="dashed" style={{ float: 'right' }} onClick={handleSetClick} >设置</Button></div>
      },
    },
  ]
  const getBodyWrapperProps = {
    page: pagination.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  // const title = () => { return <h3>超时批量处理</h3> }
  return (
    <div>
      <Table
        {...tableProps}
        // title={title}
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
