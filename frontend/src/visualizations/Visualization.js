import React, { Component } from 'react';
import './Visualization.css';
import { Link } from 'react-router-dom';

class Visualization extends Component {
    render() {
        return (
            <div>
                <div className="row fss-bar">
                    <div className="col-sm-6 d-flex flex-column">
                        <img className="team-img" src={require("../img/customer_logo.png")} alt="Could not render"></img>
                        <Link className="team-logo" to="/visualizations/npolink1">
                            See NPOLink's 1st visualization
                        </Link>
                    </div>
                    <div className="col-sm-6 d-flex flex-column">
                        <img className="team-img" src={require("../img/rp.png")} alt="Could not render"></img>
                        <Link className="team-logo" to="/visualizations/relievepoverty1">
                            See Our 1st visualization
                        </Link>
                    </div>
                </div>
                <div className="row fss-bar">
                    <div className="col-sm-6 d-flex flex-column">
                        <Link className="team-logo" to="/visualizations/npolink2">
                            See NPOLink's 2nd visualization
                        </Link>
                    </div>
                    <div className="col-sm-6 d-flex flex-column">
                        <Link className="team-logo" to="/visualizations/relievepoverty2">
                            See Our 2nd visualization
                        </Link>
                    </div>
                </div>
                <div className="row fss-bar">
                    <div className="col-sm-6 d-flex flex-column">
                        <Link className="team-logo" to="/visualizations/npolink3">
                            See NPOLink's 3rd visualization
                        </Link>
                    </div>
                    <div className="col-sm-6 d-flex flex-column">
                        <Link className="team-logo" to="/visualizations/relievepoverty3">
                            See Our 3rd visualization
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Visualization;
