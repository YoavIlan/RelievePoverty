import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class Jumbotron extends Component {
    render() {
        const hasTitle = this.props.title != null;
        const hasDescription = this.props.description != null;
        if (hasTitle)
        {
            if (hasDescription)
            {
                return (
                    <section className="jumbotron text-center flex-fill"> 
                    <div className="container"> 
                    <h1 className="jumbotron-heading">{this.props.title}</h1>
                    <p className="lead">{this.props.description}</p>
                    </div>
                    </section>
                    );
            } else {
                return (                     
                    <section className="jumbotron text-center flex-fill"> 
                    <div className="container"> 
                    <h1 className="jumbotron-heading">{this.props.title}</h1>
                    </div>
                    </section>
                    );
            }
        }
    }
}

export default Jumbotron;