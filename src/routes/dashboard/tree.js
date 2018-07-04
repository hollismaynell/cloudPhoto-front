import 'rc-tree/assets/index.css'
import React, { PropTypes } from 'react'
import Tree, { TreeNode } from 'rc-tree'

class Treee extends React.Component {
  render () {
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
    // const arr = this.props.nodeArray
     const defaultCheckedKeys = this.props.defaultCheckedKeys
    return (
      <Tree
        checkable
        //defaultSelectedKeys={defaultCheckedKeys}
        checkedKeys={defaultCheckedKeys}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode key="1" title="parent 01">
            <TreeNode title="leaf" key="3" />
            <TreeNode title="leaf" key="111" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="1111">
            <TreeNode title="parent 1-1-0" key="11111" disableCheckbox />
            <TreeNode title="parent 1-1-1" key="111111" />
          </TreeNode>
        </TreeNode>
      </Tree>
    )
  }
}
Treee.propTypes = {
  nodeArray: PropTypes.array,
  defaultCheckedKeys: PropTypes.array,
}
export default Treee
