import React, { Component } from 'react';
import './Visualization.css';
import {Link} from 'react-router-dom';

class Visualization extends Component {
    render() {
        return (
            <div>
                <div className="row fss-bar">
                        <div className="col-sm-6 d-flex flex-column">
                            <Link className="team-logo" to="/visualizations/npolink">
                                <p>See NPOLink's visualizations</p>
                                <img className="team-img" src={require("../img/customer_logo.png")} alt="Could not render"></img>
                            </Link>
                        </div>
                        <div className="col-sm-6 d-flex flex-column">
                            <Link className="team-logo" to="/visualizations/relievepoverty">
                                <p>See Our visualizations</p>
                                <img className="team-img" src={require("../img/rp.png")} alt="Could not render"></img>
                            </Link>
                        </div>
                </div>
            </div>
        );
    }
}

export default Visualization;
