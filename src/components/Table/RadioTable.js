import React, { PropTypes } from 'react'
import { Table } from 'antd'
import style from './radioTable.less'
/* 表格动画*/
import AnimTableBody from '../../components/DataTable/AnimTableBody'

function RadioTable ({ loading, dataSource, pagination, columns, onPageChange, onChangeRadio, selectedRows }) {
/*  const onRowClick=(record,index,event)=>{
    console.log(record)
    console.log(index)
    event.target.parentElement.style.background='#ccc'
  }*/
  const rowSelection = {
    type: 'radio',
    onChange: (selectedRowKeys, selectedRow) => {
      onChangeRadio(selectedRow)
      selectedRows = selectedRow
    },

    onSelect: (record, selected) => {
      console.log(selected, selectedRows)
    },
    onSelectAll: (selected, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  }
  /* 表格动画---start*/
  const getBodyWrapperProps = {
    page: pagination ? pagination.page : 1,
    current: pagination ? pagination.current : 10,
  }
  const getBodyWrapper = body => <AnimTableBody {...getBodyWrapperProps} body={body} />
  /* 表格动画---end*/
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Table
          className={style.marsRadioTable}
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          loading={loading}
          onChange={onPageChange}
          pagination={pagination}
          getBodyWrapper={getBodyWrapper}
        />
      </div>
    </div>
  )
}

RadioTable.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  selectedRows: PropTypes.array,
  pagination: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  columns: PropTypes.object,
  onPageChange: PropTypes.func,
  onChangeRadio: PropTypes.func,
}

export default RadioTable
