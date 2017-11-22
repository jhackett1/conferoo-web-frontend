import React, { Component } from 'react';
import Humandate from 'human-date';
import Spinner from '../partials/Spinner.react';
import SpeakerInfo from '../partials/SpeakerInfo.react';

import eventStore from '../../stores/EventStore';
import agendaStore from '../../stores/AgendaStore';
import * as agendaActions from '../../actions/agendaActions';

class SingleEvent extends Component {
  constructor(){
    super();
    this.state = {
      events: eventStore.getEvents(),
      agenda: agendaStore.getAgenda(),
      agendaLoading: false
    }
  }

  componentWillMount(){
    // Detect changes in the store and update state
    eventStore.on('change', ()=>{
      this.setState({
        events: eventStore.getEvents()
      })
    })
    agendaStore.on('change', ()=>{
      this.setState({
        agenda: agendaStore.getAgenda(),
        agendaLoading: false
      })
    })
  }

  render() {

    var index = this.state.events.findIndex((event)=>{
      return event._id === this.props.id;
    })

    const AgendaBtn = () =>{
      if(this.state.agenda.includes(this.state.events[index]._id)){
        return(
          <button class="agenda btn filled" onClick={()=>{
            agendaActions.removeFromAgenda(this.state.events[index]._id, this.state.agenda)
            this.setState({agendaLoading: true})
          }}><i class="fa fa-bookmark"></i> Remove from agenda</button>
        );
      } else {
        return(
          <button class="agenda btn" onClick={()=>{
            agendaActions.addToAgenda(this.state.events[index]._id, this.state.agenda)
            this.setState({agendaLoading: true})
          }}><i class="fa fa-bookmark-o"></i> Add to agenda</button>
        );
      }
    }

    const SlidesBtn = () =>{
      if(!this.state.events[index].slides){
        return(
          <span className="noslides">The speaker has not added any slides.</span>
        );
      } else {
        return(
          <button className="slides btn" target="blank" href={this.state.events[index].slides}><i class="fa fa-download"></i> Download slides</button>
        );
      }
    }

    return(
        <article className="single-update" key="1">
          <div className="header">
            <div className="container">
              <i onClick={this.props.close} className="fa fa-arrow-left"></i> <span onClick={this.props.close} >{this.state.events[index].title}</span>
            </div>
          </div>
          <div className="scrollable-view">
            <img className="poster" src={this.state.events[index].image} alt={this.state.events[index].title}/>
            <div className="meta">
              <h5>At {this.state.events[index].time} for {
                (this.state.events[index].duration === 60) ? '1 hour' : this.state.events[index].duration + ' minutes'
              }</h5>
              <h1>{this.state.events[index].title}</h1>
              <h5>In {this.state.events[index].venue}</h5>
              <AgendaBtn/>
              <Spinner size='inline' isLoading={this.state.agendaLoading} />
            </div>
            <div className="body-content">
              <h3>Description</h3>
              <p dangerouslySetInnerHTML={{__html: this.state.events[index].content}}></p>
            </div>
            <div className="event-content">
              <h3>Speaker</h3>
              <SpeakerInfo id={this.state.events[index].speaker}/>
              <h3>Slides</h3>
              <SlidesBtn/>
            </div>
          </div>
        </article>
    );
  }
}

export default SingleEvent;
