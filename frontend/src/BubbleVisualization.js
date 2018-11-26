import React, { Component } from 'react';
import './Visualizations.css';
import {Link} from 'react-router-dom';

class Visualizations extends Component {
    render() {
        return (
            <div>
                <div className="row fss-bar">
                        <div className="col-sm-6 d-flex flex-column">
                            <Link className="team-logo" to="/theirs">
                                <p>See NPOLink's visualizations</p>
                                <img className="team-img" src={require("./img/customer_logo.png")} alt="Could not render"></img>
                            </Link>
                        </div>
                        <div className="col-sm-6 d-flex flex-column">
                            <Link className="team-logo" to="/ours">
                                <p>See Our visualizations</p>
                                <img className="team-img" src={require("./img/rp.png")} alt="Could not render"></img>
                            </Link>
                        </div>
                </div>
            </div>
        );
    }
}

export default Visualizations;
