import React, { Component } from 'react'
import TeamDataService from '../services/team.service'

export default class AddTeam extends Component {
  constructor(props) {
    super(props)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.saveTeam = this.saveTeam.bind(this)
    this.newTeam = this.newTeam.bind(this)

    this.state = {
      id: null,
      title: '',
      description: '',
      published: false,
      submitted: false,
    }
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    })
  }

  saveTeam() {
    var data = {
      title: this.state.title,
      description: this.state.description,
    }

    TeamDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true,
        })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  newTeam() {
    this.setState({
      id: null,
      title: '',
      description: '',
      published: false,
      submitted: false,
    })
  }

  render() {
    return (
      <div className='box '>
        <div>
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button onClick={this.newTeam}>Add</button>
            </div>
          ) : (
            <div>
              <div>
                <label htmlFor='title'>title</label>
                <input type='text' id='title' required value={this.state.title} onChange={this.onChangeTitle} name='title' />
              </div>

              <div>
                <label htmlFor='description'>description</label>
                <input type='text' id='description' required value={this.state.description} onChange={this.onChangeDescription} name='description' />
              </div>

              <button onClick={this.saveTeam} style={{ marginTop: '1.5rem' }}>
                submit
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
