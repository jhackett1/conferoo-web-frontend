import Axios from 'axios';
import config from '../config';
import userService from './userService';

const host = config.api_host;

const updatesApi = {

  // Retrieve all posts from the server
  getUpdates: function(cb){
    Axios({
      method: 'get',
      url: host + 'posts/',
      headers: {
        Authorization: userService.getToken()
      }
    })
      .then(function(response){
        // Filter the response to hide posts that are not flagged as public
        var processedData = response.data.filter(function(update){
          return update.published === 'public';
        })
        cb(null, processedData)
      })
      .catch(function(err){
        cb(err, null)
      })
  },

  // Retrieve all posts from the server
  getSingleUpdate: function(id, cb){
    Axios({
      method: 'get',
      url: host + 'posts/' + id,
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

export default updatesApi;
