import React, { Component } from 'react'
import TeamDataService from '../services/team.service'
import CharacterSelect from './CharacterSelect'

export default class AddTeam extends Component {
  constructor(props) {
    super(props)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeSlot1 = this.onChangeSlot1.bind(this)
    this.onChangeSlot2 = this.onChangeSlot2.bind(this)
    this.onChangeSlot3 = this.onChangeSlot3.bind(this)
    this.onChangeSlot4 = this.onChangeSlot4.bind(this)
    this.saveTeam = this.saveTeam.bind(this)
    this.newTeam = this.newTeam.bind(this)

    this.state = {
      id: null,
      title: '',
      description: '',
      published: false,
      slot1: '',
      slot2: '',
      slot3: '',
      slot4: '',
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

  onChangeSlot1(e) {
    this.setState({
      slot1: e.target.value,
    })
  }

  onChangeSlot2(e) {
    this.setState({
      slot2: e.target.value,
    })
  }

  onChangeSlot3(e) {
    this.setState({
      slot3: e.target.value,
    })
  }

  onChangeSlot4(e) {
    this.setState({
      slot4: e.target.value,
    })
  }

  saveTeam() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      slot1: this.state.slot1,
      slot2: this.state.slot2,
      slot3: this.state.slot3,
      slot4: this.state.slot4,
    }

    TeamDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          slot1: response.data.slot1,
          slot2: response.data.slot2,
          slot3: response.data.slot3,
          slot4: response.data.slot4,
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
      slot1: '',
      slot2: '',
      slot3: '',
      slot4: '',
      submitted: false,
    })
  }

  render() {
    return (
      <div className='box'>
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
              <div>
                <CharacterSelect value={this.state.slot1} onChange={this.onChangeSlot1} />
                <CharacterSelect value={this.state.slot2} onChange={this.onChangeSlot2} />
                <CharacterSelect value={this.state.slot3} onChange={this.onChangeSlot3} />
                <CharacterSelect value={this.state.slot4} onChange={this.onChangeSlot4} />
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
