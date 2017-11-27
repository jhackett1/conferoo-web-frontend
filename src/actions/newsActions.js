import dispatcher from '../dispatcher';
import updatesApi from '../services/updatesApi';

export function fetchNews(callback){
  console.log(callback)
  // Fire initial event
  dispatcher.dispatch({
    type: 'FETCHING_NEWS'
  })
  // Make API call
  updatesApi.getUpdates((err, response)=>{
    dispatcher.dispatch({
      type: 'FETCH_NEWS_SUCCESS',
      news: response
    })
  })
}
