import React, { Component } from 'react';
import Humandate from 'human-date';
import readingTime from 'reading-time';
import SpeakerInfo from '../partials/SpeakerInfo.react';

import speakerStore from '../../stores/SpeakerStore';

class SingleNewsMobile extends Component {
  constructor(){
    super();
    this.state= {
      speakers: speakerStore.getSpeakers(),
      speakerName: ''
    }
  }

  componentWillMount(){
    // Subscribe state to store changes
    speakerStore.on('change', ()=>{
      this.setState({
        speakers: speakerStore.getSpeakers()
      })
    })
  }

  render() {

    let speaker = this.state.speakers.filter((speaker)=>{
      return speaker._id === this.props.update.author;
    })[0].name;

    return(
        <article className="single-update" key="1">
          <div className="header">
            <div className="container">
              <i onClick={this.props.close} className="fa fa-arrow-left"></i> <span onClick={this.props.close}>{this.props.update.title}</span>
            </div>
          </div>
          <div className="scrollable-view">
            <img className="poster" src={this.props.update.image} alt={this.props.update.title}/>
            <div className="meta">
              <h5>{Humandate.relativeTime(this.props.update.createdAt)}</h5>
              <h1>{this.props.update.title}</h1>
              <h5>By {speaker}  |  {readingTime(this.props.update.content).text}</h5>
            </div>
            <div className="body-content" dangerouslySetInnerHTML={{__html: this.props.update.content}}>
            </div>
            <div className="event-content">
            <SpeakerInfo id={this.props.update.author}/>
            </div>
          </div>
        </article>
    );
  }
}

export default SingleNewsMobile;
