import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component{
  render(){
    return(
      <nav>
        <div className="container">

          <ul>
            <li><NavLink exact activeClass="active" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 316 302"><title>News Feed</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M315.93,32.79a34.73,34.73,0,0,0-5-15.89A35.46,35.46,0,0,0,300.52,6,34.77,34.77,0,0,0,281,0H35A34.73,34.73,0,0,0,18.47,4.2q-1.06.57-2.07,1.22A35.24,35.24,0,0,0,7,14.11q-1,1.35-1.89,2.8a34.73,34.73,0,0,0-5,15.89Q0,33.9,0,35V267a35.13,35.13,0,0,0,35,35H281a35.13,35.13,0,0,0,35-35V35Q316,33.9,315.93,32.79ZM271,71.23A36.5,36.5,0,1,1,234.23,35,36.54,36.54,0,0,1,271,71.23ZM156,73.42A12.5,12.5,0,0,1,143.58,86l-75.5.5H68a12.5,12.5,0,0,1-.08-25l75.5-.5h.08A12.5,12.5,0,0,1,156,73.42ZM296,267a15,15,0,0,1-15,15H35a15,15,0,0,1-15-15V133H296Z"/><path className="cls-1" d="M75,192H256a10,10,0,0,0,0-20H75a10,10,0,0,0,0,20Z"/><path className="cls-1" d="M75,246H193.56a10,10,0,0,0,0-20H75a10,10,0,0,0,0,20Z"/></g></g></svg>
              <span>News Feed</span>
            </NavLink></li>
            <li><NavLink activeClass="active" to="/events">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 316 302"><title>Events</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M310,15.48q-.95-1.4-2-2.7c-.53-.64-1.09-1.26-1.67-1.87q-.58-.61-1.19-1.19a35.39,35.39,0,0,0-6-4.63A34.74,34.74,0,0,0,281,0H35A34.74,34.74,0,0,0,16.9,5.09,35.1,35.1,0,0,0,0,35H0V267a35.13,35.13,0,0,0,35,35H281a35.13,35.13,0,0,0,35-35V35h0A34.77,34.77,0,0,0,310,15.48ZM117,178V104h79v74Zm79,20v84H117V198ZM97,104v74H20V104ZM20,267V198H97v84H35A15,15,0,0,1,20,267Zm276,0a15,15,0,0,1-15,15H216V198h80Zm0-89H216V104h80Z"/></g></g></svg>
              <span>Events</span>
            </NavLink></li>
            <li><NavLink activeClass="active" to="/polls">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 316 302"><title>Polls</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M314.42,24.64q-.51-1.64-1.18-3.21t-1.48-3.06q-.81-1.49-1.76-2.89c-.49-.73-1-1.43-1.56-2.12s-1-1.26-1.56-1.86q-1.13-1.25-2.38-2.38a35.38,35.38,0,0,0-5.39-4q-1.44-.88-3-1.62T293,2.13q-1.61-.59-3.28-1A34.78,34.78,0,0,0,281,0H35Q33.9,0,32.79.07a34.73,34.73,0,0,0-15.89,5Q15.46,6,14.11,7a35.48,35.48,0,0,0-5,4.53Q8,12.75,7,14.11a35.24,35.24,0,0,0-2.74,4.26q-.81,1.49-1.48,3.06T1.58,24.64A34.75,34.75,0,0,0,0,35V267a35.13,35.13,0,0,0,35,35H281a35.13,35.13,0,0,0,35-35V35A34.75,34.75,0,0,0,314.42,24.64ZM61,48H261V68H61ZM296,267a15,15,0,0,1-15,15H35a15,15,0,0,1-15-15V104H296Z"/><path className="cls-1" d="M80.24,190.83l-24,24A10,10,0,0,0,70.38,229l24-24,25.42,25.42a10,10,0,1,0,14.14-14.14l-25.42-25.42,27.55-27.55a10,10,0,1,0-14.14-14.14L94.38,176.68,68.26,150.56A10,10,0,0,0,54.11,164.7Z"/><path className="cls-1" d="M196.61,229.2a10,10,0,0,0,9.56,7.14h.47a10,10,0,0,0,9.56-7.12l43.22-67.84a10,10,0,0,0-16.87-10.75l-36.13,56.72-13-20.47a10,10,0,0,0-16.89,10.72Z"/></g></g></svg>
              <span>Polls</span>
            </NavLink></li>
            <li><NavLink activeClass="active" to="/info">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 266.06 224"><title>Info</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M20,40H246.06a20,20,0,0,0,0-40H20a20,20,0,0,0,0,40Z"/><path className="cls-1" d="M246.06,92H20a20,20,0,0,0,0,40H246.06a20,20,0,0,0,0-40Z"/><path className="cls-1" d="M246.06,184H20a20,20,0,0,0,0,40H246.06a20,20,0,0,0,0-40Z"/></g></g></svg>
              <span>More</span>
            </NavLink></li>
          </ul>

          <div class="logout">
            <p>Forename Surname</p>
            <img alt="" src=""/>
          </div>

        </div>
      </nav>
    )
  }
}

export default Navbar;
