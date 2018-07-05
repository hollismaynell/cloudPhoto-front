import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Layout } from '../components'
import { classnames, config } from '../utils'
import { Helmet } from 'react-helmet'
import '../themes/index.less'
import './app.less'
import { LocaleProvider } from 'antd'
import NProgress from 'nprogress'
import { IntlProvider } from 'react-intl'
// import enUS from 'antd/lib/locale-provider/en_US'
const { prefix } = config


const { Header, Bread, Footer, Sider, styles } = Layout
let lastHref

const App = ({ children, dispatch, app, loading, location }) => {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, changeLanguage, keyy, formatAntdObj, navOpenKeys, menu, format } = app
  const href = window.location.href

  let formatAntd = ''

  const handleChange = (e) => {
    /*    if (e.target.value === 'zh_CN') {
          formatAntd = 'zhCN'
        } else if (e.target.value === 'en_US') {
          formatAntd = 'enUS'
        }*/
    dispatch({
      type: 'app/queryMenu',
      payload: {
        formatType: e.target.value,
        formatAntdType: formatAntd,
      },
    })
  }

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    app,
    changeLanguage,
    handleChange,
    user,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    menu,
    app,
    siderFold,
    darkTheme,
    navOpenKeys,
    user,
    logout () {
      dispatch({ type: 'app/logout' })
    },
    changeTheme () {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const breadProps = {
    menu,
  }

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }
  const { iconFontJS, iconFontCSS, logo1, iconMenuCSS, iconMenuJS } = config
  return (
    <IntlProvider
      locale={'en'}
      messages={format}
    >
      <LocaleProvider locale={formatAntdObj}>
        <div>
          <Helmet>
            <title>云摄影</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="shortcut icon" href={logo1} type="image/x-icon" />
            {iconFontJS && <script src={iconFontJS}></script>}
            {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
            {iconMenuJS && <script src={iconMenuJS}></script>}
            {iconMenuCSS && <link rel="stylesheet" href={iconMenuCSS} />}
          </Helmet>
          <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
            {/* {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
              <Sider {...siderProps} />
            </aside> : ''} */}
            {/* <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
              <Sider {...siderProps} />
            </aside> */}
            <Sider {...siderProps} />
            <div className={styles.main}>
              <Header {...headerProps} />
              <Bread {...breadProps} />
              <div className={styles.container}>
                <div key={keyy} className={styles.content}>
                  {children}
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </LocaleProvider>
    </IntlProvider>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  menu: PropTypes.array,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(App)
