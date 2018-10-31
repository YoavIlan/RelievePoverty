import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'


class CharitiesCard extends Component {
    render() {
        let image = this.props.image;
        let title = this.props.title;
        let affiliation = this.props.affiliation;
        let tax_classification = this.props.tax_classification;
        let state = this.props.state;
        let rating = this.props.rating;
        let id = this.props.id;
        return <div className="col-md-4 d-flex">
            <div className="card mb-4 box-shadow">
                <img className="card-img-top d-flex" src={image} alt="Card"/>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <ul className="card-text">
                        <li><b>State:</b> {state}</li>
                        {rating !== undefined && <li><b>Rating:</b> {rating}</li>}
                        {affiliation !== undefined && <li><b>Affiliation:</b> {affiliation.substring(0,affiliation.indexOf('-'))}</li>}
                        {tax_classification !== undefined && <li><b>Classification:</b> {tax_classification}</li>}
                    </ul>
                    <Link to={`/charities/${id}`}  className="btn btn-primary mt-auto">More Information</Link>

                </div>
            </div>
        </div>
    }
}

export default CharitiesCard;
