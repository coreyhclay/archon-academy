import React, { Component } from 'react'
import TeamDataService from '../services/team.service'

export default class Team extends Component {
  constructor(props) {
    super(props)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.getTeam = this.getTeam.bind(this)
    this.updatePublished = this.updatePublished.bind(this)
    this.updateTeam = this.updateTeam.bind(this)
    this.deleteTeam = this.deleteTeam.bind(this)

    this.state = {
      currentTeam: {
        id: null,
        title: '',
        description: '',
        published: false,
      },
      message: '',
    }
  }

  componentDidMount() {
    this.getTeam(this.props.match.params.id)
  }

  onChangeTitle(e) {
    const title = e.target.value

    this.setState(function (prevState) {
      return {
        currentTeam: {
          ...prevState.currentTeam,
          title: title,
        },
      }
    })
  }

  onChangeDescription(e) {
    const description = e.target.value

    this.setState((prevState) => ({
      currentTeam: {
        ...prevState.currentTeam,
        description: description,
      },
    }))
  }

  getTeam(id) {
    TeamDataService.get(id)
      .then((response) => {
        this.setState({
          currentTeam: response.data,
        })
        // console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTeam.id,
      title: this.state.currentTeam.title,
      description: this.state.currentTeam.description,
      published: status,
    }

    TeamDataService.update(this.state.currentTeam.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentTeam: {
            ...prevState.currentTeam,
            published: status,
          },
        }))
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  updateTeam() {
    TeamDataService.update(this.state.currentTeam.id, this.state.currentTeam)
      .then((response) => {
        console.log(response.data)
        this.setState({
          message: 'The team was updated successfully!',
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  deleteTeam() {
    TeamDataService.delete(this.state.currentTeam.id)
      .then((response) => {
        console.log(response.data)
        this.props.history.push('/teams')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { currentTeam } = this.state

    return (
      <div className='box'>
        {currentTeam ? (
          <div>
            <h4>{currentTeam.title}</h4>
            <form>
              <div>
                <label htmlFor='title'>title</label>
                <input type='text' id='title' value={currentTeam.title} onChange={this.onChangeTitle} />
              </div>
              <div>
                <label htmlFor='description'>description</label>
                <input type='text' id='description' value={currentTeam.description} onChange={this.onChangeDescription} />
              </div>

              <div>
                <label>
                  <strong>status:</strong>
                </label>
                {currentTeam.published ? 'published' : 'pending'}
              </div>
            </form>
            <div style={{ display: 'flex', width: '400px', justifyContent: 'space-between', marginTop: '1rem' }}>
              {currentTeam.published ? <button onClick={() => this.updatePublished(false)}>unpublish</button> : <button onClick={() => this.updatePublished(true)}>publish</button>}

              <button onClick={this.deleteTeam}>delete</button>

              <button type='submit' onClick={this.updateTeam}>
                update
              </button>
            </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>please click on a team...</p>
          </div>
        )}
      </div>
    )
  }
}
