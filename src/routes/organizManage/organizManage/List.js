import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'
// import { Link } from 'dva/router'
import Cookies from 'js-cookie'
import { FormattedMessage } from 'react-intl'
const confirm = Modal.confirm


const List = ({ onDeleteItem, onEditItem, onDeleteDeptNo, isMotion, location, ...tableProps, app, onAdd }) => {
  const colNum = JSON.parse(Cookies.get('token')).usrLev
  console.log(JSON.parse(Cookies.get('token')))
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      if (colNum === '1') {
        const siderFold = localStorage.getItem('AtlassiderFold')
        confirm({
          style: { marginTop: '-75px', left: `${siderFold === 'true' ? 20 : 110}`, top: '50%' },
          title: '确定要删除机构吗？',
          onOk () {
            onDeleteItem(record.instuCde)
          },
        })
      } else {
        const siderFold = localStorage.getItem('AtlassiderFold')
        confirm({
          style: { marginTop: '-75px', left: `${siderFold === 'true' ? 20 : 110}`, top: '50%' },
          title: '确定要删除部门吗？',
          onOk () {
            onDeleteDeptNo(record.deptNo)
          },
        })
      }
    }
  }
// 机构表头
  const columns1 = [
    {
      title: '机构代码',
      dataIndex: 'instuCde',
      key: 'instuCde',
    }, {
      title: '机构名称',
      dataIndex: 'instuName',
      key: 'instuName',
    }, {
      title: '机构人数',
      dataIndex: 'instuPerNum',
      key: 'instuPerNum',
      render: (text, record) => {
        return `${record.instuPerNum}`
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: <FormattedMessage id={app.format.update} /> }, { key: '2', name: <FormattedMessage id={app.format.delete} /> }]} />
      },
    },
  ]
  // 部门表头
  const columns2 = [
    {
      title: '机构名称',
      dataIndex: 'instuName',
      key: 'instuName',
      // render: (text, record) => <Link to={`usersManage/${record.deptNo}`}>{text}</Link>,
    }, {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
    }, {
      title: '部门创建人',
      dataIndex: 'deptManagerUsr',
      key: 'deptManagerUsr',
    }, {
      title: '部门人数',
      dataIndex: 'deptPerNum',
      key: 'deptPerNum',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]
  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }
  return (
    <div>
      <div style={{ width: '100%', textAlign: 'right', marginBottom: '20px' }}>
        <Button size="large" type="ghost" onClick={onAdd}><FormattedMessage id={app.format.add} /></Button>
      </div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: false, [styles.motion]: isMotion })}
        bordered
        columns={colNum === '1' ? columns1 : columns2}
        simple
        rowKey={record => record.deptNo}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  dataSource: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onDeleteDeptNo: PropTypes.func,
  onEditItem: PropTypes.func,
  colNum: PropTypes.number,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  app: PropTypes.object,
  onAdd: PropTypes.func,
}

export default List
