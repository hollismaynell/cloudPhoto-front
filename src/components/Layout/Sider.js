import React from 'react'
import PropTypes from 'prop-types'
import styles from './Layout.less'
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
    <div>
      <div className={styles.logo}>
        {/* <div className={styles.logoIN}>
          <img alt={'logo'} src={config.logo2} />
        </div> */}
        {/* {siderFold ? '' : <span>{config.name}</span>}*/}
      </div>
      <Menus {...menusProps} />
      {/* <Menus style={{ background: 'none' }} mode="horizontal" onClick={handleClickMenu}>
        <SubMenu style={{ float: 'right' }} title={< span > <Icon type="user" /> {user.username} </span>} >
          <Menus.Item key="logout">
            <FormattedMessage id={app.format.signOut} />
          </Menus.Item>
        </SubMenu>
      </Menus> */}
      {/* {!siderFold ? <div className={styles.switchtheme}>
      </div> : ''} */}
    </div>
  )
}

Sider.propTypes = {
  siderProps: PropTypes.object,
}

export default Sider
