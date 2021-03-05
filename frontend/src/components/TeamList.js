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
            <label>teams</label>
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
              <div style={{ lineHeight: '2.5' }}>
                <div>
                  <strong>TITLE:</strong> {currentTeam.title}
                </div>
                <div>
                  <strong>DESCRIPTION:</strong> {currentTeam.description}
                </div>

                <div>
                  <strong>CHARACTER #1:</strong> {currentTeam.slot1}
                </div>
                <div>
                  <strong>CHARACTER #2:</strong> {currentTeam.slot2}
                </div>
                <div>
                  <strong>CHARACTER #3:</strong> {currentTeam.slot3}
                </div>
                <div>
                  <strong>CHARACTER #4:</strong> {currentTeam.slot4}
                </div>
                <div>
                  <strong>STATUS:</strong> {currentTeam.published ? 'published' : 'pending'}
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
