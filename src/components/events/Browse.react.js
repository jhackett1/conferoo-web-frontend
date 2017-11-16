import React, { Component } from 'react';
import eventsApi from '../../services/eventsApi';
import agendaApi from '../../services/agendaApi';
import SingleEvent from './SingleEvent.react';

class Browse extends Component{
  constructor(){
    super();
    this.state = {
      singleEvent: {},
      venueFilter: '',
      themeFilter: ''
    }
  }

  // Method to close single article view
  closeSingleView = () => {
    this.setState({
      singleEvent: {}
    })
  }

  render(){

    // List each update in state
    const EventList = this.props.events.map((eventItem, i)=>{
      var animStyle = {
        animationDelay: i*0.2 + 's'
      }
      return(
          <li style={animStyle} key={eventItem._id} onClick={()=>{
              this.setState({
                singleEvent: this.props.events[i]
              });
          }}>
            <img src={eventItem.preview}/>
            <div>
              <h5>{eventItem.themes.join(' ')}</h5>
              <h3>{eventItem.title}</h3>
              <p>At {eventItem.time} in {eventItem.venue}</p>
            </div>
          </li>
      )
    })

    const Single = () => {
      if(this.state.singleEvent.content){
        return(
          <SingleEvent key="2" event={this.state.singleEvent} close={this.closeSingleView}/>
        )
      } else {
        return null;
      }
    }

    return(
      <div>
        <ul className="event-filters">
          <li>
            <select type="select" onChange={(e)=>{
              this.setState({venueFilter: e.target.value})
            }}>
              <option>All venues</option>
            </select>
          </li>
          <li>
            <select type="select">
              <option>All themes</option>
            </select>
          </li>
        </ul>
        <ul className="event-items-list">
          {EventList}
        </ul>
        <Single/>
      </div>
    )
  }
}

export default Browse;
