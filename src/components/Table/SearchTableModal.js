import React, { PropTypes } from 'react'
import { Table, Button, Modal, Form } from 'antd'


class SearchTableModal extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { title, visible, loading } = this.props
    const handleOk = () => {
      this.props.onOk()
    }
    const handleCancel = () => {
      this.props.onCancel()
    }
    const modalOpts = {
      title,
      visible,
      onOk: handleOk,
      onCancel: handleCancel,
      width: 1000,
      okText: '保存',
      cancelText: '关闭',
    }
    return (
      <Modal {...modalOpts}>
        <Table
          columns={this.props.tableColumns}
          bordered
          loading={loading}
        />
      </Modal>
    )
  }
}

export default Form.create()(SearchTableModal)
