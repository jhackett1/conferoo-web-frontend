import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class PollsStore extends EventEmitter {
  constructor(){
    super();
    this.polls = []
  }

  getPolls(){
    return this.polls;
  }

  fetchPolls(polls){
    this.polls = polls;
    this.emit('change');
  }

  updateResponses(updatedPoll){


    // Look through the polls for one with the same ID, then update it
    for(var i in this.polls){
      if (this.polls[i]._id === updatedPoll._id) {
        this.polls[i] = updatedPoll;
        this.emit('change');
      }
    }
  }

  handleActions(action){
    switch(action.type){
      case "FETCH_POLLS_SUCCESS": {
        this.fetchPolls(action.polls)
      }
      case "RESPONDING_TO_POLL_SUCCESS": {
        this.updateResponses(action.poll)
      }
    }
  }

}

const pollsStore = new PollsStore;
dispatcher.register(pollsStore.handleActions.bind(pollsStore));


export default pollsStore;
