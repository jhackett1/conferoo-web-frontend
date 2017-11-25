import dispatcher from '../dispatcher';
import eventsApi from '../services/eventsApi';

export function fetchEvents(){
  // Fire initial event
  dispatcher.dispatch({
    type: 'FETCHING_EVENTS'
  })
  // Make API call
  eventsApi.getEvents((err, response)=>{
    if(err) return;
    dispatcher.dispatch({
      type: 'FETCH_EVENTS_SUCCESS',
      events: response
    })
  })
};
