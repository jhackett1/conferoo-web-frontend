import React, { Component } from 'react';

import eventStore from '../../stores/EventStore';
import agendaStore from '../../stores/AgendaStore';

class Agenda extends Component{
  constructor(props){
    super(props);
    this.state = {
      events: eventStore.getEvents(),
      agenda: agendaStore.getAgenda()
    }
  }

  componentWillMount(){
    // Detect changes in the stores and update state
    eventStore.on('change', ()=>{
      this.setState({
        events: eventStore.getEvents()
      })
    })
    agendaStore.on('change', ()=>{
      this.setState({
        agenda: agendaStore.getAgenda()
      })
    })
  }

  render(){
    // Filter the full list of events to those whose ids are included in the agenda
    let agenda = this.state.events.filter((event)=>{
      return this.state.agenda.includes(event._id);
    })

    // List each update in state
    const EventList = agenda.map((eventItem, i)=>{
      var animStyle = {
        animationDelay: i*0.2 + 's'
      }
      return(
        <li style={animStyle} key={eventItem._id} onClick={()=>{
          this.props.showSingle(eventItem._id)
        }}>
          <img src={eventItem.preview}/>
          <div>
            <p>{eventItem.time}</p>
            <h3>{eventItem.title}</h3>
            <h5>{eventItem.themes.join(' ')}</h5>
          </div>
        </li>
      )
    })

    if (agenda.length == 0) {
      return(
        <div className="message">
          <h2>There's nothing here</h2>
          <p>You can browse through the events on offer and mark the ones you're interested in.</p>
        </div>
      );
    } else {
      return(
        <div>
          <ul className="event-items-list">
            {EventList}
          </ul>
        </div>
      )
    }

  }
}

export default Agenda;
