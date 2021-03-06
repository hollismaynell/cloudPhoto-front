import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row } from 'antd'
import { BasicInfo } from './components'
import MyBread from '../../components/MyBread'

// const TabPane = Tabs.TabPane
const rowProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
}

const NewActivity = ({ location, dispatch, loading }) => {
  const basicProps = { location, dispatch, loading }
  // const handleKeyChange = (key) => {
  //   let title
  //   switch (key) {
  //     case '1':
  //       title = '设置基本信息'
  //       break
  //     case '2':
  //       title = '添加照片分组'
  //       break
  //     case '3':
  //       title = '添加水印'
  //       break
  //     case '4':
  //       title = '设置启动页'
  //       break
  //     case '5':
  //       title = '设置顶部宣传栏'
  //       break
  //     case '6':
  //       title = '设置底部推广栏'
  //       break
  //     case '7':
  //       title = '添加修图师'
  //       break
  //     case '8':
  //       title = '添加摄影师'
  //       break
  //     case '9':
  //       title = '设置模板'
  //       break
  //     default:
  //   }
  //   debugger
  //   dispatch({
  //     type: 'newActivity/setTabPaneTitle',
  //     payload: {
  //       tabPaneTitle: title,
  //     },
  //   })
  // }
  return (
    <div className={styles.normalWrap} >
      <div className={styles.normalTitle} >
        <Row className={styles.banner} {...rowProps}>
          <h6 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 50, lineHeight: '3rem' }}>活动管理</h6>
          <h6 style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 50 }}>INTERNET  ECOLOGICAL SUMMIT</h6>
        </Row>
      </div>
      <MyBread />
      <BasicInfo {...basicProps} />
      {/* <Tabs className={styles.normal} tabPosition="left" onTabClick={handleKeyChange} >
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
        <TabPane tab="添加修图师" key="7" >
          <Retoucher />
        </TabPane>
        <TabPane tab="添加摄影师" key="8" >
          <CameraMan />
        </TabPane>
        <TabPane tab="设置模板" key="9" />
      </Tabs> */}
    </div>
  )
}

NewActivity.propTypes = {
  newActivity: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ loading, newActivity }) => ({ loading, newActivity }))(NewActivity)
