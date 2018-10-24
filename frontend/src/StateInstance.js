import React, { Component } from 'react';
import StatesCard from './shared-components/StatesCard';
import NewsCard from './shared-components/NewsCard';
import CharitiesCard  from './shared-components/CharitiesCard';
import StateData  from './shared-components/StateData';
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
          charities: [{address: "", id: 0, affiliation: "", cause_name: "", id: "", img: "", mission: "", name: "", state: "", tax_classification: ""},
                 {address: "", id: 0, affiliation: "", cause_name: "", id: "", img: "", mission: "", name: "", state: "", tax_classification: ""},
                 {address: "", id: 0, affiliation: "", cause_name: "", id: "", img: "", mission: "", name: "", state: "", tax_classification: ""}]

       }
   }


   get_related_news(state) {
     this.getJSON('https:api.relievepoverty.me/v1/news?state=' + state)
         .then(response => {
             var obj = JSON.parse(JSON.stringify(response));
             this.setState({news: obj.data});
         });
   }
   get_related_charities(state) {
     this.getJSON('https:api.relievepoverty.me/v1/charities?state=' + state)
         .then(response => {
             var obj = JSON.parse(JSON.stringify(response));
             this.setState({charities: obj.data});
         });
   }



   componentWillMount(){
       var obj = {};
       const name = this.props.match.params.name;
       this.getJSON('https:api.relievepoverty.me/v1/states/' + name)
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
   render() {
     console.log(this.state.news[0]);
     console.log(this.state.news[0].title);
     console.log(this.state.news[1].title);

       return (
         <>
            <p> NEWS: {this.state.news[0].title}</p>
           <h1 class="my-4"> {this.state.name} </h1>
           <div class="row">
             <div class="col-md-8">
                 <img class="img-fluid" src={this.state.flag} alt=""></img>
             </div>

             <StateData rank={this.state.rank} below_poverty_rate={this.state.below_poverty_rate}
                              child_poverty_rate={this.state.child_poverty_rate} counties={this.state.counties}
                              flag={this.state.flag} median_income={this.state.median_income}
                              name={this.state.name} flag={this.state.flag}/>
           </div>
           <div>
             <h3 class="my-4">Related Articles</h3>
           </div>
           <div class="row">
              <NewsCard image={this.state.news[0].image} title={this.state.news[0].title} description={this.state.news[0].summary}/>
              <NewsCard image={this.state.news[1].image} title={this.state.news[1].title} description={this.state.news[1].summary}/>
              <NewsCard image={this.state.news[2].image} title={this.state.news[2].title} description={this.state.news[2].summary}/>
          </div>
          <div>
            <h3 class="my-4">Related Charities {this.state.charities[0].mission}</h3>
          </div>
          <div class="row">
             <CharitiesCard image={this.state.charities[0].img} title={this.state.charities[0].name} description={this.state.charities[0].mission}/>
             <CharitiesCard image={this.state.charities[1].img} title={this.state.charities[1].name} description={this.state.charities[1].mission}/>
             <CharitiesCard image={this.state.charities[2].img} title={this.state.charities[2].name} description={this.state.charities[2].mission}/>
          </div>
          </>


       )
   }
}

export default StateInstance;
