import React, { Component } from 'react';
import AboutCard from './shared-components/AboutCard';
import Jumbotron from './shared-components/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTeam } from './TeamInfo.js';
import fetch from 'node-fetch';

class About extends Component{

	constructor (props) {
    	super(props);
    	this.state = {
    		team: getTeam(),
    		total: {
    			commits: 0,
    			issues: 0,
    			tests: 0
    		}
    	};
   }

	/**
 	 * Calls subfunctions to get all stats when the about page is loaded
 	 */
	componentWillMount() {
		this.getCommits();
		this.getIssues();
		this.getTests();
	}

    render(){
    	return(
    		<>
			<Jumbotron title={'About Our Site'} description={'Our mission is to educate citizens of the United States about the issues concerning poverty within the country by providing articles and information about it in each state. We then provide information about charities that readers can donate to in order to help fight against poverty. An interesting result of integrating articles, charities, and state statistics concerning poverty is that we were able to make a connection between them even though they were previously three distinct mediums.'}/>
			<main role="main">
		      <div className="album py-5">
		        <div className="container">
		          <div className="card mb-4 box-shadow">
		            <div className="card-body">
		              <h4 className="card-title" styles="margin-bottom: 0">Stats</h4>
		            </div>
		            <ul className="list-group list-group-flush">
		              <li className="list-group-item">Total # of commits: {this.state.total.commits}</li>
		              <li className="list-group-item">Total # of issues: {this.state.total.issues}</li>
		              <li className="list-group-item">Total # of unit tests: {this.state.total.tests}</li>
		            </ul>
		          </div>
			    	<div className="row">
			    	    {this.state.team.map(obj => <AboutCard data={obj}/> )}
			    	</div>
		          <div className="card mb-4 box-shadow">
		            <div className="card-body">
		              <h4 className="card-title" styles="margin-bottom: 0">Data Sources</h4>
		            </div>
		            <ul className="list-group list-group-flush">
		              <li className="list-group-item"><a href="https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_poverty_rate" target="_blank">Wikipedia (State Poverty)</a> - Scraped by using Wikipedia's REST API then parsing the data tables</li>
		              <li className="list-group-item"><a href="https://developer.nytimes.com/article_search_v2.json" target="_blank">NYTimes</a> - Scraped by using their article search API with queries</li>
		              <li className="list-group-item"><a href="https://newsapi.org/" target="_blank">NewsAPI</a> - Scraped by using their API with states as filters</li>
		              <li className="list-group-item"><a href="https://charity.3scale.net/docs/data-api/reference" target="_blank">Charity Navigator</a> - Scraped by using their API by searching for poverty related charities</li>
		            </ul>
		          </div>
		          <div className="card mb-4 box-shadow">
		            <div className="card-body">
		              <h4 className="card-title" styles="margin-bottom: 0">Tools</h4>
		            </div>
		            <ul className="list-group list-group-flush">
		              <li className="list-group-item"><a href="https://gitlab.com/urielkugelmass/relievepoverty" target="_blank">Gitlab</a> - Used for version control, continuous integration, and issue/story tracking</li>
		              <li className="list-group-item"><a href="https://documenter.getpostman.com/view/5460449/RWgjY1qy" target="_blank">Postman</a> - Used for API design and unit testing</li>
		              <li className="list-group-item"><a href="https://aws.amazon.com/" target="_blank">AWS</a> - Used to host our webapp, backend, and database</li>
		              <li className="list-group-item"><a href="http://getbootstrap.com/" target="_blank">Bootstrap</a> - An open source toolkit for CSS elements</li>
		            </ul>
		          </div>
		        </div>
		      </div>
		    </main>
    		</>
    	)
	}

	/**
 	 * Wrapper to get JSON from an external API
 	 */
	getJSON(url) {
		return fetch(url).then(response => {
			return response.json();
		});
	}

	/**
 	 * Loads commits from gitlabs, parses the json, then updates the prop
 	 */
	getCommits() {
		var url = 'https://gitlab.com/api/v4/projects/8594442/repository/contributors?sort=desc';
		this.getJSON(url).then(response => {
			var members = this.state.team;
			var stats = this.state.total;
			members.forEach(member => {
				JSON.parse(JSON.stringify(response)).forEach(obj => {
					if (member.commit_ids.includes(obj.name)) {
						member.commits += obj.commits;
					}
				});
				stats.commits += member.commits;
			});
			this.setState({team: members, total: stats});
		}).catch(err => {
			console.log('getCommits FAILED');
		});
	}

	/**
 	 * Sends individual issue API Gets for each contributor in parallel, parses the data, then updates the prop
 	 */
	getIssues() {
		var urls = [];
		this.state.team.map(member => {
			urls.push('https://gitlab.com/api/v4/projects/8594442/issues?author_id=' + member.issue_id + '&per_page=100');
		});
		var promises = urls.map(url => this.getJSON(url));
		var responses = new Array(urls.length);
		Promise.all(promises)
		.then((responses) => {
			var members = this.state.team;
			var stats = this.state.total;
			var counter = 0;
			responses.map(resp => {
				stats.issues += JSON.parse(JSON.stringify(resp)).length;
				members[counter].issues = JSON.parse(JSON.stringify(resp)).length;
				counter++;
			});
			this.setState({team: members, total: stats});
		}).catch(err => {
			console.log('getIssues FAILED');
		});
	}

	/**
 	 * Fetches the tests from gitlab then parses comments for tests, then updates the prop
 	 */
	getTests() {
		var proxy = 'https://cors.io/?';
		var urls = ['https://gitlab.com/urielkugelmass/relievepoverty/raw/development/Postman.json'];
		var promises = urls.map(url =>fetch(proxy + url).then(resp => resp.text()));
		var responses = new Array(urls.length);
		Promise.all(promises)
		.then((responses) => {
			var members = this.state.team;
			var stats = this.state.total;
			members.forEach(member => {
				responses.map(resp => {
					member.tests += (resp.split(member.tests_id).length - 1);
				});
				stats.tests += member.tests;
			});
			this.setState({team: members, total: stats});
		}).catch(err => {
			console.log('getTests FAILED');
		}); ;
	}
}

export default About;