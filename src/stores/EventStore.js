import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class EventsStore extends EventEmitter {
  constructor(){
    super();
    this.events = [],
    this.agenda = []
  }

  getAgenda(){
    return this.agenda;
  }

  getEvents(){
    return this.events;
  }

  fetchEvents(events){
    this.events = events;
    this.emit('change');
  }

  fetchAgenda(agenda){
    this.agenda = agenda;
    this.emit('change');
  }

  // TODO what ahppens when the add to agenda action is dispatched
  // There should be a little spinner on the button
  addToAgenda(agenda){
    // TODO add code here
    this.emit('change');
  }

  handleActions(action){
    switch(action.type){
      case "FETCH_EVENTS_SUCCESS": {
        this.fetchEvents(action.events)
      }
      case "FETCH_AGENDA_SUCCESS": {
        this.fetchAgenda(action.agenda)
      }
      case "ADDING_TO_AGENDA_SUCCESS": {
        this.addToAgenda(action.agenda)
      }
    }
  }

}

const eventsStore = new EventsStore;
dispatcher.register(eventsStore.handleActions.bind(eventsStore));

export default eventsStore;
