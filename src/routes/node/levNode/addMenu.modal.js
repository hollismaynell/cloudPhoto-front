import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { usrLevSel } from '../../../utils/selectData'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

function AddMenuModal ({ dispatch, title, visible, onCancel, loading, form: {
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
        dispatch({
          type: 'levNode/create',
          payload: data,
        })
        dispatch({
          type: 'levNode/hideAddMenuModal',
        })
      })
  }
  const modalOpts = {
    title,
    visible,
    onOk: handleOk,
    onCancel,
    loading,
  }
  const siderFold = localStorage.getItem('AtlassiderFold')
  return (
    <Modal {...modalOpts} style={{ left: `${siderFold === 'true' ? 20 : 110}` }}>
      <Form layout="horizontal">
        <FormItem label={<FormattedMessage id="levelNumber" />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrLev', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请选择权限等级',
              },
            ],
          })(<Select placeholder={<FormattedMessage id="levelNumber" />}>
            {
              usrLevSel.map((index) => <Select.Option value={index.value} >{index.name || index.value}</Select.Option>)
            }
          </Select>)}
        </FormItem>
        <FormItem label={<FormattedMessage id="levelName" />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('levName', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入正确的权限名称',
                },
              ],
            })(<Input />)
          }
        </FormItem>
      </Form>
    </Modal>
  )
}

AddMenuModal.propTypes = {
  title: PropTypes.string,
  maxLev: PropTypes.string,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
  loading: PropTypes.func,
  form: PropTypes.obj,
}

export default Form.create()(AddMenuModal)
