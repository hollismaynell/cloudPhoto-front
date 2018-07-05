import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import styles from './Header.less'
import Menus from './Menu'
import { FormattedMessage } from 'react-intl'
const SubMenu = Menu.SubMenu

const Header = ({ user, logout, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu, app }) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div className={styles.header}>
      <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
        {/* <div className={styles.button}>
          <Icon type="bars" />
        </div> */}
      </Popover>
      {/* <div className={styles.button} onClick={switchSider}>
        <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
      </div> */}
      <div className={styles.rightWarpper}>
        {/* <div className={styles.button}>
          <Icon type="mail" />
        </div> */}
        <Menu style={{ background: 'none' }} mode="horizontal" onClick={handleClickMenu}>
          <SubMenu style={{
            float: 'right',
          }} title={< span > <Icon type="user" />
            {user.username} </span>}
          >
            <Menu.Item key="logout">
              <FormattedMessage id={app.format.signOut} />
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  app: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func,
  changeLanguage: PropTypes.string,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  handleChange: PropTypes.func,
}

export default Header
