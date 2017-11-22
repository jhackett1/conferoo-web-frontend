import React, { Component } from 'react';
import config from '../../config';

import eventStore from '../../stores/EventStore';
import * as eventActions from '../../actions/eventsActions';
import agendaStore from '../../stores/AgendaStore';

class Browse extends Component{
  constructor(props){
    super(props);
    this.state = {
      events: eventStore.getEvents(),
      agenda: agendaStore.getAgenda(),
      themeFilter: 'all',
      venueFilter: 'all'
    }
  }

  componentWillMount(){
    // When the view is navigated to, fetch new data from the server
    eventActions.fetchEvents();
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
    // Apply the selected filters to the results
    let filteredEvents = this.state.events
      .filter((event)=>{
        return this.state.themeFilter === 'all' || event.themes.includes(this.state.themeFilter);
      })
      .filter((event)=>{
        return this.state.venueFilter === 'all' || event.venue === this.state.venueFilter;
      })

    // List of event LI elements
    const EventList = (filteredEvents.map((eventItem, i)=>{
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
                <h5>{(eventItem.duration == 60) ? '1 hour' : eventItem.duration + ' minutes'}  <span>{eventItem.themes.join(', ')}</span></h5>
                {(this.state.agenda.includes(eventItem._id))? <i class="fa fa-bookmark attendance attending"></i> : <i class="fa fa-bookmark-o attendance"></i> }
              </div>
            </li>
          )
        }))

    // Populate venue filter options
    const venueOptions = config.venues.map((venue)=>{
      return (
        <option key={venue} value={venue}>{venue}</option>
      )
    })

    // Populate theme filter options
    const themeOptions = config.themes.map((theme)=>{
      return (
        <option key={theme} value={theme}>{theme}</option>
      )
    })

    const NoResults = () => {
      return (
        <div className="message">
          <h2>No results</h2>
          <p>Try removing some filters.</p>
        </div>
      )
    }

    return(
      <div>
        <ul className="event-filters">
          <li>
            <select type="select" onChange={(e)=>{
              this.setState({venueFilter: e.target.value})
            }}>
              <option value='all'>All venues</option>
              {venueOptions}
            </select>
          </li>
          <li>
            <select type="select" onChange={(e)=>{
              this.setState({themeFilter: e.target.value})
            }}>
              <option value='all'>All themes</option>
              {themeOptions}
            </select>
          </li>
        </ul>
        <ul className="event-items-list">
          {(filteredEvents.length > 0) ? EventList : <NoResults/>}
        </ul>
      </div>
    )
  }
}

export default Browse;
