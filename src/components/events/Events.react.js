import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import '../../styles/events.css';
import Browse from './Browse.react';
import Agenda from './Agenda.react';
import Spinner from '../partials/Spinner.react';

// Flux
import eventStore from '../../stores/EventStore';
import * as eventActions from '../../actions/eventsActions';

class Events extends Component{
  constructor(){
    super();
    this.state = {
      events: eventStore.getEvents(),
      agenda: eventStore.getAgenda()
    }
  }

  // On render, load in data from server
  componentWillMount(){
    eventStore.on('change', ()=>{
      this.setState({
        events: eventStore.getEvents(),
        agenda: eventStore.getAgenda()
      })
    })
  }

  render(){
    return(
      <div className="container">
        <ul className="sub-nav">
          <NavLink exact to="/events">Browse events</NavLink>
          <NavLink to="/events/agenda">My agenda</NavLink>
        </ul>
        <Route path="/events/agenda" render={() => <Agenda events={this.state.agenda} />}/>
        <Route exact path="/events" render={() => <Browse events={this.state.events} />}/>
      </div>
    )
  }
}

export default Events;
