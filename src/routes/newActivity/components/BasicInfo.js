import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Row } from 'antd'
import styles from './BasicInfo.less'

const FromItem = Form.Item
const BasicInfo = ({ ...basicProps, form: { getFieldDecorator } }) => {
  basicProps
  const formItemLayout = {
    labelCol: {
      xs: { span: 2 },
      sm: { span: 2 },
      md: { span: 2 },
      lg: { span: 2, style: {
        textAlign: 'left',
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
  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 8 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 16 },
  //   },
  // }
  const rowProps = {
    xs: { span: 12 },
    sm: { span: 12 },
    md: { span: 4 },
    lg: { span: 4 },
  }
  return (
    <div className={styles.banner} >
      <Row {...rowProps} className={styles.bannerWrap} >
        <Form layout="vertical" >
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
        </Form>
      </Row>
    </div>
  )
}

BasicInfo.propTypes = {
  basicProps: PropTypes.object,
  form: PropTypes.object,
}

export default Form.create()(BasicInfo)
