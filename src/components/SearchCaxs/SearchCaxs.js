import React, { PropTypes } from 'react'
import { Button, Col, Row, Form } from 'antd'
import formFocus from '../../utils/formFocus'


const FormItem = Form.Item

class SearchCaxs extends React.Component {
  onUpdate = () => {
    this.props.onUpdate()
  }

  onAdd = () => {
    this.props.onAdd()
  }
  // 重置表单
  handleReset = () => {
    this.props.form.resetFields()
  }
  /* 核算设置*/
  checkComputationSet = () => {
    this.props.checkComputationSet()
  }
  /* 促销设置*/
  salesPromotionSet = () => {
    this.props.salesPromotionSet()
  }
  // 表单搜索
  handleSearchText = (e) => {
    e.preventDefault()
    let query = {}
    this.props.form.validateFields((err, values) => {
      query = values
    })
    this.props.onSearch(query)
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const searchColums = this.props.searchColums
    const childInput = formFocus(searchColums, getFieldDecorator)

    return (
      <Form onSubmit={this.handleSearchText}>
        {
          childInput.length !== 0 ? <Row gutter={40}>
            {childInput.slice(0, childInput.length)}
          </Row> : ''
        }
        <Row>
          <Col span={40} style={{ textAlign: 'center' }}>
            <FormItem >
              <Button type="primary" htmlType="submit">查询</Button> &nbsp;&nbsp;&nbsp;
              <Button onClick={this.handleReset}>重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}


SearchCaxs.propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  selectProps: PropTypes.object,
  getFieldDecorator: PropTypes.object,
  searchColums: PropTypes.object,
  form: PropTypes.object,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
  checkComputationSet: PropTypes.func, /* 核算设置*/
  salesPromotionSet: PropTypes.func, /* 促销设置*/
  selectOptions: PropTypes.array,
  style: PropTypes.object,
  keyword: PropTypes.string,
  selectedRows: PropTypes.array,
}

export default Form.create()(SearchCaxs)
