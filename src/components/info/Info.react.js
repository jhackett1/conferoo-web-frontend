import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import userService from '../../services/userService';
import '../../styles/info.css';
import FeedbackModal from '../partials/FeedbackModal.react';

// Flux stuff
import infoStore from '../../stores/InfoStore';
import * as infoActions from '../../actions/infoActions';

class Info extends Component {
  constructor(){
    super();
    this.state = {
      pages: infoStore.getAll(),
      selected: '',
      userProfile: userService.getProfile(),
      modalVisible: false
    }
  }

  componentWillMount(){
    // Fetch info when view is nagivated to
    infoActions.fetchInfo();
    // Subscribe state to changes in store
    infoStore.on('change', ()=>{
      this.setState({
        pages: infoStore.getAll()
      })
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  render() {

    const LogOut = withRouter(({ history }) => (
      <li className="info-item action" onClick={() => {
        userService.removeToken();
        history.push('/login');
      }}><h5>Log out</h5></li>
    ))

    const Feedback = () => (
      <li className="info-item action" onClick={() => {
        this.setState({
          modalVisible: true
        })
      }}><h5>Something not working?</h5></li>
    )

    const UserProfile = () => (
      <div className="user-profile">
        <div>
          <h5>{this.state.userProfile.displayName}</h5>
          <p>{this.state.userProfile.email}</p>
        </div>
        <img src={this.state.userProfile.image ? this.state.userProfile.image : '/user.png'}/>
      </div>
    );

    const PageList = this.state.pages.map((pageItem, i)=>{
      return(
          <li className={(this.state.selected === i)? 'active info-item' : 'info-item'} key={pageItem._id} onClick={()=>{
            this.setState({
              selected: i,
              modalVisible: false
            })
          }}>
            <h5>{pageItem.title}</h5>
            <article dangerouslySetInnerHTML={{__html: pageItem.content}}></article>
          </li>
      )
    })

    return (
      <div className="container">
        <ul className="info-list">
          <UserProfile/>
          {PageList}
          <Feedback/>
          <LogOut/>
        </ul>
        <FeedbackModal show={this.state.modalVisible} close={this.closeModal}/>
      </div>
    );
  }
}

export default Info;
