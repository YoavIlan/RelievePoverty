import React, { Component } from 'react';
import CharitiesCard from './shared-components/CharitiesCard';
import Jumbotron from './shared-components/Jumbotron';
import ReactPaginate from 'react-paginate';
import fetch from 'node-fetch';
import './Paginate.css'


class Charities extends Component{
    constructor (props) {
       super(props);
       this.state = {data: [], total: 0, api: "https://api.relievepoverty.me/v1/charities?page=", page: 1, query: ""}
    }

    getJSON(url) {
        return fetch(url).then(response => {
            return response.json();
        });
    }

    async componentWillMount() {
        await this.getJSON(this.state.api + this.state.page).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    handlePageClick = (data) =>{
        this.state.page = data.selected + 1;
        if(this.state.query === ""){
            this.getJSON(this.state.api + this.state.page).then(response => {
                this.setState(JSON.parse(JSON.stringify(response)))
            });
        }
        else{
            this.getJSON(this.state.api + this.state.page + "&q=" + this.state.query).then(response => {
                this.setState(JSON.parse(JSON.stringify(response)))
            });
        }
    }

    handleSearch = (data) => {
        data.preventDefault();
        this.state.query = data.target[0].value;
        this.state.page = 1;
        if(this.state.query === ""){
            this.getJSON(this.state.api + this.state.page).then(response => {
                this.setState(JSON.parse(JSON.stringify(response)))
            });
        }
        else{
            this.getJSON(this.state.api + this.state.page + "&q=" + this.state.query).then(response => {
                this.setState(JSON.parse(JSON.stringify(response)))
            });
        }
    }

    render(){
        let pageSize = 12.0;
        return(
            <>
              <Jumbotron title={"Search for Charities that Help to Relieve Poverty in the US"} description={"Charities throughout the US are doing great work every single day to combat poverty. Help them accomplish their goals by donating today."} search={this.handleSearch} modelName={"charities"}/>
              <div className='album py-5 bg-light listingPage'>
                <div className="container">
                  <div className='row'>
                    {this.state.data.map(obj =>
                      <CharitiesCard image={obj.img} title={obj.name} affiliation={obj.affiliation} tax_classification={obj.tax_classification} state={obj.state} rating={obj.rating} id={obj.id}/>
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

export default Charities;
