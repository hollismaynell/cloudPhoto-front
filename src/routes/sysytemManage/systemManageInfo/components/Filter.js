import React from 'react'
import PropTypes from 'prop-types'
// import { Search } from '../../../../components'
import { FormattedMessage } from 'react-intl'
import { Form, Button, Row, Col } from 'antd'

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
  onAdd,
  // onFilterChange,
  addFlag,
}) => {
  // 高级搜索
  // const searchGroupProps = {
  //   size: 'large',
  //   width: 130,
  //   select: true,
  //   selectOptions: [
  //     { value: 'all', name: '搜索全部' },
  //     { value: 'fndId', name: '出资编号' },
  //     { value: 'cptlSideName', name: '资金方名称' },
  //   ],
  //   selectProps: {
  //     defaultValue: 'all',
  //   },
  //   onSearch (fieldsValue) {
  //     onFilterChange(fieldsValue)
  //   },
  // }
  return (
    <Row gutter={24}>
      <Col {...TwoColProps} xl={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
        {addFlag ? '' : <div style={{ float: 'right' }}>
          <Button size="large" type="ghost" onClick={onAdd}><FormattedMessage id="add" /></Button>
        </div>}
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  dispatch: PropTypes.func,
  addFlag: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
