import dispatcher from '../dispatcher';
import pageApi from '../services/pageApi';

export function fetchInfo(){
  // Fire initial event
  dispatcher.dispatch({
    type: 'FETCHING_INFO'
  })
  // Make API call
  pageApi.getList((err, response)=>{
    if(err) return;
    dispatcher.dispatch({
      type: 'FETCH_INFO_SUCCESS',
      info: response
    })
  })
}
