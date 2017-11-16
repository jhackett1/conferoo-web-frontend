import React, { Component } from 'react';
import Humandate from 'human-date';
import readingTime from 'reading-time';
import agendaApi from '../../services/agendaApi';
import * as eventActions from '../../actions/eventsActions';

class SingleEvent extends Component {
  render() {

    const AgendaBtn = () =>{
      if(this.props.event.attending === true){
        return(
          <a class="agenda-btn remove" onClick={()=>{
            agendaApi.removeFromAgenda(this.props.event._id, (err, response)=>{
              if(err) console.log(err)
            })
          }}>Remove from agenda</a>
        );
      } else {
        return(
          <a class="agenda-btn" onClick={eventActions.addToAgenda}>Add to agenda +</a>
        );
      }
    }

    return(
        <article className="single-event" key="1">
          <div className="header">
            <i class="fa fa-arrow-left" onClick={this.props.close}></i>
          </div>
          <div className="scrollable-view">
            <img className="poster" src={this.props.event.image} alt={this.props.event.title}/>
            <div className="meta">
              <h5>At <strong>{this.props.event.time}</strong></h5>
              <h1>{this.props.event.title}</h1>
              <h5>In <strong>{this.props.event.venue}</strong></h5>
            </div>
            <AgendaBtn/>
            <div className="body-content" dangerouslySetInnerHTML={{__html: this.props.event.content}}>
            </div>
          </div>
        </article>
    );
  }
}

export default SingleEvent;
