import Axios from 'axios';
import config from '../config';
import userService from './userService';

const host = config.api_host;

const eventsApi = {

  // Retrieve all posts from the server
  getEvents: function(cb){
    Axios({
      method: 'get',
      url: host + 'events/',
      headers: {
        Authorization: userService.getToken()
      }
    })
      .then(function(response){
        // Filter the response to hide posts that are not flagged as public
        var processedData = response.data.filter(function(event){
          return event.published !== 'private';
        })
        cb(null, processedData)
      })
      .catch(function(err){
        cb(err, null)
      })
  },

  // Retrieve all posts from the server
  getSingleEvent: function(id, cb){
    Axios({
      method: 'get',
      url: host + 'events/' + id,
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

export default eventsApi;
