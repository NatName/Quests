import axios from 'axios';
const API_URL = 'http://localhost:4000';

export class APIService{
  constructor(){
  }
  getInfoQuests() {
    const url = `${API_URL}/main`;
    return axios.get(url).then(response => response.data);
  }
  getGeneralQuests() {
    const url = `${API_URL}/info`;
    return axios.get(url).then(response => response.data["first"]);
  }
  getFinishedQuests() {
    const url = `${API_URL}/info`;
    return axios.get(url).then(response => response.data["second"]);
  }
}
