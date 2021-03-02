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
            <img src={logo} alt='aa' style={{ width: '50px', marginLeft: '50px' }} />
          </Link>
          <div className='navlinks'>
            {showAdminBoard && <Link to={'/admin'}>admin board</Link>}
            {currentUser && <Link to={'/teams'}>teams</Link>}
            {currentUser && <Link to={'/add'}>add</Link>}
            {currentUser ? (
              <div>
                <Link to={'/profile'}>{currentUser.username}</Link>
                <a href='/login' onClick={this.logOut}>
                  logout
                </a>
              </div>
            ) : (
              <div>
                <Link to={'/login'}>login</Link>
                <Link to={'/register'}>sign up</Link>
              </div>
            )}
          </div>
        </div>

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
