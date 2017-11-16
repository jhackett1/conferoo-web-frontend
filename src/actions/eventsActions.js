import dispatcher from '../dispatcher';
import eventsApi from '../services/eventsApi';
import agendaApi from '../services/agendaApi';

export function fetchEvents(){
  // Fire initial event
  dispatcher.dispatch({
    type: 'FETCHING_EVENTS'
  })
  // Make API call
  eventsApi.getEvents((err, response)=>{
    if(err) return dispatcher.dispatch({type: 'FETCH_EVENTS_ERROR'});
    dispatcher.dispatch({
      type: 'FETCH_EVENTS_SUCCESS',
      events: response
    })
  })
};

export function fetchAgenda(){
  // Fire initial event
  dispatcher.dispatch({
    type: 'FETCHING_AGENDA'
  })
  // Make API call
  agendaApi.listAgenda((err, response)=>{
    if(err) return dispatcher.dispatch({type: 'FETCH_AGENDA_ERROR'});
    dispatcher.dispatch({
      type: 'FETCH_AGENDA_SUCCESS',
      agenda: response
    })
  });
};

export function addToAgenda(eventId){
  dispatcher.dispatch({
    type: 'ADDING_TO_AGENDA'
  })
  // Make API call
  agendaApi.addToAgenda(eventId, (err, response)=>{
    if(err) return dispatcher.dispatch({type: 'ADDING_TO_AGENDA_ERROR'});
    dispatcher.dispatch({
      type: 'ADDING_TO_AGENDA_SUCCESS',
      agenda: response
    })
  });
}
