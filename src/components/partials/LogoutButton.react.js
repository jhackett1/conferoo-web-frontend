import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

class LogoutButton extends Component{
  constructor(){
    super();
    this.state = {
      visible: false
    }
  }

  componentWillMount(){
    this.setState({
      profile: userService.getProfile()
    })
  }

  render(){
    return(
      <Link to='/info' class="logout">
        <p>{this.state.profile.displayname}</p>
        <img alt={this.state.profile.displayname} src={this.state.profile.image ? this.state.profile.image : '/user.png'}/>
      </Link>
    );
  }
};

export default LogoutButton;
