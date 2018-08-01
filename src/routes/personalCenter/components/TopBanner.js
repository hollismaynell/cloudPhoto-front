import React from 'react'
import { Row, Col, Upload, Input } from 'antd'
import styles from './TopBanner.less'
import { config } from '../../../utils'

// import AnimTableBody from '../../../components/DataTable/AnimTableBody'
// import { DropOption } from '../../../components/index'
// import { JobGroupTypeSelect } from '../../../../utils/selectData'

// const rowProps = {
//   xs: 24,
//   sm: 24,
//   md: 24,
//   lg: 24,
// }

const TopBanner = () => {
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
      <Row style={{ borderBottom: '1px solid #eee' }} >
        <Col span={14} style={{ marginTop: '2vh' }} >
          <Row>
            <Col span={4} style={{ fontSize: '0.8rem', lineHeight: '4rem' }} >启动页图片：</Col>
            <Col span={16} >
              <Row>
                <Col span={4} ><Upload style={{ cursor: 'pointer', color: '#108ee9', height: '5vh' }} >上传图片</Upload></Col>
                <Col span={16} style={{ color: 'red', fontSize: '0.6rem', lineHeight: '6.5em' }} >(尺寸1125px*1815px，大小1MB以内)</Col>
              </Row>
              <Row>
                <img alt="图片" src={config.TopBanner} style={{ height: '10vh' }} />
              </Row>
              <Row style={{ cursor: 'pointer', color: '#108ee9', height: '5vh', fontSize: '0.75rem' }} >恢复成默认图片</Row>
            </Col>
          </Row>
          <Row>
            <Col span={7} style={{ fontSize: '0.8rem', lineHeight: '4rem' }} >进入云相册按钮距离底部：</Col>
            <Col span={8} >
              <Input style={{ width: '10vw' }} defaultValue="38" /><span style={{ fontSize: '0.8rem' }} >px</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default TopBanner
