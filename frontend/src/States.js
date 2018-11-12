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
         sort: "sort_by=rank",
         reverse: "",
         filters: {}
       }
    }

    sorts = [
      "median income",
      "rank",
      "name",
      "below poverty rate",
      "child poverty rate"
    ]

    getJSON(url) {
        return fetch(url).then(response => {
            return response.json();
        });
    }

    handleSearch = (data) => {
        data.preventDefault();
        // this.state.query = "q=" + data.target[0].value;
        this.state.query = data.target[0].value;
        this.state.page = 1;
        this.accessAPI();
    }

    handleFilterName = (filter_value) => {
        let str = "name=" + filter_value;
        this.state.filters.push(str);
        this.accessAPI();
    }

    handleFilterMedianIncome = (filter_value) => {
        let low = filter_value.substring(5,10);
        let str_low = "median_income_low=" + low;
        this.state.filters["median_income_low"] = str_low;

        let high = filter_value.substring(14);
        let str_high = "median_income_high=" + high;
        this.state.filters["median_income_high"] = str_high;

        this.accessAPI();
    }
    handleFilterBelowPoverty = (filter_value) => {
      // from 05% to 10%

        let low = filter_value.substring(5,7);
        let str_low = "below_poverty_rate_low=" + low;
        this.state.filters["below_poverty_rate_low"] = str_low;

        let high = filter_value.substring(12, 14);
        let str_high = "below_poverty_rate_high=" + high;
        this.state.filters["below_poverty_rate_high"] = str_high;
        this.accessAPI();
    }

    handleFilterChildPoverty = (filter_value) => {
      // from 05% to 10%

        let low = filter_value.substring(5,7);
        let str_low = "child_poverty_rate_low=" + low;
        this.state.filters["child_poverty_rate_low"] = str_low;

        let high = filter_value.substring(12, 14);
        let str_high = "child_poverty_rate_high=" + high;
        this.state.filters["child_poverty_rate_high"] = str_high;
        this.accessAPI();
    }

    handleSort = (sort_by) => {
        let str = "sort_by=" + sort_by.replace(/ /g, '_');
        this.state.sort = str;
        this.accessAPI();
    }
    reset = () => {
      this.setState({
        data: [],
        total: 0,
        api: "https://api.relievepoverty.me/v1/states?page=",
        page: 1,
        query: "",
        sort: "sort_by=rank",
        reverse: "",
        filters: {},
        reset: true
      });
    }
    accessAPI = () => {
      let args = [this.state.sort, this.state.reverse, "q="+this.state.query].concat(this.state.filters);
      let api = this.state.api + this.state.page + "&";
      for(let i = 0; i < args.length; i++){
        if(args[i] != "")
          api += args[i] + "&"
      }
      for(let i = 0; i < Object.keys(this.state.filters).length; i++){
        api += this.state.filters[Object.keys(this.state.filters)[i]] + "&";
      }
      api = api.substring(0, api.length-1);
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
        let result = (
            <>
              <Jumbotron title={"Learn More About Poverty by State in the U.S."} description={"Facts and figures of poverty in all 50 states"} modelName={"states"}/>
              <div className="container-fluid fss">
                  <div className="row fss-bar">
                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects reset={this.state.reset} data={["From 05% to 10%", "From 10% to 15%","From 15% to 20%", "From 20% to 25%"]} prompt={"Filter by Poverty Rates"} onChange={this.handleFilterBelowPoverty}></NativeSelects>
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
                <NativeSelects reset={this.state.reset} data={["From 40000 to 50000", "From 50000 to 60000","From 60000 to 70000", "From 70000 to 80000"]} prompt={"Filter by Median Incomes"} onChange={this.handleFilterMedianIncome}></NativeSelects>
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
                <NativeSelects reset={this.state.reset} data={["From 05% to 15%", "From 15% to 25%","From 25% to 35%"]} prompt={"Filter by Child Poverty Rates"} onChange={this.handleFilterChildPoverty}></NativeSelects>
                }
                </div>
                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <button onClick={this.reset}>Reset</button>
                }
                </div>
              </div>
              </div>

              <div className='album py-5 bg-light listingPage'>
                <div className="container">
                  <div className='row'>
                    {this.state.data.map(obj =>
                      <StatesCard query={this.state.query} image={obj.flag} state={obj.name} rank={obj.rank} median_income={obj.median_income} counties={obj.counties} child_poverty_rate={obj.child_poverty_rate} below_poverty_rate={obj.below_poverty_rate}/>
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
        if(this.state.reset){
            this.accessAPI()
        }
        this.state.reset = false;
        return result;
    }
}

export default States;
