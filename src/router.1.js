import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './routes/app-dev'
import { webUrl } from './utils/config'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: `${webUrl}/routes/dashboard`,
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    },
    { // 登陆
      path: `${webUrl}/login`,
      models: () => [import('./models/login')],
      component: () => import('./routes/home/'),
    },
    { // 相册展示
      path: `${webUrl}/routes/albumDisplay`,
      models: () => [import('./models/albumDisplay.model')],
      component: () => import('./routes/albumDisplay/'),
    },
    { // 活动管理
      path: `${webUrl}/routes/activityManage`,
      models: () => [import('./models/activityManage.model')],
      component: () => import('./routes/activityManage/'),
    },
    { // 新建活动
      path: `${webUrl}/routes/newActivity`,
      models: () => [import('./models/newActivity.model')],
      component: () => import('./routes/newActivity/'),
    },
    { // 新建活动
      path: `${webUrl}/routes/newActivity`,
      models: () => [import('./models/newActivity.model')],
      component: () => import('./routes/newActivity/'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to={`${webUrl}/dashboard`} />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
