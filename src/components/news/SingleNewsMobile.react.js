import React, { Component } from 'react';
import Humandate from 'human-date';
import readingTime from 'reading-time';

class SingleNewsMobile extends Component {
  render() {
    return(
        <article className="single-update" key="1">
          <div className="header">
            <i class="fa fa-arrow-left" onClick={this.props.close}></i>
          </div>
          <div className="scrollable-view">
            <img className="poster" src={this.props.update.image} alt={this.props.update.title}/>
            <div className="meta">
              <h5>{Humandate.relativeTime(this.props.update.createdAt)}</h5>
              <h1>{this.props.update.title}</h1>
              <h5>By {this.props.update.author}  |  {readingTime(this.props.update.content).text}</h5>
            </div>
            <div className="body-content" dangerouslySetInnerHTML={{__html: this.props.update.content}}>
            </div>
          </div>
        </article>
    );
  }
}

export default SingleNewsMobile;
