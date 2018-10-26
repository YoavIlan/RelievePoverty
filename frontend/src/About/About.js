
import React, { Component } from "react";
import { a } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Members from "./Members";
import AboutInfo from "./TopInfo.js";
import Tools from "./Tools.js";
import Api from "./Data.js";


import "./App.css";
import "./About.css";
import { getTeam } from "./MemberInfo";
let request = require("request");


export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      totalCommits: 0,
      error: false,
      total_issues: 0,
      swe_member_data: {},
      totalTests: 0,
      ended: false
    };
  }


  componentWillMount() {
    this.setState({ ready: false });
    let options = {
      method: "GET",
      url:
        "https://gitlab.com/api/v4/projects/8594442/repository/contributors?sort=desc"
    };
    request(
      options,
      function(error, response, body) {
        if (error) {
          this.setState({ error: true, ready: true });
        }
        let sweMembers = getTeam();
        let commitJSON = JSON.parse(body);
        let totalCommits = 0;
        let totalTests = 0;
        for (let i = 0; i < commitJSON.length; i++) {
          let curUserCount = commitJSON[i]["total"];
          //sweMembers[String(commitJSON[i]['author']['login'])][1] = curUserCount
          totalCommits += commitJSON[i]["total"];
        }
        Object.keys(sweMembers).forEach(function(key) {
          totalTests += sweMembers[key][3];
        });
        this.setState({ totalCommits: totalCommits, totalTests: totalTests });

        let eof = false;
        let page = 1;
        while (!eof) {
let options = {
          method: 'GET',
          url: 'https://api.github.com/repos/WeTheSWEople/SWEThePeople/' +
               'issues?state=all&per_page=100&page=' + String(page),
          qs: {state: 'all'}
        }

          request(
            options,
            function(error, response, body) {
              if (error) {
                eof = true;
                this.setState({ error: true, ready: true });
              }
              let issueJSON = JSON.parse(body);
              for (let i = 0; i < issueJSON.length; i++) {
                if (String(issueJSON[i]["user"]["login"]) in sweMembers) {
                  sweMembers[String(issueJSON[i]["user"]["login"])][2] += 1;
                }
                if (issueJSON[i]["number"] === 1) {
                  eof = true;
                }
              }
              this.setState({
                swe_member_data: sweMembers,
                total_issues: this.state.total_issues + issueJSON.length
              });
            }.bind(this)
          );

          page++;
          if (page === 10) {
            break;
          }
        }
        this.setState({ ready: true });
      }.bind(this)
    );
  }

  /*
   * Renders the AboutInfo, GithubTools, Tools
   * and API components for the about page.
   */
  render() {
    <div>
      <h1 className="about-title">About Our Site</h1>
      <h3>Our mission is to educate citizens of the United States about the issues concerning poverty within the country by providing articles and information about it in each state. We then provide information about charities that readers can donate to in order to help fight against poverty. An interesting result of integrating articles, charities, and state statistics concerning poverty is that we were able to make a connection between them even though they were previously three distinct mediums.</h3>
    </div>
    let members = null;
    if (this.state.ready) {
      members = <Members swe_data={this.state.swe_member_data} />;
    }

    return (
      <div className="App container about-content">
        <AboutInfo/>
        <center/>
        {members}
        <Tools/>
        <Api/>
      </div>
    );
  }
}
