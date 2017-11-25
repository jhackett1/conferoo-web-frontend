import React, {Component} from 'react';
import userService from '../../services/userService';
import Responses from './Responses.react';

import Humandate from 'human-date';

import * as pollActions from '../../actions/pollActions';
import pollStore from '../../stores/PollStore';

class MultipleChoicePoll extends Component {
  constructor(){
    super();
    // Bool to keep track of
    this.state = {
      userHasResponded: false
    }
  }

  checkUserResponses = () => {
    for (var key in this.props.poll.responses) {
      if (!this.props.poll.responses.hasOwnProperty(key)) {
        continue;
      }
      if(this.props.poll.responses[key].includes(userService.getProfile().email)){
        this.setState({
          userHasResponded: true
        })
      }
    }
  }

  componentDidMount(){
    pollStore.on('change', ()=>{
      this.checkUserResponses()
    })
  }


  render(){

    const PollOption = (props) => (
      <button
        className="btn"
        onClick={()=>{
          pollActions.respondToPoll(props.id, props.opt)
        }}
        key={props.val}
      >{props.val}</button>
    )

    var animStyle = {
      animationDelay: this.props.i*0.2 + 's'
    }

    if(this.state.userHasResponded){

      return(
        <li style={animStyle} key={this.props.poll._id} className="poll-item multiple">
        <div>
          <h3>{this.props.poll.question}</h3>
          <p>{this.props.poll.detail}</p>
          <Responses responses={this.props.poll.responses} options={this.props.poll.options}/>
          <h5>Started {Humandate.relativeTime(this.props.poll.createdAt)}</h5>
        </div>

        </li>
      );
    }else{
      return(
        <li style={animStyle} key={this.props.poll._id} className="poll-item multiple">
          <div>
            <h3>{this.props.poll.question}</h3>
            <p>{this.props.poll.detail}</p>
            {(this.props.poll.options.a) ? <PollOption id={this.props.poll._id} opt="a" val={this.props.poll.options.a}/> : null}
            {(this.props.poll.options.b) ? <PollOption id={this.props.poll._id} opt="b" val={this.props.poll.options.b}/> : null}
            {(this.props.poll.options.c) ? <PollOption id={this.props.poll._id} opt="c" val={this.props.poll.options.c}/> : null}
            {(this.props.poll.options.d) ? <PollOption id={this.props.poll._id} opt="d" val={this.props.poll.options.d}/> : null}
            <h5>Started {Humandate.relativeTime(this.props.poll.createdAt)}</h5>
          </div>
        </li>
      );
    }


  }
}

export default MultipleChoicePoll;
