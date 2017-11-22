import React, { Component } from 'react';
import { Route, Redirect, NavLink, withRouter } from 'react-router-dom';
import userService from '../../services/userService';
import userApi from '../../services/usersApi';
import '../../styles/onboarding.css';

class Onboarding extends Component {
  constructor(){
    super();
    this.state = {
      programme: 'Thursday',
      redirect: false
    }
  }

  handleChange = (e) => {
    this.setState({
      programme: e.target.value
     });
  };

  handleSubmit = (e) => {
    // Stop page refresh
    e.preventDefault();
    //Now make a PATCH request to the specific user endpoint
    let user = userService.getProfile();
    // Take the user's programme preference
    let updatedUser = {
      onboarded: true,
      programme: this.state.programme
    }
    // Update the server
    userApi.updateUser(user._id, updatedUser, (err, response)=>{
      if(err) console.log(err);
      // Update the local record of the user's profile
      userService.saveProfile(response);
      // If successful, redirect the user to home
      this.setState({
        redirect: '/'
      })
    })
  }

  render(){

    const Slide1 = withRouter(({ history}) => (
      <div className="onboarding-item">
        <img src="/onboarding1.svg" alt=""/>
        <h2 className="onboarding-heading">Set your agenda</h2>
        <p className="onboarding-text">Browse the talks on offer and save the ones you like.</p>
        <button className="btn" onClick={()=>{history.push('/onboarding/2')}}>Next</button>
      </div>
    ))

    const Slide2 = withRouter(({ history}) => (
      <div className="onboarding-item">
        <img src="/onboarding2.svg" alt=""/>
        <h2 className="onboarding-heading">Join in</h2>
        <p className="onboarding-text">Answer polls, send in questions and see what other delegates are thinking.</p>
        <button className="btn" onClick={()=>{history.push('/onboarding/3')}}>Next</button>
      </div>
    ))

    const Slide3 = withRouter(({ history}) => (
      <div className="onboarding-item">
        <img src="/onboarding3.svg" alt=""/>
        <h2 className="onboarding-heading">Get informed</h2>
        <p className="onboarding-text">Find out about the story behind this year's conference and what to expect.</p>
        <button className="btn" onClick={()=>{history.push('/onboarding/4')}}>Next</button>
      </div>
    ))

    const Slide4 = () => (
      <div className="onboarding-item">
        <h2 className="onboarding-heading">Just one more thing</h2>
        <h4>Which day of the conference are you attending?</h4>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.programme} name="programme" onChange={this.handleChange}>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
          <p className="onboarding-text">We need this in order to show the events you can attend.</p>
          <button className="btn filled" type="submit">Get started</button>
        </form>
        {(this.state.redirect)? <Redirect to={this.state.redirect}/> : null}
      </div>
    )

    return(
      <div>
        <Route exact path="/onboarding" component={Slide1}/>
        <Route exact path="/onboarding/2" component={Slide2}/>
        <Route exact path="/onboarding/3" component={Slide3}/>
        <Route exact path="/onboarding/4" component={Slide4}/>

        <ul className="onboarding-dots">
          <NavLink exact to="/onboarding"></NavLink>
          <NavLink exact to="/onboarding/2"></NavLink>
          <NavLink exact to="/onboarding/3"></NavLink>
          <NavLink exact to="/onboarding/4"></NavLink>
        </ul>
      </div>
    )
  }
}

export default Onboarding;
