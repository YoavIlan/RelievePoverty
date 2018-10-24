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
        return <div className="col-md-4 state-card d-flex">
            <div className="card state-card">
            <img className="card-img-top" src={image} alt={state}/>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{state}</h5>
                <p className="card-text">{state} is ranked {rank}{getRank(rank)} out of 50 states for its poverty rates</p>
                <Link to={`/states/california`}  className="btn btn-primary mt-auto">More Information</Link>
            </div>
            </div>
        </div>
    }
}

export default StatesCard;
