import React, { Component } from 'react'
import TeamDataService from '../services/team.service'
import { Link } from 'react-router-dom'

export default class TeamsList extends Component {
  constructor(props) {
    super(props)
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this)
    this.retrieveTeams = this.retrieveTeams.bind(this)
    this.refreshList = this.refreshList.bind(this)
    this.setActiveTeam = this.setActiveTeam.bind(this)
    this.searchTitle = this.searchTitle.bind(this)

    this.state = {
      teams: [],
      currentTeam: null,
      currentIndex: -1,
      searchTitle: '',
    }
  }

  componentDidMount() {
    this.retrieveTeams()
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value

    this.setState({
      searchTitle: searchTitle,
    })
  }

  retrieveTeams() {
    TeamDataService.getAll()
      .then((response) => {
        this.setState({
          teams: response.data,
        })
        // console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  refreshList() {
    this.retrieveTeams()
    this.setState({
      currentTeam: null,
      currentIndex: -1,
    })
  }

  setActiveTeam(team, index) {
    this.setState({
      currentTeam: team,
      currentIndex: index,
    })
  }

  searchTitle() {
    this.setState({
      currentTeam: null,
      currentIndex: -1,
    })

    TeamDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          teams: response.data,
        })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { searchTitle, teams, currentTeam } = this.state

    return (
      <div className='box'>
        <div className='boxgrid'>
          <div className='item-a'>
            <input type='text' placeholder='search by title' value={searchTitle} onChange={this.onChangeSearchTitle} />
            <button type='button' onClick={this.searchTitle}>
              search
            </button>
          </div>
          <div className='item-b'>
            <h4>teams</h4>
            <ul className='teamslist'>
              {teams &&
                teams.map((team, index) => (
                  <li style={{ marginTop: '.5rem' }} onClick={() => this.setActiveTeam(team, index)} key={index}>
                    {team.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className='item-c'>
            {currentTeam ? (
              <div>
                <h4>{currentTeam.title}</h4>
                <div>
                  <label>
                    <strong>description:</strong>
                  </label>{' '}
                  {currentTeam.description}
                </div>
                <div>
                  <label>
                    <strong>status:</strong>
                  </label>{' '}
                  {currentTeam.published ? 'published' : 'pending'}
                </div>
                <div>
                  <label>
                    <strong>slot1:</strong>
                  </label>{' '}
                  {currentTeam.slot1}
                </div>
                <div>
                  <label>
                    <strong>slot2:</strong>
                  </label>{' '}
                  {currentTeam.slot2}
                </div>
                <div>
                  <label>
                    <strong>slot3:</strong>
                  </label>{' '}
                  {currentTeam.slot3}
                </div>
                <div>
                  <label>
                    <strong>slot4:</strong>
                  </label>{' '}
                  {currentTeam.slot4}
                </div>
                <Link to={'/teams/' + currentTeam.id}>
                  <button style={{ marginTop: '20px' }} type='button'>
                    edit
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>choose a team...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
