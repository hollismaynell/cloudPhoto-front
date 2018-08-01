import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Cookies from 'js-cookie'
import { List, AddModal, Filter, SynchAndIgnoreModal } from './components'
import styles from './index.less'
import { Row, Tabs, Button, Modal } from 'antd'
import MyBread from '../../components/MyBread'
// import { Bread } from '../../components/Layout'
// const menu = require('../../utils/menu.header')

const TabPane = Tabs.TabPane
const confirm = Modal.confirm

const ActivityManage = ({ location, dispatch, activityManage, loading }) => {
  const { effectFlag, invalidFlag, modalKey, synchIgnoreModalKey, modalType, Visible, SynchIgnoreVisible, updateData, paginationDetail, initTime, dealSts, currentRecordRowCode, currentRecordRowStatus, createActiveList, pagination, joinActiveList, paginationJoin, namespace } = activityManage
  const { pageSize } = pagination
  const changeMeaning = (text) => {
    switch (text) {
      case '1':
        return '未开始'
      case '2':
        return '进行中'
      case '3':
        return '已结束'
      case '4':
        return '已取消'
      default:
        return text
    }
  }
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
  // 我参与的
  const joinColumns = [
    {
      title: '相册名称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '日期',
      dataIndex: 'beginDate',
      key: 'beginDate',
    }, {
      title: '地点',
      dataIndex: 'location',
      key: 'location',
    }, {
      title: '照片数',
      dataIndex: 'dealStsDesc',
      key: 'dealStsDesc',
    }, {
      title: '所属用户',
      dataIndex: 'belongToUser',
      key: 'belongToUser',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => <span>{changeMeaning(text)}</span>,
    }, {
      title: '操作',
      key: 'operation',
      width: '10vw',
      render: (text, record) => {
        return <div><Button size="small" record={record} text={text} type="primary" onClick={handleShareClick} >相册</Button>&nbsp;&nbsp;&nbsp;<Button size="small" type="primary" onClick={handleSetClick} >找人</Button></div>
      },
    },
  ]

  // 我创建的
  const createColumns = [
    {
      title: '相册名称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '日期',
      dataIndex: 'beginDate',
      key: 'beginDate',
    }, {
      title: '地点',
      dataIndex: 'location',
      key: 'location',
    }, {
      title: '照片数',
      dataIndex: 'dealStsDesc',
      key: 'dealStsDesc',
    }, {
      title: '所属用户',
      dataIndex: 'belongToUser',
      key: 'belongToUser',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{changeMeaning(text)}</span>,
    }, {
      title: '操作',
      key: 'operation',
      width: '15vw',
      render: (text, record) => {
        return <div><Button size="small" record={record} text={text} type="primary" onClick={handleShareClick} >相册</Button>&nbsp;&nbsp;&nbsp;<Button size="small" type="primary" onClick={handleSetClick} >找人</Button>&nbsp;&nbsp;&nbsp;<Button size="small" type="primary" onClick={handleSetClick} >设置</Button></div>
      },
    },
  ]
  // 查询我创建的活动列表
  const createListProps = {
    dataSource: createActiveList,
    dispatch,
    loading,
    pagination,
    onChangeRadio () { },
    location,
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
    columns: createColumns,
  }
  // 查询我参与的活动列表
  const joinListProps = {
    dataSource: joinActiveList,
    dispatch,
    loading,
    pagination: paginationJoin,
    onChangeRadio () { },
    location,
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
    columns: joinColumns,
  }
  // tab切换函数
  const handleTabsChange = (key) => {
    if (key === '2') {
      let token = JSON.parse(Cookies.get('token'))
      if (!createActiveList.length) {
        dispatch({
          type: `${namespace}/queryCreateActiv`,
          payload: {
            ...location.query,
            userId: token.data.id,
            page: Number(location.query.page) || 1,
            size: Number(location.query.pageSize) || 10,
          },
        })
      }
    }
  }
  const filterProps = {
    dealSts,
    initTime,
    dispatch,
    effectFlag,
    invalidFlag,
    filter: {
      ...location.query,
    },
    handleSubmitExport (value) {
      dispatch({
        type: 'activityManage/queryExport',
        payload: {
          ...value,
        },
      })
    },
    onFilterChange (value) {
      const { txnTime } = value
      if (txnTime && txnTime.length) {
        let a = [txnTime[0].format('YYYY-MM-DD')]
        let b = [txnTime[1].format('YYYY-MM-DD')]
        value.timeEarlier = [`${a} 00:00:00`]
        value.timeLater = [`${b} 23:59:59`]
        /*    value.timeEarlier = [txnTime[0].format('YYYY-MM-DD HH:mm:ss')]
            value.timeLater = [txnTime[1].format('YYYY-MM-DD HH:mm:ss')]*/
        // delete value.txnTime
      }
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
  }
  const onSynchIgnoreOk = () => {
    modalType === 'synch' ?
      dispatch({
        type: 'activityManage/synchOne',
        payload: {
          trcNo: currentRecordRowCode,
          dealSts: currentRecordRowStatus,
        },
      }) : dispatch({
        type: 'activityManage/ignoreOne',
        payload: {
          trcNo: currentRecordRowCode,
          dealSts: currentRecordRowStatus,
        },
      })
  }

  // 超时记录对应明细的modal
  const addModalProps = {
    title: '批量查询详情',
    updateData,
    paginationDetail,
    key: modalKey,
    modalType,
    visible: Visible,
    dispatch,
    currentRecordRowCode,
    onOk () {
      dispatch({
        type: 'activityManage/hideAddModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'activityManage/hideAddModal',
      })
    },
    loading,
  }

  // 同步或者忽略操作对应的modal
  const synchIgnoreModalProps = {
    title: `${modalType === 'synch' ? '同步操作' : '忽略操作'}`,
    key: synchIgnoreModalKey,
    modalType,
    visible: SynchIgnoreVisible,
    dispatch,
    onOk: onSynchIgnoreOk,
    onCancel () {
      dispatch({
        type: 'activityManage/hideSynchIgnoreModal',
      })
    },
    loading,
  }

  const rowProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
  }

  return (
    <div className={styles.normalWrap} >
      <div className={styles.normalTitle} >
        <Row className={styles.banner} {...rowProps}>
          <h6 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 50, lineHeight: '3rem' }}>活动管理</h6>
          <h6 style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 50 }}>INTERNET  ECOLOGICAL SUMMIT</h6>
        </Row>
      </div>
      <MyBread />
      <Tabs className={styles.normal} onChange={handleTabsChange} >
        <TabPane tab="我参与的" key="1" >
          <Filter {...filterProps} key={Math.random()} />
          <List {...joinListProps} />
          <AddModal {...addModalProps} key={modalKey} />
          <SynchAndIgnoreModal {...synchIgnoreModalProps} key={synchIgnoreModalKey} />
        </TabPane>
        <TabPane tab="我创建的" key="2" >
          <Filter {...filterProps} key={Math.random()} />
          <List {...createListProps} />
          <AddModal {...addModalProps} key={modalKey} />
          <SynchAndIgnoreModal {...synchIgnoreModalProps} key={synchIgnoreModalKey} />
        </TabPane>
      </Tabs>

    </div>
  )
}

ActivityManage.propTypes = {
  activityManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ activityManage, loading }) => ({ activityManage, loading: loading.models.activityManage }))(ActivityManage)
