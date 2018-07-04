import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { DropOption } from '../../../components'
import { FormattedMessage } from 'react-intl'
const List = ({ onEditItem, isMotion, location, ...tableProps, app, usrLev }) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    }
  }
/* 一级用户*/
  const columns1 = [
    {
      title: '所属机构',
      dataIndex: 'instuName',
      key: 'instuName',
    }, {
      title: '用户邮箱',
      dataIndex: 'usrCde',
      key: 'usrCde',
    }, {
      title: '用户名称',
      dataIndex: 'usrName',
      key: 'usrName',
    }, {
      title: '证件类型',
      dataIndex: 'usrIdTypStr',
      key: 'usrIdTypStr',
    }, {
      title: '证件号码',
      dataIndex: 'usrIdNo',
      key: 'usrIdNo',
    }, {
      title: '用户权限',
      dataIndex: 'usrLevStr',
      key: 'usrLevStr',
    }, {
      title: '用户状态',
      dataIndex: 'usrStsStr',
      key: 'usrStsStr',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: <FormattedMessage id={app.format.update} /> }]} />
      },
    },
  ]
  /* 二级用户*/
  const columns2 = [
    {
      title: '所属机构',
      dataIndex: 'instuName',
      key: 'instuName',
    }, {
      title: '部门',
      dataIndex: 'depCde',
      key: 'depCde',
    }, {
      title: '用户邮箱',
      dataIndex: 'usrCde',
      key: 'usrCde',
    }, {
      title: '用户名称',
      dataIndex: 'usrName',
      key: 'usrName',
    }, {
      title: '证件类型',
      dataIndex: 'usrIdTypStr',
      key: 'usrIdTypStr',
    }, {
      title: '证件号码',
      dataIndex: 'usrIdNo',
      key: 'usrIdNo',
    }, {
      title: '用户权限',
      dataIndex: 'usrLevStr',
      key: 'usrLevStr',
    }, {
      title: '用户状态',
      dataIndex: 'usrStsStr',
      key: 'usrStsStr',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: <FormattedMessage id={app.format.update} /> }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return <AnimTableBody {...getBodyWrapperProps} body={body} /> }

  const title = () => { return <h3>用户信息列表</h3> }
  return (
    <div>
      <Table
        {...tableProps}
        title={title}
        className={classnames({ [styles.table]: false, [styles.motion]: isMotion })}
        bordered
        columns={usrLev === '1' ? columns1 : columns2}
        simple
        rowKey={record => record.usrCde}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onOpenItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  app: PropTypes.object,
  usrLev: PropTypes.object,
}

export default List
