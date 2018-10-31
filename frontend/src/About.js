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
					tests: 0,
					acceptance_tests: 0,
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
		this.getAcceptanceTests();
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
		              <h4 className="card-title about-card-title" styles="margin-bottom: 0">Stats</h4>
		            </div>
		            <ul className="list-group list-group-flush">
		              <li className="list-group-item">Total # of commits: {this.state.total.commits}</li>
		              <li className="list-group-item">Total # of issues: {this.state.total.issues}</li>
		              <li className="list-group-item">Total # of unit tests: {this.state.total.tests}</li>
									<li className="list-group-item">Total # of acceptance tests: {this.state.total.acceptance_tests}</li>
		            </ul>
		          </div>
			    	<div className="row">
			    	    {this.state.team.map(obj => <AboutCard data={obj}/> )}
			    	</div>
		          <div className="card mb-4 box-shadow">
		            <div className="card-body">
		              <h4 className="card-title about-card-title" styles="margin-bottom: 0">Data Sources</h4>
		            </div>
		            <ul className="list-group list-group-flush">
		              <li className="list-group-item"><a href="https://www.census.gov/programs-surveys/saipe/data/api.html" target="_blank" rel="noopener noreferrer">US Census Bureau (State Poverty)</a> - Used The US Census Bureau''s restful SAIPE API to find information on poverty rates by state </li>
		              <li className="list-group-item"><a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">NewsAPI</a> - Scraped by using their API with states as filters</li>
		              <li className="list-group-item"><a href="https://charity.3scale.net/docs/data-api/reference" target="_blank" rel="noopener noreferrer">Charity Navigator</a> - Scraped by using their API by searching for poverty related charities</li>
									<li className="list-group-item"><a href="https://clearbit.com/logo" target="_blank" rel="noopener noreferrer">Clearbit</a> - Used the API on clearbit to retrieve images from charity websites</li>
									<li className="list-group-item"><a href="http://www.theus50.com/" target="_blank" rel="noopener noreferrer">The US50</a> - Retrieved images of all 50 state flags from URL of this website</li>
									<li className="list-group-item"><a href="https://createaclickablemap.com/" target="_blank" rel="noopener noreferrer">Create a Clickable Map</a> - Placed a clickable US map on the home page of this wesite</li>
									<li className="list-group-item"><a href="https://developers.google.com/maps/documentation/" target="_blank" rel="noopener noreferrer">Google Maps API</a> - Used to place maps in instance pages</li>



		            </ul>
		          </div>
		          <div className="card mb-4 box-shadow">
		            <div className="card-body">
		              <h4 className="card-title about-card-title" styles="margin-bottom: 0">Tools</h4>
		            </div>
		            <ul className="list-group list-group-flush">
		              <li className="list-group-item"><a href="https://gitlab.com/urielkugelmass/relievepoverty" target="_blank" rel="noopener noreferrer">Gitlab</a> - Used for version control, continuous integration, and issue/story tracking</li>
		              <li className="list-group-item"><a href="https://documenter.getpostman.com/view/5460449/RWgjY1qy" target="_blank" rel="noopener noreferrer">Postman</a> - Used for API design and unit testing</li>
		              <li className="list-group-item"><a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer">AWS</a> - Used to host our webapp, backend, and database.</li>
		              <li className="list-group-item"><a href="http://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</a> - An open source toolkit for CSS elements.</li>
		              <li className="list-group-item"><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">ReactJS</a> - ReactJS is our front-end JavaScript framework. It focuses on components makes it easier for distributed, collaborative work. It also renders out site from API data.</li>
		              <li className="list-group-item"><a href="http://flask.pocoo.org/" target="_blank" rel="noopener noreferrer">Flask</a> - Flask is a web framework used on the site.</li>
		              <li className="list-group-item"><a href="https://mochajs.org/" target="_blank" rel="noopener noreferrer">Mocha</a> - Mocha is a JavaScript testing framework.</li>
		              <li className="list-group-item"><a href="https://www.seleniumhq.org/" target="_blank" rel="noopener noreferrer">Selenium</a> - Selenium is a framework that allows browser navigation automation.</li>
		              <li className="list-group-item"><a href="https://docs.python.org/2/library/unittest.html" target="_blank" rel="noopener noreferrer">Unittest</a> - Python framework that allows creation of unit tests.</li>
		              <li className="list-group-item"><a href="http://plantuml.com/" target="_blank" rel="noopener noreferrer">PlantUML</a> - Program that allows you to see relationship between classes and their attributes.</li>
		              <li className="list-group-item"><a href="https://www.grammarly.com/" target="_blank" rel="noopener noreferrer">Grammarly</a> - Grammarly is a plugin that checks for grammar mistakes.</li>
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
		this.state.team.map(member => urls.push('https://gitlab.com/api/v4/projects/8594442/issues?author_id=' + member.issue_id + '&per_page=100'));
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
		var proxy = 'https://cors-anywhere.herokuapp.com/';
		var urls = ['https://gitlab.com/urielkugelmass/relievepoverty/raw/development/Postman.json',
		            'https://gitlab.com/urielkugelmass/relievepoverty/raw/development/frontend/test.js',
		            'https://gitlab.com/urielkugelmass/relievepoverty/raw/development/backend/tests/test_charities_api.py',
		            'https://gitlab.com/urielkugelmass/relievepoverty/raw/development/backend/tests/test_states_api.py',
		            'https://gitlab.com/urielkugelmass/relievepoverty/raw/development/backend/tests/test_news_api.py'];
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

	getAcceptanceTests() {
		var proxy = 'https://cors-anywhere.herokuapp.com/';
		var urls = ['https://gitlab.com/urielkugelmass/relievepoverty/raw/development/tst/e2e/test.py'];
		var promises = urls.map(url =>fetch(proxy + url).then(resp => resp.text()));
		var responses = new Array(urls.length);
		Promise.all(promises)
		.then((responses) => {
			var members = this.state.team;
			var stats = this.state.total;
			members.forEach(member => {
				responses.map(resp => {
					member.acceptance_tests += (resp.split(member.tests_id).length - 1);
				});
				stats.acceptance_tests += member.acceptance_tests;
			});
			this.setState({team: members, total: stats});
		}).catch(err => {
			console.log('getTests FAILED');
		}); ;
	}
}

export default About;
