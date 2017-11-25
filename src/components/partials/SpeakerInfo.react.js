import React, {Component} from 'react';
import speakerApi from '../../services/speakerApi';

// Flux stuff
import speakerStore from '../../stores/SpeakerStore';
import * as speakerActions from '../../actions/speakerActions';

class SpeakerInfo extends Component {
  constructor(){
    super();
    this.state= {
      speakers: speakerStore.getSpeakers()
    }
  }

  componentWillMount(){
    // Fetch new server data on route load
    speakerActions.fetchSpeakers(this.props.history);
    // Subscribe state to store changes
    speakerStore.on('change', ()=>{
      this.setState({
        speakers: speakerStore.getSpeakers()
      })
    })
  }

  render(){

    let speaker = this.state.speakers.filter((speaker)=>{
      return speaker._id === this.props.id
    })[0];

    if(speaker){
      return(
        <div className="speaker-info-item">
          <img className="speaker-pic" alt={speaker.name} src={speaker.preview}/>
          <div>
            <h4 className="speaker-name" >{speaker.name}</h4>
            <h5 className="speaker-position" >{speaker.position}</h5>
            <p className="speaker-bio" >{speaker.biography}</p>
          </div>
        </div>
      )
    } else {
      return null;
    }

  }
}

export default SpeakerInfo;
