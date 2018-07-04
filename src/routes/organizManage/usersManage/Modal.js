import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import Cookies from 'js-cookie'
import { idCard } from '../../../utils/checkout'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const modal = ({
  usrLev,
  app,
  dataItem,
  dataDept,
  dataRole,
  departmentSel,
  usrIdTypSel,
  usrStsSel,
  userFlag,
  displayFlag,
  requiredFlag,
  sysSel,
  modalType,
  dispatch,
  patternReg,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  console.log(departmentSel)
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: dataItem.key,
      }
      if (userFlag === 'none') {
        // delete data.sysId
        data.sysId = ''
      }
      onOk(data)
    })
  }
  const handleChange = (value) => {
    const newData = dataRole.find((index) => {
      return Number(index.levId) === Number(value)
    })
    let levName = newData.levName
    if (levName === '系统管理员') {
      userFlag = 'none'
      requiredFlag = false
    } else {
      userFlag = 'block'
      requiredFlag = true
    }
    dispatch({
      type: 'usersManage/setUserFlag',
      payload: {
        setUserFlag: userFlag,
        setRequiredFlag: requiredFlag,
      },
    })
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  /* 选择证件类型*/
  function handleChange2 (value) {
    const fields = getFieldsValue()
    fields.usrIdNo = ''
    setFieldsValue(fields)
    console.log(`selected ${value}`)
    if (value === '20') {
      dispatch({
        type: 'usersManage/patternRegFunc',
        payload: {
          patternReg: idCard, /* 身份证*/
        },
      })
    } else {
      dispatch({
        type: 'usersManage/patternRegFunc',
        payload: {
        },
      })
    }
  }
  /* 从cookie获取所属机构*/
  const instuCde = JSON.parse(Cookies.get('token')).instuCde
  const usrLevParam = JSON.parse(Cookies.get('token')).usrLev
  const siderFold = localStorage.getItem('AtlassiderFold')
  return (
    <Modal {...modalOpts} style={{ left: `${siderFold === 'true' ? 20 : 110}` }}>
      {usrLevParam === '1' ? <Form layout="horizontal">
        {/* 所属机构*/}
        {modalType === 'create' ? <FormItem disabled label={<FormattedMessage id={app.format.organiz.affiliatedInstitution} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('instuCde', {
              initialValue: dataItem.instuCde || instuCde,
              rules: [
                {
                  required: true,
                  message: '请输入正确的机构名称',
                },
              ],
            })(<Select placeholder={<FormattedMessage id={app.format.organiz.affiliatedInstitution} />}>
              {dataDept.map((index) => <Select.Option value={index.instuCde} >{index.instuName}</Select.Option>)}
            </Select>)
          }
        </FormItem> : <FormItem label={<FormattedMessage id={app.format.organiz.affiliatedInstitution} allowClear disabled />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('instuCde', {
              initialValue: dataItem.instuCde || instuCde,
              rules: [
                {
                  required: true,
                  message: '请输入正确的机构名称',
                },
              ],
            })(<Select placeholder={<FormattedMessage id={app.format.organiz.affiliatedInstitution} />}>
              {dataDept.map((index) => <Select.Option value={index.instuCde} >{index.instuName}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        }
        {/* 用户名称*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.userName} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrName', {
            initialValue: dataItem.usrName,
            rules: [
              {
                required: true,
                message: '请输入正确的用户名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 证件类型*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.idType} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('usrIdTyp', {
              initialValue: dataItem.usrIdTyp,
              rules: [
                {
                  required: true,
                  message: '请输入正确的证件类型',
                },
              ],
            })(<Select placeholder={<FormattedMessage id={app.format.organiz.idType} />} onChange={handleChange2}>
              {usrIdTypSel.map((index) => <Select.Option value={index.usrIdTyp} >{index.name}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        {/* 证件号码*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.idNumber} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrIdNo', {
            initialValue: dataItem.usrIdNo,
            rules: [
              {
                required: true,
                pattern: patternReg,
                message: '请输入正确的证件号码',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 密码*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.password} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrPassword', {
            initialValue: dataItem.usrPassword,
            rules: [
              {
                required: true,
                message: '请输入正确的密码',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 手机*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.phoneNumber} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrTel', {
            initialValue: dataItem.usrTel,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '请输入正确的手机',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 邮箱*/}
        {modalType === 'create' ? <FormItem label={<FormattedMessage id={app.format.organiz.email} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrCde', {
            initialValue: dataItem.usrCde,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: '请输入正确的邮箱',
              },
            ],
          })(<Input />)}
        </FormItem> : <FormItem label={<FormattedMessage id={app.format.organiz.email} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrCde', {
            initialValue: dataItem.usrCde,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: '请输入正确的邮箱',
              },
            ],
          })(<Input disabled />)}
        </FormItem>}
        {/* 用户权限*/}
        {/* 只能选择低于自己权限的,只能修改同级别的权限不能跨级修改*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.userRights} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('levId', {
              initialValue: dataItem.levId,
              rules: [
                {
                  required: true,
                  message: '请输入正确的用户权限',
                },
              ],
            })(<Select onChange={handleChange} placeholder={<FormattedMessage id={app.format.organiz.userRights} />}>
              {dataRole.map((index) => <Select.Option value={index.levId} >{index.levName}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        {/* 用户状态*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.userStatus} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrSts', {
            initialValue: dataItem.usrSts,
            rules: [
              {
                required: true,
                message: '请输入正确的用户状态',
              },
            ],
          })(<Select placeholder={<FormattedMessage id={app.format.organiz.userStatus} />}>
            {usrStsSel.map((index) => <Select.Option value={index.usrSts} >{index.name}</Select.Option>)}
          </Select>)}
        </FormItem>
      </Form> : <Form layout="horizontal">
        {/* 所属机构*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.affiliatedInstitution} allowClear disabled />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('instuCde', {
              initialValue: dataItem.instuCde || instuCde,
              rules: [
                {
                  required: true,
                  message: '请输入正确的所属机构',
                },
              ],
            })(<Select disabled placeholder={<FormattedMessage id={app.format.organiz.affiliatedInstitution} />}>
              {dataDept.map((index) => <Select.Option value={index.instuCde} >{index.instuName}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        {/* 用户名称*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.userName} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrName', {
            initialValue: dataItem.usrName,
            rules: [
              {
                required: true,
                message: '请输入正确的用户名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 证件类型*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.idType} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('usrIdTyp', {
              initialValue: dataItem.usrIdTyp,
              rules: [
                {
                  required: true,
                  message: '请输入正确的证件类型',
                },
              ],
            })(<Select placeholder={<FormattedMessage id={app.format.organiz.idType} />} onChange={handleChange2}>
              {usrIdTypSel.map((index) => <Select.Option value={index.usrIdTyp} >{index.name}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        {/* 证件号码*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.idNumber} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrIdNo', {
            initialValue: dataItem.usrIdNo,
            rules: [
              {
                required: true,
                pattern: patternReg,
                message: '请输入正确的证件号码',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 密码*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.password} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrPassword', {
            initialValue: dataItem.usrPassword,
            rules: [
              {
                required: true,
                message: '请输入正确的密码111',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 手机*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.phoneNumber} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrTel', {
            initialValue: dataItem.usrTel,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '请输入正确的手机',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 邮箱*/}
        {modalType === 'create' ? <FormItem label={<FormattedMessage id={app.format.organiz.email} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrCde', {
            initialValue: dataItem.usrCde,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: '请输入正确的邮箱',
              },
            ],
          })(<Input />)}
        </FormItem> : <FormItem label={<FormattedMessage id={app.format.organiz.email} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrCde', {
            initialValue: dataItem.usrCde,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: '请输入正确的邮箱',
              },
            ],
          })(<Input disabled />)}
        </FormItem>}
        {/* 部门*/}
        {/* 一级用户不展示 部门名称二级以下展示*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.departmentName} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('depCde', {
              initialValue: Number(dataItem.depCde) || '',
              rules: [
                {
                  required: true,
                  message: '请输入正确的部门名称',
                },
              ],
            })(<Select placeholder={<FormattedMessage id={app.format.organiz.departmentName} />}>
              {departmentSel.map((index) => <Select.Option value={index.deptNo} >{index.deptName}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        {/* 用户权限*/}
        {/* 只能选择低于自己权限的,只能修改同级别的权限不能跨级修改*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.userRights} />} hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('levId', {
              initialValue: dataItem.levId,
              rules: [
                {
                  required: true,
                  message: '请输入正确的用户权限',
                },
              ],
            })(<Select placeholder={<FormattedMessage id={app.format.organiz.userRights} />}>
              {dataRole.map((index) => <Select.Option value={index.levId} >{index.levName}</Select.Option>)}
            </Select>)
          }
        </FormItem>
        {/* 用户状态*/}
        <FormItem label={<FormattedMessage id={app.format.organiz.userStatus} />} hasFeedback {...formItemLayout}>
          {getFieldDecorator('usrSts', {
            initialValue: dataItem.usrSts,
            rules: [
              {
                required: true,
                message: '请输入正确的用户状态',
              },
            ],
          })(<Select placeholder={<FormattedMessage id={app.format.organiz.userStatus} />}>
            {usrStsSel.map((index) => <Select.Option value={index.usrSts} >{index.name}</Select.Option>)}
          </Select>)}
        </FormItem>
      </Form>}
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  modalType: PropTypes.string,
  dataItem: PropTypes.object,
  usrLev: PropTypes.object,
  app: PropTypes.object,
  dataDept: PropTypes.array,
  dataRole: PropTypes.array,
  departmentSel: PropTypes.array,
  usrIdTypSel: PropTypes.array,
  usrStsSel: PropTypes.array,
  sysSel: PropTypes.array,
  onOk: PropTypes.func,
  userFlag: PropTypes.string,
  requiredFlag: PropTypes.bool,
  displayFlag: PropTypes.string,
  dispatch: PropTypes.func,
  patternReg: PropTypes.string,
}

export default Form.create()(modal)
