import React, { Component } from 'react';
import config from '../../config';
import FeedbackModal from '../partials/FeedbackModal.react';


class Login extends Component {
  constructor(){
    super();
    this.state = {
      modalVisible: false
    }
  }

  //Send user to Google on click
  handleClick(){
    var urlBuilder = [];
    urlBuilder.push('response_type=code', `client_id=${config.google_client_id}`, `redirect_uri=${window.location.origin}/login/callback`, 'scope=profile email');
    const url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlBuilder.join('&');
    // Open the popup window
    window.location.href = url;
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    return (
      <div className="login-box">
              <p className="login-info">Use your <strong>@faststream.civilservice.gov.uk</strong> account to see info and updates about the conference, answer polls and send in questons.</p>
              <button onClick={this.handleClick} className="btn filled"><i className="fa fa-google"></i> Log in with Google</button>
              <a className="login-trouble" onClick={()=>{
                this.setState({
                  modalVisible: true
                })
              }}>Having trouble?</a>
              <FeedbackModal show={this.state.modalVisible} handleClose={this.closeModal}/>
      </div>
    );
  }
}

export default Login;
