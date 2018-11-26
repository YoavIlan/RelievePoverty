import React, { Component } from 'react';
import BubbleChart from './BubbleChart'

class Ours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        "children": []
      }
    };
  }

  getJSON(url) {
    return fetch(url).then(response => {
      return response.json();
    });
  }

  async componentWillMount() {
    await this.getJSON("https://api.relievepoverty.me/v1/states").then(response => {
      let obj = JSON.parse(JSON.stringify(response));
      let newList = [];
      let counter = 1;
      obj.data.sort((a,b) => parseInt(a.median_income, 10) - parseInt(b.median_income, 10));
      obj.data.forEach(state => {
        newList.push({"id": counter, "title": state.name, "value": "$" + (state.median_income.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))});
        counter++;

      });
      this.setState({ data: {"children": newList }});
    });
  }

  render() {
   if (this.state.data["children"].length == 0) {
     return(<p>Loading...</p>);
   }
   return (
      <div className='App'>
      <div>
      <BubbleChart data={this.state.data}/>
      </div>
      </div>
   )
  }
}

export default Ours;
