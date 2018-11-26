import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import News from './News';
import NewsInstance from './NewsInstance';
import CharityInstance from './CharityInstance';
import StateInstance from './StateInstance';
import Charities from './Charities';
import States from './States';
import Navbar from './shared-components/Navbar';
import Search from './Search';
import Visualizations from './Visualizations';
import Ours from './visualizations/Ours';
import Theirs from './visualizations/Theirs';


class App extends Component {
    componentDidMount(){
      document.title = "Relieve Poverty";
      document.image = "../img/daniel.jpg"
    };
    render() {
        return (
          <>

            <Router>
              <div>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/news/:id" component={NewsInstance} />
                    <Route path="/charities/:id" component={CharityInstance} />
                    <Route path="/states/:name" component={StateInstance} />
                    <Route path="/search/:query" component={Search} />
                    <Route path="/about" component={About} />
                    <Route path="/news" component={News} />
                    <Route path="/charities" component={Charities} />
                    <Route path="/states" component={States} />
                    <Route path="/visualizations" component={Visualizations} />
                    <Route path="/ours" component={Ours} />
                    <Route path="/theirs" component={Theirs} />
                </Switch>
              </div>
            </Router>
            </>
        );
    }
}

export default App;
