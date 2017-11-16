import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/app.css';

// Get top-level views
import NewsFeed from './components/news/NewsFeed.react';
import Events from './components/events/Events.react';
import Polls from './components/polls/Polls.react';
import Info from './components/info/Info.react';

// Get other views
import Login from './components/login/Login.react';
import LoginCallback from './components/login/LoginCallback.react';

// Get partials
import Navbar from './components/partials/Navbar.react';

// Flux
import * as newsActions from './actions/newsActions';
import * as eventsActions from './actions/eventsActions';
import * as infoActions from './actions/infoActions';

class App extends Component {

  // Load in data on initial application load
  componentWillMount(){
    newsActions.fetchNews();
    eventsActions.fetchEvents();
    eventsActions.fetchAgenda();
    infoActions.fetchInfo();
  }

  render() {
    return (
      <Router>
        <div >

          <Switch>

          <Route exact path="/login" component={Login}/>
          <Route exact path="/login/callback" component={LoginCallback}/>

          <div className="app">
            <Navbar/>
            <div className="view-container">
                <Route exact path="/" component={NewsFeed}/>
                <Route path="/events" component={Events}/>
                <Route path="/polls" component={Polls}/>
                <Route path="/info" component={Info}/>
            </div>
          </div>

          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
