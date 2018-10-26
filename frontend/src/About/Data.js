
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export default class Data extends Component {
  render() {
    return (
      <div className="tools-div container">
        <div className="tools-header">
          <h2>Data Sources</h2>
        </div>
        <Row>
          <a
            href="https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_poverty_rate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Col sm={3}>
              <div className="data-card">
                <img
                  src={require("../img/albert.jpg")}
                />
                <h3>Wikipedia (State Poverty)</h3>
                <p>
                  Scraped by using Wikipedia's REST API then parsing the data tables
                </p>
              </div>
            </Col>
          </a>

          <a
            href="https://developer.nytimes.com/article_search_v2.json"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Col sm={3}>
              <div className="data-card">
                <img
                  src={require("../img/albert.jpg")}
                />
                <h3>NYTimes</h3>
                <p>
                  Scraped by using their article search API with queries
                </p>
              </div>
            </Col>
          </a>
          <a
            href="https://newsapi.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Col sm={3}>
              <div className="data-card">
                <img
                  src={require("../img/albert.jpg")}
                />
                <h3>NewsAPI</h3>
                <p>
                  Scraped by using their API with states as filters
                </p>
              </div>
            </Col>
          </a>
          <a
            href="https://charity.3scale.net/docs/data-api/reference"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Col sm={3}>
              <div className="data-card">
                <img
                  src={require("../img/albert.jpg")}
                  className="img-responsive"
                  alt="theunitedstates.io logo"
                />
                <h3>Charity Navigator</h3>
                <p>
                  Scraped by using their API by searching for poverty related charities
                </p>
              </div>
            </Col>
          </a>
        </Row>
      </div>
    );
  }
}
