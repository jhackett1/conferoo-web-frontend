import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class EventsStore extends EventEmitter {
  constructor(){
    super();
    this.events = []
  }

  getEvents(){
    return this.events;
  }

  fetchEvents(events){
    this.events = events;
    this.emit('change');
  }

  willAttend(eventId){
    // Search out the right record...
    var index = this.events.findIndex((event)=>{
      return event._id === eventId;
    })
    // ...and update it
    this.events[index]['attending'] = true;
    this.emit('change');
    console.log('store updated with: ', this.events[index])
  }
  willNotAttend(eventId){
    // Search out the right record...
    var index = this.events.findIndex((event)=>{
      return event._id === eventId;
    })
    // ...and update it
    // this.events[index].attending = false;
    this.emit('change');
  }

  handleActions(action){
    switch(action.type){
      case "FETCH_EVENTS_SUCCESS": {
        this.fetchEvents(action.events)
      }
      case "ADDING_TO_AGENDA_SUCCESS": {
        this.willAttend(action.eventId)
        console.log('store case firing')
      }
      case "REMOVING_FROM_AGENDA_SUCCESS":
        this.willNotAttend(action.eventId)
        break;

      default:
        break;
    }
  }

}

const eventsStore = new EventsStore;
dispatcher.register(eventsStore.handleActions.bind(eventsStore));


export default eventsStore;
