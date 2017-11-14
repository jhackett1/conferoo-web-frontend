import React, { Component } from 'react';
import config from '../../config';

class Login extends Component {

  //Send user to Google on click
  handleClick(){
    var urlBuilder = [];
    urlBuilder.push('response_type=code', `client_id=${config.google_client_id}`, `redirect_uri=${window.location.origin}/login/callback`, 'scope=profile email');
    const url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlBuilder.join('&');
    // Open the popup window
    window.location.href = url;
  }

  render() {
    return (
      <div className="login-box">
              <p className="login-info">Use your <strong>@faststream.civilservice.gov.uk</strong> account to see info and updates about the conference, answer polls and send in questons.</p>
              <a onClick={this.handleClick} className="btn"><span className="fa fa-google"></span>Log in with Google</a>
              <a className="login-trouble">Having trouble?</a>
      </div>
    );
  }
}

export default Login;
