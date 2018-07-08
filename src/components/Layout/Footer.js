import React from 'react'
import styles from './Footer.less'
import { config } from '../../utils'
import { Row, Col } from 'antd'

const colPropsSlice = {
  xs: {
    span: 2,
    offset: 1,
  },
  sm: {
    span: 2,
    offset: 1,
  },
  md: {
    span: 2,
    offset: 1,
  },
  lg: {
    span: 2,
    offset: 1,
  },
}

const rowProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
}

const Footer = () => <div className={styles.footer}>
  <Row {...rowProps} className={styles.cardBanner} style={{ background: '#000', padding: '15vh 20vh 20vh' }} gutter={4} >
    <Row>
      <Col {...colPropsSlice} >
        <h6 style={{ fontSize: '0.8rem', fontWeight: 400, lineHeight: '2rem', color: '#fff' }}>关于我们</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>功能亮点</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>优秀案例</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>关于我们</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>合作伙伴</h6>
      </Col>
      <Col {...colPropsSlice} >
        <h6 style={{ fontSize: '0.8rem', fontWeight: 400, lineHeight: '2rem', color: '#fff' }}>常见问题</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>登录注册</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>创建活动</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>推广活动</h6>
      </Col>
      <Col {...colPropsSlice} >
        <h6 style={{ fontSize: '0.8rem', fontWeight: 400, lineHeight: '2rem', color: '#fff' }}>问题中心</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>服务理念</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>服务支持</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>问题帮助</h6>
      </Col>
      <Col xs={6} sm={6} lg={6} md={6} >
        <h6 style={{ fontSize: '1.3rem', fontWeight: 400, lineHeight: '3rem', color: '#fff' }}>629-322-3239</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>周一至周五 8:00-18:00</h6>
        <h6 style={{ fontSize: '0.7rem', fontWeight: 50, lineHeight: '1.5rem', color: '#999' }}>周六至周日 8:00-18:00</h6>
      </Col>
      <Col xs={6} sm={6} lg={6} md={6} >
        <img alt="platform" src={config.erCode} style={{ width: '7vw' }} />
        <h6 style={{ fontSize: '1.3rem', fontWeight: 50, lineHeight: '3rem', color: '#999' }}>扫一扫立即下载app</h6>
      </Col>
    </Row>
  </Row>
</div>

export default Footer
