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
      <Link to='/info' className="logout">
        <p>{this.state.profile.displayName}</p>
        <img alt={this.state.profile.displayName} src={this.state.profile.image ? this.state.profile.image : '/user.png'}/>
      </Link>
    );
  }
};

export default LogoutButton;
