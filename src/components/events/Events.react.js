import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import '../../styles/events.css';
import '../../styles/news.css';
import Browse from './Browse.react';
import Agenda from './Agenda.react';
import SingleEvent from './SingleEvent.react';

import * as eventActions from '../../actions/eventsActions';

class Events extends Component{
  constructor(){
    super();
    this.state = {
      id: false
    }
  }

  showSingle = (id) => {
    this.setState({
      id: id
    })
  }

  // Method to close single article view
  closeSingleView = () => {
    this.setState({
      id: false
    })
  }

  render(){
      // Render the single event detail view
      const Single = () => {
        if(this.state.id){
          return(
            <SingleEvent id={this.state.id} close={this.closeSingleView}/>
          )
        } else {
          return null;
        }
      }

    return(
      <div className="container">
        <ul className="sub-nav">
          <NavLink exact to="/events">Browse events</NavLink>
          <NavLink to="/events/agenda">My agenda</NavLink>
        </ul>
        <Route path="/events/agenda" render={() => <Agenda showSingle={this.showSingle} />}/>
        <Route exact path="/events" render={() => <Browse showSingle={this.showSingle} />}/>
        <Single/>
      </div>
    )
  }
}

export default Events;
