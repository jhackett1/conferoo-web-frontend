import dispatcher from '../dispatcher';
import pollsApi from '../services/pollsApi';
import userService from '../services/userService'

export function fetchPolls(){
  // Fire initial event
  dispatcher.dispatch({
    type: 'FETCHING_POLLS'
  })
  // Make API call
  pollsApi.getPolls((err, response)=>{
    if(err) return dispatcher.dispatch({type: 'FETCH_POLLS_ERROR'});
    dispatcher.dispatch({
      type: 'FETCH_POLLS_SUCCESS',
      polls: response
    })
  })
};

export function respondToPoll(id, option){
  dispatcher.dispatch({
    type: 'RESPONDING_TO_POLL'
  })
  // Get the user's email to prevent duplicate responses
  let email = userService.getProfile().email;
  // Make the API call and dispatch the success event
  pollsApi.respond(id, option, email, (err, response)=>{
    dispatcher.dispatch({
      type: 'RESPONDING_TO_POLL_SUCCESS',
      poll: response
    })
  })
}
