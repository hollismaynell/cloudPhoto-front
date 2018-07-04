/**
 *
 * @Description(功能描述)    : CheckBoxTable
 * @author(作者)             :  李迎春
 * @date (开发日期)          :  2017/5/25 15:10
 * @param  request
 * @param  response
 * @return  Object
 */
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table } from 'antd'

require('./EditTable.css')

const CheckBoxTable = ({ loading, dataSource, selectedRows, pagination, tableColumns, location, getSelectedRows }) => {
  const onPageChange = (page) => {
    // const location = this.props
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
  // 选中行
  const rowSelection = {
    type: 'checkbox',
    onSelect: (record, selected, selectedRow) => {
      console.log('selected', selected)
      console.log('selectedRow', selectedRow)
      console.log('record', record)

      selectedRows = []
      selectedRows = selectedRow
      getSelectedRows(selectedRows)
      /* selectedRow.forEach(function(index){
       console.log('selectedRow: ', selectedRow);
       console.log('selectedRowKey==='+index.key)
       console.log('selectedRowTempCde==='+index.tempCde)
       selectedRows.push(index.tempCde);
       })*/

      console.log('selectedRows: ', selectedRows)
    },

    onSelectAll: (selected, selectedRow, changeRow) => {
      selectedRows = []
      selectedRows = selectedRow
      getSelectedRows(selectedRows)
      console.log('selected', selected)
      console.log('selectedRow', selectedRow)
      console.log('changeRow', changeRow)
    },

    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  }

  console.log('location', location)
  console.log('dataSourceParam', dataSource)


  /* const dataSourceParam = dataSource.map((item) => {
   const obj = {};
   Object.keys(item).forEach((key) => {
   obj[key] = key === 'key' ? item[key] : item[key].value;
   });
   return obj;
   });*/


  return (
    <Table
      rowSelection={rowSelection}
      loading={loading}
      bordered
      dataSource={dataSource || ''}
      columns={tableColumns || ''}
      pagination={pagination || ''}
      onChange={onPageChange}
    />
  )
}

CheckBoxTable.propTypes = {
  dataSource: PropTypes.array,
  selectedRows: PropTypes.array,
  tableColumns: PropTypes.array,
  getSelectedRows: PropTypes.array,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  location: PropTypes.object,
  pagination: PropTypes.object,
}
export default connect()(CheckBoxTable)
