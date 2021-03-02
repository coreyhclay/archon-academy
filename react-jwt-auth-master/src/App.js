import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AuthService from './services/auth.service'

import AddTeam from './components/add-team.component'
import Team from './components/team.component'
import TeamsList from './components/teams-list.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Home from './components/home.component'
import Profile from './components/profile.component'
import BoardAdmin from './components/board-admin.component'
import logo from './resources/images/aa.png'

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
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={'/'} className='navbar-brand'>
            <div>
              <img src={logo} alt='aa' style={{ width: '50px' }} />
            </div>
          </Link>
          <div className='navbar-nav mr-auto'>
            {showAdminBoard && (
              <li className='nav-item'>
                <Link to={'/admin'} className='nav-link'>
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className='nav-item'>
                <Link to={'/teams'} className='nav-link'>
                  Teams
                </Link>
              </li>
            )}

            {currentUser && (
              <li className='nav-item'>
                <Link to={'/add'} className='nav-link'>
                  Add
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/profile'} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className='container mt-3'>
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
