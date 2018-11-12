import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import Highlighter from "react-highlight-words";


class CharitiesCard extends Component {
    render() {
        let query = this.props.query === undefined ? [] : this.props.query.split(" ");
        let image = this.props.image;
        let title = this.props.title;
        let affiliation = this.props.affiliation;
        let tax_classification = <Highlighter searchWords={[query]} textToHighlight={this.props.tax_classification}/>;
        let state = <Highlighter searchWords={[query]} textToHighlight={this.props.state}/>;
        let rating = <Highlighter searchWords={[query]} textToHighlight={this.props.rating}/>;
        let id = this.props.id;
        return <div className="col-md-4 d-flex">
            <div className="card mb-4 box-shadow">
                <img className="card-img-top d-flex" src={image} alt="Card"/>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><Highlighter searchWords={[query]} textToHighlight={title}/> </h5>
                    <ul className="card-text">
                        <li><b>State:</b> {state}</li>
                        {rating !== undefined && <li><b>Rating:</b> {rating}</li>}
                        {affiliation !== undefined && <li><b>Affiliation:</b> <Highlighter searchWords={[query]} textToHighlight={affiliation.substring(0,affiliation.indexOf('-'))}/></li>}
                        {tax_classification !== undefined && <li><b>Classification:</b> {tax_classification}</li>}
                    </ul>
                    <Link to={`/charities/${id}`}  className="btn btn-primary mt-auto">More Information</Link>

                </div>
            </div>
        </div>
    }
}

export default CharitiesCard;
