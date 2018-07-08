import React from 'react'
import PropTypes from 'prop-types'
import { Row, Icon, Avatar } from 'antd'
import styles from './BasicInfo.less'
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

const BasicInfo = () => {
  const handleDelClick = (item) => {
    item.name
  }
  const CameraList = [
    {
      name: '刘先生',
    },
    {
      name: '张小姐',
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
        <h6 className={styles.bannerTitle}>摄影师:<span className={styles.titleClick} ><Icon type="plus" />添加摄影师</span></h6>
      </Row>
      {
        CameraList ?
        CameraList.map(item =>
          <div style={{ width: '24vw', height: '10vh', border: '1px solid #eee', fontSize: '1.1rem', verticalAlign: 'middle', padding: '1vh 1vw', margin: '2vh 0', overflow: 'hiddden' }} >
            <span style={{ float: 'left' }} >
              <Avatar size="large" style={{ height: '8vh', width: '5vw' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <div style={{ lineHeight: '4.4rem', float: 'right', paddingLeft: '1vw', fontWeight: 50 }} >
                {item.name}
              </div>
            </span>
            <div style={{ lineHeight: '4.4rem', float: 'right' }}>
              <Icon type="close-circle-o" style={{ cursor: 'pointer' }} onClick={handleDelClick.bind(this, item)} />
            </div>
          </div>) : ''
      }
    </div>
  )
}

BasicInfo.propTypes = {
  basicProps: PropTypes.object,
}

export default BasicInfo
