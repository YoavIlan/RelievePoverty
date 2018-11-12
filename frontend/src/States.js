import React, { Component } from 'react';
import StatesCard from './shared-components/StatesCard';
import Jumbotron from './shared-components/Jumbotron';
import ReactPaginate from 'react-paginate';
import fetch from 'node-fetch';
import NativeSelects from './shared-components/Dropdown'
import './Paginate.css'


class States extends Component{
    constructor (props) {
       super(props);

       this.state = {
         data: [],
         total: 0,
         api: "https://api.relievepoverty.me/v1/states?page=",
         page: 1,
         query: "",
         sort: "sort_by=median_income",
         reverse: "",
         filters: []
       }
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

    sorts = [
      "median_income",
      "rank",
      "name",
      "below_poverty_rate",
      "child_poverty_rate"
    ]

    getJSON(url) {
        return fetch(url).then(response => {
            return response.json();
        });
    }

    handleSearch = (data) => {
        data.preventDefault();
        this.state.query = "q=" + data.target[0].value;
        this.state.page = 1;
        this.accessAPI();
        // if(this.state.query === ""){
        //     this.getJSON(this.state.api + this.state.page).then(response => {
        //         this.setState(JSON.parse(JSON.stringify(response)))
        //     });
        // }
        // else{
        //     this.getJSON(this.state.api + this.state.page + "&q=" + this.state.query).then(response => {
        //         this.setState(JSON.parse(JSON.stringify(response)))
        //     });
        // }
    }

    handleFilterName = (filter_value) => {
        let str = "name=" + filter_value;
        this.state.filters.push(str);
        this.accessAPI();
    }
    // handleFilterMedianIncome = (filter_value) => {
    //     let str = "median_income=" + filter_value;
    //     this.state.filter.push(str);
    //     this.accessAPI();
    // }
    // handleFilterName = (filter_value) => {
    //     let str = "name=" + filter_value;
    //     this.state.filter.push(str);
    //     this.accessAPI();
    // }
    // handleFilterName = (filter_value) => {
    //     let str = "name=" + filter_value;
    //     this.state.filter.push(str);
    //     this.accessAPI();
    // }
    // handleFilterName = (filter_value) => {
    //     let str = "name=" + filter_value;
    //     this.state.filter.push(str);
    //     this.accessAPI();
    // }
    // handleFilterName = (filter_value) => {
    //     let str = "name=" + filter_value;
    //     this.state.filter.push(str);
    //     this.accessAPI();
    // }
    // handleFilterName = (filter_value) => {
    //     let str = "name=" + filter_value;
    //     this.state.filter.push(str);
    //     this.accessAPI();
    // }

    handleSort = (sort_by) => {
        let str = "sort_by=" + sort_by;
        this.state.sort = str;
        this.accessAPI();
    }

    accessAPI = () => {
      let args = [this.state.sort, this.state.reverse, this.state.query].concat(this.state.filters);
      let api = this.state.api + this.state.page + "&";
      for(let i = 0; i < args.length; i++){
        if(args[i] != "")
          args[i] += "&";
          api += args[i]
      }
      api = api.substring(0, api.length-1);
      console.log(this.state.sort)
      console.log(api);
      this.getJSON(api).then(response => {
          this.setState(JSON.parse(JSON.stringify(response)))
      })
    }

    handleReverse = (reverse) => {
      if(reverse == "Descending")
        this.state.reverse = "reverse=true"
      else
        this.state.reverse = ""

      this.accessAPI();
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

              <div className="row fss-bar">
              <div className="container row fss">
                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects data={this.allStates} prompt={"Filter by state:"} onChange={this.handleFilterName}></NativeSelects>
                }
                </div>
                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects data={this.sorts} prompt={"Sort By:"} onChange={this.handleSort}></NativeSelects>
                }
                </div>
                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects data={["Ascending", "Descending"]} prompt={"Sort Order"} onChange={this.handleReverse}></NativeSelects>
                }
                </div>
              </div>
              </div>
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
