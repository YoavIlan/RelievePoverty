import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


function getRank(rank) {
    if (rank == 11 || rank == 12 || rank == 13)
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
        let image = this.props.image;
        let state = this.props.state;
        let rank = this.props.rank;
        return(
            <div class="col-md-4 d-flex">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" id="developer-img" src={image} alt="Card image cap" styles="height: 212px !important; width:320px !important"></img>
                <div class="card-body">
                  <h5 class="card-title">{state}</h5>
                  <p className="card-text">{state} is ranked {rank}{getRank(rank)} out of 50 states for its poverty rates</p>
                  <Link to={`/states/${state}`}  className="btn btn-primary mt-auto">More Information</Link>
                </div>
              </div>
            </div>
            )
    }
}

export default StatesCard;
