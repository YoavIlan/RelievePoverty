import React, { Component } from 'react';
import NewsCard from './shared-components/NewsCard';
import ReactPaginate from 'react-paginate';
import fetch from 'node-fetch';
import './Paginate.css'
import Jumbotron from './shared-components/Jumbotron';


class News extends Component{
    constructor (props) {
       super(props);

       this.state = {data: [], total: 0}
    }

    getJSON(url) {
        return fetch(url).then(response => {
            return response.json();
        });
    }

    async componentWillMount() {
        await this.getJSON('https://api.relievepoverty.me/v1/news?page=1').then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    handlePageClick = (data) =>{
        let selected = data.selected + 1;
        this.getJSON('https://api.relievepoverty.me/v1/news?page='+selected).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    render(){
        let pageSize = 12.0;
        return(
            <>
              <Jumbotron title={"Read Articles About Poverty in the US"} description={"Our news sources include The New York Times, CNN and others."}/>
              <div className='album py-5 bg-light listingPage'>
                <div className="container">
                  <div className='row'>
                    {this.state.data.map(obj =>
                      <NewsCard image={obj.image} title={obj.title} source={obj.source} id={obj.id} published_date={obj.published_date} state={obj.state} author={obj.author} />
                    )}
                  </div>
                </div>
                <ReactPaginate className='pagination'
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={<a href="#">...</a>}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(this.state.total / pageSize)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
              </div>
            </>
        )
    }
}

export default News;
