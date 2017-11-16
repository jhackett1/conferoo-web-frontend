import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class NewsStore extends EventEmitter {
  constructor(){
    super();
    this.news = [],
    this.loading = true;
  }

  getAll(){
    return this.news;
  }

  getLoading(){
    return this.loading;
  }

  fetchNews(news){
    this.news = news;
    this.loading = false;
    this.emit('change');
  }

  handleActions(action){
    switch(action.type){
      case "FETCH_NEWS_SUCCESS": {
        this.fetchNews(action.news);
      }
    }
  }

}

const newsStore = new NewsStore;
dispatcher.register(newsStore.handleActions.bind(newsStore));

export default newsStore;
