import React, { Component } from 'react';
import Axios from 'axios';
import userService from '../../services/userService';

class FeedbackModal extends Component{
  constructor(){
    super();
    this.state = {
      situation: '',
      problem: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
     });
  };

  handleSubmit = (e) => {
    const webhookUrl = 'https://hooks.slack.com/services/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';
    // Stop page refresh
    e.preventDefault();
    // Get the user's profile
    if (userService.checkToken()) {
      var user = userService.getProfile();
    } else {
      var user = 'Unknown';
    }
    // Construct the message
    let message = {
      text: `New support request from *${user.displayName}* using *Conferoo Web*`,
      attachments: [
        {
          fallback: this.state.problem,
          title:  this.state.situation,
          text: this.state.problem,
          author_name: user.displayName,
          title_link: user.email
        }
      ]
    }
    let closeMethod = this.props.handleClose;
    // Make the POST request to Slack
    Axios({
      method: 'post',
      url: webhookUrl,
      data: JSON.stringify(message)
    })
      .then(function(response){
        // TOAST and close
        closeMethod()
      })
      .catch(function(err){
        console.log(err)
      })

  }

  render(){

    if(this.props.show){
      return (
        <section className="feedback modal">
          <i className="fa fa-close" onClick={this.props.handleClose}></i>
          <form onSubmit={this.handleSubmit}>
            <input name="situation" onChange={this.handleChange} value={this.state.situation} type="text" placeholder="What were you doing?"></input>
            <input name="problem" onChange={this.handleChange} value={this.state.problem} type="text" placeholder="What went wrong?"></input>
            <button className="btn" type="submit">Send</button>
          </form>
        </section>
      );
    } else {
      return null;
    }

  }

}

export default FeedbackModal;
