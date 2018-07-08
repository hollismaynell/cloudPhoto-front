import React from 'react'
import { Tabs, Row, Col } from 'antd'
import styles from './Watermark.less'
import { config } from '../../../utils'

// import AnimTableBody from '../../../components/DataTable/AnimTableBody'
// import { DropOption } from '../../../components/index'
// import { JobGroupTypeSelect } from '../../../../utils/selectData'

const TabPane = Tabs.TabPane
// const rowProps = {
//   xs: 24,
//   sm: 24,
//   md: 24,
//   lg: 24,
// }

const Watermark = () => {
  // const handleShareClick = () => {
  //   confirm({
  //     content: '确认分享吗？',
  //     onOk () {},
  //     onCancel () {},
  //   })
  // }

  // const handleSetClick = () => {
  //   dispatch({
  //     type: 'acticityManage/changeData',
  //     payload: {
  //       visible: true,
  //     },
  //   })
  // }
  return (
    <div className={styles.banner} >
      <Tabs type="card" >
        <TabPane tab="普通水印" key="1" >
          <div style={{ fontSize: '0.9rem' }} >预览效果<span style={{ color: 'red', fontSize: '0.5rem', marginLeft: '2vw' }} >修改后的水印设置只针对之后上传的照片生效，修改之前上传的照片水印设置不会改变</span></div>
          <Row style={{ borderBottom: '1px solid #eee', marginTop: '5vh' }} >
            <Col span={9} >
              <img alt="图片" src={config.waterMark} style={{ height: '20vh' }} />
            </Col>
            <Col span={12} style={{ marginTop: '2vh' }} >
              <Row>
                <Col span={2} style={{ fontSize: '0.8rem', lineHeight: '2rem' }} >位置：</Col>
                <Col span={3} className={styles.circle} >1</Col>
                <Col span={3} className={styles.circle} >2</Col>
                <Col span={3} className={styles.circle} >3</Col>
                <Col span={3} className={styles.circle} >4</Col>
              </Row>
              <Row style={{ marginTop: '2vh' }} >
                <Col span={4} ><button className={styles.button} style={{ width: '60px', height: '60px' }} >+</button></Col>
                <Col span={4} ><img alt="图片" src={config.cat} style={{ width: '60px', height: '60px' }} /></Col>
                <Col span={4} ><img alt="图片" src={config.black} style={{ width: '60px', height: '60px' }} /></Col>
              </Row>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="边栏水印" key="2" >
          <div style={{ fontSize: '1rem' }} >预览效果<span style={{ color: 'red', fontSize: '0.6rem' }} >修改后的水印设置只针对之后上传的照片生效，修改之前上传的照片水印设置不会改变</span></div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Watermark
