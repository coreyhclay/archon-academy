import React, { Component } from 'react'
import TeamDataService from '../services/team.service'

export default class AddTeam extends Component {
  constructor(props) {
    super(props)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeslot1 = this.onChangeslot1.bind(this)
    this.onChangeslot2 = this.onChangeslot2.bind(this)
    this.onChangeslot3 = this.onChangeslot3.bind(this)
    this.onChangeslot4 = this.onChangeslot4.bind(this)
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

  onChangeslot1(e) {
    this.setState({
      slot1: e.target.value,
    })
  }

  onChangeslot2(e) {
    this.setState({
      slot2: e.target.value,
    })
  }

  onChangeslot3(e) {
    this.setState({
      slot3: e.target.value,
    })
  }

  onChangeslot4(e) {
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
                <label htmlFor='slot1'>slot1</label>
                <input type='text' id='slot1' required value={this.state.slot1} onChange={this.onChangeslot1} name='slot1' />
              </div>

              <div>
                <label htmlFor='slot2'>slot2</label>
                <input type='text' id='slot2' required value={this.state.slot2} onChange={this.onChangeslot2} name='slot2' />
              </div>

              <div>
                <label htmlFor='slot3'>slot3</label>
                <input type='text' id='slot3' required value={this.state.slot3} onChange={this.onChangeslot3} name='slot3' />
              </div>

              <div>
                <label htmlFor='slot4'>slot4</label>
                <input type='text' id='slot4' required value={this.state.slot4} onChange={this.onChangeslot4} name='slot4' />
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
