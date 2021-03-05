import React, { Component } from 'react'
import fancylogo from '../resources/images/fancylogo.png'
import cathedral from '../resources/images/cathedral.png'
import UserService from '../services/user.service'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        })
      },
      (error) => {
        this.setState({
          content: (error.response && error.response.data) || error.message || error.toString(),
        })
      }
    )
  }

  render() {
    return (
      <div className='index-wrapper'>
        <img src={cathedral} alt='cathedral' style={{ position: 'absolute', zIndex: -1 }} />
        <h2>welcome to</h2>
        <h1>ARCHON ACADEMY</h1>
        <div className='line'></div>
        <img src={fancylogo} alt='fancylogo' style={{ width: '350px' }} />
      </div>
    )
  }
}
