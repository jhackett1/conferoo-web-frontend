import React, { Component } from 'react';
import '../../styles/polls.css'
import Humandate from 'human-date';
import MultipleChoicePoll from './MultipleChoicePoll.react';

import pollStore from '../../stores/PollStore';
import * as pollActions from '../../actions/pollActions';

class Polls extends Component{
  constructor(props){
    super(props);
    this.state = {
      polls: pollStore.getPolls()
    }
  }

  componentWillMount(){
    // Load new data from server on view load
    pollActions.fetchPolls();
    // Detect changes in the store and update state
    pollStore.on('change', ()=>{
      this.setState({
        polls: pollStore.getPolls()
      })
    })
  }

  render(){

    const PollList = (this.state.polls.map((pollItem, i)=>{
          var animStyle = {
            animationDelay: i*0.2 + 's'
          }

          if(pollItem.type === 'open'){
            return(
              <li style={animStyle} key={pollItem._id} className="poll-item open">
                <div>
                  <h3>{pollItem.question}</h3>
                  <p>{pollItem.detail}</p>
                  <form>
                    <input type="text" name="response"/>
                    <button className="btn filled" type="submit">Respond</button>
                  </form>
                  <h5>Started {Humandate.relativeTime(pollItem.createdAt)}</h5>
                </div>
              </li>
            )
          } else {
            return(
              <MultipleChoicePoll poll={pollItem} i={i}/>
            )
          }

        }))

    return(
      <div className="container">
        <ul className="poll-items-list">
          {(this.state.polls.length > 0) ? PollList :
            <div className="message">
              <h2>There's nothing here</h2>
              <p>No polls have been created yet. Check back later in the conference.</p>
            </div>
          }
        </ul>
      </div>
    )
  }
}

export default Polls;
