import React from 'react'
import { Row, Col, Upload, Select, Input } from 'antd'
import styles from './StartPage.less'
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

const StartPage = () => {
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
      <div style={{ fontSize: '0.9rem' }} >预览效果</div>
      <Row style={{ borderBottom: '1px solid #eee', marginTop: '3vh' }} >
        <Col span={10} >
          <img alt="图片" src={config.waterMark} style={{ height: '24vh' }} />
        </Col>
        <Col span={14} style={{ marginTop: '2vh' }} >
          <Row>
            <Col span={4} style={{ fontSize: '0.8rem', lineHeight: '4rem' }} >启动页图片：</Col>
            <Col span={16} >
              <Col span={4} ><Upload style={{ cursor: 'pointer', color: '#108ee9', height: '5vh' }} >上传图片</Upload></Col>
              <Col span={16} style={{ color: 'red', fontSize: '0.6rem', lineHeight: '6.5em' }} >(尺寸1125px*1815px，大小2MB以内)</Col>
            </Col>
          </Row>
          <Row>
            <Col span={6} style={{ fontSize: '0.8rem', lineHeight: '4rem' }} >进入云相册按钮样式：</Col>
            <Col span={8} >
              <Select style={{ width: '10vw' }} defaultValue="default" >
                <Select.Option value="default" >默认</Select.Option>
              </Select>
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

export default StartPage
