import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'


class CharitiesCard extends Component {
    render() {
        let image = this.props.image;
        let title = this.props.title;
        let description = this.props.description;
        let id = this.props.id;
        return <div class="col-md-4 d-flex">
            <div class="card mb-4 box-shadow">
                <img className="card-img-top" src={image} alt="Card image"/>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <Link to={`/charities/${id}`}  className="btn btn-primary mt-auto">More Information</Link>

                </div>
            </div>
        </div>
    }
}

export default CharitiesCard;
