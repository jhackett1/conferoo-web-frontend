import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import config from '../../config';
import userService from '../../services/userService';
import Spinner from '../partials/Spinner.react';

// Flux
import * as newsActions from '../../actions/newsActions';
import * as eventsActions from '../../actions/eventsActions';
import * as agendaActions from '../../actions/agendaActions';
import * as pollActions from '../../actions/pollActions';
import * as infoActions from '../../actions/infoActions';

class LoginCallback extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
    this.postAccessCode = this.postAccessCode.bind(this);
  };

  // Now send the auth code to the server via HTTP post
  postAccessCode = (code) => {
    var postData = code;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      var status = request.status;
      let data;
      if(request.readyState === 4){
        // If authentication was successful, save the token
        if(status===200){
          data = JSON.parse(request.responseText);
          userService.saveToken(data.token);
          userService.saveProfile(data);
          // Now we have a token, make an initial call to the server for all data
          newsActions.fetchNews();
          eventsActions.fetchEvents();
          agendaActions.fetchAgenda();
          pollActions.fetchPolls();
          infoActions.fetchInfo();
          // And redirect us

          // Is the user logging in for the first time?
          if (data.onboarded === true) {
            this.setState({
              redirect: '/'
            })
          } else {
            this.setState({
              redirect: '/onboarding'
            })
          }
        // If authentication fails
        } else if(status===401) {
          data = JSON.parse(request.responseText);
          this.setState({
            redirect: '/login'
          })
        // For all other errors
        } else {
          this.setState({
            redirect: '/login'
          })
        }
      }
    }.bind(this);
    request.open('POST', config.api_host + 'authenticate');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
      code: postData,
      redirectUri: 'http://localhost:3000/login/callback',
      // redirectUri: 'http://admin.fsconference.co.uk/login/callback',
      clientId: config.google_client_id
    }));
  }

  componentWillMount(){

    // Check whether we have an access code, and if we have it, post it to the Conferoo server
    if(window.location.search.substring(1)){
      // Process the auth code
      var params = window.location.search.substring(1);
      var pair = params.split('=');
      var code = decodeURIComponent(pair[1]);
      // Send the code onto the backend server and save the token on the client
      this.postAccessCode(code);
    }
  }

  render() {
    if(!this.state.redirect === false){
        return (
          <Redirect to={this.state.redirect} />
        );
    } else {
        return (
          <Spinner isLoading={true}/>
        );
    }

  }
}

export default LoginCallback;
