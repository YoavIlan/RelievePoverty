import React, { Component } from 'react';
import Jumbotron from './../shared-components/Jumbotron';
import BarChart from './BarChart';

var states = {
    'Alabama': 0,
     'Alaska': 0,
     'Arizona': 0,
     'Arkansas': 0,
     'California': 0,
     'Colorado': 0,
     'Connecticut': 0,
     'Delaware': 0,
     'Florida': 0,
     'Georgia': 0,
     'Hawaii': 0,
     'Idaho': 0,
     'Illinois': 0,
     'Indiana': 0,
     'Iowa': 0,
     'Kansas': 0,
     'Kentucky': 0,
     'Louisiana': 0,
     'Maine': 0,
     'Maryland': 0,
     'Massachusetts': 0,
     'Michigan': 0,
     'Minnesota': 0,
     'Mississippi': 0,
     'Missouri': 0,
     'Montana': 0,
     'Nebraska': 0,
     'Nevada': 0,
     'New Hampshire': 0,
     'New Jersey': 0,
     'New Mexico': 0,
     'New York': 0,
     'North Carolina': 0,
     'North Dakota': 0,
     'Ohio': 0,
     'Oklahoma': 0,
     'Oregon': 0,
     'Pennsylvania': 0,
     'Rhode Island': 0,
     'South Carolina': 0,
     'South Dakota': 0,
     'Tennessee': 0,
     'Texas': 0,
     'Utah': 0,
     'Vermont': 0,
     'Virginia': 0,
     'Washington': 0,
     'West Virginia': 0,
     'Wisconsin': 0,
     'Wyoming': 0}

class Ours extends Component {
  constructor(props) {
    super(props);
    for (var s in states) {
        states[s] = 0;
    }
    this.state = {
        state_dict: {}
    };
  }

  getJSON(url) {
    return fetch(url).then(response => {
      return response.json();
    });
  }

  async componentWillMount() {
    await this.getJSON("https://api.relievepoverty.me/v1/charities").then(response => {
      let obj = JSON.parse(JSON.stringify(response));
      let newList = [];
      let counter = 1;
      obj.data.forEach(elm => {
        states[elm.state] = states[elm.state] + 1
        counter++;
      });
      this.setState({state_dict: states});
    });
  }

  render() {
   if (Object.keys(this.state.state_dict).length == 0) {
     return(<p>Loading...</p>);
   }
   return (
      <div className='App'>
      <div>
      <Jumbotron title={'Number of charities per state'}/>
      <BarChart names={Object.keys(this.state.state_dict)} data={Object.values(this.state.state_dict)} size={[500,500]}/>
      </div>
      </div>
   )
  }
}

export default Ours;
