import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
class AboutCard extends Component {
    render() {
        let image = this.props.image;
        let name = this.props.name;
        let title = this.props.title;
        let description = this.props.description;
        let commits = this.props.commits;
        let issues = this.props.issues;
        let tests = this.props.tests;
        return(
        	<div class="col-md-4 d-flex">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" id="developer-img" src={image} alt="Card image cap"></img>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><h4 class="card-title" styles="margin-bottom: 0">{name}</h4></li>
                </ul>
                <div class="card-body">
                  <h5 class="card-title">{title}</h5>
                  <p class="card-text">{description}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"># of commits: {commits}</li>
                  <li class="list-group-item"># of issues: {issues}</li>
                  <li class="list-group-item"># of unit tests: {tests}</li>
                </ul>
              </div>
            </div>
            )
    }
}

export default AboutCard;

