import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Icon } from 'antd'
import styles from './List.less'

const Meta = Card.Meta
const List = ({ dispatch, ...tableProps }) => {
  const colProps = {
    xs: 8,
    sm: 8,
    md: 8,
    lg: 8,
  }
  const { list } = tableProps
  // const title = () => { return <h3>超时批量处理</h3> }
  return (
    <Row className={styles.normal} gutter={16} >
      {
        list.length ? list.map((item) => {
          const beginDate = item.beginDate
          debugger
          return (<Col {...colProps} className={styles.normal_col} >
            <Card
              location
              loading
              hoverable
              cover={<img alt="example" src={`http://115.28.191.87:10001/${item.cover}`} />}
            >
              <Meta
                title={item.title}
                description={<Icon type="clock-circle" >&nbsp;&nbsp;{beginDate.year}年{beginDate.month}月{beginDate.day}日 {beginDate.hours}:{beginDate.minutes}</Icon>}
                description={<Icon type="environment" >&nbsp;&nbsp;{item.location}</Icon>}
              />
            </Card>
          </Col>)
        }) : '查询数据为空'
      }
    </Row>
  )
}

List.propTypes = {
  dispatch: PropTypes.func,
}

export default List
