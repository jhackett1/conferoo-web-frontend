import dispatcher from '../dispatcher';
import speakerApi from '../services/speakerApi';

export function fetchSpeakers(){
  // Fire initial event
  dispatcher.dispatch({
    type: 'FETCHING_SPEAKERS'
  })
  // Make API call
  speakerApi.getSpeakers((err, response)=>{
    if(err) return;
    dispatcher.dispatch({
      type: 'FETCH_SPEAKERS_SUCCESS',
      speakers: response
    })
  })
};
