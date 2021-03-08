import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'http://localhost:8080/api/'

class TeamDataService {
  getAll() {
    return axios.get(API_URL + 'teams', { headers: authHeader() })
  }

  get(id) {
    // console.log(API_URL + `teams/${id}`, { headers: authHeader() })
    return axios.get(API_URL + `teams/${id}`, { headers: authHeader() })
  }

  create(data) {
    return axios.post(API_URL + 'teams', data, { headers: authHeader() })
  }

  update(id, data) {
    // console.log(API_URL + `teams/${id}`, data, { headers: authHeader() })
    return axios.put(API_URL + `teams/${id}`, data, { headers: authHeader() })
  }

  delete(id) {
    return axios.delete(API_URL + `teams/${id}`, { headers: authHeader() })
  }

  deleteAll() {
    return axios.delete(API_URL + 'teams', { headers: authHeader() })
  }

  findByTitle(title) {
    return axios.get(API_URL + `teams?title=${title}`, { headers: authHeader() })
  }
}

export default new TeamDataService()
