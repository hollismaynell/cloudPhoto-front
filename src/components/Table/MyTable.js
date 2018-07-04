import { Table, Button } from 'antd'

class MyTable extends React.Component {
  constructor (props) {
    super(props)
  }

  /* state = {
    selectedRowKeys: [],  // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }*/
  render () {
    /* const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;*/
    return (
      <div>
        <Table
          columns={this.props.tableColumns}
          bordered
        />
      </div>
    )
  }
}

export default MyTable
