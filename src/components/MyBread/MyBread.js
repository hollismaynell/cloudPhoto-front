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
    <div style={{ margin: '0 10vw', overflow: 'hidden' }} >
      <Col {...colProps} style={{ verticalAlign: 'middle', height: '2vh', fontSize: '2rem', color: '#ffaf60' }} ><Icon type="link" /></Col>
      <Col {...colProps1} style={{ marginLeft: '-2vw' }} ><Bread {...breadProps} /></Col>
    </div>
  )
}

export default MyBread
