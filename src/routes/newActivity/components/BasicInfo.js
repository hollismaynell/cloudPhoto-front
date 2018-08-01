import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Row, Col, Icon, Tabs, Collapse, Upload, Select, InputNumber, Button, Avatar } from 'antd'
import styles from './BasicInfo.less'
import { config } from '../../../utils'

const FromItem = Form.Item
const TabPane = Tabs.TabPane
const Panel = Collapse.Panel
const BasicInfo = ({ ...basicProps, form: { getFieldDecorator } }) => {
  basicProps
  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 8, style: {
        textAlign: 'right',
        fontWeight: 'bold',
        lineHeight: '2rem',
      } },
    },
    wrapperCol: {
      xs: { span: 8 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 8 },
    },
  }
  const formItemLayoutTop = {
    labelCol: {
      xs: { span: 5 },
      sm: { span: 5 },
      md: { span: 5 },
      lg: { span: 5, style: {
        textAlign: 'right',
        fontWeight: 'bold',
        lineHeight: '2rem',
      } },
    },
    wrapperCol: {
      xs: { span: 8 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 8 },
    },
  }
  // const rowProps = {
  //   xs: { span: 12 },
  //   sm: { span: 12 },
  //   md: { span: 4 },
  //   lg: { span: 4 },
  // }
  const photoGroupList = [
    {
      name: '照片直播',
    },
    {
      name: '爱吃肉肉',
    },
  ]
  const handleDelClick = (item) => {
    item.name
  }
  const CameraList = [
    {
      name: '刘先生',
    },
    {
      name: '张小姐',
    },
  ]
  return (
    <Form layout="vertical" style={{ padding: '0 20vw' }} >
      <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8', '9']} bordered={false} >
        <Panel header={<h3 style={{ background: '#f3f8fd', padding: '5px 18px' }}><span style={{ color: 'rgb(16, 142, 233)' }}>基本信息</span></h3>} key="1">
          <FromItem {...formItemLayout} label="相册名称:" >
            {
              getFieldDecorator('album', {
                initialValue: '佳乐巴巴',
                rules: [
                  {
                    require: true,
                    message: '请输入相册名称',
                  },
                ],
              })(<Input />)
            }
          </FromItem>
        </Panel>
        <Panel header={<h3 style={{ background: '#f3f8fd', padding: '5px 18px' }}><span style={{ color: 'rgb(16, 142, 233)' }}>设置照片分组</span></h3>} key="2">
          <Row>
            {
              photoGroupList ?
              photoGroupList.map(item => <div style={{ overflow: 'hidden', height: '3rem', margin: '2vh 0' }} >
                <Row>
                  <Col span={12} style={{ lineHeight: '2rem', fontWeight: 50, display: 'inline-block', width: '16vw', border: '1px solid #eee', background: '#eee', fontSize: '1rem', textAlign: 'left', padding: '10px' }} >
                    {item.name}
                  </Col>
                  <Col span={5} >
                    <span className={styles.iconBorder} ><Icon type="edit" style={{ lineHeight: '2rem', fontSize: '1.2rem' }} onClick={handleDelClick.bind(this, item)} /></span>
                    <span className={styles.iconBorder} ><Icon type="close-circle-o" style={{ lineHeight: '2rem', fontSize: '1.2rem' }} onClick={handleDelClick.bind(this, item)} /></span>
                    <span className={styles.iconBorder} ><Icon type="arrow-up" style={{ lineHeight: '2rem', fontSize: '1.2rem' }} onClick={handleDelClick.bind(this, item)} /></span>
                    <span className={styles.iconBorder} ><Icon type="arrow-down" style={{ lineHeight: '2rem', fontSize: '1.2rem' }} onClick={handleDelClick.bind(this, item)} /></span>
                  </Col>
                </Row>
              </div>) : ''
            }
          </Row>
        </Panel>
        <Panel header={<h3 style={{ background: '#f3f8fd', padding: '5px 18px' }}><span style={{ color: 'rgb(16, 142, 233)' }}>设置水印</span></h3>} key="3">
          <Row className={styles.banner}>
            <Tabs type="card" >
              <TabPane tab="普通水印" key="1" >
                <div style={{ fontSize: '0.9rem' }} >预览效果:<span style={{ color: 'red', fontSize: '0.5rem', marginLeft: '2vw' }} >修改后的水印设置只针对之后上传的照片生效，修改之前上传的照片水印设置不会改变</span></div>
                <Row style={{ borderBottom: '1px solid #eee', marginTop: '5vh' }} >
                  <Col span={9} >
                    <img alt="图片" src={config.waterMark} style={{ height: '20vh' }} />
                  </Col>
                  <Col span={12} style={{ marginTop: '2vh' }} >
                    <Row>
                      <Col span={3} style={{ fontSize: '0.8rem', lineHeight: '2rem' }} >位置：</Col>
                      <Col span={3} className={styles.circle} >1</Col>
                      <Col span={3} className={styles.circle} >2</Col>
                      <Col span={3} className={styles.circle} >3</Col>
                      <Col span={3} className={styles.circle} >4</Col>
                    </Row>
                    <Row style={{ marginTop: '2vh' }} >
                      <Col span={4} ><button className={styles.button} style={{ width: '60px', height: '60px' }} >+</button></Col>
                      <Col span={4} ><img alt="图片" src={config.cat} style={{ width: '60px', height: '60px' }} /></Col>
                      <Col span={4} ><img alt="图片" src={config.black} style={{ width: '60px', height: '60px' }} /></Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="边栏水印" key="2" >
                <div style={{ fontSize: '1rem' }} >预览效果<span style={{ color: 'red', fontSize: '0.6rem' }} >修改后的水印设置只针对之后上传的照片生效，修改之前上传的照片水印设置不会改变</span></div>
              </TabPane>
            </Tabs>
          </Row>
        </Panel>
        <Panel header={<h3 style={{ background: '#f3f8fd', padding: '5px 18px' }}><span style={{ color: 'rgb(16, 142, 233)' }}>设置启动页</span></h3>} key="4" className={styles.banner} >
          <div style={{ fontSize: '0.9rem', textAlign: 'left' }} >预览效果:</div>
          <Row style={{ borderBottom: '1px solid #eee', marginTop: '3vh' }} >
            <Col span={9} >
              <img alt="图片" src={config.waterMark} style={{ height: '20vh' }} />
            </Col>
            <Col span={14} style={{ marginTop: '2vh' }} >
              <Row>
                <Col span={4} style={{ fontSize: '0.9rem', lineHeight: '4rem', color: '#333', fontWeight: '500' }} >启动页图片：</Col>
                <Col span={16} >
                  <Col span={4} ><Upload style={{ cursor: 'pointer', color: '#108ee9', height: '5vh', lineHeight: '4.5em' }} >上传图片</Upload></Col>
                  <Col span={16} style={{ color: 'red', fontSize: '0.6rem', lineHeight: '6.5em' }} >(尺寸1125px*1815px，大小2MB以内)</Col>
                </Col>
              </Row>
              <Row>
                <FromItem {...formItemLayout} label="进入云相册按钮样式:" >
                  {
                    getFieldDecorator('defaultStyle', {
                      initialValue: 'default',
                      rules: [
                        {
                          require: true,
                          message: '请选择进入云相册按钮样式',
                        },
                      ],
                    })(<Select>
                      <Select.Option value="default" >默认</Select.Option>
                    </Select>)
                  }
                </FromItem>
              </Row>
              <Row>
                <FromItem {...formItemLayout} label="进入云相册按钮距离底部(px):" >
                  {
                    getFieldDecorator('defaultDistance', {
                      initialValue: '36',
                      rules: [
                        {
                          require: true,
                          message: '请输入进入云相册按钮与底部距离',
                        },
                      ],
                    })(<InputNumber style={{ width: '13vw' }} />)
                  }
                </FromItem>
              </Row>
            </Col>
          </Row>
        </Panel>
        <Panel header={<h3 style={{ background: '#f3f8fd', padding: '5px 18px' }}><span style={{ color: 'rgb(16, 142, 233)' }}>设置顶部宣传栏</span></h3>} key="5" className={styles.banner} >
          <Row>
            <Col span={4} style={{ fontSize: '0.9rem', lineHeight: '4rem', color: '#333', fontWeight: '500' }} >启动页图片：</Col>
            <Col span={16} >
              <Col span={4} ><Upload style={{ cursor: 'pointer', color: '#108ee9', height: '5vh', lineHeight: '4.5em' }} >上传图片</Upload></Col>
              <Col span={16} style={{ color: 'red', fontSize: '0.6rem', lineHeight: '6.5em' }} >(尺寸1125px*1815px，大小2MB以内)</Col>
            </Col>
          </Row>
          <Row>
            <img alt="图片" src={config.TopBanner} style={{ height: '10vh', marginLeft: '11vw' }} />
          </Row>
          <Row style={{ cursor: 'pointer', color: '#108ee9', height: '5vh', fontSize: '0.75rem', marginLeft: '11vw' }} >恢复成默认图片</Row>
          <Row>
            <FromItem {...formItemLayoutTop} label="进入云相册按钮距离底部(px):" >
              {
                getFieldDecorator('topDistance', {
                  initialValue: '36',
                  rules: [
                    {
                      require: true,
                      message: '请输入进入云相册按钮与底部距离',
                    },
                  ],
                })(<InputNumber style={{ width: '13vw' }} />)
              }
            </FromItem>
          </Row>
        </Panel>
        <Panel header={<h3 style={{ background: '#f3f8fd', padding: '5px 18px' }}><span style={{ color: 'rgb(16, 142, 233)' }}>设置底部推广栏</span></h3>} key="6" className={styles.banner} >
          <Row style={{ paddingBottom: '3vh', marginBottom: '3vh', borderBottom: '1px solid #eee' }} >
            <Col span={5} style={{ fontSize: '0.9rem', lineHeight: '4rem', color: '#333', fontWeight: '500' }} >开启底部推广栏：</Col>
            <Col span={16} >
              <Row>
                <Button style={{ background: '#FFCC00' }} >ON</Button>
              </Row>
              <Row style={{ color: '#aaa', fontSize: '0.75rem', marginTop: '1vh' }} >
                1、开启后，用户可以自定义直播相册下方的推广栏
              </Row>
              <Row style={{ color: '#aaa', fontSize: '0.75rem' }} >2、自定义包括预约咨询、外链图片和自定义超链接</Row>
            </Col>
          </Row>
          <FromItem {...formItemLayoutTop} label="底部宣传语:" >
            {
              getFieldDecorator('bottomLogo', {
                initialValue: '36',
                rules: [
                  {
                    require: true,
                    message: '请输入底部宣传语',
                  },
                ],
              })(<Input style={{ width: '13vw' }} />)
            }
          </FromItem>
        </Panel>
        <Panel header={<h3 style={{ background: '#f3f8fd', padding: '5px 18px' }}><span style={{ color: 'rgb(16, 142, 233)' }}>设置摄影师</span></h3>} key="7" className={styles.banner} >
          <Row className={styles.banner} >
            <h6 className={styles.bannerTitle}>摄影师:<span className={styles.titleClick} ><Icon type="plus" />添加摄影师</span></h6>
          </Row>
          {
            CameraList ?
            CameraList.map(item =>
              <div style={{ width: '24vw', height: '10vh', border: '1px solid #eee', fontSize: '1.1rem', verticalAlign: 'middle', padding: '1vh 1vw', margin: '2vh 0', overflow: 'hiddden' }} >
                <span style={{ float: 'left' }} >
                  <Avatar size="large" style={{ height: '8vh', width: '5vw' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <div style={{ lineHeight: '4.4rem', float: 'right', paddingLeft: '1vw', fontWeight: 50 }} >
                    {item.name}
                  </div>
                </span>
                <div style={{ lineHeight: '4.4rem', float: 'right' }}>
                  <Icon type="close-circle-o" style={{ cursor: 'pointer' }} onClick={handleDelClick.bind(this, item)} />
                </div>
              </div>) : ''
          }
        </Panel>
        <Panel header={<h3 style={{ background: '#f3f8fd', padding: '5px 18px' }}><span style={{ color: 'rgb(16, 142, 233)' }}>设置修图师</span></h3>} key="8" className={styles.banner} >
          <Row className={styles.banner} >
            <h6 className={styles.bannerTitle}>修图师:<span className={styles.titleClick} ><Icon type="plus" />添加修图师</span></h6>
          </Row>
          {
            CameraList ?
            CameraList.map(item =>
              <div style={{ width: '24vw', height: '10vh', border: '1px solid #eee', fontSize: '1.1rem', verticalAlign: 'middle', padding: '1vh 1vw', margin: '2vh 0', overflow: 'hiddden' }} >
                <span style={{ float: 'left' }} >
                  <Avatar size="large" style={{ height: '8vh', width: '5vw' }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <div style={{ lineHeight: '4.4rem', float: 'right', paddingLeft: '1vw', fontWeight: 50 }} >
                    {item.name}
                  </div>
                </span>
                <div style={{ lineHeight: '4.4rem', float: 'right' }}>
                  <Icon type="close-circle-o" style={{ cursor: 'pointer' }} onClick={handleDelClick.bind(this, item)} />
                </div>
              </div>) : ''
          }
        </Panel>
      </Collapse>
    </Form>
  )
}

BasicInfo.propTypes = {
  basicProps: PropTypes.object,
  form: PropTypes.object,
}

export default Form.create()(BasicInfo)
