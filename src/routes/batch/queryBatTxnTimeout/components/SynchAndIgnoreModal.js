import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Row, Col } from 'antd'
import './List.less'
function SynchAndIgnoreModal ({ ...synchIgnoreModalProps }) {
  const modalOpts = {
    ...synchIgnoreModalProps,
    width: 310,
    wrapClassName: 'vertica l-center-modal',
  }
  const titleC = {
    lg: 23,
    xs: 23,
    md: 23,
    style: {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 16,
      paddingTop: 16,
    },
  }

  return (
    <Modal {...modalOpts} style={{ left: 20 }}>
      <Row gutter={24}>
        <Col {...titleC} span={24} >
          <Row span={23} gutter={24}>
            <Col span={24} style={{ fontSize: 20, fontWeight: 900 }}>请慎重操作，是否开始{synchIgnoreModalProps.modalType === 'synch' ? '同步' : '忽略'}</Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

SynchAndIgnoreModal.propTypes = {
  synchIgnoreModalProps: PropTypes.obj,
}

export default Form.create()(SynchAndIgnoreModal)
