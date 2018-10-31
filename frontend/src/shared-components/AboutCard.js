import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class AboutCard extends Component {
    render() {
        return(
        	<div className="col-md-4 d-flex">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" id="developer-img" src={this.props.data.image} alt="Card image cap"></img>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><h4 className="card-title about-card-title" styles="margin-bottom: 0">{this.props.data.name}</h4></li>
                </ul>
                <div className="card-body">
                  <h5 className="card-title">{this.props.data.title}</h5>
                  <p className="card-text">{this.props.data.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"># of commits: {this.props.data.commits}</li>
                  <li className="list-group-item"># of issues: {this.props.data.issues}</li>
                  <li className="list-group-item"># of unit tests: {this.props.data.tests}</li>
                  <li className="list-group-item"># of acceptance tests: {this.props.data.acceptance_tests}</li>
                </ul>
              </div>
            </div>
            )
    }
}

export default AboutCard;

