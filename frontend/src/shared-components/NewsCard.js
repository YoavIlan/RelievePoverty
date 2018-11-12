import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Highlighter from 'react-highlight-words';

class NewsCard extends Component {
    render() {
        let query = this.props.query.split(" ");
        let title = <Highlighter searchWords={query} textToHighlight={this.props.title}/>;
        let published_date = this.props.published_date;
        let image = this.props.image;
        let id = this.props.id;
        let source = <Highlighter searchWords={query} textToHighlight={this.props.source}/>;;
        let state = <Highlighter searchWords={query} textToHighlight={this.props.state}/>;
        let author = <Highlighter searchWords={query} textToHighlight={this.props.author}/>;
        return <div className="col-md-4 d-flex">
        		<div className="card mb-4 box-shadow d-flex flex-column">
        			<img className="card-img-top d-flex" src={image} alt="Card cap"/>
        			<div className="card-body d-flex flex-column">
        				<h5 className="card-title">{title}</h5>
                    <ul className="card-text">
                        <li><b>Source:</b> {source}</li>
                        <li><b>State:</b> {state}</li>
                        {author !== undefined && <li><b>Author:</b> {author}</li>}
                        {published_date !==  undefined && <li><b>Date:</b> <Highlighter searchWords={query} textToHighlight={published_date.substring(0,16)}/></li>}
                    </ul>
                    <Link to={`/news/${id}`}  className="btn btn-primary mt-auto">More Information</Link>
        			</div>
        		</div>
        	</div>
    }
}

export default NewsCard;
