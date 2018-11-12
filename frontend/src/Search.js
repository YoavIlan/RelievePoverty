import React, { Component } from 'react';
import CharitiesCard from './shared-components/CharitiesCard';
import StatesCard from './shared-components/StatesCard';
import NewsCard from './shared-components/NewsCard';
import Jumbotron from './shared-components/Jumbotron';
import ReactPaginate from 'react-paginate';
import fetch from 'node-fetch';
import './Paginate.css'


class Search extends Component{
    constructor (props) {
       super(props);
       this.state = {states: {data: [], total: 0}, news: {data: [], total: 0}, charities: {data: [], total: 0}, api: "https://api.relievepoverty.me/v1/search/" + this.props.match.params.query, states_page: 1, charities_page: 1, news_page: 1};
    }

    getJSON(url) {
        return fetch(url).then(response => {
            return response.json();
        });
    }

    async componentWillMount() {
        await this.getJSON(this.state.api + '?news_page=' + this.state.news_page + '&states_page=' + this.state.states_page + '&charities_page=' + this.state.charities_page).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    async componentWillReceiveProps(next) {
        this.setState({states: {data: [], total: 0}, news: {data: [], total: 0}, charities: {data: [], total: 0}, api: "https://api.relievepoverty.me/v1/search/" + this.props.match.params.query, states_page: 1, charities_page: 1, news_page: 1});
        await this.getJSON('https://api.relievepoverty.me/v1/search/' + next.match.params.query + '?news_page=' + this.state.news_page + '&states_page=' + this.state.states_page + '&charities_page=' + this.state.charities_page).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    handleCharityPageClick = (data) => {
        this.state.charities_page = data.selected + 1;
        this.getJSON(this.state.api + '?news_page=' + this.state.news_page + '&states_page=' + this.state.states_page + '&charities_page=' + this.state.charities_page).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    handleNewsPageClick = (data) => {
        this.state.news_page = data.selected + 1;
        this.getJSON(this.state.api + '?news_page=' + this.state.news_page + '&states_page=' + this.state.states_page + '&charities_page=' + this.state.charities_page).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    handleStatePageClick = (data) => {
        this.state.states_page = data.selected + 1;
        this.getJSON(this.state.api + '?news_page=' + this.state.news_page + '&states_page=' + this.state.states_page + '&charities_page=' + this.state.charities_page).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    render(){
        let pageSize = 3.0;
        return(
            <>
              <Jumbotron title={"Search for Charities that Help to Relieve Poverty in the US"} description={"Charities throughout the US are doing great work every single day to combat poverty. Help them accomplish their goals by donating today."} search={this.handleSearch} modelName={"charities"} filters={[]} prompt={""}/>
              <div className='album py-5 bg-light listingPage'>
                <div className="container">
                  <div className='row'>
                    {this.state.charities.data.map(obj =>
                      <CharitiesCard image={obj.img} title={obj.name} affiliation={obj.affiliation} tax_classification={obj.tax_classification} state={obj.state} rating={obj.rating} id={obj.id}/>
                    )}
                  </div>
                </div>
                <ReactPaginate className='pagination'
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={<a href="#">...</a>}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(this.state.charities.total / pageSize)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handleCharityPageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
              </div>

                <div className='album py-5 bg-light listingPage'>
                <div className="container">
                  <div className='row'>
                    {this.state.news.data.map(obj =>
                      <NewsCard image={obj.image} title={obj.title} source={obj.source} id={obj.id} published_date={obj.published_date} state={obj.state} author={obj.author} />
                    )}
                  </div>
                </div>
                <ReactPaginate className='pagination'
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={<a href="#">...</a>}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(this.state.news.total / pageSize)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handleNewsPageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
              </div>

                <div className='album py-5 bg-light listingPage'>
                <div className="container">
                  <div className='row'>
                    {this.state.states.data.map(obj =>
                      <StatesCard image={obj.flag} state={obj.name} rank={obj.rank} median_income={obj.median_income} counties={obj.counties} child_poverty_rate={obj.child_poverty_rate} below_poverty_rate={obj.below_poverty_rate}/>
                    )}
                  </div>
                </div>
                <ReactPaginate className='pagination'
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={<a href="#">...</a>}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(this.state.states.total / pageSize)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handleStatePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
              </div>
            </>
        )
    }
}

export default Search;
