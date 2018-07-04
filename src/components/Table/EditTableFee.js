/* 促销设置弹框--table--新增*/
import React from 'react'
import { routerRedux, browserHistory } from 'dva/router'
import { Table, Button, Popconfirm } from 'antd'
require('./EditTable.css')


class EditableTableFee extends React.Component {
  constructor (props) {
    super(props)
  }

  onPageChange=(page) => {
    const location = this.props
    const { query, pathname } = this.props.location
    this.props.dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        page: page.current,
        pageSize: page.pageSize,
      },
    }))
  }
  handleAdd = () => {
    if (!this.props.addFlag) {
      return
    }
    let count = this.props.count
    const newData = {
      key: count,
      tnrOpt: {
        value: '12个月',
        editable: true,
        tagType: 'select',
        options: [
          { value: '按天', name: '按天' },
          { value: '3个月', name: '3个月' },
          { value: '6个月', name: '6个月' },
          { value: '12个月', name: '12个月' },
          { value: '18个月', name: '18个月' },
        ],
      },
      mtdTyp: {
        value: '等额本息',
        editable: true,
        tagType: 'select',
        options: [
          { value: '等额本息', name: '等额本息' },
          { value: '等额本金', name: '等额本金' },
        ],
      },
      specialInd: {
        value: '是',
        editable: true,
        tagType: 'select',
        options: [
          { value: '是', name: '是' },
          { value: '否', name: '否' },
        ],
      },
      intRat: {
        value: '1',
        editable: true,
        tagType: 'inputNum',
      },
      fixedOdInd: {
        value: '是',
        editable: true,
        tagType: 'select',
        options: [
          { value: '是', name: '是' },
          { value: '否', name: '否' },
        ],
      },
      odIntRate: {
        value: '1',
        editable: true,
        tagType: 'inputNum',
      },
    }
    count++
    this.props.dispatch({
      type: `${this.props.nameSpace}/changeKey`,
      payload: {
        count,
      },
    })
    this.props.dispatch({
      type: `${this.props.nameSpace}/changePage`,
    })
    this.props.dispatch({
      type: `${this.props.nameSpace}/pushNewData`,
      payload: {
        newData,
        count,
      },
    })
  }
  render () {
    const dataSourceMtd = this.props.dataSourceMtd
    const pagination = this.props.pagination
    const dataSource2 = dataSourceMtd.map((item) => {
      const obj = {}
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value
      })
      return obj
    })
    const columns = this.props.tableColumns
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>
          +添加
        </Button>
        <br /><br />
        <Table
          bordered
          dataSource={dataSource2}
          columns={columns}
          pagination={pagination}
          onChange={this.onPageChange}
        />
      </div>
    )
  }
}


export default EditableTableFee
