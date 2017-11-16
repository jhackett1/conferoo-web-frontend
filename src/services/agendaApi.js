import Axios from 'axios';
import config from '../config';
import userService from './userService';

const host = config.api_host;

const agendaApi = {

  // Add a new event to agenda
  addToAgenda: function(eventId, cb){
    Axios({
      method: 'post',
      url: host + 'agenda/',
      headers: {
        Authorization: userService.getToken()
      },
      data: {
        event: eventId
      }
    })
      .then(function(response){
        cb(null, response.data)
      })
      .catch(function(err){
        cb(err, null)
      })
  },

  // Remove event from agenda
  removeFromAgenda: function(eventId, cb){
    Axios({
      method: 'delete',
      url: host + 'agenda',
      headers: {
        Authorization: userService.getToken()
      },
      data: {
        event: eventId
      }
    })
      .then(function(response){
        cb(null, response.data)
      })
      .catch(function(err){
        cb(err, null)
      })
  },

  // Remove event from agenda
  listAgenda: function(cb){
    Axios({
      method: 'get',
      url: host + 'agenda/',
      headers: {
        Authorization: userService.getToken()
      }
    })
      .then(function(response){
        cb(null, response.data)
      })
      .catch(function(err){
        cb(err, null)
      })
  }

}

export default agendaApi;
