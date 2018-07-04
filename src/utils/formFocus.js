import React from 'react'
import { Input, Select, Col, Checkbox, Radio, Form, Cascader, DatePicker } from 'antd'
import moment from 'moment'
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
}

/**
 * Created by wangrui on 2017/4/26.
 *
 * 处理表单搜索选项
 * @param type input select checkbox radio
 * @param getFieldDecorator antd获取表单值得工具函数
 * @returns {Array}
 */
function formFocus (type, getFieldDecorator) {
  const key = 0
  const childInput = []
  if (type.length !== 0) {
    type.forEach((item, i) => {
      if (item.searchType === 'input') {
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={`${item.title}`} style={{ width: 500 }}>
              {getFieldDecorator(item.dataIndex, {
                initialValue: item.value || '',
                rules: [
                  {
                    required: item.required || false,
                    message: item.title || '',
                  },
                ],
              })(
                <Input placeholder={item.title} style={{ width: 200 }} />
              )}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'select') {
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={`${item.title}`} style={{ width: 500 }}>
              {getFieldDecorator(item.dataIndex, {
                initialValue: item.value || '',
                rules: [
                  {
                    required: item.required || false,
                    message: item.title || '',
                  },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder={item.title}
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    item.selectOptions.map((index) => <Select.Option value={index.value} key={key}>{index.name || index.value}</Select.Option>)
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'checkbox') {
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={item.title} style={{ width: 500 }}>
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: item.value || '生效',
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(
                <CheckboxGroup options={item.plainOptions} />
              )}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'radio') {
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={item.title} style={{ width: 500 }}>
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: item.value || '',
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(
                <RadioGroup options={item.plainOptions} />
              )}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'cascader') {
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={item.title} style={{ width: 500 }}>
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: item.value,
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(
                <Cascader options={item.plainOptions} />
              )}
            </FormItem>
          </Col>
        )
      } else if (item.searchType === 'date-picker') {
        childInput.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={item.title} style={{ width: 500 }}>
              {getFieldDecorator(item.dataIndex,
                {
                  initialValue: moment(item.value),
                  rules: [
                    {
                      required: item.required || false,
                      message: item.title || '',
                    },
                  ],
                })(
                <DatePicker format="YYYY-MM-DD" />
              )}
            </FormItem>
          </Col>
        )
      }
    })
  }
  return childInput
}
export default formFocus
