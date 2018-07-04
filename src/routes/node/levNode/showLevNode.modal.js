import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import Treee from '../../../components/Tree/treeCheckBox'
import './index.less'


function AddModal ({ title, onOk, visible, onCancel, dispatch, nameSpace, loading, nodeList, checkStrictly, defaultCheckedKeys, usrLev }) {
  let selectedKeys = []
  let selectFlag = false
  const getSelectedKeys = (arr, flag) => {
    selectedKeys = arr
    selectFlag = flag
  }
  const modalOpts = {
    title,
    visible,
    onOk () {
      onOk(selectedKeys, selectFlag, usrLev)
    },
    onCancel,
    loading,
  }
  const treeProps = {
    dispatch,
    nameSpace,
    nodeArray: nodeList.data || [],
    getSelectId () {},
    getSelectedKeys,
    checkAble: true,
    treeId: 'key',
    defaultCheckedKeys,
    checkStrictly,
    height: 300,
  }
  const siderFold = localStorage.getItem('AtlassiderFold')
  return (
    <Modal {...modalOpts} style={{ left: `${siderFold === 'true' ? 20 : 110}` }}>
      <Treee {...treeProps} />
    </Modal>
  )
}

AddModal.propTypes = {
  title: PropTypes.string,
  usrLev: PropTypes.string,
  visible: PropTypes.bool,
  checkStrictly: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  dispatch: PropTypes.func,
  loading: PropTypes.func,
  nodeList: PropTypes.obj,
  nameSpace: PropTypes.string,
  form: PropTypes.obj,
  defaultCheckedKeys: PropTypes.array,
}

export default AddModal
