
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export default class Tools extends Component {
  render() {
    return (
      <div className="tools-div container">
        <div className="tools-header">
          <h2>Tools</h2>
        </div>
        <Row>
          <a
            href="https://gitlab.com/urielkugelmass/relievepoverty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Col sm={3}>
              <div className="tools-card">
                <img
                  src={require("../img/albert.jpg")}
                />
                <h5>GitLab</h5>
                <p>
                  Used for version control, continuous integration, and issue/story tracking
                </p>
              </div>
            </Col>
          </a>
          <a
            href="https://documenter.getpostman.com/view/5460449/RWgjY1qy"

          >
            <Col sm={3}>
              <div className="tools-card">
                <img
                  src={require("../img/albert.jpg")}
                />
                <h5>Postman</h5>
                <p>Used for API design and unit testing.</p>
              </div>
            </Col>
          </a>
          <a
            href="https://aws.amazon.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Col sm={3}>
              <div className="tools-card">
                <img
                  src={require("../img/albert.jpg")}
                />
                <h5>AWS</h5>
                <p>Used to host our webapp, backend, and database</p>
              </div>
            </Col>
          </a>
          <a
            href="http://getbootstrap.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Col sm={3}>
              <div className="tools-card">
                <img
                  src={require("../img/albert.jpg")}
                />
                <h5>Bootstrap</h5>
                <p>An open source toolkit for CSS elements.</p>
              </div>
            </Col>
          </a>
        </Row>
      </div>
    );
  }
}
