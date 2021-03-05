import React, { Component } from 'react'
import TeamDataService from '../services/team.service'
import CharacterSelect from './CharacterSelect'

export default class Team extends Component {
  constructor(props) {
    super(props)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeSlot1 = this.onChangeSlot1.bind(this)
    this.onChangeSlot2 = this.onChangeSlot2.bind(this)
    this.onChangeSlot3 = this.onChangeSlot3.bind(this)
    this.onChangeSlot4 = this.onChangeSlot4.bind(this)
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
        slot1: '',
        slot2: '',
        slot3: '',
        slot4: '',
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

  onChangeSlot1(e) {
    const slot1 = e.target.value
    console.log(slot1)
    this.setState((prevState) => ({
      currentTeam: {
        ...prevState.currentTeam,
        slot1: slot1,
      },
    }))
  }

  onChangeSlot2(e) {
    const slot2 = e.target.value

    this.setState((prevState) => ({
      currentTeam: {
        ...prevState.currentTeam,
        slot2: slot2,
      },
    }))
  }

  onChangeSlot3(e) {
    const slot3 = e.target.value

    this.setState((prevState) => ({
      currentTeam: {
        ...prevState.currentTeam,
        slot3: slot3,
      },
    }))
  }

  onChangeSlot4(e) {
    const slot4 = e.target.value

    this.setState((prevState) => ({
      currentTeam: {
        ...prevState.currentTeam,
        slot4: slot4,
      },
    }))
  }

  getTeam(id) {
    TeamDataService.get(id)
      .then((response) => {
        this.setState({
          currentTeam: response.data,
        })
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
      slot1: this.state.currentTeam.slot1,
      slot2: this.state.currentTeam.slot2,
      slot3: this.state.currentTeam.slot3,
      slot4: this.state.currentTeam.slot4,
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
          <div style={{ lineHeight: '2.5' }}>
            <form>
              <div>
                <label htmlFor='title'>title</label>
                <input type='text' id='title' value={currentTeam.title} onChange={this.onChangeTitle} />
              </div>
              <div>
                <label htmlFor='description'>description</label>
                <input type='text' id='description' value={currentTeam.description} onChange={this.onChangeDescription} />
              </div>
              <label>composition</label>
              <div style={{ display: 'flex', width: '600px', justifyContent: 'space-between', marginTop: '.5rem' }}>
                <div>
                  <CharacterSelect value={currentTeam.slot1} onChange={this.onChangeSlot1} />
                </div>
                <div>
                  <CharacterSelect value={currentTeam.slot2} onChange={this.onChangeSlot2} />
                </div>
                <div>
                  <CharacterSelect value={currentTeam.slot3} onChange={this.onChangeSlot3} />
                </div>
                <div>
                  <CharacterSelect value={currentTeam.slot4} onChange={this.onChangeSlot4} />
                </div>
              </div>
            </form>
            <br />
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
