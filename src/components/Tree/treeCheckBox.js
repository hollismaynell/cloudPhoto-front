import React from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd'
import './index.less'
const TreeNode = Tree.TreeNode


function Treee ({ nodeArray, getSelectId, dispatch, defaultCheckedKeys, nameSpace }) {
  const onExpand = () => {
    // ["2", "3", "5", "6", "7", "9", "824", "827", "4"]
  }
  console.log(nodeArray)
  const onCheck = (checkedKeys, e) => {
    /* dispatch({
      type: `${nameSpace}/checkStrictly`,
      payload: {
        checkStrictly: false,
      },
    }) */
    const { checkedNodes, halfCheckedKeys } = e
    const nodeArr = []
    if (halfCheckedKeys !== 0) {
      nodeArr.push(halfCheckedKeys)
    }
    checkedNodes.forEach((item) => {
      nodeArr.push(item.key)
    })
    // console.log(nodeArr)
    dispatch({
      type: `${nameSpace}/changeCheckArr`,
      payload: {
        defaultCheckedKeys: nodeArr,
      },
    })
  }
  const onSelect = (info) => {
    // console.log(info)
    getSelectId(info)
  }
  const loop = data => data.map((item) => {
    if (item.children && item.children.length !== 0) {
      return (
        <TreeNode key={item.menuId} title={item.menuName} className="treeNode nodeSpan" >
          {loop(item.children)}
        </TreeNode>
      )
    }
    return <TreeNode key={item.menuId} style={{ paddingLeft: '10px' }} className="treeNode" title={item.menuName} />
  })
  return (
    <Tree
      checkable
      onExpand={onExpand}
      onCheck={onCheck}
      onSelect={onSelect}
      selectedKeys={defaultCheckedKeys}
      defaultCheckedKeys={defaultCheckedKeys}
      checkedKeys={defaultCheckedKeys}
      checkStrictly={false}
      autoExpandParent={false}
    >
      {nodeArray instanceof Array ? loop(nodeArray) : []}
    </Tree>
  )
}

Treee.propTypes = {
  nodeArray: PropTypes.array,
  defaultCheckedKeys: PropTypes.array,
  getSelectId: PropTypes.func,
  getSelectedKeys: PropTypes.func,
  dispatch: PropTypes.func,
  treeId: PropTypes.string,
  nameSpace: PropTypes.string,
  checkAble: PropTypes.bool,
  selectFlag: PropTypes.bool,
  checkStrictly: PropTypes.bool,
}

export default Treee
