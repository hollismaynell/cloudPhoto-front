import React from 'react'
import PropTypes from 'prop-types'
// import { browserHistory } from 'dva/router'
// import { FormattedMessage } from 'react-intl'
import { Form, Button, Row, Col, Select } from 'antd'
const SelectOption = Select.Option
const FormItem = Form.Item
const ColProps = {
  xs: 8,
  sm: 8,
  lg: 6,
  md: 6,
  style: {
    marginBottom: 16,
  },
}
const formItemLayoutd = {
  labelCol: {
    span: 4,
    style: {
      float: 'left',
    },
  },
  wrapperCol: {
    span: 16,
  },
}
const BatchTitle = {
  style: {
    marginTop: 4,
  },
}
const TwoColProps = {
  ...ColProps,
  xl: 96,
}
const Filter = ({
    // handleSubmitExport,
    onFilterChange,
    dispatch,
    // disabledDate,
    dealSts,
    form: {
      getFieldDecorator,
      getFieldsValue,
      validateFields,
    },
  }) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      dispatch({
        type: 'activityManage/initTime',
        payload: {
          initTime: fields.txnTime,
          dealSts: fields.dealSts,
        },
      })
      onFilterChange(data)
    })
  }
  // const handleSubmitOne = () => {
  //   let fields = getFieldsValue()
  //   handleSubmitExport(fields)
  // }
  const newActivity = () => {
    dispatch({
      type: 'activityManage/goToNewActivity',
    })
  }
  return (
    <Form.Item>
      <Row gutter={24} style={{ overflow: 'hidden', marginTop: '5vh' }}>
        <Col xl={{ span: 8 }} md={{ span: 8 }} {...BatchTitle}>
          <FormItem {...ColProps} {...formItemLayoutd} >
            {
              getFieldDecorator('dealSts', {
                initialValue: dealSts || '11',
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Select style={{ width: '20vw' }} placeholder="请选择" >
                <SelectOption value="11">全部</SelectOption>
                <SelectOption value="43">已同步</SelectOption>
                <SelectOption value="42">同步中</SelectOption>
                <SelectOption value="41">未处理</SelectOption>
                <SelectOption value="00">忽略</SelectOption>
              </Select>)}
          </FormItem>
        </Col>
        <Col {...TwoColProps} xl={{ span: 22 }} md={{ span: 22 }} sm={{ span: 24 }}>
          <div style={{ marginTop: '1vh', width: '50vw' }}>
            <Button size="large" type="primary" onClick={handleSubmit} style={{ float: 'left' }}>搜索</Button>&nbsp;&nbsp;&nbsp;<Button size="large" type="dashed" onClick={newActivity} style={{ float: 'right' }}>新建活动</Button>
            {/* &nbsp;&nbsp;&nbsp;<Button size="large" type="primary" icon="download" onClick={handleSubmitOne}>导出</Button> */}
          </div>
        </Col>
      </Row>
    </Form.Item>
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
  // handleSubmitExport: PropTypes.func,
  updateData: PropTypes.obj,
  initTime: PropTypes.array,
  dealSts: PropTypes.array,
}

export default Form.create()(Filter)
