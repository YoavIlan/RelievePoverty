import React, { Component } from 'react';
import CharitiesCard from './shared-components/CharitiesCard';
import Jumbotron from './shared-components/Jumbotron';
import ReactPaginate from 'react-paginate';
import fetch from 'node-fetch';
import './Paginate.css'
import NativeSelects from './shared-components/Dropdown'



class Charities extends Component{
    constructor (props) {
       super(props);
       this.state = {
         data: [],
         total: 0,
         api: "https://api.relievepoverty.me/v1/charities?page=",
         page: 1,
         query: "",
         sort: "",
         reverse: "",
         filters: {},
         reset: true
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
    ]
    causes = [
      "Unknown",
      "Food Banks, Food Pantries, and Food Distribution",
      "Homeless Services",
      "Children's and Family Services",
      "Multipurpose Human Service Organizations",
      "Social Services",
      "Youth Development, Shelter, and Crisis Services"
    ]
    sorts = [
      "rating",
      "name",
      "state"
    ]

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
        this.accessAPI()
    }

    handleFilterState = (filter_value) => {
        this.state.page = 1;
        let str = "state=" + filter_value;
        this.state.filters["state"] = str;
        this.accessAPI();
    }

    handleFilterRating = (filter_value) => {
        this.state.page = 1;
        let str = "rating=" + filter_value;
        this.state.filters["rating"] = str;
        this.accessAPI();
    }

    handleFilterTaxClassification = (filter_value) => {
        this.state.page = 1;
        let str = "tax_classification=" + filter_value;
        this.state.filters["tax_classification"] = str;
        this.accessAPI();
    }

    handleFilterCause = (filter_value) => {
        this.state.page = 1;
        if(filter_value == "Unknown"){
          filter_value = "NULL"
        }
        let str = "cause_name=" + filter_value;
        this.state.filters["cause_name"] = str;
        this.accessAPI();
    }

    handleFilterAffiliation = (filter_value) => {
        this.state.page = 1;
        let str = "affiliation=" + filter_value;
        this.state.filters["affiliation"] = str;
        this.accessAPI();
    }

    handleSearch = (data) => {
        data.preventDefault();
        this.state.query = "q=" + data.target[0].value;
        this.state.page = 1;
        this.accessAPI();
    }

    handleSort = (sort_by) => {
        this.state.page = 1;
        let str = "sort_by=" + sort_by;
        this.state.sort = str;
        this.accessAPI();
    }

    handleReverse = (reverse) => {
        this.state.page = 1;
      if(reverse == "Descending")
        this.state.reverse = "reverse=true"
      else
        this.state.reverse = ""

      this.accessAPI();
    }

    reset = () => {
      this.state = {
        data: [],
        total: 0,
        api: "https://api.relievepoverty.me/v1/charities?page=",
        page: 1,
        query: "",
        sort: "",
        reverse: "",
        filters: {},
        reset: true
      };
    }
    accessAPI = () => {
      let args = [this.state.sort, this.state.reverse, this.state.query].concat(this.state.filters);
      let api = this.state.api + this.state.page + "&";
      for(let i = 0; i < args.length; i++){
        if(args[i] != "")
          api += args[i] + "&"
      }
      for(let i = 0; i < Object.keys(this.state.filters).length; i++){
        api += this.state.filters[Object.keys(this.state.filters)[i]] + "&";
      }
      api = api.substring(0, api.length-1);
      console.log(api)
      this.getJSON(api).then(response => {
          this.setState(JSON.parse(JSON.stringify(response)))
      })
    }

    render(){
        let pageSize = 12.0;
        let result = (
            <>
              <Jumbotron title={"Search for Charities that Help to Relieve Poverty in the US"} description={"Charities throughout the US are doing great work every single day to combat poverty. Help them accomplish their goals by donating today."} search={this.handleSearch} modelName={"charities"} filters={[]} prompt={"Search"}/>
              <div className="container-fluid fss">
                  <div className="row fss-bar">
                  <div className="col-md-4 d-flex flex-column">
                  {prompt &&
                  <NativeSelects reset={this.state.reset} data={["Independent", "Central", "Subordinate"]} prompt={"Filter by Affiliation"} onChange={this.handleFilterAffiliation}></NativeSelects>
                  }
                  </div>

                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects reset={this.state.reset} data={["Ascending", "Descending"]} prompt={"Sort Order"} onChange={this.handleReverse}></NativeSelects>
                }
                </div>

                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <form onSubmit={this.handleSearch}>
                    <input className="search-bar" type="text" placeholder="Search" />
                    <input id="search-submit" type="submit" value="Submit" />
                </form>
                }
                </div>

                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects reset={this.state.reset} data={this.allStates} prompt={"Filter by State"} onChange={this.handleFilterState}></NativeSelects>
                }
                </div>

                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects reset={this.state.reset} data={this.sorts} prompt={"Sort By"} onChange={this.handleSort}></NativeSelects>
                }
                </div>

                <div className="col-md-4 d-flex flex-column"></div>

                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects reset={this.state.reset} data={["501(c)(3)","501(c)(4)","501(c)(5)","501(c)(6)","501(c)(7)","501(c)(8)"]} prompt={"Filter by Tax Classification"} onChange={this.handleFilterTaxClassification}></NativeSelects>
                }
                </div>

                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects reset={this.state.reset} data={this.causes} prompt={"Filter by Cause"} onChange={this.handleFilterCause}></NativeSelects>
                }
                </div>

                <div className="col-md-4 d-flex flex-column"></div>

                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects reset={this.state.reset} data={["1", "2", "3", "4"]} prompt={"Filter by Rating"} onChange={this.handleFilterRating}></NativeSelects>
                }
                </div>

                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <button className="reset-button" onClick={this.reset}>Reset</button>
                }
                </div>

              </div>
              </div>
              <div className='album py-5 bg-light listingPage'>
                <div className="container">
                  <div className='row'>
                    {this.state.data.map(obj =>
                      <CharitiesCard query={this.state.query.length === undefined  ? "q= ":this.state.query} image={obj.img} title={obj.name} affiliation={obj.affiliation} tax_classification={obj.tax_classification} state={obj.state} rating={obj.rating} id={obj.id}/>
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
                  forcePage={this.state.page - 1}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
              </div>
            </>
        )
        this.state.reset = false;
        return result;
    }
}

export default Charities;
