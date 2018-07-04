import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Table, Button } from 'antd'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
require('./EditTable.css')

const EditableTable = ({ dispatch, loading, dataSourceMtd, pagination, tableColumns, addFlag, count, newData, nameSpace, addVisible, onPageChange }) => {
/*  const onPageChange=(page)=>{
    const location=this.props
    const {query,pathname}=this.props.location
    this.props.dispatch(routerRedux.push({
      pathname,
      query:{
        ...query,
        page: page.current,
        pageSize:page.pageSize
      }
    }))
  }*/
  const handleAdd = () => {
    if (!addFlag) {
      return
    }
    count++
    dispatch({
      type: `${nameSpace}/changeKey`,
      payload: {
        count,
      },
    })
    dispatch({
      type: `${nameSpace}/changePage`,
    })
    dispatch({
      type: `${nameSpace}/pushNewData`,
      payload: {
        newData,
        count,
      },
    })
  }
  const dataSource2 = dataSourceMtd.map((item) => {
    const obj = {}
    Object.keys(item).forEach((key) => {
      obj[key] = key === 'key' ? item[key] : item[key].value
    })
    return obj
  })
  let addVisibleFlag = null
  addVisible ? addVisibleFlag = addVisible : addVisibleFlag = false
  const getBodyWrapperProps = {
   // page: location.query.page,
    current: pagination.current,
  }
  const getBodyWrapper = body => <AnimTableBody {...getBodyWrapperProps} body={body} />
  return (
    <div>
      {addVisibleFlag ? '' :
        <Button className="editable-add-btn" onClick={handleAdd}>
          +添加
        </Button>
      }
      <br /><br />
      <Table
        loading={loading}
        bordered
        dataSource={dataSource2}
        columns={tableColumns}
        pagination={pagination}
        onChange={onPageChange}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}
EditableTable.propTypes = {
  loading: PropTypes.bool,
  dataSourceMtd: PropTypes.array,
  pagination: PropTypes.object,
  dispatch: PropTypes.func,
  tableColumns: PropTypes.array,
  addFlag: PropTypes.bool,
  count: PropTypes.number,
  newData: PropTypes.object,
  nameSpace: PropTypes.string,
  addVisible: PropTypes.bool,
  onPageChange: PropTypes.func,
  location: PropTypes.object,
}
export default connect()(EditableTable)
