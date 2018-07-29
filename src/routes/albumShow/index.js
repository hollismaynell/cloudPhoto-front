import React from 'react'
import PropTypes from 'prop-types'
// import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { List, AddModal, Filter, SynchAndIgnoreModal } from './components'
import styles from './index.less'
import { Row, Col, Card } from 'antd'
import MyBread from '../../components/MyBread'
// import { Bread } from '../../components/Layout'
// const menu = require('../../utils/menu.header')

// const TabPane = Tabs.TabPane
const Meta = Card.Meta

const AlbumShow = ({ location, dispatch, albumShow, loading }) => {
  location
  dispatch
  albumShow
  loading
  const rowProps = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
  }

  const colProps = {
    xs: 8,
    sm: 8,
    md: 8,
    lg: 8,
  }

  return (
    <div className={styles.normalWrap} >
      <div className={styles.normalTitle} >
        <Row className={styles.banner} {...rowProps}>
          <h6 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 50, lineHeight: '3rem' }}>活动管理</h6>
          <h6 style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 50 }}>INTERNET  ECOLOGICAL SUMMIT</h6>
        </Row>
      </div>
      <MyBread />
      <Row className={styles.normal} gutter={16} >
        <Col {...colProps} className={styles.normal_col} >
          <Card
            location
            loading
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </Col>
      </Row>

    </div>
  )
}

AlbumShow.propTypes = {
  albumShow: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ albumShow, loading }) => ({ albumShow, loading: loading.models.albumShow }))(AlbumShow)
