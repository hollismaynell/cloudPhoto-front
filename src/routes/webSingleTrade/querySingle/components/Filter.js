import React from 'react'
import PropTypes from 'prop-types'
import './List.less'
// import { FormattedMessage } from 'react-intl'
import { Form, Button, Row, Col, Input, Select, Card, InputNumber } from 'antd'
// import { moment } from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const ColProps = {
  xs: 11,
  sm: 11,
  style: {
    marginBottom: 14,
  },
}
const ColPropss = {
  xs: 11,
  sm: 11,
  style: {
    height: 50,
    marginBottom: 4,
  },
}
const hint = {
  xs: 24,
  sm: 24,
  style: {
    height: 250,
    marginTop: 50,
    fontSize: 50,
    textAlign: 'center',
    paddingTop: 70,
    lineHeight: 'initial',
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
    span: 17,
  },
}
const BatchTitle = {
  xs: 24,
  sm: 24,
  style: {
    height: 50,
    float: 'left',
    marginTop: 0,
  },
}
const TwoColProps = {
  ...ColProps,
  xl: 96,
}
const Filter = ({
                  onFilterChange,
                  form: {
                    getFieldDecorator,
                    getFieldsValue,
                    setFieldsValue,
                    validateFields,
                  },
                }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onFilterChange(data)
    })
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
  }
  // const onChange = (e) => {
  //   debugger
  //   const { value } = e.target
  //   const reg = /\\d{4}(?!$)", "$0 "/
  //   if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
  //     this.props.onChange(value)
  //   }
  // }
  return (
    <Form.Item>
      <Row gutter={24} style={{ overflow: 'hidden' }}>
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem label="还款人名称：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('pyAcctName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入有效内容',
                  },
                ],
              })(<Input placeholder="还款人名称" />)
            }
          </FormItem>
        </Col>
        <Col style={{ marginBottom: 0 }} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem {...ColPropss} label="还款人账户：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('pyAcctNo', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    pattern: /^(\d{16}|\d{19}|\d{17}|\d{18})$/,
                    message: '请输入有效内容',
                  },
                ],
              })(<Input placeholder="还款人账户" precision={2} />)
            }
          </FormItem>
        </Col>
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem label="还款金额：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('pyAmt', {
                initialValue: '',
                rules: [
                  {
                    max: 6,
                    required: true,
                    pattern: /^\d+(\.\d+)?$/,
                    message: '请输入有效内容',
                  },
                ],
              })(<InputNumber style={{ width: '100%', lineHeight: 0 }} precision={2} step={0.01} placeholder="还款金额" />)
            }
          </FormItem>
        </Col>
        <Col style={{ marginBottom: 0 }} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem {...ColPropss} label="还款币种：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('cryTyp', {
                initialValue: 'CNY',
                rules: [
                  {
                    required: true,
                    message: '请输入有效内容',
                  },
                ],
              })(<Select style={{ width: '100%' }} >
                <Option value="CNY">人民币</Option>
                <Option value="EUR">欧元</Option>
                <Option value="GBP">英镑</Option>
                <Option value="FRF">法郎</Option>
                <Option value="USD">美元</Option>
                <Option value="AUD">澳大利亚元</Option>
                <Option value="NZD">新西兰元</Option>
                <Option value="CAD">加拿大元</Option>
                <Option value="CHF">瑞士法郎</Option>
                <Option value="SEK">瑞典克朗</Option>
                <Option value="NOK">挪威克朗</Option>
                <Option value="DKK">丹麦克朗</Option>
                <Option value="THB">泰国铢</Option>
                <Option value="SGD">新加坡元</Option>
                <Option value="PHP">菲律宾</Option>
                <Option value="HKD">港币</Option>
                <Option value="JPY">日元</Option>
                <Option value="MOP">澳门元</Option>
              </Select>)
            }
          </FormItem>
        </Col>
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem label="订单号：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('bizPk', {
                initialValue: '',
                rules: [{ required: true,
                  pattern: /^[0-9a-zA-Z]*$/g,
                  message: '请输入有效内容' }],
              })(<Input placeholder="订单号" />)
            }
          </FormItem>
        </Col>
        <Col style={{ marginBottom: 0 }} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem {...ColPropss} label="开户行：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('depBnk', {
                initialValue: '102100099996',
                rules: [
                  {
                    required: true,
                    message: '请输入有效内容',
                  },
                ],
              })(<Select style={{ width: '100%' }} >
                <Option value="102100099996">中国工商银行</Option>
                <Option value="103100000026">中国农业银行</Option>
                <Option value="104100000004">中国银行</Option>
                <Option value="105100000017">中国建设银行</Option>
                <Option value="301290000007">交通银行</Option>
                <Option value="302100011000">中信银行</Option>
                <Option value="303100000006">中国光大银行</Option>
                <Option value="304100040000">华夏银行</Option>
                <Option value="305100000013">中国民生银行</Option>
                <Option value="306581000003">广东发展银行</Option>
                <Option value="308584000013">招商银行</Option>
                <Option value="309391000011">兴业银行</Option>
                <Option value="310290000013">上海浦东发展银行</Option>
                <Option value="403100000004">中国邮政储蓄银行</Option>
                <Option value="307584007998">深圳平安银行</Option>
              </Select>)
            }
          </FormItem>
        </Col>
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem label="证件号码：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('pyAcctCtfNo', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: '请输入正确证件号',
                  },
                ],
              })(<Input placeholder="证件号码" />)
            }
          </FormItem>
        </Col>
        <Col style={{ marginBottom: 0 }} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem {...ColPropss} label="证件类型：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('pyAcctCtfTyp', {
                initialValue: '20',
                rules: [
                  {
                    required: true,
                    message: '请输入有效内容',
                  },
                ],
              })(<Select style={{ width: '100%' }} >
                <Option value="20">身份证</Option>
                <Option value="22">护照</Option>
                <Option value="25">港澳居民来往内地通行证</Option>
                <Option value="26">台湾居民来往大陆通行证</Option>
                <Option value="X">其他证件</Option>
                <Option value="0">员工代码</Option>
              </Select>)
            }
          </FormItem>
        </Col>
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem label="预留手机号：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('mblNo', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    pattern: /^1[34578]\d{9}$/,
                    message: '请输入正确手机号',
                  },
                ],
              })(<Input placeholder="信托计划编码" />)
            }
          </FormItem>
        </Col>
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem label="信托名称：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('trstplnName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入有效内容',
                  },
                ],
              })(<Input placeholder="信托名称" />)
            }
          </FormItem>
        </Col>
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem label="信托计划编码：" hasFeedback{...formItemLayoutd} >
            {
              getFieldDecorator('trstplnNo', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入有效内容',
                  },
                ],
              })(<Input placeholder="信托计划编码" />)
            }
          </FormItem>
        </Col>

        <Col {...TwoColProps} style={{ marginBottom: 0, marginTop: 20 }} xl={{ span: 22 }} md={{ span: 22 }} sm={{ span: 24 }}>
          <div style={{ marginTop: 20, float: 'right' }}>
            <Button size="large" onClick={handleOk}>提交</Button>&nbsp;&nbsp;&nbsp;<Button size="large" onClick={handleReset}>重置</Button>
          </div>
        </Col>
      </Row>
      <Card {...hint}>
        注意：提交后会执行真实还款操作，切勿随意操作！
      </Card>
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
  handleSubmitExport: PropTypes.func,
  updateData: PropTypes.obj,
}

export default Form.create()(Filter)
