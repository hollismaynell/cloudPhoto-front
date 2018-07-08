import React from 'react'
import styles from './index.less'
import { Row, Card, Icon, Col, Carousel, BackTop } from 'antd'
import { classnames, config } from '../../utils'


const pageHome = () => {
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

  const colPropsHalf = {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
  }

  return (<div className={styles.normal}>
    <Row className={styles.banner} {...rowProps}>
      <h6 style={{ fontSize: '2rem', color: '#fff', fontWeight: 50 }}>婚礼线上运营平台</h6>
      <h2 style={{ fontSize: '4rem', color: '#fff' }}>云摄影</h2>
      <h6 style={{ fontSize: '1.25rem', color: '#fff', letterSpacing: '0.6vw', fontWeight: 50 }}>INTERNET  ECOLOGICAL SUMMIT</h6>
    </Row>
    <Row {...rowProps} className={styles.cardBanner} >
      <h6 style={{ fontSize: '1.3rem', fontWeight: 400, textAlign: 'center', lineHeight: '2.5rem', marginTop: '4vh' }}>功能亮点</h6>
      <h6 style={{ fontSize: '0.8rem', fontWeight: 50, textAlign: 'center', marginBottom: '4vh' }}>带来前所未有的摄影体验</h6>
    </Row>
    <Row className={styles.cardBanner} gutter={4} >
      <Col {...colProps} >
        <Card
          bordered={false}
          hoverable
          style={{ width: 260, paddingLeft: 0, paddingRight: 0 }}
          cover={<Icon type="up-square" />}
        >
          <Icon type="api" style={{ color: '#FFC0CB', fontSize: '3.5rem' }} />
          <h6 style={{ fontSize: '1rem', fontWeight: 400, textAlign: 'center', lineHeight: '2.5rem', marginTop: '2vh' }}>扫描查看</h6>
          <h6 style={{ fontSize: '0.7rem', fontWeight: 50, textAlign: 'center' }}>扫描二维码，可以在移动端快速查看与分享</h6>
        </Card>
      </Col>
      <Col {...colProps} >
        <Card
          bordered={false}
          hoverable
          style={{ width: 260 }}
          cover={<Icon type="up-square" />}
        >
          <Icon type="trophy" style={{ color: '#FFC0CB', fontSize: '3.5rem' }} />
          <h6 style={{ fontSize: '1rem', fontWeight: 400, textAlign: 'center', lineHeight: '2.5rem', marginTop: '2vh' }}>在线编辑</h6>
          <h6 style={{ fontSize: '0.7rem', fontWeight: 50, textAlign: 'center' }}>扫描二维码，可以在移动端快速查看与分享</h6>
        </Card>
      </Col>
      <Col {...colProps} >
        <Card
          bordered={false}
          hoverable
          style={{ width: 260 }}
          cover={<Icon type="up-square" />}
        >
          <Icon type="gift" style={{ color: '#FFC0CB', fontSize: '3.5rem' }} />
          <h6 style={{ fontSize: '1rem', fontWeight: 400, textAlign: 'center', lineHeight: '2.5rem', marginTop: '2vh' }}>时间快速</h6>
          <h6 style={{ fontSize: '0.7rem', fontWeight: 50, textAlign: 'center' }}>扫描二维码，可以在移动端快速查看与分享</h6>
        </Card>
      </Col>
    </Row>
    <Row className={classnames(styles.cardBanner, styles.cardBannerBtm)} gutter={4} >
      <Col {...colProps} >
        <Card
          bordered={false}
          hoverable
          style={{ width: 260 }}
          cover={<Icon type="up-square" />}
        >
          <Icon type="api" style={{ color: '#FFC0CB', fontSize: '3.5rem' }} />
          <h6 style={{ fontSize: '1rem', fontWeight: 400, textAlign: 'center', lineHeight: '2.5rem', marginTop: '2vh' }}>方便快捷</h6>
          <h6 style={{ fontSize: '0.7rem', fontWeight: 50, textAlign: 'center' }}>扫描二维码，可以在移动端快速查看与分享</h6>
        </Card>
      </Col>
      <Col {...colProps} >
        <Card
          bordered={false}
          hoverable
          style={{ width: 260 }}
          cover={<Icon type="up-square" />}
        >
          <Icon type="trophy" style={{ color: '#FFC0CB', fontSize: '3.5rem' }} />
          <h6 style={{ fontSize: '1rem', fontWeight: 400, textAlign: 'center', lineHeight: '2.5rem', marginTop: '2vh' }}>快速浏览</h6>
          <h6 style={{ fontSize: '0.7rem', fontWeight: 50, textAlign: 'center' }}>扫描二维码，可以在移动端快速查看与分享</h6>
        </Card>
      </Col>
      <Col {...colProps} >
        <Card
          bordered={false}
          hoverable
          style={{ width: 260 }}
          cover={<Icon type="up-square" />}
        >
          <Icon type="gift" style={{ color: '#FFC0CB', fontSize: '3.5rem' }} />
          <h6 style={{ fontSize: '1rem', fontWeight: 400, textAlign: 'center', lineHeight: '2.5rem', marginTop: '2vh' }}>品质可靠</h6>
          <h6 style={{ fontSize: '0.7rem', fontWeight: 50, textAlign: 'center' }}>扫描二维码，可以在移动端快速查看与分享</h6>
        </Card>
      </Col>
    </Row>
    <Row {...rowProps} className={styles.cardBanner} style={{ background: '#fff', paddingBottom: '10vh' }} >
      <h6 style={{ fontSize: '1.3rem', fontWeight: 400, textAlign: 'center', lineHeight: '2.5rem', marginTop: '4vh' }}>优秀案例</h6>
      <h6 style={{ fontSize: '0.8rem', fontWeight: 50, textAlign: 'center', marginBottom: '4vh' }}>带来前所未有的摄影体验</h6>
      <Carousel className={styles.carouselImg} autoplay >
        <div><h3><img alt="轮播图片" src={config.carouselImg1} style={{ width: '40vw' }} /></h3></div>
        <div><h3><img alt="轮播图片" src={config.carouselImg2} style={{ width: '40vw' }} /></h3></div>
        <div><h3><img alt="轮播图片" src={config.carouselImg3} style={{ width: '40vw' }} /></h3></div>
        <div><h3><img alt="轮播图片" src={config.carouselImg4} style={{ width: '40vw' }} /></h3></div>
      </Carousel>
    </Row>
    <Row {...rowProps} className={styles.cardBanner} style={{ background: '#6a6aff', marginBottom: '18vh', color: '#fff', height: '30vh' }} >
      <Col {...colProps}>
        <h6 style={{ fontSize: '1.3rem', fontWeight: 400, textAlign: 'right', lineHeight: '2.5rem', color: '#fff', marginTop: '4vh' }}>关于我们</h6>
        <h6 style={{ fontSize: '0.8rem', fontWeight: 50, textAlign: 'right', color: '#fff', marginBottom: '4vh' }}>带来前所未有的摄影体验</h6>
      </Col>
      <Col {...colPropsHalf} className={styles.cardItem} >
        <img alt="platform" src={config.bannerplatform} style={{ width: '36vw' }} />
      </Col>
    </Row>
    <Row {...rowProps} className={styles.cardBanner} style={{ background: '#fff', marginBottom: '13vh' }} >
      <Row>
        <h6 style={{ fontSize: '1.3rem', fontWeight: 400, lineHeight: '5rem', color: '#000', marginTop: '4vh' }}>合作伙伴</h6>
      </Row>
      <Row>
        <Row>
          <img alt="platform" src={config.partner1} style={{ width: '9vw', border: '1px solid #eee' }} />
          <img alt="platform" src={config.partner2} style={{ width: '9vw', border: '1px solid #eee' }} />
          <img alt="platform" src={config.partner3} style={{ width: '9vw', border: '1px solid #eee' }} />
          <img alt="platform" src={config.partner4} style={{ width: '9vw', border: '1px solid #eee' }} />
          <img alt="platform" src={config.partner5} style={{ width: '9vw', border: '1px solid #eee' }} />
        </Row>
      </Row>
    </Row>
    <BackTop>
      <Icon type="up-circle" style={{ color: '#1890ff', fontSize: '2.5rem' }} />
    </BackTop>
    {/* <div className={styles.container}>
  <div key={keyy} className={styles.content}>
    {children}
  </div>
</div> */}
    {/* <Footer /> */}
  </div>)
}

export default pageHome
