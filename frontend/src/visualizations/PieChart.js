import React, { Component } from 'react';
import axios from 'axios';
import ReactD3PieChart from 'react-d3-pie-chart';
import Jumbotron from './../shared-components/Jumbotron';
import './Visualization.css';

class PieChart extends Component {
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
        obj.push({label: s, value: this.dictionary[s]});
      });
      this.setState({ data: obj});
    });
  }

  renderLabel = d => 'Label is ${d.data.label}'

  render() {
    if(this.state.data.length == 0){
        return (
            <p> Loading... </p>
        );
    }
    console.log(this.state.data)
    return (
       <ReactD3PieChart data={this.state.data}/>
    );
  }
}


export default PieChart