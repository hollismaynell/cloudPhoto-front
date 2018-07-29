import React from 'react'
import { Bread } from '../Layout'
import { Col, Icon } from 'antd'
const menu = require('../../utils/menu.header')

const MyBread = () => {
  const colProps = {
    xs: 1,
    sm: 1,
    lg: 1,
    md: 1,
  }
  const colProps1 = {
    xs: 22,
    sm: 22,
    lg: 22,
    md: 22,
  }

  const breadProps = { menu }
  return (
    <div style={{ margin: '2vh 10vw 0', overflow: 'hidden', height: '40px', lineHeight: '40px', verticalAlign: 'middle' }} >
      <Col {...colProps} style={{ verticalAlign: 'middle', height: '2vh', fontSize: '2rem', color: '#ffaf60' }} ><Icon type="link" /></Col>
      <Col {...colProps1} style={{ marginLeft: '-2vw' }} ><Bread {...breadProps} /></Col>
    </div>
  )
}

export default MyBread
