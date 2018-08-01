import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row, Tabs } from 'antd'
import MyBread from '../../components/MyBread'
import { List } from './components'
// import { Bread } from '../../components/Layout'
// const menu = require('../../utils/menu.header')

const TabPane = Tabs.TabPane
const AlbumShow = ({ dispatch, loading, location, albumShow }) => {
  dispatch
  loading
  location
  const rowProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
  }

  const { list } = albumShow
  debugger
  const listProps = { list }
  return (
    <div className={styles.normalWrap} >
      <div className={styles.normalTitle} >
        <Row className={styles.banner} {...rowProps}>
          <h6 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 50, lineHeight: '3rem' }}>相册展示</h6>
          <h6 style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 50 }}>高效便捷云线上摄影相册，一键查看</h6>
        </Row>
      </div>
      <MyBread />
      <Tabs className={styles.normal} >
        <TabPane tab="全部" key="1" >
          <List {...listProps} />
        </TabPane>
        <TabPane tab="中式" key="2" >
          <List {...listProps} />
        </TabPane>
        <TabPane tab="西式" key="3" >
          <List {...listProps} />
        </TabPane>
      </Tabs>
    </div>
  )
}

AlbumShow.propTypes = {
  albumShow: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ albumShow, loading }) => ({ albumShow, loading: loading.models.albumShow }))(AlbumShow)
