import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Row, Col, Table } from 'antd'
import '../index.less'
function AddModal ({ onCancel, updateData, updateDataDetail, modalKey, visible, onOk, loading, paginationDetail, dispatch, ...addModalProps }) {
  const modalOpts = {
    updateDataDetail,
    updateData,
    visible,
    width: 1100,
    wrapClassName: 'vertica l-center-modal',
    onOk,
    onCancel,
    loading,
    key: modalKey,
    footer: null,
    onChange (page) {
      dispatch({
        type: 'jobStatusDetail/queryOne',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
          trcNo: addModalProps.currentRecordRowCode,
        },
      })
    },
  }
  const ColProps4 = {
    lg: 11,
    xs: 24,
    md: 12,
    style: {
      marginBottom: 16,
      marginLeft: 0,
      paddingLeft: 0,
    },
  }
  const head = {
    style: {
      marginBottom: 50,
    },
  }
  const titleC = {
    lg: 24,
    xs: 24,
    md: 24,
    style: {
      fontSize: 14,
      marginBottom: 16,
    },
  }
  const ColProps2 = {
    span: 24,
    style: {
      marginBottom: 16,
    },
  }
  const titll = {
    style: {
      fontWeight: 700,
    },
  }
  // const ColProps3 = {
  //   span: 16,
  //   style: {
  //     marginBottom: 16,
  //   },
  // }
  const columns = [
    {
      title: '拆单序号',
      dataIndex: 'spltNo',
      key: 'spltNo',
    },
    {
      title: '支付通道',
      dataIndex: 'pchCde',
      key: 'pchCde',
    }, {
      title: '应扣金额',
      dataIndex: 'pyAmt',
      render: (text, record) => (record.pyAmt.toFixed(2)),
      key: 'pyAmt',
    }, {
      title: '实扣金额',
      dataIndex: 'rcvdAmt',
      render: (text, record) => (record.rcvdAmt.toFixed(2)),
      key: 'rcvdAmt',
    }, {
      title: '响应状态',
      dataIndex: 'pchRspSts',
      key: 'pchRspSts',
    }, {
      title: '响应消息',
      dataIndex: 'pchRspMsg',
      key: 'pchRspMsg',
    }, {
      title: '调用时间',
      dataIndex: 'timeString',
      key: 'timeString',
    }, {
      title: '交易状态',
      dataIndex: 'txnStsDesc',
      key: 'txnStsDesc',
    },
  ]
  // 限制输入的精确度位数
  // const inputNumProps = {
  //   style: { width: '100%' },
  //   precision: 2,
  // }
  // const usrLevParam = JSON.parse(Cookies.get('token')).usrLev
  return (
    <Modal {...modalOpts} style={{ left: 20 }}>
      <Row {...head} style={{ borderBottom: '1px solid rgba(171, 171, 171, 0.38)', marginBottom: 40, marginLeft: 0, marginRight: 0 }} title="Title" gutter={24}>
        <Col {...titleC} span={24} >
          <Row span={24} gutter={24}>
            <Col span={24} style={{ paddingLeft: 0 }} >单笔交易信息</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>平台交易流水号:</span> &nbsp;&nbsp;&nbsp;{updateData.trcNo}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>业务主键: </span>&nbsp;&nbsp;&nbsp;{updateData.bizPk}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>付款账户开户行: </span>&nbsp;&nbsp;&nbsp;{updateData.depBnkDesc}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>付款人账号: </span>&nbsp;&nbsp;&nbsp;{updateData.pyAcctNo}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>付款人名称: </span>&nbsp;&nbsp;&nbsp;{updateData.pyAcctName}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>付款人证件号码: </span>&nbsp;&nbsp;&nbsp;{updateData.pyAcctCtfNo}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>付款人证件类型: </span>&nbsp;&nbsp;&nbsp;{updateData.pyACtfTypDesc}</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>币种: </span>&nbsp;&nbsp;&nbsp;{updateData.cryTypDesc
            }</Col>
          </Row>
        </Col>
        <Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>手机号: </span>&nbsp;&nbsp;&nbsp;{updateData.mblNo}</Col>
          </Row>
        </Col><Col {...ColProps4}>
          <Row gutter={24}>
            <Col {...ColProps2} className="alignR"><span {...titll}>交易时间: </span>&nbsp;&nbsp;&nbsp;{updateData.timeString}</Col>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={updateDataDetail}
        pagination={paginationDetail}
        rowKey={record => record.spltNo}
        onChange={modalOpts.onChange}
      />
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  paginationDetail: PropTypes.object,
}

export default Form.create()(AddModal)
