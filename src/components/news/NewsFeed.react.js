import React, { Component } from 'react';
import Spinner from '../partials/Spinner.react';
import SingleNews from './SingleNews.react';
import '../../styles/news.css';

// Flux stuff
import newsStore from '../../stores/NewsStore';
import * as newsActions from '../../actions/newsActions';

class NewsFeed extends Component{
  constructor(){
    super();
    // Initialise state
    this.state = {
      news: newsStore.getAll(),
      loading: newsStore.getLoading(),
      singleNews: {}
    }
  }

  // Load list of updates from server
  componentWillMount(){
    // Load new data on nagivating to view
    newsActions.fetchNews();
    // Subscribe state to store changes
    newsStore.on('change', ()=>{
      this.setState({
        news: newsStore.getAll(),
        loading: newsStore.getLoading()
      })
    })
  }

  // Method to close single article view
  closeSingleView = () => {
    this.setState({
      singleNews: {}
    })
  }

  render(){
    const NewsList = this.state.news.map((newsItem, i)=>{
      var animStyle = {
        animationDelay: i*0.2 + 's'
      }

      let image;
      if(newsItem.medium){
        image = `url(${newsItem.medium})`;
      } else {
        image = `url(${newsItem.image})`;
      }

      return(
        <li style={animStyle} key={newsItem._id} className="news-item" onClick={()=>{
          this.setState({
            singleNews: this.state.news[i]
          });
        }}>
          <div className="poster" style={{backgroundImage: image}}>
          </div>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.teaser}</p>
        </li>
      )
    })

    const Single = () => {
      if(this.state.singleNews.content){
        return(
          <SingleNews update={this.state.singleNews} close={this.closeSingleView}/>
        )
      } else {
        return null;
      }
    }

    return(
      <div>
        <div className="container">
          <ul className="news-item-list">
            {NewsList}
          </ul>
        </div>
        <Spinner isLoading={this.state.loading}/>
        <Single />
      </div>
    )
  }
}

export default NewsFeed;
