import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


function getRank(rank) {
    if (rank === 11 || rank === 12 || rank === 13)
        return 'th'
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

class StatesCard extends Component {
    render() {
        let median_income = this.props.median_income;
        let counties = this.props.counties;
        let child_poverty_rate = this.props.child_poverty_rate;
        let below_poverty_rate = this.props.below_poverty_rate;
        let image = this.props.image;
        let state = this.props.state;
        let rank = this.props.rank;
        return(
            <div className="col-md-4 d-flex">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top d-flex" id="developer-img" src={image} alt="Card image cap" styles="height: 212px !important; width:320px !important"></img>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{state}</h5>
                      <div className="card-text">
                      <b>Ranking</b>
                        <p>{rank}{getRank(rank)} out of 50 states for its poverty rate</p>
                        <b>Below Poverty Rate</b>
                        <p>{below_poverty_rate}% of all citizens</p>
                        <b>Under 18 and Below Poverty Rate</b>
                        <p>{child_poverty_rate}% of all children</p>
                        <b>Median Income</b>
                        <p>${(median_income.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"))}</p>
                        <b>County with the highest poverty rates</b>
                        <p>{counties}</p>
                      </div>
                  <Link to={`/states/${state}`}  className="btn btn-primary mt-auto">More Information</Link>
                </div>
              </div>
            </div>
            )
    }
}

export default StatesCard;
