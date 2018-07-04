import React from 'react'
import PropTypes from 'prop-types'
// import { FormattedMessage } from 'react-intl'
import { Form, Button, Row, Col, DatePicker, Radio, Input, message } from 'antd'
import moment from 'moment'
// import { moment } from 'moment'
const RangePicker = DatePicker.RangePicker
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item
const ColProps = {
  xs: 12,
  sm: 12,
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
function disabledDate (current) {
  // Can not select days before today and today
  return current && current.valueOf() > Date.now()
}
const Filter = ({
    handleSubmitExport,
    onFilterChange,
    dispatch,
    // disabledDate,
    initTime,
    txnStsD,
    pyAcctNameD,
    pyAcctCtfNoD,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
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
        type: 'queryListDetail/initTime',
        payload: {
          initTime: fields.pyAcctTime,
          pyAcctNameD: fields.pyAcctName,
          pyAcctCtfNoD: fields.pyAcctCtfNo,
          txnStsD: fields.txnSts,
        },
      })
      onFilterChange(data)
    })
  }
  const handleSubmitOne = () => {
    let fields = getFieldsValue()
    handleSubmitExport(fields)
  }
  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = fields[item]
        } else {
          fields[item] = undefined
          initTime = ''
          txnStsD = ''
          pyAcctNameD = ''
          pyAcctCtfNoD = ''
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }
  const onChange = (dates, dateStrings) => {
    let fields = getFieldsValue()
    if (dates.length === 0) {
      console.log('没选时间')
      dispatch({
        type: 'queryListDetail/disabledDate',
        payload: {
          disabledDate: () => {
            // Can not select days before today and today
            return false
          },
        },
      })
    } else {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
      let startY = dateStrings[0].substring(0, 4) /* 截取年*/
      let startM = dateStrings[0].substring(5, 7) /* 截取月*/
      let startD = dateStrings[0].substring(8, 10) /* 截取日*/
      // 当前日期加3个月之后的日期
      //     let mydate = new Date(startM + 3 > 12 ? startY + 1 : startY, startM + 3, startD)
      let endY = Number(startM) + 3 > 12 ? Number(startY) + 1 : startY /* 如果月份大于12，年份就加1*/
      let endM = (Number(startM) + 3) % 12 === 0 ? 12 : (Number(startM) + 3) % 12 /* 月份大于12的取余*/
      let endD = (Number(startD) + 1)
      let newEndM
      if (endM === 10 || endM === 11 || endM === 12) {
        newEndM = endM
      } else {
        newEndM = `0${endM}`
      }
      console.log(`后3个月是：${endY}-${newEndM}-${endD}`)
      let end = new Date(dateStrings[1]).getTime() /* 选择结束的日期 */
      let end_ = new Date(moment(`${endY}/${endM}/${endD}`)).getTime() /* 起始日期往后的三个月 */
      if (end > end_) {
        message.info('只能查三个月之间的时间哦')
        dispatch({
          type: 'queryListDetail/initTime',
          payload: {
            initTime: [moment(`${startY}/${startM}/${startD}`), moment(`${endY}/${newEndM}/${endD - 1}`)],
            pyAcctNameD: fields.pyAcctName,
            pyAcctCtfNoD: fields.pyAcctCtfNo,
            txnStsD: fields.txnSts,
          },
        })
    /*    let fields = getFieldsValue()
        fields.pyAcctTime = [moment('2017-01-01'), moment('2017-03-01')]
        fields.pyAcctName = 'aaaa'
        debugger
        setFieldsValue(fields)*/
      }
    }
  }
  return (
    <Form.Item>
      <Row gutter={24} style={{ overflow: 'hidden' }}>
        <Col xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem {...ColProps} label="时间范围：" {...formItemLayoutd} >
            {
              getFieldDecorator('pyAcctTime', {
                initialValue: initTime,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<RangePicker
                ranges={{ 今天: [moment('00:00:00', 'HH:mm:ss'), moment()], 一周内: [moment().subtract('days', 7), moment()], 一个月内: [moment().subtract('month', 1), moment()], 三个月内: [moment().subtract('month', 3), moment()] }}
                format="YYYY-MM-DD"
                allowClear={false}
                value={initTime}
                onChange={onChange}
                disabledDate={disabledDate}
              />)}
          </FormItem>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem {...ColProps} label="交易状态：" {...formItemLayoutd} >
            {
              getFieldDecorator('txnSts', {
                initialValue: txnStsD || '11',
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<RadioGroup >
                <RadioButton value="11">全部</RadioButton>
                <RadioButton value="31">交易成功</RadioButton>
                <RadioButton value="99">其他</RadioButton>
              </RadioGroup>)}
          </FormItem>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem {...ColProps} label="付款人名称：" {...formItemLayoutd} >
            {
              getFieldDecorator('pyAcctName', {
                initialValue: pyAcctNameD || '',
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input placeholder="请输入付款人名称" />)
            }
          </FormItem>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 12 }} {...BatchTitle}>
          <FormItem {...ColProps} label="付款人证件号：" {...formItemLayoutd} >
            {
              getFieldDecorator('pyAcctCtfNo', {
                initialValue: pyAcctCtfNoD || '',
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input placeholder="请输入付款人证件号" />)
            }
          </FormItem>
        </Col>
        <Col {...TwoColProps} xl={{ span: 22 }} md={{ span: 22 }} sm={{ span: 24 }}>
          <div style={{ marginTop: 20, float: 'right' }}>
            <Button size="large" type="primary" onClick={handleSubmit}>搜索</Button>&nbsp;&nbsp;&nbsp;<Button size="large" onClick={handleReset}>重置</Button>
            &nbsp;&nbsp;&nbsp;<Button size="large" type="primary" icon="download" onClick={handleSubmitOne}>导出</Button>
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
  handleSubmitExport: PropTypes.func,
  disabledDate: PropTypes.func,
  updateData: PropTypes.obj,
  initTime: PropTypes.array,
  pyAcctNameD: PropTypes.array,
  pyAcctCtfNoD: PropTypes.array,
  txnStsD: PropTypes.array,
}

export default Form.create()(Filter)
