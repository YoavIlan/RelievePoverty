import React, { Component } from 'react';
import StatesCard from './shared-components/StatesCard';
import Jumbotron from './shared-components/Jumbotron';
import ReactPaginate from 'react-paginate';
import fetch from 'node-fetch';
import './Paginate.css'


class States extends Component{
    constructor (props) {
       super(props);

       this.state = {data: [], total: 0, api: "https://api.relievepoverty.me/v1/states?page=", page: 1, query: ""}
    }

    allStates = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District Of Columbia",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    getJSON(url) {
        return fetch(url).then(response => {
            return response.json();
        });
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

    handleFilter = (filter) => {
        let query = 'https://api.relievepoverty.me/v1/states?page=1&q=' + filter;
        this.getJSON(query).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        })
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

    render(){
        let pageSize = 12.0;
        return(
            <>
              <Jumbotron title={"Learn More About Poverty by State in the U.S."} description={"Facts and figures of poverty in all 50 states"} search={this.handleSearch} modelName={"states"} handleFilter={this.handleFilter} filters={this.allStates} prompt={"Filter by State"}/>
              <div className='album py-5 bg-light listingPage'>
                <div className="container">
                  <div className='row'>
                    {this.state.data.map(obj =>
                      <StatesCard image={obj.flag} state={obj.name} rank={obj.rank} median_income={obj.median_income} counties={obj.counties} child_poverty_rate={obj.child_poverty_rate} below_poverty_rate={obj.below_poverty_rate}/>
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

export default States;
