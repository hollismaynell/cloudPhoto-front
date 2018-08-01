import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
// import { DropOption } from '../../../components/index'
// import { JobGroupTypeSelect } from '../../../../utils/selectData'

// const style = {
//   marginTop: '15%',
// }

const List = ({ dispatch, pagination, isMotion, ...tableProps }) => {
  const { columns } = tableProps

  const getBodyWrapperProps = {
    page: pagination.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  // const title = () => { return <h3>超时批量处理</h3> }
  return (
    <div style={{ marginBottom: '5vh' }} >
      <Table
        {...tableProps}
        // title={title}
        bordered
        columns={columns}
        rowKey={record => record.id}
        pagination={pagination}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  dispatch: PropTypes.func,
  isMotion: PropTypes.bool,
  pagination: PropTypes.object,
}

export default List
