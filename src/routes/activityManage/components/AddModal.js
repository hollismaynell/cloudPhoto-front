import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Row, Col, Table } from 'antd'
import './List.less'
function AddModal ({ dispatch, ...addModalProps }) {
  const modalOpts = {
    width: 1100,
    wrapClassName: 'vertica l-center-modal',
    footer: null,
    onChange (page) {
      dispatch({
        type: 'queryBatTxnTimeout/queryOne',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
          trcNo: addModalProps.currentRecordRowCode,
        },
      })
    },
    ...addModalProps,
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

  const columns = [

    {
      title: '付款人账号',
      dataIndex: 'pyAcctNo',
      key: 'pyAcctNo',
    }, {
      title: '付款人姓名',
      dataIndex: 'pyAcctName',
      key: 'pyAcctName',
    }, {
      title: '付款人证件号',
      dataIndex: 'pyAcctCtfNo',
      key: 'pyAcctCtfNo',
    }, {
      title: '付款人证件类型',
      dataIndex: 'pyACtfTypDesc',
      key: 'pyACtfTypDesc',
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
      <Row title="Title" gutter={24}>
        <Col {...titleC} span={24} >
          <Row span={23} gutter={24}>
            <Col span={24} style={{ fontSize: 18 }}>明细数据清单</Col>
          </Row>
        </Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={modalOpts.updateData}
        pagination={modalOpts.paginationDetail}
        rowKey={record => record.trcDtlNo}
        onChange={modalOpts.onChange}
      />
    </Modal>
  )
}
AddModal.propTypes = {
  addModalProps: PropTypes.obj,
  dispatch: PropTypes.func,
}

export default Form.create()(AddModal)
