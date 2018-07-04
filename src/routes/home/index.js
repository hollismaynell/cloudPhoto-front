// import './main.js'
import './index.less'
import React from 'react'
import logo from './logo'
import Login from '../login'
import { config } from '../../utils'
const { homeBg } = config
class LogoGather extends React.Component {
  static propTypes = {
    image: React.PropTypes.string,
    w: React.PropTypes.number,
    h: React.PropTypes.number,
    findDOMNode: React.PropTypes.func,
    pixSize: React.PropTypes.number,
    pointSizeMin: React.PropTypes.number,
  }

  static defaultProps = {
    image: logo,
    className: 'logo-gather-demo',
    w: 300,
    h: 300,
    pixSize: 20,
    pointSizeMin: 10,
  }


  render () {
    return (<div className="logo-gather-demo-wrapper" style={{ width: '100vw', height: '100vh' }}>
      <div>
        <iframe src={homeBg} scrolling="no" style={{ width: '100%', height: '100vh', border: 'none' }}></iframe>
      </div>
      <Login />
    </div>)
  }
}

export default LogoGather
