import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';
import '../../styles/info.css';

// Flux stuff
import infoStore from '../../stores/InfoStore';
import * as infoActions from '../../actions/infoActions';

class Info extends Component {
  constructor(){
    super();
    this.state = {
      pages: infoStore.getAll()
    }
  }

  componentWillMount(){
    infoStore.on('change', ()=>{
      this.setState({
        pages: infoStore.getAll()
      })
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
          <h5>{this.props.profile.displayname}</h5>
          <p>{this.props.profile.email}</p>
        </div>
        <img src={this.props.profile.image ? this.props.profile.image : '/user.png'}/>
      </div>
    );

    const PageList = this.state.pages.map((pageItem, i)=>{
      return(
          <li key={pageItem._id}>
            <div>
              <h5>{pageItem.title}</h5>
            </div>
          </li>
      )
    })

    return (
      <div className="container">
        <ul className="info-list">

          <LogOut/>
          {PageList}
        </ul>
      </div>
    );
  }
}

export default Info;
