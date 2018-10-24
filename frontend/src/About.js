import React, { Component } from 'react';
import AboutCard from './shared-components/AboutCard';
import Jumbotron from './shared-components/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends Component{

	constructor (props) {
    	super(props);

    	this.state = {
    		commits: {
    			albert: 0,
    			colin: 0,
    			daniel: 0,
    			evan: 0,
    			uri: 0,
    			yoav: 0,
    			total: 0
    		},
    		issues: {
    			albert: 0,
    			colin: 0,
    			daniel: 0,
    			evan: 0,
    			uri: 0,
    			yoav: 0,
    			total: 0
    		},
    		tests: {
    			albert: 0,
    			colin: 0,
    			daniel: 0,
    			evan: 0,
    			uri: 0,
    			yoav: 0,
    			total: 0
    		}
       }
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
		      <div class="album py-5">
		        <div class="container">
		          <div class="card mb-4 box-shadow">
		            <div class="card-body">
		              <h4 class="card-title" styles="margin-bottom: 0">Stats</h4>
		            </div>
		            <ul class="list-group list-group-flush">
		              <li class="list-group-item">Total # of commits: {this.state.commits.total}</li>
		              <li class="list-group-item">Total # of issues: {this.state.issues.total}</li>
		              <li class="list-group-item">Total # of unit tests: {this.state.tests.total}</li>
		            </ul>
		          </div>
			    	<div class="row">
				    	<AboutCard image={require('./img/uri.jpg')} name={'Uriel Kugelmass'} title={'Frontend Developer'} description={'Uriel is currently a Computer Science Senior at UT from Montevideo, Uruguay. Outside of school, you can find him playing soccer or reading books, but never taking long walks on the beach.'} commits={this.state.commits.uri} issues={this.state.issues.uri} tests={this.state.tests.uri}/>
				    	<AboutCard image={require('./img/evan.jpg')} name={'Evan Weiss'} title={'APIs, Backend, and Databases'} description={"Evan is a Junior at UT studying Computer Science and was born in Dallas, TX. A fun fact about him is that he has been skydiving. He doesn't enjoy long walks on the beach because he gets bored easily."} commits={this.state.commits.evan} issues={this.state.issues.evan} tests={this.state.tests.evan}/>
				    	<AboutCard image={require('./img/yoav.jpg')} name={'Yoav Ilan'} title={'Frontend Developer'} description={'Yoav is a Junior Computer Science student from Dallas, TX, and Israel prior to that. He only enjoys medium walks on the beach that are between 10 to 15 minutes inclusive.'} commits={this.state.commits.yoav} issues={this.state.issues.yoav} tests={this.state.tests.yoav}/>
				    	<AboutCard image={require('./img/albert.jpg')} name={'Albert Luu'} title={'Full-Stack Developer'} description={'Albert is a Junior Computer Science student from Arlington, Texas. Outside of school, he enjoys biking, gaming, and playing piano. Unfortunately, long walks on the beach are very tiring to him.'} commits={this.state.commits.albert} issues={this.state.issues.albert} tests={this.state.tests.albert}/>
				    	<AboutCard image={require('./img/colin.jpg')} name={'Colin Frick'} title={'Full-Stack Developer'} description={'Colin is a Junior Computer Science student at UT from Houston Texas. He is interested in studying artificial intelligence and web development. He does not enjoy walking of any form.'} commits={this.state.commits.colin} issues={this.state.issues.colin} tests={this.state.tests.colin}/>
				    	<AboutCard image={require('./img/daniel.jpg')} name={'Daniel Chruscielski'} title={'Full-Stack Developer'} description={'Daniel is a third year Computer Science student at UT. He enjoys making long walks on the beach shorter by finding the shortest possible path. In his spare time, he plays the drums, listens to jazz, and generally does what you would expect from someone who lives in Austin.'} commits={this.state.commits.daniel} issues={this.state.issues.daniel} tests={this.state.tests.daniel}/>
			    	</div>
		          <div class="card mb-4 box-shadow">
		            <div class="card-body">
		              <h4 class="card-title" styles="margin-bottom: 0">Data Sources</h4>
		            </div>
		            <ul class="list-group list-group-flush">
		              <li class="list-group-item"><a href="https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_poverty_rate" target="_blank">Wikipedia (State Poverty)</a> - Scraped by using Wikipedia's REST API then parsing the data tables</li>
		              <li class="list-group-item"><a href="https://developer.nytimes.com/article_search_v2.json" target="_blank">NYTimes</a> - Scraped by using their article search API with queries</li>
		              <li class="list-group-item"><a href="https://newsapi.org/" target="_blank">NewsAPI</a> - Scraped by using their API with states as filters</li>
		              <li class="list-group-item"><a href="https://charity.3scale.net/docs/data-api/reference" target="_blank">Charity Navigator</a> - Scraped by using their API by searching for poverty related charities</li>
		            </ul>
		          </div>
		          <div class="card mb-4 box-shadow">
		            <div class="card-body">
		              <h4 class="card-title" styles="margin-bottom: 0">Tools</h4>
		            </div>
		            <ul class="list-group list-group-flush">
		              <li class="list-group-item"><a href="https://gitlab.com/urielkugelmass/relievepoverty" target="_blank">Gitlab</a> - Used for version control, continuous integration, and issue/story tracking</li>
		              <li class="list-group-item"><a href="https://documenter.getpostman.com/view/5460449/RWgjY1qy" target="_blank">Postman</a> - Used for API design and unit testing</li>
		              <li class="list-group-item"><a href="https://aws.amazon.com/" target="_blank">AWS</a> - Used to host our webapp, backend, and database</li>
		              <li class="list-group-item"><a href="http://getbootstrap.com/" target="_blank">Bootstrap</a> - An open source toolkit for CSS elements</li>
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
 	 * Loads commits from gitlabs, parses the json, then binds the variables to the HTML
 	 */
	getCommits() {
		var url = 'https://gitlab.com/api/v4/projects/8594442/repository/contributors?sort=desc';
		var albert_commits = 0;
		var colin_commits = 0;
		var daniel_commits = 0;
		var evan_commits = 0;
		var uri_commits = 0;
		var yoav_commits = 0;
		var total_commits = 0;

		this.getJSON(url).then(response => {
			JSON.parse(JSON.stringify(response)).forEach(obj => {
				total_commits += obj.commits;
				if (obj.name == 'Albert Luu') {
					albert_commits = obj.commits;
				} 
				else if (obj.name == 'cfrick16') {
					colin_commits += obj.commits;
				} 
				else if (obj.name == 'Daniel Chruscielski') {
					daniel_commits += obj.commits;
				} 
				else if (obj.name == 'Evan Weiss' || obj.name == 'eweiss97') {
					evan_commits += obj.commits;
				} 
				else if (obj.name == 'Uriel Kugelmass') {
					uri_commits += obj.commits;
				} 
				else if (obj.name == 'Yoav Ilan') {
					yoav_commits += obj.commits;
				}
			});
			const obj = {albert: albert_commits, colin: colin_commits, daniel: daniel_commits, evan: evan_commits, uri: uri_commits, yoav: yoav_commits, total: total_commits};
			this.setState({commits: obj, issues: this.state.issues, tests: this.state.tests});
		}).catch(err => {
			console.log('getCommits FAILED');
		});
	}

	/**
 	 * Sends individual issue API Gets for each contributor in parallel, parses the data, then binds it to the HTML
 	 */
	getIssues() {
		var albert_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2803538&per_page=100';
		var colin_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2776165&per_page=100';
		var daniel_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2773160&per_page=100';
		var evan_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2773618&per_page=100';
		var uri_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2825936&per_page=100';
		var yoav_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2788669&per_page=100';

		Promise.all([this.getJSON(albert_url), this.getJSON(colin_url), this.getJSON(daniel_url), this.getJSON(evan_url), this.getJSON(uri_url), this.getJSON(yoav_url)])
		.then(([albert, colin, daniel, evan, uri, yoav]) => {
			var albert_issues = JSON.parse(JSON.stringify(albert)).length
			var colin_issues = JSON.parse(JSON.stringify(colin)).length
			var daniel_issues = JSON.parse(JSON.stringify(daniel)).length
			var evan_issues = JSON.parse(JSON.stringify(evan)).length
			var uri_issues = JSON.parse(JSON.stringify(uri)).length
			var yoav_issues = JSON.parse(JSON.stringify(yoav)).length
			const total = albert_issues + colin_issues + daniel_issues + evan_issues + uri_issues + yoav_issues;
			const obj = {albert: albert_issues, colin: colin_issues, daniel: daniel_issues, evan: evan_issues, uri: uri_issues, yoav: yoav_issues, total: total};
			this.setState({commits: this.state.commits, issues: obj, tests: this.state.tests});
		}); 
	}

	/**
 	 * We weren't able to find documentation for unit tests. Since we won't be making any
 	 * for the first project anyways we have decided to just hardcode them as zero
 	 */
	getTests() {
		const obj = {albert: 0, colin: 0, daniel: 0, evan: 0, uri: 0, yoav: 0, total: 0};
		this.setState({commits: this.state.commits, issues: this.state.issues, tests: obj});
	}
}

export default About;