import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class InfoStore extends EventEmitter {
  constructor(){
    super();
    this.info = []
  }

  getAll(){
    return this.info;
  }

  fetchInfo(info){
    this.info = info;
    this.emit('change');
  }

  handleActions(action){
    switch(action.type){
      case "FETCH_INFO_SUCCESS": {
        this.fetchInfo(action.info);
      }
    }
  }

}

const infoStore = new InfoStore;
dispatcher.register(infoStore.handleActions.bind(infoStore));

export default infoStore;
