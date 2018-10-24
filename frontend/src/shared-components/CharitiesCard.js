import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class CharitiesCard extends Component {
    render() {
        let image = this.props.image;
        let title = this.props.title;
        let description = this.props.description;
        return <div className="col-md-4 charity-card d-flex">
            <div className="card charity-card">
                <img className="card-img-top" src={image} alt="Card image"/>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href="charities/publicolor.html" className="btn btn-primary mt-auto">More Information</a>
                </div>
            </div>
        </div>
    }
}

export default CharitiesCard;
