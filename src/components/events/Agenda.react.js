import React, { Component } from 'react';

class Agenda extends Component{
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


    if (this.props.events.length == 0) {
      return(
        <div className="onboarding-message">
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
