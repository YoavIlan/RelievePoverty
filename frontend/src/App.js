import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import News from './News';
import Charities from './Charities';
import States from './States';
import Navbar from './shared-components/Navbar';

class App extends Component {
    render() {
        return (
            <Router>
              <div>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/news" component={News} />
                <Route path="/charities" component={Charities} />
                <Route path="/states" component={States} />
              </div>
            </Router>
        );
    }
}

export default App;