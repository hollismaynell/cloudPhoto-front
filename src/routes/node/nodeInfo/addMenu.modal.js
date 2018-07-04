import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select, InputNumber } from 'antd'
import './index.less'
import { menuActive } from '../../../utils/selectData'
import { FormattedMessage } from 'react-intl'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
}

function AddModal ({ dispatch, app, levs = [], parentLev = [], title, onOk, visible, onCancel, loading, form: {
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
        onOk(data)
      })
  }
  const modalOpts = {
    title,
    visible,
    onOk: handleOk,
    onCancel,
    loading,
  }
  const select = (e) => {
    dispatch({
      type: 'nodeInfos/queryParentLev',
      payload: {
        nodeLev: e - 1,
      },
    })
  }
  const siderFold = localStorage.getItem('AtlassiderFold')
  return (
    <Modal {...modalOpts} style={{ left: `${siderFold === 'true' ? 20 : 110}` }}>
      <Form layout="horizontal">
        <FormItem label={<FormattedMessage id={app.format.node.menuName} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('menuName', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入正确的菜单名称',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem label={<FormattedMessage id={app.format.node.menuEnName} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('nodeNameEn', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  pattern: /^[a-z\s]*$/i,
                  message: '请输入正确的菜单英文名称',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem label={<FormattedMessage id={app.format.node.menuLevel} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('nodeLev', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入正确的菜单等级',
                },
              ],
            })(<Select onChange={select}>
              {levs.map((index) => <Select.Option value={index.nodeLev} >{index.nodeLevDec || index.nodeLev}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        <FormItem label={<FormattedMessage id={app.format.node.subordinateMenu} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('nodeParentId', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入正确的所属菜单',
                },
              ],
            })(<Select>
              {parentLev.map((index) => <Select.Option value={index.nodeParentId} >{index.nodeParentDec || index.nodeParentId}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        <FormItem label={<FormattedMessage id={app.format.node.menuUrl} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('nodeUrl', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入正确的菜单路径',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem label={<FormattedMessage id={app.format.node.Enable} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('nodeActv', {
              rules: [
                {
                  required: true,
                  message: '请输入正确的是否启用',
                },
              ],
            })(<Select>
            {menuActive.map((index) => <Select.Option value={index.value} >{index.name || index.value}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        <FormItem label={<FormattedMessage id={app.format.node.sequenceNumber} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('nodeOrder', {
              initialValue: 1,
              rules: [
                {
                  required: true,
                  message: '请输入正确的顺序号',
                },
              ],
            })(<InputNumber min={1} />)
          }
        </FormItem>
      </Form>
    </Modal>
  )
}

AddModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  levs: PropTypes.array,
  parentLev: PropTypes.array,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
  loading: PropTypes.func,
  nodeList: PropTypes.obj,
  app: PropTypes.obj,
  form: PropTypes.obj,
}

export default Form.create()(AddModal)
