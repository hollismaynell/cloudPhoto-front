import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import styles from './Layout.less'
import { config } from '../../utils'
import Menus from './Menu'
import { FormattedMessage } from 'react-intl'

const Sider = ({ siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys, menu, app }) => {
  const menusProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div>
      <div className={styles.logo}>
        <div className={styles.logoIN}>
          <img alt={'logo'} src={config.logo2} />
        </div>
        {/* {siderFold ? '' : <span>{config.name}</span>}*/}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb" /><FormattedMessage id={app.format.switchTheme} /></span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="Dark" unCheckedChildren="Light" />
      </div> : ''}
    </div>
  )
}

Sider.propTypes = {
  menu: PropTypes.array,
  app: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
