import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class SpeakerStore extends EventEmitter {
  constructor(){
    super();
    this.speakers = []
  }

  getSpeakers(){
    return this.speakers;
  }

  fetchSpeakers(speakers){
    this.speakers = speakers;
    this.emit('change');
  }

  handleActions(action){
    switch(action.type){
      case "FETCH_SPEAKERS_SUCCESS":
        this.fetchSpeakers(action.speakers)
        break;

      default:
        break;
    }
  }

}

const speakerStore = new SpeakerStore;
dispatcher.register(speakerStore.handleActions.bind(speakerStore));


export default speakerStore;
