import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Card, Col, Row, Button } from 'antd'
import { Treee } from '../../../components'
import NodeList from './nodeList'
import AddModal from './addMenu.modal'
import { FormattedMessage } from 'react-intl'
import './index.less'


function nodeInfo ({ nodeInfos, dispatch, loading, app }) {
  const { nodeArray, nodeList, nodeListShow, editable, levs, parentLev, visible, nodeLevSel } = nodeInfos
  const getSelectId = (menuId) => {
    dispatch({
      type: 'nodeInfos/queryOneNode',
      payload: {
        menuId,
      },
    })
  }
  const treeProps = {
    nodeArray,
    getSelectId,
    getSelectedKeys () {},
    checkAble: false,
    treeId: 'menuId',
  }
  const nodeListProps = {
    nodeList,
    app,
    editable,
    dispatch,
    levs,
    nodeLevSel,
  }
  const handleAddMenu = () => {
    dispatch({
      type: 'nodeInfos/showModal',
    })
  }
  const addModalProps = {
    title: <FormattedMessage id={app.format.node.addMenu} />,
    nodeList,
    app,
    levs,
    parentLev,
    dispatch,
    visible,
    nodeArray,
    onOk (data) {
      dispatch({
        type: 'nodeInfos/create',
        payload: data,
      })
      // TODO 数据返回后台
      console.log(data)
    },
    onCancel () {
      dispatch({
        type: 'nodeInfos/hideModal',
      })
    },
    loading,
  }
  return (
    <div className="menu content-inner">
      <Button style={{ marginBottom: '20px' }} type="primary" onClick={handleAddMenu}><FormattedMessage id={app.format.node.addMenu} /></Button>
      <AddModal {...addModalProps} />
      <Row gutter={16}>
        <Col span={8}>
          <Card className="card-box">
            <Treee {...treeProps} />
          </Card>
        </Col>
        {nodeListShow ?
          <Col span={16} >
            <Card className="card-box node-list-card">
              <NodeList {...nodeListProps} />
            </Card>
          </Col> : ''}
      </Row>
    </div>
  )
}

nodeInfo.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  location: PropTypes.object,
  app: PropTypes.object,
  nodeInfos: PropTypes.object,
  nodeArray: PropTypes.array,
}

export default connect(
  ({ nodeInfos, app, loading, language }) => (
    { nodeInfos, app, loading: loading.models.nodeInfo, language }
  ))(nodeInfo)
