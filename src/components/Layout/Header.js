import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
// import styles from './Header.less'

// import { FormattedMessage } from 'react-intl'

const SubMenu = Menu.SubMenu

const Header = ({ ...headerProps }) => {
  const {
    dispatch,
    logout,
    user } = headerProps


  let handleClickMenu = e => {
    switch (e.key) {
      case 'activityManage':
        dispatch({
          type: 'app/goToActivityManege',
        })
        break
      case 'logout':
        logout()
        break
      default:
    }
  }
  return (
    // <div className={styles.header}>
    //   <div className={styles.rightWarpper}>
    <Menu style={{ position: 'absolute', top: 0, right: '15vw', zIndex: 999, color: '#eee', background: '#4a4aff' }} mode="horizontal" onClick={handleClickMenu} >
      <SubMenu title={< span > <Icon type="user" /> {user.username ? user.username : 'Amanda'} </span>}>
        <Menu.Item key="login" style={{ background: '#4a4aff' }} >
          个人中心
        </Menu.Item>
        <Menu.Item key="activityManage" style={{ background: '#4a4aff' }}>
          活动管理
        </Menu.Item>
        <Menu.Item key="logout" style={{ background: '#4a4aff' }} >
          退出
        </Menu.Item>
      </SubMenu>
    </Menu>
    //   </div>
    // </div>
  )
}

Header.propTypes = {
  headerProps: PropTypes.object,
}

export default Header
