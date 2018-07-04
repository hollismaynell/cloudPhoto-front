import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
const FormItem = Form.Item
const Option = Select.Option
import Cookies from 'js-cookie'
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
function handleChange (value) {
  console.log(`selected ${value}`)
}
const modal = ({
  app,
  item = {},
  colNum,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  modalType,
  instuNameSel,
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      if (colNum !== '1') {
        const newData = instuNameSel.find((index) => {
          return Number(index.instuCde) === Number(data.instuCde)
        })
        data.instuName = newData.instuName
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const instuCde = JSON.parse(Cookies.get('token')).instuCde
  return (
    <Modal {...modalOpts}>
      {colNum === '1' ?
        <Form layout="horizontal">
          {/* -----------------机构代码----------------- */}
          <FormItem label={<FormattedMessage id={app.format.organiz.organizationCode} />} hasFeedback {...formItemLayout}>
            {getFieldDecorator('instuCde', {
              initialValue: item.instuCde,
              rules: [
                {
                  required: true,
                  message: '请输入正确的机构编码',
                },
              ],
            })(<Input disabled={modalType === 'update'} />)}
          </FormItem>
          <FormItem label="deptNo" style={{ display: 'none' }} hasFeedback {...formItemLayout}>
            {getFieldDecorator('deptNo', {
              initialValue: item.deptNo,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          {/* 机构名称*/}
          <FormItem label={<FormattedMessage id={app.format.organiz.organizationName} />} hasFeedback {...formItemLayout}>
            {getFieldDecorator('instuName', {
              initialValue: item.instuName,
              rules: [
                {
                  required: true,
                  message: '请输入正确的机构名称',
                },
              ],
            })(<Input />)}
          </FormItem>
          {/* 机构等级*/}
          <FormItem style={{ display: 'none' }} label={<FormattedMessage id={app.format.organiz.departmentLevel} />} hasFeedback {...formItemLayout}>
            {getFieldDecorator('deptLev', {
              initialValue: item.deptLev || '1',
              rules: [
                {
                  required: false,
                },
              ],
            })(<Select defaultValue="1" onChange={handleChange}>
              <Option value="1">1</Option>
            </Select>)}
          </FormItem>
        </Form>
        :
        <Form layout="horizontal">
          {/* -----------------部门代码----------------- */}
          {/* 对应机构*/}
          <FormItem style={{ display: 'none' }} label={<FormattedMessage id={app.format.organiz.organizationtInfo} />} hasFeedback {...formItemLayout}>
            {getFieldDecorator('instuCde', {
              initialValue: item.instuCde || instuCde,
              rules: [
                {
                  required: true,
                  message: '请输入正确的机构编码',
                },
              ],
            })(<Input />)}
          </FormItem>
          {/* 部门主键 */}
          <FormItem label="deptNo" style={{ display: 'none' }} hasFeedback {...formItemLayout}>
            {getFieldDecorator('deptNo', {
              initialValue: item.deptNo || '',
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input />)}
          </FormItem>
          {/* 机构名称*/}
          <FormItem label={<FormattedMessage id={app.format.organiz.organizationCode} />} hasFeedback {...formItemLayout}>
            {getFieldDecorator('instuName', {
              initialValue: item.instuCde || instuCde,
              rules: [
                {
                  required: true,
                  message: '请输入正确的机构名称',
                },
              ],
            })(<Select placeholder={<FormattedMessage id={app.format.organiz.organizationCode} />} disabled>
              {instuNameSel.map((index) => <Select.Option value={index.instuCde} >{index.instuName}</Select.Option>)}
            </Select>)}
          </FormItem>
          {/* 部门名称*/}
          <FormItem label={<FormattedMessage id={app.format.organiz.departmentName} />} hasFeedback {...formItemLayout}>
            {getFieldDecorator('deptName', {
              initialValue: item.deptName,
              rules: [
                {
                  required: true,
                  message: '请输入正确的部门名称',
                },
              ],
            })(<Input />)}
          </FormItem>
          {/* 部门负责人*/}
          {/*   <FormItem label={<FormattedMessage id={app.format.organiz.headOfDepartment} />} hasFeedback {...formItemLayout}>
                {getFieldDecorator('deptManagerUsr', {
                  initialValue: item.deptManagerUsr,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>*/}
              {/* 部门人数*/}
          {/*   <FormItem label={<FormattedMessage id={app.format.organiz.sectorNumber} />} hasFeedback {...formItemLayout}>
                {getFieldDecorator('deptPerNum', {
                  initialValue: item.deptPerNum,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>*/}
              {/* 部门等级*/}
          <FormItem style={{ display: 'none' }} label={<FormattedMessage id={app.format.organiz.departmentLevel} />} hasFeedback {...formItemLayout}>
            {getFieldDecorator('deptLev', {
              initialValue: item.deptLev || '2',
              rules: [
                {
                  required: true,
                },
              ],
            })(<Select disabled defaultValue="2" onChange={handleChange}>
              <Option value="2">普通</Option>
            </Select>)}
          </FormItem>
        </Form>}
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  app: PropTypes.object,
  colNum: PropTypes.number,
  onOk: PropTypes.func,
  modalType: PropTypes.string,
  instuNameSel: PropTypes.string,
}

export default Form.create()(modal)
