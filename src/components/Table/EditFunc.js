import { Popconfirm } from 'antd'
import React from 'react'
export default function editFunc (text, record, index, dataSourceModels, dispatch, nameSpace) {
  const { dataSource, oldDataSource, addArr } = dataSourceModels
  const keys = []
  for (let item in record) {
    if (record.hasOwnProperty(item)) {
      keys.push(item)
    }
  }
  let editFlag = keys[1]
  const { editable } = dataSource[index][editFlag]
  // 表格里面的编辑按钮
  const edit = (i) => {
    dispatch({
      type: `${nameSpace}/saveEditIndex`,
      payload: {
        editIndex: i,
      },
    })
    dispatch({
      type: `${nameSpace}/saveOldData`,
      payload: {
        oldData: dataSource[i],
      },
    })
    Object.keys(dataSource[i]).forEach((item) => {
      if (dataSource[i][item] && typeof dataSource[i][item].editable !== 'undefined') {
        dispatch({
          type: `${nameSpace}/showInput`,
          payload: {
            i,
            item,
            currentItem: dataSource[i][item].editable,
          },
        })
      }
    })
  }
  // 表格中的刪除按鈕
  const onDelete = (i) => {
    let newDataSource = dataSource.filter((item) => {
      return item.key !== dataSource[i].key
    })
    dispatch({
      type: `${nameSpace}/deleteCol`,
      payload: {
        dataSource: newDataSource,
      },
    })
  }
  // 表格中编辑按钮 保存/取消
  const editDone = (jindex, type) => {
    let oldData
    for (let i = 0; i < oldDataSource.length; i++) {
      if (dataSource[jindex].key === oldDataSource[i].key) {
        oldData = oldDataSource[i]
      }
    }
    if (type === 'cancel') {
      dispatch({
        type: `${nameSpace}/cancelSave`,
        payload: {
          oldData,
          jindex,
        },
      })
    }
    Object.keys(dataSource[jindex]).forEach((item) => {
      if (dataSource[jindex][item] && typeof dataSource[jindex][item].editable !== 'undefined') {
        dispatch({
          type: `${nameSpace}/hideInput`,
          payload: {
            jindex,
            item,
            type,
          },
        })
      }
    })
    if (addArr.length === '1') {
      dispatch({
        type: `${nameSpace}/clearAddArr`,
        payload: {
          jindex,
        },
      })
    }
  }
  return (
    <div className="editable-row-operations">
      {
        editable ?
          <span>
            <a onClick={() => editDone(index, 'save')}>保存</a>
            <Popconfirm title="确定取消?" onConfirm={() => editDone(index, 'cancel')}>
              <a> 取消 </a>
            </Popconfirm>
            <Popconfirm title="确定删除?" onConfirm={() => onDelete(index)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
          :
          <span>
            <a onClick={() => edit(index)}>编辑</a>
          </span>
      }
    </div>
  )
}
