import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Icon, Radio, Col, Tabs } from 'antd'
import styles from './index.less'
import { config } from '../../utils'
import { Helmet } from 'react-helmet'
// import { Page } from '../../components/Page'
// const { htmlSrc } = config
const FormItem = Form.Item

const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group

const ColProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
}
const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginLoading } = login
  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      console.log(values)
      debugger
      dispatch({ type: 'login/login', payload: values })
    })
    debugger
  }
  // const handleRegistOk = (e) => {
  //   e.preventDefault()
  //   return false
  // }

  const { iconFontJS, iconFontCSS, logo1, iconMenuCSS, iconMenuJS } = config
  return (
    <div className={styles.loginBox}>
      <Helmet>
        <title>云摄影</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href={logo1} type="image/x-icon" />
        {iconFontJS && <script src={iconFontJS}></script>}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
        {iconMenuJS && <script src={iconMenuJS}></script>}
        {iconMenuCSS && <link rel="stylesheet" href={iconMenuCSS} />}
      </Helmet>
      <div className={styles.form}>
        {/* <div style={{ background: 'rgba(255,255,255,0.3)', padding: '40px 34px', boxShadow: '2px 5px 6px rgba(0,0,0,0.06)' }}> */}
        <div style={{ padding: '40px 74px', background: '#fff' }}>
          {/* <div className={styles.logo}>*/}
            {/* <img src={config.loginLogo} alt={'logo'} />*/}
          {/* </div>*/}
          <Tabs>
            <TabPane tab="登录" key="1" className={styles.TabLable}>
              <Form>
                <Icon className={styles.ueserIcon1} />
                <FormItem hasFeedback>
                  {getFieldDecorator('userCode', {
                    rules: [
                      {
                        required: true,
                        message: '请输入账号',
                      },
                    ],
                  })(<Input size="large" onPressEnter={handleOk} placeholder="请输入账号" className={styles.ueserName} />)}
                </FormItem>
                <Icon className={styles.ueserIcon2} />
                <FormItem hasFeedback>
                  {getFieldDecorator('pass', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ],
                  })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="请输入密码" className={styles.ueserName} />)}
                </FormItem>
                <Row>
                  <Col {...ColProps}>
                    <FormItem>
                      {getFieldDecorator('isRem', {
                        initialValue: 'notChecked',
                        rules: [
                          {
                            required: false,
                            message: '要记住密码吗？',
                          },
                        ],
                      })(
                        <RadioGroup>
                          <Radio className={styles.RadioCss} value="checked" size="small">记住密码</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </Col>
                  <Col {...ColProps}>
                    <a className={styles.aToBlock} href="#">忘记密码？</a>
                  </Col>
                </Row>

                {/* <iframe src={htmlSrc} scrolling="no" style={{ width: '280px', height: '50px', border: 'none' }} ></iframe> */}
                <Row>
                  <Button type="primary" size="large" onClick={handleOk} loading={loginLoading} className={styles.myLogin}>
                    登录
                  </Button>
                  {/* <p className={styles.register}><span><Icon type="right-circle" /> 立即注册</span> <span>忘记密码</span></p> */}
                </Row>
              </Form>
            </TabPane>
            {/* <TabPane tab="注册" key="2">
              <Form onSubmit={handleRegistOk}>
                <Icon className={styles.ueserIcon1} />
                <FormItem hasFeedback>
                  {getFieldDecorator('userCode1', {
                    rules: [
                      {
                        required: true,
                        message: '邮箱不能为空',
                      },
                    ],
                  })(<Input size="large" onPressEnter={handleOk} placeholder="邮箱" className={styles.ueserName} />)}
                </FormItem>
                <Icon className={styles.ueserIcon2} />
                <FormItem hasFeedback>
                  {getFieldDecorator('pass1', {
                    rules: [
                      {
                        required: true,
                        message: '密码不能为空',
                      },
                    ],
                  })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" className={styles.ueserName} />)}
                </FormItem>
                <Icon className={styles.ueserIcon2} />
                <FormItem hasFeedback>
                  {getFieldDecorator('passConfirm1', {
                    rules: [
                      {
                        required: true,
                        message: '请确认密码',
                      },
                    ],
                  })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="请确认密码" className={styles.ueserName} />)}
                </FormItem>
                <Row>
                  <Button type="primary" size="large" loading={loginLoading} onClick={handleRegistOk} className={styles.myLogin}>
                    注册
                  </Button>
                </Row>
              </Form>
            </TabPane> */}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
  loginLoading: PropTypes.bool,
  res: PropTypes.bool,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
