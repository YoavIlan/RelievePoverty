
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

export default class TopInfo extends Component {
  render() {
    return (
      <div>
        <h1 className="about-title">About Our Site</h1>
        <h3>Our mission is to educate citizens of the United States about the issues concerning poverty within the country by providing articles and information about it in each state. We then provide information about charities that readers can donate to in order to help fight against poverty. An interesting result of integrating articles, charities, and state statistics concerning poverty is that we were able to make a connection between them even though they were previously three distinct mediums.</h3>
      </div>
    )
  }
}
