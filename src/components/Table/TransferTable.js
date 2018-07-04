/**
	 *
	 * @Description(功能描述)    : TransferTable
	 * @author(作者)             :  李迎春
	 * @date (开发日期)          :  2017/5/25 15:26
	 * @param  request
	 * @param  response
	 * @return  Object
	 */
import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Col, Row, Button, Table } from 'antd'
import CheckBoxTable from './CheckBoxTable'
import style from './TransferTable.css'


const TransferTable = ({ leftTableProps, rightTableProps, rightOperation, leftOperation, visible }) => {
  console.log('rightTableProps.dataSource.length=========', rightTableProps.dataSource.length)
  // 是否展示
  if (rightTableProps.dataSource.length > 0) {
    visible = true
  }
  function onLeftOperation () {
    console.log('rightTableProps.dataSource', rightTableProps.dataSource)
    leftOperation()
  }
  function onRightOperation () {
    rightOperation()
  }
  console.log('visible=========', visible)
  return (
    <div className={style.contentInner}>
      {/* 左边table*/}
      <div className={style.leftTransferTable}>
        <CheckBoxTable {...leftTableProps} />
      </div>
      {/* 中间操作按钮*/}
      <div className={style.transferOperation}>
        <Button type="primary" onClick={onLeftOperation} className={style.buttonOperation} >
          &gt;&gt;
        </Button>
        <br />
      </div>
      {/* 右边table*/}
      <div className={style.rightTransferTable} >
        {visible ? <Button type="danger" onClick={onRightOperation}>
          -批量删除
        </Button> : ''}
        {visible ? <CheckBoxTable {...rightTableProps} /> : ''}
      </div>
    </div>


  )
}


export default TransferTable
