import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

export default class Members extends Component {
  render() {
    let mapping = Object.keys(this.props.swe_data).map(item => (
      <Col sm={12} md={4}>
        <div className="member-card">
          <h3>
            {this.props.swe_data[item][0]} <br />
          </h3>
          <img
            src={require("../img/" + this.props.swe_data[item][5])}
            width="300"
            height="300"
          />

          <br />
          <p>{this.props.swe_data[item][6]}</p>
          <p>{this.props.swe_data[item][4]}</p>
          <p>
            Commits: {this.props.swe_data[item][1]}
            <br />
            Issues: {this.props.swe_data[item][2]}
            <br />
            Unit Tests: {this.props.swe_data[item][3]}
            <br />
          </p>
        </div>
      </Col>
    ));

    return (
      <div>
        <Grid>
          <Row>{mapping}</Row>
        </Grid>
      </div>
    );
  }
}
