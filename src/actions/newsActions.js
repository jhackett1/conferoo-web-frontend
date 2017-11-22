import dispatcher from '../dispatcher';
import updatesApi from '../services/updatesApi';

export function fetchNews(){
  // Fire initial event
  dispatcher.dispatch({
    type: 'FETCHING_NEWS'
  })
  // Make API call
  updatesApi.getUpdates((err, response)=>{
    if(err) return ;
    dispatcher.dispatch({
      type: 'FETCH_NEWS_SUCCESS',
      news: response
    })
  })
}
