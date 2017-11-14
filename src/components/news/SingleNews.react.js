import React, { Component } from 'react';
import Humandate from 'human-date';

class SingleNews extends Component {
  render() {
    // Wait until data has been fetched from the API before rendering
    if (this.props.update.content){
      return (
          <article className="single-update">
            <section className="single-header">
              <a className="fa fa-arrow-left" onClick={this.props.close}></a>
            </section>
            <div className="scroll-container">
              <img src={this.props.update.image} alt={this.props.update.title}/>
              <h5>{Humandate.relativeTime(this.props.update.createdAt)}</h5>
              <h1>{this.props.update.title}</h1>
              <h5>By {this.props.update.author}</h5>
              <article className="body-content" dangerouslySetInnerHTML={{__html: this.props.update.content}}></article>
            </div>
          </article>
      );
    } else {
      return null;
    }
  }
}

export default SingleNews;
