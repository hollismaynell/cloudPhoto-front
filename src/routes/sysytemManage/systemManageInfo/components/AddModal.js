import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Row, Col } from 'antd'
import '../index.less'
// import moment from 'moment'
import { handleFields } from '../../../../utils'
const FormItem = Form.Item
// const dateFormat = 'YYYY/MM/DD'
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const ColProps = {
  xs: 24,
  md: 12,
}

function AddModal ({ dispatch, modalKey, updateData, modalType, title, updateFlag, visible, onCancel, loading, form: {
  getFieldDecorator,
  validateFields,
  getFieldsValue,
} }) {
  const handleOk = () => {
    validateFields(
      (errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
        }
        if (updateFlag) {
          dispatch({
            type: 'systemManage/update',
            payload: handleFields(data),
          })
        } else {
          dispatch({
            type: 'systemManage/create',
            payload: handleFields(data),
          })
        }
      })
  }
  const modalOpts = {
    title,
    visible,
    width: 1000,
    wrapClassName: 'vertical-center-modal',
    onOk: handleOk,
    onCancel,
    loading,
    key: modalKey,
  }
  // 限制输入的精确度位数
  // const inputNumProps = {
  //   style: { width: '100%' },
  //   precision: 2,
  // }
  const siderFold = localStorage.getItem('AtlassiderFold')
  return (
    <Modal {...modalOpts} style={{ left: `${siderFold === 'true' ? 20 : 110}` }}>
      <Form layout="horizontal">
        <Row>
          <Col {...ColProps}>
            {modalType === 'create' ? <FormItem label="所属系统ID：" hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('sysId', {
                  initialValue: updateData.sysId || '',
                  rules: [
                    {
                      required: true,
                      pattern: /^[\s\S]{1,8}$/,
                      message: '请填写长度不超过8位的字符',
                    },
                  ],
                })(<Input placeholder="所属系统ID" />)
              }
            </FormItem> : <FormItem label="所属系统ID：" hasFeedback {...formItemLayout}>
              {getFieldDecorator('sysId', {
                initialValue: updateData.sysId,
                rules: [
                  {
                    required: true,
                    pattern: /^[\s\S]{1,8}$/,
                    message: '请填写长度不超过8位的字符',
                  },
                ],
              })(<Input disabled />)}
            </FormItem>}
          </Col>
          <Col {...ColProps}>
            <FormItem label="批量系统名称：" hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('sysName', {
                  initialValue: updateData.sysName || '',
                  rules: [
                    {
                      required: true,
                      message: ' ',
                    },
                  ],
                })(<Input placeholder="所属系统" />)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="批量系统简称：" hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('sysShortname', {
                  initialValue: updateData.sysShortname || '',
                  rules: [
                    {
                      required: true,
                      message: ' ',
                    },
                  ],
                })(<Input placeholder="批量系统简称" />)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem label="批量系统地址：" hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('sysUrl', {
                  initialValue: updateData.sysUrl || '',
                  rules: [
                    {
                      required: true,
                      message: ' ',
                    },
                  ],
                })(<Input placeholder="批量系统地址" />)
              }
            </FormItem>
          </Col>
          <Col {...ColProps} style={{ display: 'none' }} >
            <FormItem label="定义状态：" hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('sysStatus', {
                  initialValue: updateData.sysStatus || '1',
                  rules: [
                    {
                      required: true,
                      message: ' ',
                    },
                  ],
                })(<Input placeholder="定义状态" />)
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

AddModal.propTypes = {
  title: PropTypes.string,
  maxLev: PropTypes.string,
  visible: PropTypes.bool,
  updateFlag: PropTypes.bool,
  onOk: PropTypes.func,
  updateData: PropTypes.obj,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
  loading: PropTypes.func,
  form: PropTypes.obj,
  modalKey: PropTypes.number,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  systemSel: PropTypes.array,
  modalType: PropTypes.string,
}

export default Form.create()(AddModal)
