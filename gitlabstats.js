/**
 * Wrapper that calls subfunctions to get all stats when the about page is loaded
 */
function getStats() {
	getCommits();
	getIssues();
	getTests();
}

/**
 * Wrapper to get JSON from an external API
 */
function getJSON(url) {
	return fetch(url).then(response => {
		return response.json();
	});
}

/**
 * Loads commits from gitlabs, parses the json, then binds the variables to the HTML
 */
function getCommits() {
	var url = 'https://gitlab.com/api/v4/projects/8594442/repository/contributors?sort=desc';
	var albert_commits = 0;
	var colin_commits = 0;
	var daniel_commits = 0;
	var evan_commits = 0;
	var uri_commits = 0;
	var yoav_commits = 0;
	var total_commits = 0;

	getJSON(url).then(response => {
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
		document.getElementById('albert_commits').innerHTML = albert_commits;
		document.getElementById('colin_commits').innerHTML = colin_commits;
		document.getElementById('daniel_commits').innerHTML = daniel_commits;
		document.getElementById('evan_commits').innerHTML = evan_commits;
		document.getElementById('uri_commits').innerHTML = uri_commits;
		document.getElementById('yoav_commits').innerHTML = yoav_commits;
	  	document.getElementById('total_commits').innerHTML = total_commits;
	}).catch(err => {
		console.log('getCommits FAILED');
	});
}

/**
 * Sends individual issue API Gets for each contributor in parallel, parses the data, then binds it to the HTML
 */
function getIssues() {
	var albert_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2803538&per_page=100';
	var colin_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2776165&per_page=100';
	var daniel_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2773160&per_page=100';
	var evan_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2773618&per_page=100';
	var uri_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2825936&per_page=100';
	var yoav_url = 'https://gitlab.com/api/v4/projects/8594442/issues?author_id=2788669&per_page=100';

	Promise.all([getJSON(albert_url), getJSON(colin_url), getJSON(daniel_url), getJSON(evan_url), getJSON(uri_url), getJSON(yoav_url)])
	.then(([albert, colin, daniel, evan, uri, yoav]) => {
		var albert_issues = JSON.parse(JSON.stringify(albert)).length
		var colin_issues = JSON.parse(JSON.stringify(colin)).length
		var daniel_issues = JSON.parse(JSON.stringify(daniel)).length
		var evan_issues = JSON.parse(JSON.stringify(evan)).length
		var uri_issues = JSON.parse(JSON.stringify(uri)).length
		var yoav_issues = JSON.parse(JSON.stringify(yoav)).length

		document.getElementById('albert_issues').innerHTML = albert_issues;
		document.getElementById('colin_issues').innerHTML = colin_issues;
		document.getElementById('daniel_issues').innerHTML = daniel_issues;
		document.getElementById('evan_issues').innerHTML = evan_issues;
		document.getElementById('uri_issues').innerHTML = uri_issues;
		document.getElementById('yoav_issues').innerHTML = yoav_issues;
	  	document.getElementById('total_issues').innerHTML = albert_issues + colin_issues + daniel_issues + evan_issues + uri_issues + yoav_issues;
	}); 
}

/**
 * We weren't able to find documentation for unit tests. Since we won't be making any
 * for the first project anyways we have decided to just hardcode them as zero
 */
function getTests() {
	document.getElementById('albert_tests').innerHTML = 0;
	document.getElementById('colin_tests').innerHTML = 0;
	document.getElementById('daniel_tests').innerHTML = 0;
	document.getElementById('evan_tests').innerHTML = 0;
	document.getElementById('uri_tests').innerHTML = 0;
	document.getElementById('yoav_tests').innerHTML = 0;
	document.getElementById('total_tests').innerHTML = 0;
}

