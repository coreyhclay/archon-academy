import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import AuthService from './services/auth.service'

import AddTeam from './components/AddTeam'
import Team from './components/EditTeam'
import TeamsList from './components/TeamList'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import BoardAdmin from './components/AdminBoard'
import logo from './resources/images/logo.png'
import './resources/style.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser()

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      })
    }
  }

  logOut() {
    AuthService.logout()
  }

  render() {
    const { currentUser, showAdminBoard } = this.state

    return (
      <div>
        <div className='nav'>
          <Link to={'/'}>
            <img src={logo} alt='aa' style={{ width: '50px', marginLeft: '3rem' }} />
          </Link>
          <div className='navlinks'>
            {showAdminBoard && (
              <Link className='marginRight' to={'/admin'}>
                admin board
              </Link>
            )}
            {currentUser && (
              <Link className='marginRight' to={'/teams'}>
                teams
              </Link>
            )}
            {currentUser && (
              <Link className='marginRight' to={'/add'}>
                add
              </Link>
            )}
            {currentUser ? (
              <div>
                <Link className='marginRight' to={'/profile'}>
                  {currentUser.username}
                </Link>
                <a className='marginRight' href='/login' onClick={this.logOut}>
                  logout
                </a>
              </div>
            ) : (
              <div>
                <Link className='marginRight' to={'/login'}>
                  login
                </Link>
                <Link className='marginRight' to={'/register'}>
                  register
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/admin' component={BoardAdmin} />
            <Route exact path='/teams' component={TeamsList} />
            <Route exact path='/add' component={AddTeam} />
            <Route path='/teams/:id' component={Team} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
