import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthService from '../services/auth.service'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: '' },
    }
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser()

    if (!currentUser) this.setState({ redirect: '/Home' })
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state

    return (
      <div className='box'>
        {this.state.userReady ? (
          <div>
            <header>
              <label style={{ margin: 'auto' }}>{currentUser.username}</label>
            </header>
            <p>
              <strong>TOKEN:</strong> {currentUser.accessToken.substring(0, 20)} ... {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
              <strong>ID:</strong> {currentUser.id}
            </p>
            <p>
              <strong>EMAIL:</strong> {currentUser.email}
            </p>
            <strong>AUTHORITY: </strong>
            {currentUser.roles}
          </div>
        ) : null}
      </div>
    )
  }
}
