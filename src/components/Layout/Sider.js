import React from 'react'
import PropTypes from 'prop-types'
import styles from './Sider.less'
// import { config } from '../../utils'
import Menus from './Menu'
// const SubMenu = Menus.SubMenu
// import { Icon } from 'antd'
// import { FormattedMessage } from 'react-intl'

const Sider = ({ ...siderProps }) => {
  const {
    menu,
    siderFold,
    darkTheme,
    navOpenKeys,
    // user,
    // logout,
    changeOpenKeys,
    location,
    // app,
  } = siderProps
  const menusProps = {
    styles,
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
    mode: 'horizontal',
  }
  // let handleClickMenu = e => e.key === 'logout' && logout()
  return (
    <Menus {...menusProps} style={{ color: '#ffffff' }} />
  )
}

Sider.propTypes = {
  siderProps: PropTypes.object,
}

export default Sider
