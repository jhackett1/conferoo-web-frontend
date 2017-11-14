import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';
import '../../styles/info.css';

class Info extends Component {
  constructor(){
    super();
    this.state = {
      profile: {}
    }
  }

  componentWillMount(){
    this.setState({
      profile: userService.getProfile()
    })
  }

  render() {

    const LogOut = withRouter(({ history }) => (
      <li onClick={() => {
        userService.removeToken();
        history.push('/login');
      }}><h5>Log out</h5></li>
    ))

    const UserProfile = () => (
      <div className="user-profile">
        <div>
          <h5>{this.state.profile.displayname}</h5>
          <p>{this.state.profile.email}</p>
        </div>
        <img src={this.state.profile.image ? this.state.profile.image : '/user.png'}/>
      </div>
    );

    return (
      <div>
        <ul className="info-list">
          <UserProfile/>
          <LogOut/>
          <li>
            <h5>Install this app</h5>
            <p>You can install this app to use it offline.</p>
            </li>
          <li>
            <h5>Venue</h5>
          </li>
          <li>
            <h5>Getting here</h5>
          </li>
          <li>
            <h5>Ticketing</h5>
          </li>
        </ul>
      </div>
    );
  }
}

export default Info;
