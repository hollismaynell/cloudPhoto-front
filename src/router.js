import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'
import { config } from './utils'
const { webUrl1 } = config

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}
const webUrl = webUrl1
const Routers = function ({ history, app }) {
  const routes = [
    {
      /* 项目入口 */
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          /* 首页 */
          path: `${webUrl}/dashboard`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          /* 登录 */
          path: `${webUrl}/login`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/home/'))
            }, 'login')
          },
        }, {
          /* 系统管理-菜单管理 */
          path: `${webUrl}/node/nodeInfo`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/node/nodeInfo.model'))
              registerModel(app, require('./models/app'))
              console.log(nextState)
              cb(null, require('./routes/node/nodeInfo'))
            }, 'nodeInfo')
          },
        }, {
          /* 系统管理-权限管理 */
          path: `${webUrl}/node/levNode`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/node/levNode.model'))
              registerModel(app, require('./models/app'))
              cb(null, require('./routes/node/levNode'))
            }, 'levNode')
          },
        }, {
          /* 系统管理-机构管理 */
          path: `${webUrl}/organizManage/organizManage`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'))
              registerModel(app, require('./models/organizManage/organizManage.model'))
              cb(null, require('./routes/organizManage/organizManage/'))
            }, 'organizManage')
          },
        }, {
          /* 系统管理-用户管理 */
          path: `${webUrl}/organizManage/usersManage`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'))
              registerModel(app, require('./models/organizManage/usersManage.model'))
              cb(null, require('./routes/organizManage/usersManage/'))
            }, 'usersManage')
          },
        }, {
          /* 系统管理-登陆管理 */
          path: `${webUrl}/organizManage/loginManage`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'))
              registerModel(app, require('./models/organizManage/usersManage.model'))
              cb(null, require('./routes/organizManage/usersManage/'))
            }, 'usersManage')
          },
        }, {
          /* 活动管理 */
          path: `${webUrl}/routes/activityManage`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'))
              registerModel(app, require('./models/activityManage.model'))
              cb(null, require('./routes/activityManage'))
            }, 'activityManage')
          },
        }, {
          /* 新建活动 */
          path: `${webUrl}/routes/newActivity`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'))
              registerModel(app, require('./models/newActivity.model'))
              cb(null, require('./routes/newActivity'))
            }, 'newActivity')
          },
        }, {
          /* 系统管理-批量系统管理*/
          path: `${webUrl}/node/systemManage`,
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'))
              registerModel(app, require('./models/systemManage/systemManage.model'))
              cb(null, require('./routes/sysytemManage/systemManageInfo/'))
            }, 'sysytemManage')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
