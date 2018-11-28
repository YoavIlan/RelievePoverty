import React, { Component } from 'react'
import axios from 'axios';
import Jumbotron from './../shared-components/Jumbotron';
import './Visualization.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  allStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];

  dictionary = {};

  componentDidMount() {
    const url = 'https://api.relievepoverty.me/v1/news';
    let obj = [];
    axios.get(url).then( res => {
      this.allStates.forEach(state => {
        this.dictionary[state] = 0;
      });
      res.data.data.forEach(article => {
        this.dictionary[article.state] += 1;
      });
      this.allStates.forEach(s => {
        obj.push({state: s, number: this.dictionary[s]});
      });
      this.setState({ data: obj});
    });
  }

  render() {
    return (
      <p>Loading...</p>
    );
  }
}


export default Map
