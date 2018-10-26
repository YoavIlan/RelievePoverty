import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
class AboutCard extends Component {
    render() {
        return(
        	<div class="col-md-4 d-flex">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" id="developer-img" src={this.props.data.image} alt="Card image cap"></img>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><h4 class="card-title" styles="margin-bottom: 0">{this.props.data.image.name}</h4></li>
                </ul>
                <div class="card-body">
                  <h5 class="card-title">{this.props.data.title}</h5>
                  <p class="card-text">{this.props.data.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"># of commits: {this.props.data.commits}</li>
                  <li class="list-group-item"># of issues: {this.props.data.issues}</li>
                  <li class="list-group-item"># of unit tests: {this.props.data.tests}</li>
                </ul>
              </div>
            </div>
            )
    }
}

export default AboutCard;

