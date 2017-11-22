import Axios from 'axios';
import config from '../config';
import userService from './userService';

const host = config.api_host;

const speakerApi = {

  // Retrieve all posts from the server
  getSpeakers: function(cb){
    Axios({
      method: 'get',
      url: host + 'speakers/',
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
  },

  // Retrieve all posts from the server
  getSingleSpeaker: function(id, cb){
    Axios({
      method: 'get',
      url: host + 'speakers/' + id,
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

export default speakerApi;
