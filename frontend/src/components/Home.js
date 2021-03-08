import React, { Component } from 'react'
import fancylogo from '../resources/images/fancylogo.png'
import cathedral from '../resources/images/cathedral.png'

export default class Home extends Component {
  render = () => (
    <div className='index-wrapper'>
      <img src={cathedral} alt='cathedral' style={{ position: 'absolute', zIndex: -1 }} />
      <h2>welcome to</h2>
      <h1>ARCHON ACADEMY</h1>
      <div className='line'></div>
      <img src={fancylogo} alt='fancylogo' style={{ width: '350px' }} />
    </div>
  )
}
