import { Input, Select, DatePicker, InputNumber, Button } from 'antd'
import React from 'react'
import moment from 'moment'
const dateFormat = 'YYYY/MM/DD'
/**
 * 根据不同的tagTyp生成相应的组件
 * @param tagType
 * @param value
 * @param handleChange
 * @param handleChangeSelect
 * @param onChange
 * @returns {XML}
 */
export default function editCell (editProps, editFun) {
  const { handleChange, handleChangeSelect, onChange } = editFun
  const { tagType, value, keyWord, editCellOptions } = editProps
  const searchCellBtn = editProps.searchCellBtn || null
  if (tagType === 'input') {
    return <Input defaultValue={value} onChange={handleChange} />
  } else if (tagType === 'datePicker') {
    return <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} onChange={onChange} />
  } else if (tagType === 'select') {
    return <Select value={value} onChange={handleChangeSelect}>{editCellOptions[keyWord].map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}</Select>
  } else if (tagType === 'inputNum') {
    return <InputNumber min={0} max={1} value={value} step={0.1} onChange={handleChangeSelect} />
  } else if (tagType === 'button') {
    return <div><Input defaultValue={value} style={{ width: '80%', maxWidth: '100px' }} onChange={handleChange} /><Button type="primary" icon="search" onClick={searchCellBtn || ''} /></div>
  } else if (tagType === 'p') {
    return <p>查看</p>
  }
  return tagType
}
