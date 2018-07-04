import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Select, InputNumber, Col } from 'antd'
import { menuActive } from '../../../utils/selectData'
import './index.less'
import { FormattedMessage } from 'react-intl'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const listLabel = {
  xs: {
    span: 12,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 12,
  },
  xl: {
    span: 12,
  },
}

function NodeList ({ nodeList, levs, nodeLevSel, dispatch, app, editable, form: {
                     getFieldDecorator,
                     validateFields,
                     getFieldsValue,
                   } }) {
  // 上级菜单文字描述
  const handleSave = () => {
    validateFields(
      (errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          nodeId: nodeList.nodeId,
        }
        dispatch({
          type: 'nodeInfos/update',
          payload: {
            nodeList: data,
            editable: true,
          },
        })
      })
  }
  const handleUpdate = () => {
    dispatch({
      type: 'nodeInfos/changeType',
      payload: {
        editable: false,
      },
    })
  }
  const select = (e) => {
    dispatch({
      type: 'nodeInfos/queryParentLev',
      payload: {
        nodeLev: e - 1,
      },
    })
  }
  return (
    <div>
      {editable ? <div>
        <Form layout="horizontal" key={nodeList.menuId} style={{ overflow: 'hidden' }}>
          <Col {...listLabel}>
            <FormItem {...listLabel} label={<FormattedMessage id={app.format.node.menuName} />} hasFeedback {...formItemLayout}>
              <Input readOnly value={nodeList.menuName} />
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem {...listLabel} label={<FormattedMessage id={app.format.node.menuEnName} />} hasFeedback {...formItemLayout}>
              <Input readOnly value={nodeList.nodeNameEn || ''} />
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.menuLevel} />} hasFeedback {...formItemLayout}>
              <Select disabled defaultValue={nodeList.nodeLev || ''}>
                {levs.map((index) => <Select.Option value={index.nodeLev} >{index.nodeLevDec || index.nodeLev}</Select.Option>)}
              </Select>
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.subordinateMenu} />} hasFeedback {...formItemLayout}>
              <Select disabled defaultValue={nodeList.nodeParentId || ''}>
                {nodeLevSel.map((index) => <Select.Option value={index.nodeParentId} >{index.nodeParentDec}</Select.Option>)}
              </Select>
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.menuUrl} />} hasFeedback {...formItemLayout}>
              <Input readOnly value={nodeList.nodeUrl} />
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.founder} />} hasFeedback {...formItemLayout}>
              <Input readOnly value={nodeList.nodeCreater} />
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.Enable} />} hasFeedback {...formItemLayout}>
              <Select disabled defaultValue={nodeList.nodeActv || ''}>
                {menuActive.map((index) => <Select.Option value={index.value} >{index.name}</Select.Option>)}
              </Select>
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.creationTime} />} hasFeedback {...formItemLayout}>
              <Input readOnly value={nodeList.dateCreated} />
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.sequenceNumber} />} hasFeedback {...formItemLayout}>
              <Input readOnly value={nodeList.nodeORder || nodeList.nodeOrder} />
            </FormItem>
          </Col>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Button type="primary" onClick={handleUpdate}><FormattedMessage id={app.format.update} /></Button>
          </div>
        </div>
      </div> : <div>
        <Form layout="horizontal" key={nodeList.menuId} style={{ overflow: 'hidden' }}>
          <Col {...listLabel} style={{ display: 'none' }}>
            <FormItem label="menuId：" hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('menuId', {
                  initialValue: nodeList.menuId,
                  rules: [
                    {
                      required: true,
                      message: 'menuId',
                    },
                  ],
                })(<Input placeholder="menuId" />)
              }
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.menuName} />} hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('menuName', {
                  initialValue: nodeList.menuName,
                  rules: [
                    {
                      required: true,
                      message: '请输入正确的菜单名称',
                    },
                  ],
                })(<Input />)
              }
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.menuEnName} />} hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('nodeNameEn', {
                  initialValue: nodeList.nodeNameEn,
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
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.menuLevel} />} hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('nodeLev', {
                  initialValue: nodeList.nodeLev,
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
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.subordinateMenu} />} hasFeedback{...formItemLayout}>
              {
                getFieldDecorator('nodeParentId', {
                  initialValue: nodeList.nodeParentId || '',
                  rules: [
                    {
                      required: true,
                      message: '请输入正确的所属菜单',
                    },
                  ],
                })(<Select>{nodeLevSel.map((index) => <Select.Option value={index.nodeParentId} >{index.nodeParentDec}</Select.Option>)}
                </Select>)
              }
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.menuUrl} />} hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('nodeUrl', {
                  initialValue: nodeList.nodeUrl,
                  rules: [
                    {
                      required: true,
                      message: '请输入正确的菜单路径',
                    },
                  ],
                })(<Input />)
              }
            </FormItem>
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.Enable} />} hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('nodeActv', {
                  initialValue: nodeList.nodeActv,
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
          </Col>
          <Col {...listLabel}>
            <FormItem label={<FormattedMessage id={app.format.node.sequenceNumber} />} hasFeedback {...formItemLayout}>
              {
                getFieldDecorator('nodeOrder', {
                  initialValue: nodeList.nodeORder || nodeList.nodeOrder,
                  rules: [
                    {
                      required: true,
                      message: '请输入正确的顺序号',
                    },
                  ],
                })(<InputNumber min={1} />)
              }
            </FormItem>
          </Col>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Button type="primary" onClick={handleSave}><FormattedMessage id={app.format.save} /></Button>
          </div>
        </div>
      </div>}
    </div>
  )
}

NodeList.propTypes = {
  form: PropTypes.obj,
  nodeList: PropTypes.obj,
  app: PropTypes.obj,
  nodeListShow: PropTypes.bool,
  editable: PropTypes.bool,
  levs: PropTypes.arrray,
  nodeLevSel: PropTypes.arrray,
  getFieldDecorator: PropTypes.func,
  dispatch: PropTypes.func,
}

export default Form.create()(NodeList)
