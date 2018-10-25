import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

function getRank(rank) {
    if (rank == 11 || rank == 12 || rank == 13)
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

class StateData extends Component {
    render() {
      var rank               = this.props.rank;
      var below_poverty_rate = this.props.below_poverty_rate;
      var child_poverty_rate = this.props.child_poverty_rate;
      var median_income      = this.props.median_income;
      var counties           = this.props.counties;
      var flag               = this.props.flag
      return(


          <div class="col-md-4">

              <b>Ranking</b>
              <p>{rank}{getRank(rank)} out of 50 states for its poverty rate</p>
              <b>Below Poverty Rate</b>
              <p>{below_poverty_rate}% of all citizens</p>
              <b>Under 18 and Below Poverty Rate</b>
              <p>{child_poverty_rate}% of all children</p>
              <b>Median Income</b>
              <p>{(median_income.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))}$</p>
              <b>County with the highest poverty rates</b>
              <p>{counties}</p>
          </div>


      );
    }
}

export default StateData;
