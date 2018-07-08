import React from 'react'
import { Row, Icon, Col } from 'antd'
import styles from './PhotoGroup.less'
// import AnimTableBody from '../../../components/DataTable/AnimTableBody'
// import { DropOption } from '../../../components/index'
// import { JobGroupTypeSelect } from '../../../../utils/selectData'

// const confirm = Modal.confirm
// const rowProps = {
//   xs: 24,
//   sm: 24,
//   md: 24,
//   lg: 24,
// }

const PhotoGroup = () => {
  const handleDelClick = (item) => {
    item.name
  }
  const photoGroupList = [
    {
      name: '照片直播',
    },
    {
      name: '爱吃肉肉',
    },
  ]
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

  // const title = () => { return <h3>超时批量处理</h3> }
  return (
    <div>
      <Row className={styles.banner} >
        <h6 className={styles.bannerTitle}>照片分组:<span className={styles.titleClick} ><Icon type="plus" />添加照片分组</span></h6>
      </Row>
      {
        photoGroupList ?
        photoGroupList.map(item => <div style={{ overflow: 'hidden', height: '3rem', margin: '2vh 0' }} >
          <Row>
            <Col span={12} style={{ lineHeight: '2rem', fontWeight: 50, display: 'inline-block', width: '16vw', border: '1px solid #eee', background: '#eee', fontSize: '1rem', textAlign: 'left', padding: '10px' }} >
              {item.name}
            </Col>
            <Col span={5} >
              <span className={styles.iconBorder} ><Icon type="edit" style={{ fontSize: '1.2rem' }} onClick={handleDelClick.bind(this, item)} /></span>
              <span className={styles.iconBorder} ><Icon type="close-circle-o" style={{ fontSize: '1.2rem' }} onClick={handleDelClick.bind(this, item)} /></span>
              <span className={styles.iconBorder} ><Icon type="arrow-up" style={{ fontSize: '1.2rem' }} onClick={handleDelClick.bind(this, item)} /></span>
              <span className={styles.iconBorder} ><Icon type="arrow-down" style={{ fontSize: '1.2rem' }} onClick={handleDelClick.bind(this, item)} /></span>
            </Col>
          </Row>
        </div>) : ''
      }
    </div>
  )
}

export default PhotoGroup
