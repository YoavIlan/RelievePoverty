import React, { Component } from 'react';
import NewsCard from './shared-components/NewsCard';
import './shared-components/styles.css';



class CharityInstance extends Component {

   constructor (props){
       super(props);
       this.state = {
           address : "",
           affiliation : "",
           cause_name : "",
           id : "",
           img : "",
           mission : "",
           name : "",
           state : "",
           tax_classification : "",

           news: [{author: "", id: 0, image: "", published_date: "", source: "", state: "", summary: "", title: "", url: ""},
                  {author: "", id: 0, image: "", published_date: "", source: "", state: "", summary: "", title: "", url: ""},
                  {author: "", id: 0, image: "", published_date: "", source: "", state: "", summary: "", title: "", url: ""}],
           }
   }


   get_related_news(state) {
     this.getJSON('https:api.relievepoverty.me/v1/news?state=' + state)
         .then(response => {
             var obj = JSON.parse(JSON.stringify(response));
             this.setState({news: obj.data});
         });
   }



   componentWillMount(){
       var obj = {};
       const id = this.props.match.params.id;
       this.getJSON('https:api.relievepoverty.me/v1/charities/' + id)
           .then(response => {
               obj = JSON.parse(JSON.stringify(response));
               this.setState({address: obj.address, affiliation: obj.affiliation, cause_name: obj.cause_name,
                 id: obj.id, img: obj.img, mission: obj.mission, name: obj.name,
                 state: obj.state, tax_classification: obj.tax_classification});
                 console.log(obj.name)
               this.get_related_news(obj.state);

           });

   }

   getJSON(url) {
       return fetch(url).then(response => {
           return response.json();
       });
   }
   render() {

       return (
         <>
           <h1 class="my-4"> {this.state.name} </h1>
           <div class="row">
             <div class="col-md-8">
                 <img class="img-fluid" src={this.state.img} alt=""></img>
             </div>

             <div class="col-md-4">

               <b>Cause</b>
               <p>{this.state.cause_name}</p>
               <b>Address</b>
               <p>{this.state.address}</p>
               <b>Affiliation</b>
               <p>{this.state.affiliation}</p>
               <b>Mission</b>
               <p>{this.state.mission}</p>
               <b>State</b>
               <p>{this.state.state}</p>
               <b>Tax Classification</b>
               <p>{this.state.tax_classification}</p>
            </div>
          </div>
           <div>
             <h3 class="my-4">Related Articles</h3>
           </div>
           <div class="row related-instances">
              { this.state.news[0] != undefined &&
                <NewsCard image={this.state.news[0].image} title={this.state.news[0].title} description={this.state.news[0].summary} id={this.state.news[0].id}/>
              }
              { this.state.news[1] != undefined &&
                <NewsCard image={this.state.news[1].image} title={this.state.news[1].title} description={this.state.news[1].summary} id={this.state.news[1].id}/>
              }
              { this.state.news[2] != undefined &&
                <NewsCard image={this.state.news[2].image} title={this.state.news[2].title} description={this.state.news[2].summary} id={this.state.news[2].id}/>
              }
          </div>


          </>


       )
   }
}

export default CharityInstance;
