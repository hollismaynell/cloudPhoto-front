import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Select } from 'antd'
import AnimTableBody from '../../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../../components/index'
// import { JobGroupTypeSelect } from '../../../../utils/selectData'

const confirm = Modal.confirm
const style = {
  marginTop: '15%',
}

const List = ({ onDeleteItem, dispatch, pagination, isMotion, ...tableProps }) => {
  const onChange = (record, value) => {
    dispatch({
      type: 'systemManage/setValid',
      payload: {
        sysId: record.sysId,
        sysStatus: value,
      },
    })
  }
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      dispatch({
        type: 'systemManage/queryOne',
        payload: {
          sysId: record.sysId,
        },
      })
    } else if (e.key === '3') {
      confirm({
        style,
        title: '确定要删除吗？',
        onOk () {
          onDeleteItem(record)
        },
      })
    }
  }
  const columns = [
    {
      title: '所属系统ID',
      dataIndex: 'sysId',
      key: 'sysId',
    }, {
      title: '系统名称',
      dataIndex: 'sysName',
      key: 'sysName',
    }, {
      title: '系统简称',
      dataIndex: 'sysShortname',
      key: 'sysShortname',
    }, {
      title: '定义状态',
      key: 'sysStatusDesc',
      render: (text, record) => {
        let JobGroupTypeSelect = []
        if (record.sysStatus === '2') {
          JobGroupTypeSelect = [
            { value: '3', name: '停用' },
          ]
        } else {
          JobGroupTypeSelect = [
            { value: '2', name: '启用' },
          ]
        }
        return <Select onChange={(value) => onChange(record, value)} defaultValue={record.sysStatusDesc}>{JobGroupTypeSelect.map((index) => <Select.Option value={index.value}>{index.name}</Select.Option>)}</Select>
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        let tpl = ''
        if (record.sysStatus === '2') {
          tpl = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[]} />
        } else if (record.sysStatus === '1') {
          tpl = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '3', name: '删除' }]} />
        } else {
          tpl = <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }]} />
        }
        return tpl
      },
    },
  ]
  const getBodyWrapperProps = {
    page: pagination.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  const title = () => { return <h3>批量系统列表</h3> }
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
}

export default List
