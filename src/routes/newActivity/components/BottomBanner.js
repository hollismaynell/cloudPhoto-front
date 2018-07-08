import React from 'react'
import { Row, Col, Input } from 'antd'
import styles from './BottomBanner.less'
import { Button } from 'antd/lib/radio'

// import AnimTableBody from '../../../components/DataTable/AnimTableBody'
// import { DropOption } from '../../../components/index'
// import { JobGroupTypeSelect } from '../../../../utils/selectData'

// const rowProps = {
//   xs: 24,
//   sm: 24,
//   md: 24,
//   lg: 24,
// }

const BottomBanner = () => {
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
      <Row>
        <Col span={14} style={{ marginTop: '2vh' }} >
          <Row style={{ paddingBottom: '3vh', marginBottom: '3vh', borderBottom: '1px solid #eee' }} >
            <Col span={5} style={{ fontSize: '0.8rem', lineHeight: '4rem' }} >开启底部推广栏：</Col>
            <Col span={16} >
              <Row>
                <Button style={{ background: '#FFCC00' }} >ON</Button>
              </Row>
              <Row style={{ color: '#aaa', fontSize: '0.75rem', marginTop: '1vh' }} >
                1、开启后，用户可以自定义直播相册下方的推广栏
              </Row>
              <Row style={{ color: '#aaa', fontSize: '0.75rem' }} >2、自定义包括预约咨询、外链图片和自定义超链接</Row>
            </Col>
          </Row>
          <Row>
            <Col span={7} style={{ fontSize: '0.8rem', lineHeight: '4rem' }} >底部宣传语：</Col>
            <Col span={8} >
              <Input style={{ width: '10vw' }} defaultValue="照片传播：影力传播" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default BottomBanner
