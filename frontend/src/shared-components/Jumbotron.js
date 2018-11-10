import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NativeSelects from './Dropdown';


class Jumbotron extends Component {
    constructor (props) {
        super(props);
        this.state = {query: ""}
     }

    render() {
        const hasTitle = this.props.title != null;
        const hasDescription = this.props.description != null;
        const filters = this.props.filters;
        const prompt = this.props.prompt;
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
                        <div className="row">
                        <div className="col-md-4 d-flex">
                        <NativeSelects data={filters} prompt={prompt} onChange={this.props.handleFilter}></NativeSelects>
                        </div>
                        <div className="col-md-4 d-flex">
                            
                        </div>
                        <div className="col-md-4 d-flex">
                        <form onSubmit={this.props.search}>
                                <input className="search-bar" type="text" placeholder="Search" />
                                <input id="search-submit" type="submit" value="Submit" />
                            </form>
                        </div>
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