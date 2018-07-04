import React from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd'
import './index.less'

const TreeNode = Tree.TreeNode
function Treee ({ nodeArray, getSelectId, getSelectedKeys, checkAble }) {
  const onExpand = () => {

  }
  const onCheck = (selectedKeys) => {
    const selectFlag = true
    getSelectedKeys(selectedKeys, selectFlag)
  }
  const onSelect = (info) => {
    // console.log(info)
    getSelectId(info)
  }

  const loop = data => data.map((item) => {
    if (item.children && item.children.length !== 0) {
      return (
        <TreeNode key={item.menuId} title={item.menuName} className="treeNode">
          {loop(item.children)}
        </TreeNode>
      )
    }
    return <TreeNode key={item.menuId} className="treeNode" title={item.menuName} />
  })
  return (
    <Tree
      showLine
      checkable={checkAble}
      onExpand={onExpand}
      onCheck={onCheck}
      onSelect={onSelect}
      defaultCheckedKeys={['1']}
    >
      {nodeArray instanceof Array ? loop(nodeArray) : []}
    </Tree>
  )
}

Treee.propTypes = {
  nodeArray: PropTypes.array,
  getSelectId: PropTypes.func,
  getSelectedKeys: PropTypes.func,
  checkAble: PropTypes.bool,
}

export default Treee
