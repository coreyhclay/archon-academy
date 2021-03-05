import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import AuthService from '../services/auth.service'

const required = (value) => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    )
  }
}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      username: '',
      password: '',
      loading: false,
      message: '',
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin(e) {
    e.preventDefault()

    this.setState({
      message: '',
      loading: true,
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push('/profile')
          window.location.reload()
        },
        (error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

          this.setState({
            loading: false,
            message: resMessage,
          })
        }
      )
    } else {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    return (
      <div className='box'>
        <div style={{ lineHeight: '2.5' }}>
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c
            }}
          >
            <div>
              <label htmlFor='username'>username</label>
              <Input type='text' name='username' value={this.state.username} onChange={this.onChangeUsername} validations={[required]} />
            </div>

            <div>
              <label htmlFor='password'>password</label>
              <Input type='password' name='password' value={this.state.password} onChange={this.onChangePassword} validations={[required]} />
            </div>

            <br />

            <div>
              <button style={{ marginTop: '1.5rem' }} disabled={this.state.loading}>
                login
              </button>
            </div>

            {this.state.message && (
              <div>
                <div role='alert'>{this.state.message}</div>
              </div>
            )}
            <CheckButton
              style={{ display: 'none' }}
              ref={(c) => {
                this.checkBtn = c
              }}
            />
          </Form>
        </div>
      </div>
    )
  }
}
