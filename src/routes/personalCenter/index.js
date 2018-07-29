import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { List, AddModal, Filter, SynchAndIgnoreModal } from './components'
import styles from './index.less'
import { Row, Tabs } from 'antd'
import MyBread from '../../components/MyBread'
// import { Bread } from '../../components/Layout'
// const menu = require('../../utils/menu.header')

const TabPane = Tabs.TabPane

const PersonalCenter = ({ location, dispatch, personalCenter, loading }) => {
  const { list, pagination, effectFlag, invalidFlag, modalKey, synchIgnoreModalKey, modalType, Visible, SynchIgnoreVisible, updateData, paginationDetail, initTime, dealSts, currentRecordRowCode, currentRecordRowStatus } = personalCenter
  const { pageSize } = pagination
  const listProps = {
    dataSource: list,
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
        type: 'personalCenter/queryExport',
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
        type: 'personalCenter/synchOne',
        payload: {
          trcNo: currentRecordRowCode,
          dealSts: currentRecordRowStatus,
        },
      }) : dispatch({
        type: 'personalCenter/ignoreOne',
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
        type: 'personalCenter/hideAddModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'personalCenter/hideAddModal',
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
        type: 'personalCenter/hideSynchIgnoreModal',
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
      <Tabs className={styles.normal} >
        <TabPane tab="我创建的" key="1" >
          <Filter {...filterProps} key={Math.random()} />
          <List {...listProps} />
          <AddModal {...addModalProps} key={modalKey} />
          <SynchAndIgnoreModal {...synchIgnoreModalProps} key={synchIgnoreModalKey} />
        </TabPane>
        <TabPane tab="我参与的" key="2" >
          <Filter {...filterProps} key={Math.random()} />
          <List {...listProps} />
          <AddModal {...addModalProps} key={modalKey} />
          <SynchAndIgnoreModal {...synchIgnoreModalProps} key={synchIgnoreModalKey} />
        </TabPane>
      </Tabs>

    </div>
  )
}

PersonalCenter.propTypes = {
  personalCenter: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ personalCenter, loading }) => ({ personalCenter, loading: loading.models.personalCenter }))(PersonalCenter)
