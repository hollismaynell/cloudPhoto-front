import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Row, Col } from 'antd'
import './List.less'
function AddModal ({ updateData, updateDataDetail, visible, modalKey, title, onOk, loading, onCancel }) {
  const modalOpts = {
    updateData,
    updateDataDetail,
    title,
    visible,
    width: 1100,
    wrapClassName: 'vertica l-center-modal',
    onOk,
    onCancel,
    loading,
    footer: null,
    key: modalKey,
  }
  const ColProps4 = {
    lg: 12,
    xs: 24,
    md: 12,
    style: {
      marginBottom: 16,
    },
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
  const titleD = {
    lg: 23,
    xs: 23,
    md: 23,
    style: {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 16,
      paddingTop: 16,
      borderTop: '1px solid #dbdbdb',
    },
  }
  const ColProps2 = {
    span: 7,
    style: {
      marginBottom: 16,
      fontWeight: 700,
    },
  }
  const ColProps3 = {
    span: 14,
    style: {
      marginBottom: 16,
    },
  }
  // 限制输入的精确度位数
  // const inputNumProps = {
  //   style: { width: '100%' },
  //   precision: 2,
  // }
  // const usrLevParam = JSON.parse(Cookies.get('token')).usrLev
  return (
    <Modal {...modalOpts} style={{ left: 20 }}>
      <Row title="Title" gutter={24}>
        <Col {...titleC} span={24} >
          <Row span={23} gutter={24}>
            <Col span={24} >批量交易信息</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">交易流水号:</Col>
            <Col {...ColProps3}>{updateData.trcNo}</Col>
          </Row>
        </Col><Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">明细流水号:</Col>
            <Col {...ColProps3}>{updateData.trcDtlNo}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">核算流水号:</Col>
            <Col {...ColProps3}>{updateData.bizPk}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">付款人名:</Col>
            <Col {...ColProps3}>{updateData.pyAcctName}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">付款人账号:</Col>
            <Col {...ColProps3}>{updateData.pyAcctNo}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">币种:</Col>
            <Col {...ColProps3}>{updateData.cryTypDesc}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">付款账户开户行:</Col>
            <Col {...ColProps3}>{updateData.depBnkDesc}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">付款人证件类型:</Col>
            <Col {...ColProps3}>{updateData.pyACtfTypDesc}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">付款人证件号:</Col>
            <Col {...ColProps3}>{updateData.pyAcctCtfNo}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">手机号:</Col>
            <Col {...ColProps3}>{updateData.mblNo}</Col>
          </Row>
        </Col>
        <Col {...titleD} span={24} >
          <Row span={24} gutter={24}>
            <Col span={24} >批量交易明细</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">交易状态:</Col>
            <Col {...ColProps3}>{updateDataDetail.txnStsDesc || ''}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">交易状态描述:</Col>
            <Col {...ColProps3}>{updateDataDetail.txnStsDesc || ''}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">应收金额:</Col>
            <Col {...ColProps3}>{updateDataDetail.pyAmt || ''}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">实收金额:</Col>
            <Col {...ColProps3}>{updateDataDetail.rcvdAmt || '0'}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">接口序号:</Col>
            <Col {...ColProps3}>{updateDataDetail.apiSeq || ''}</Col>
          </Row>
        </Col><Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">接口标识:</Col>
            <Col {...ColProps3}>{updateDataDetail.apiCde || ''}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">支付通道标识:</Col>
            <Col {...ColProps3}>{updateDataDetail.pchCde || ''}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">交易响应码:</Col>
            <Col {...ColProps3}>{updateDataDetail.pchRspCde || ''}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">交易响应消息:</Col>
            <Col {...ColProps3}>{updateDataDetail.pchRspMsg || ''}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR">交易时间:</Col>
            <Col {...ColProps3}>{updateDataDetail.timeString || ''}</Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}
AddModal.propTypes = {
  title: PropTypes.string,
  maxLev: PropTypes.string,
  visible: PropTypes.bool,
  updateFlag: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  updateData: PropTypes.obj,
  updateDataDetail: PropTypes.obj,
  dispatch: PropTypes.func,
  loading: PropTypes.func,
  form: PropTypes.obj,
  modalKey: PropTypes.number,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  sysSel: PropTypes.array,
}

export default Form.create()(AddModal)
