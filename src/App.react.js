import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './styles/app.css';
import userService from './services/userService';


// Get top-level views
import NewsFeed from './components/news/NewsFeed.react';
import Events from './components/events/Events.react';
import Polls from './components/polls/Polls.react';
import Info from './components/info/Info.react';

// Get other views
import Login from './components/login/Login.react';
import LoginCallback from './components/login/LoginCallback.react';
import Onboarding from './components/onboarding/Onboarding.react';

// Get partials
import Navbar from './components/partials/Navbar.react';

// Flux
import * as newsActions from './actions/newsActions';
import * as eventsActions from './actions/eventsActions';
import * as agendaActions from './actions/agendaActions';
import * as pollActions from './actions/pollActions';
import * as infoActions from './actions/infoActions';
import * as speakerActions from './actions/speakerActions';

import usersApi from './services/usersApi';

class App extends Component {

  // Load in data on initial application load
  componentWillMount(){
    if (userService.checkToken()) {
        newsActions.fetchNews();
        eventsActions.fetchEvents();
        agendaActions.fetchAgenda();
        pollActions.fetchPolls();
        infoActions.fetchInfo();
        speakerActions.fetchSpeakers();
    }
  }

  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        userService.checkToken() ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    );

    return (
      <Router>
        <div >

          <Switch>

          <Route path="/onboarding" component={Onboarding}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/login/callback" component={LoginCallback}/>

          <div className="app">
            <Navbar/>
            <div className="view-container">
                <PrivateRoute exact path="/" component={NewsFeed}/>
                <PrivateRoute path="/events" component={Events}/>
                <PrivateRoute path="/polls" component={Polls}/>
                <PrivateRoute path="/info" component={Info}/>
            </div>
          </div>

          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
