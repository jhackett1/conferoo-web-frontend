import React, { Component } from 'react';
import updatesApi from '../../services/updatesApi';
import Spinner from '../partials/Spinner.react';
import SingleNews from './SingleNews.react';
import '../../styles/news.css';

class NewsFeed extends Component{
  constructor(){
    super();
    // Initialise state
    this.state = {
      news: [],
      spinner: true,
      singleNews: {}
    }
  }

  // Method to close single article view
  closeSingleView = () => {
    this.setState({
      singleNews: {}
    })
  }

  // Load list of updates from server
  componentWillMount(){
    updatesApi.getUpdates((err, response)=>{
      if(err) console.log(err);
      this.setState({
        news: response,
        spinner: false
      })
    })
  }

  render(){
    const NewsList = this.state.news.map((newsItem, i)=>{
      var animStyle = {
        animationDelay: i*0.2 + 's'
      }
      let image = `url(${newsItem.image})`;
      return(
        <li style={animStyle} key={newsItem._id} className="news-item" onClick={()=>{
          this.setState({
            singleNews: this.state.news[i]
          });
        }}>
          <div className="poster" style={{backgroundImage: image}}>
            <h3>{newsItem.title}</h3>
          </div>
          <p>{newsItem.teaser}</p>
        </li>
      )
    })

    return(
      <div>
        <ul className="news-item-list">
          <Spinner isLoading={this.state.spinner}/>
          {NewsList}
        </ul>
        <SingleNews update={this.state.singleNews} close={this.closeSingleView}/>
      </div>
    )
  }
}

export default NewsFeed;
