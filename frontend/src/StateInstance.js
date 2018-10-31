import React, { Component } from 'react';
import NewsCard from './shared-components/NewsCard';
import CharitiesCard  from './shared-components/CharitiesCard';
import fetch from 'node-fetch';
import './shared-components/styles.css';

class StateInstance extends Component {

   constructor (props){
       super(props);
       this.state = {
           below_poverty_rate: "",
           child_poverty_rate: "",
           counties: "",
           flag:    "",
           median_income:    "",
           name:    "",
           rank:    0,
           news: [{author: "", id: 0, image: "", published_date: "", source: "", state: "", summary: "", title: "", url: ""},
                  {author: "", id: 0, image: "", published_date: "", source: "", state: "", summary: "", title: "", url: ""},
                  {author: "", id: 0, image: "", published_date: "", source: "", state: "", summary: "", title: "", url: ""}],
           charities: [{address: "", id: 0, affiliation: "", cause_name: "", img: "", mission: "", name: "", state: "", tax_classification: ""},
                  {address: "", id: 0, affiliation: "", cause_name: "", img: "", mission: "", name: "", state: "", tax_classification: ""},
                  {address: "", id: 0, affiliation: "", cause_name: "", img: "", mission: "", name: "", state: "", tax_classification: ""}]

       }
   }

   get_related_news(state) {
     this.getJSON('https://api.relievepoverty.me/v1/news?state=' + state)
         .then(response => {
             var obj = JSON.parse(JSON.stringify(response));
             this.setState({news: obj.data});
         });
   }

   get_related_charities(state) {
     this.getJSON('https://api.relievepoverty.me/v1/charities?state=' + state)
         .then(response => {
             var obj = JSON.parse(JSON.stringify(response));
             this.setState({charities: obj.data});
         });
   }

   componentWillMount(){
       var obj = {};
       const name = this.props.match.params.name;
       this.getJSON('https://api.relievepoverty.me/v1/states/' + name)
           .then(response => {
               obj = JSON.parse(JSON.stringify(response));
               this.setState({rank: obj.rank, name: obj.name, median_income: obj.median_income, flag: obj.flag, counties: obj.counties,
               child_poverty_rate: obj.child_poverty_rate, below_poverty_rate: obj.below_poverty_rate})
               this.get_related_news(this.props.match.params.name);
               this.get_related_charities(this.props.match.params.name);
           });
   }

   getJSON(url) {
       return fetch(url).then(response => {
           return response.json();
       });
   }

   getRank(rank) {
      if (rank === 11 || rank === 12 || rank === 13)
        return  'th'
      switch(rank%10){
        case 1:
            return 'st'
        case 2:
            return 'nd'
        case 3:
            return 'rd'
        default:
            return 'th'
      }
   }

   render() {
       return (
         <>
           <h1 class="my-4"> {this.state.name} </h1>
           <div class="row">
             <div class="col-md-8">
                 <img class="img-fluid" src={this.state.flag} alt=""></img>
             </div>
              <div class="col-md-4">
                <b>Ranking</b>
                <p>{this.state.rank}{this.getRank(this.state.rank)} out of 50 states for its poverty rate</p>
                <b>Below Poverty Rate</b>
                <p>{this.state.below_poverty_rate}% of all citizens</p>
                <b>Under 18 and Below Poverty Rate</b>
                <p>{this.state.child_poverty_rate}% of all children</p>
                <b>Median Income</b>
                <p>${(this.state.median_income.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))}</p>
                <b>County with the highest poverty rates</b>
                <p>{this.state.counties}</p>
                <b>Location of {this.state.counties}</b>
                <br/>
                <iframe title="map" width="400" height="250" frameborder="0"
                 src={"https://www.google.com/maps/embed/v1/place?q=" + this.state.counties + " "+ this.state.name + "&key=AIzaSyDh5sTwB-wqHvvsyUis6GwXzXMv78iePCs"} allowfullscreen></iframe>
             </div>
           </div>
           <div>
             <h3 class="my-4">Related Articles</h3>
           </div>
           <div class="row related-instances">
              { this.state.news[0] !== undefined &&
                <NewsCard author={this.state.news[0].author} source={this.state.news[0].source} state = {this.state.news[0].state} published_date = {this.state.news[0].published_date} image={this.state.news[0].image} title={this.state.news[0].title} description={this.state.news[0].summary} id={this.state.news[0].id}/>
              }
              { this.state.news[1] !== undefined &&
                <NewsCard author={this.state.news[1].author} source={this.state.news[1].source} state = {this.state.news[1].state} published_date = {this.state.news[1].published_date} image={this.state.news[1].image} title={this.state.news[1].title} description={this.state.news[1].summary} id={this.state.news[1].id}/>
              }
              { this.state.news[2] !== undefined &&
                <NewsCard author={this.state.news[2].author} source={this.state.news[2].source} state = {this.state.news[2].state} published_date = {this.state.news[2].published_date} image={this.state.news[2].image} title={this.state.news[2].title} description={this.state.news[2].summary} id={this.state.news[2].id}/>
              }
          </div>
          <div>
            <h3 class="my-4">Related Charities</h3>
          </div>

          <div class="row related-instances">
             { this.state.charities[0] !== undefined &&
               <CharitiesCard rating={this.state.charities[0].rating} state={this.state.charities[0].state} tax_classification={this.state.charities[0].tax_classification} affiliation={this.state.charities[0].affiliation} image={this.state.charities[0].img} title={this.state.charities[0].name} description={this.state.charities[0].mission} id={this.state.charities[0].id}/>
             }
             { this.state.charities[1] !== undefined &&
               <CharitiesCard rating={this.state.charities[1].rating} state={this.state.charities[1].state} tax_classification={this.state.charities[1].tax_classification} affiliation={this.state.charities[1].affiliation} image={this.state.charities[1].img} title={this.state.charities[1].name} description={this.state.charities[1].mission} id={this.state.charities[1].id}/>             }
             { this.state.charities[2] !== undefined &&
               <CharitiesCard rating={this.state.charities[2].rating} state={this.state.charities[2].state} tax_classification={this.state.charities[2].tax_classification} affiliation={this.state.charities[2].affiliation} image={this.state.charities[2].img} title={this.state.charities[2].name} description={this.state.charities[2].mission} id={this.state.charities[2].id}/>             }
          </div>
          </>
       )
   }
}

export default StateInstance;
