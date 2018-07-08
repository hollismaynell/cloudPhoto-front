import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Tabs, Row } from 'antd'
import { BasicInfo, PhotoGroup, Watermark, StartPage, TopBanner, BottomBanner } from './components'
import MyBread from '../../components/MyBread'

const TabPane = Tabs.TabPane
const rowProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
}

const NewActivity = ({ ...newActivityPorp }) => {
  debugger
  const { location, dispatch, loading, tabPaneTitle } = newActivityPorp
  debugger
  const basicProps = { location, dispatch, loading }
  const handleKeyChange = (key) => {
    debugger
    let title
    switch (key) {
      case '1':
        title = '设置基本信息'
        break
      case '2':
        title = '添加照片分组'
        break
      case '3':
        title = '添加水印'
        break
      case '4':
        title = '设置启动页'
        break
      case '5':
        title = '设置顶部宣传栏'
        break
      case '6':
        title = '设置底部推广栏'
        break
      case '7':
        title = '添加修图师'
        break
      case '8':
        title = '添加摄影师'
        break
      case '9':
        title = '设置模板'
        break
      default:
    }
    dispatch({
      type: 'app/setTabPaneTitle',
      payload: {
        tabPaneTitle: title,
      },
    })
    tabPaneTitle
    debugger
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
      <Row className={styles.Tips} {...rowProps}>
        <h6 style={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '3rem' }}>设置基本信息</h6>
        <h6 style={{ fontSize: '0.9rem', color: '#777', lineHeight: '2.2rem', fontWeight: 50 }}>张文文小姐和李时时先生的婚礼</h6>
        <p style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: '2rem', fontWeight: 50 }}>2018-03-02 青岛市黄岛区希尔顿大酒店</p>
        <hr />
      </Row>
      <Tabs className={styles.normal} tabPosition="left" onChange={handleKeyChange} >
        <TabPane tab="设置基本信息" key="1" >
          <BasicInfo {...basicProps} />
        </TabPane>
        <TabPane tab="添加照片分组" key="2" >
          <PhotoGroup />
        </TabPane>
        <TabPane tab="添加水印" key="3" >
          <Watermark />
        </TabPane>
        <TabPane tab="设置启动页" key="4" >
          <StartPage />
        </TabPane>
        <TabPane tab="设置顶部宣传栏" key="5" >
          <TopBanner />
        </TabPane>
        <TabPane tab="设置底部推广栏" key="6" >
          <BottomBanner />
        </TabPane>
        <TabPane tab="添加修图师" key="7" />
        <TabPane tab="添加摄影师" key="8" />
        <TabPane tab="设置模板" key="9" />
      </Tabs>
    </div>
  )
}

NewActivity.propTypes = {
  newActivityPorp: PropTypes.object,
}

export default connect(({ newActivity, loading }) => ({ newActivity, loading: loading.models.newActivity }))(NewActivity)
