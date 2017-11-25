import dispatcher from '../dispatcher';
import agendaApi from '../services/agendaApi';

export function fetchAgenda(alert){
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
  })
};

export function addToAgenda(eventId, agenda){
  // Fire initial event
  dispatcher.dispatch({
    type: "ADDING_TO_AGENDA"
  })
  // Construct the new agenda
  agenda.push(eventId);
  let updatedAgenda = agenda;
  // Make API call
  agendaApi.updateAgenda(updatedAgenda, (err, response)=>{
    if(err) return dispatcher.dispatch({type: 'ADDING_TO_AGENDA_ERROR'});
    dispatcher.dispatch({
      type: 'ADD_TO_AGENDA_SUCCESS',
      agenda: response
    })
  })
}

export function removeFromAgenda(eventId, agenda){
  // Fire initial event
  dispatcher.dispatch({
    type: "REMOVING_FROM_AGENDA"
  })
  // Pull out the specified ID
  let index = agenda.indexOf(eventId);
  if (index >= 0) {
    agenda.splice( index, 1 );
  }
  let updatedAgenda = agenda;
  // Make API call
  agendaApi.updateAgenda(updatedAgenda, (err, response)=>{
    if(err) return dispatcher.dispatch({type: 'REMOVING_FROM_AGENDA_ERROR'});
    dispatcher.dispatch({
      type: 'REMOVING_FROM_AGENDA_SUCCESS',
      agenda: response
    })
  })
}
