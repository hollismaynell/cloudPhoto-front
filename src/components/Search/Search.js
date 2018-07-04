import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styles from './Search.less'
import { FormattedMessage } from 'react-intl'
import { Input, Select, Button, Icon } from 'antd'

class Search extends React.Component {
  state = {
    clearVisible: false,
    selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : '',
    selectTyp: 'all',
  }
  handleSearch = () => {
    // e.preventDefault()
    let keyword = this.state.selectTyp
    const data = {}
    if (keyword === 'all') {
      let selectOpts = this.props.selectOptions
      for (let i = 0; i < selectOpts.length; i++) {
        if (selectOpts[i].titVal) {
          keyword = selectOpts[i].titVal
          data[keyword] = ReactDOM.findDOMNode(this.refs.searchInput).value
        }
      }
    } else {
      data[keyword] = ReactDOM.findDOMNode(this.refs.searchInput).value
    }
  /*  if (this.props.select) {
      data.field = this.state.selectValue
    }*/
    if (this.props.onSearch) this.props.onSearch(data)
  }
  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== '',
    })
  }
  handeleSelectChange = (e, value) => {
    this.setState({
      ...this.state,
      selectValue: value,
      selectTyp: e,
    })
  }
  handleClearInput = () => {
    ReactDOM.findDOMNode(this.refs.searchInput).value = ''
    this.setState({
      clearVisible: false,
    })
    this.handleSearch()
  }
  render () {
    const { size, select, selectOptions, selectProps, style, keyword, width = 'auto' } = this.props
    const { clearVisible } = this.state
    return (
      <Input.Group compact size={size} className={styles.search} style={style}>
        {select && <Select style={{ minWidth: '25%', width }} ref="searchSelect" onChange={this.handeleSelectChange} size={size} {...selectProps}>
          {selectOptions && selectOptions.map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}
        </Select>}
        <Input style={{ height: 'inherit', width: '45%' }} ref="searchInput" size={size} onChange={this.handleInputChange} onPressEnter={this.handleSearch} defaultValue={keyword} />
        <Button size={size} type="primary" onClick={this.handleSearch}><FormattedMessage id="search" /></Button>
        {clearVisible && <Icon type="cross" onClick={this.handleClearInput} />}
      </Input.Group>
    )
  }
}


Search.propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  selectProps: PropTypes.object,
  onSearch: PropTypes.func,
  selectOptions: PropTypes.array,
  style: PropTypes.object,
  keyword: PropTypes.string,
  width: PropTypes.number,
}

export default Search
