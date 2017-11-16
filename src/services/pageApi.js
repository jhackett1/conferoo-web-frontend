import Axios from 'axios';
import config from '../config';
import userService from './userService';

const host = config.api_host;

const pagesApi = {

  // Retrieve all pages from the server
  getList: function(cb){
    Axios({
      method: 'get',
      url: host + 'pages/',
      headers: {
        Authorization: userService.getToken()
      }
    })
      .then(function(response){
        // Filter the response to hide pages that are not flagged as public
        var processedData = response.data.filter(function(update){
          return update.published === 'public';
        })
        cb(null, processedData)
      })
      .catch(function(err){
        cb(err, null)
      })
  },

  // Retrieve all pages from the server
  getSinglePage: function(id, cb){
    Axios({
      method: 'get',
      url: host + 'pages/' + id,
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

export default pagesApi;
