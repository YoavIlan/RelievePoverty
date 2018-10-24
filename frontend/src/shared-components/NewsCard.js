import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


function getRank(rank) {
    if (rank == 11 || rank == 12 || rank == 13)
        return 'th'
    switch(rank%10){
        case 1:
            return 'st'
        case 2:
            return 'nd'
        case 3:
            return 'rd'
        default:
            return 'th'
    }
}

class NewsCard extends Component {
    
    render() {
        let title = this.props.title;
        let description = this.props.description;
        let image = this.props.image;
        return <div className="col-md-4 d-flex">
        		<div className="card mb-4 box-shadow d-flex flex-column">
        			<img className="card-img-top d-flex" src={image} alt="Card image cap"/>
        			<div className="card-body d-flex flex-column">
        				<h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                        <a href="news/from_homeless.html" className="btn btn-primary mt-auto">More Information</a>
        			</div>
        		</div>
        	</div>
    }
}

export default NewsCard;
