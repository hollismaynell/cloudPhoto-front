import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input } from 'antd'
import { FormattedMessage } from 'react-intl'
const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  app,
  onAdd,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const { usrName } = filter

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 5 }}>
        {getFieldDecorator('usrName', { initialValue: usrName })(<Search placeholder="用户名称" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 20 }} md={{ span: 19 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}><FormattedMessage id={app.format.search} /></Button>
            <Button size="large" onClick={handleReset}><FormattedMessage id={app.format.reset} /></Button>
          </div>
          <div>
            <Button size="large" type="ghost" onClick={onAdd}><FormattedMessage id={app.format.add} /></Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  app: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
