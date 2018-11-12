import React, { Component } from 'react';
import NewsCard from './shared-components/NewsCard';
import ReactPaginate from 'react-paginate';
import fetch from 'node-fetch';
import './Paginate.css'
import Jumbotron from './shared-components/Jumbotron';
import NativeSelects from './shared-components/Dropdown'
import './shared-components/styles.css'


class News extends Component{
    constructor (props) {
       super(props);

       this.state = {
         data: [],
         total: 0,
         api: "https://api.relievepoverty.me/v1/news?page=",
         page: 1,
         query: "",
         sort: "sort_by=state",
         reverse: "",
         filters: {}
       }
    }

    sorts = [
      "title",
      "source",
      "state",
      "author",
      "published_date"
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

    handleFilterAuthor = (filter_value) => {
        let str = "author=" + filter_value;
        this.state.page = 1;
        this.state.filters['author'] = str;
        this.accessAPI();
    }

    handleFilterSource = (filter_value) => {
        let str = "source=" + filter_value;
        this.state.page = 1;
        this.state.filters['source'] = str;
        this.accessAPI();
    }

    handleFilterState = (filter_value) => {
        let str = "state=" + filter_value;
        this.state.page = 1;
        this.state.filters['state'] = str;
        this.accessAPI();
    }

    handleFilterYear = (filter_value) => {
        let str = "year=" + filter_value;
        this.state.page = 1;
        this.state.filters['year'] = str;
        this.accessAPI();
    }

    handleSearch = (data) => {
        data.preventDefault();
        this.state.query = "q=" + data.target[0].value;
        this.state.page = 1;
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

    handleSort = (sort_by) => {
        this.state.page = 1;
        let str = "sort_by=" + sort_by.replace(/ /g, '_');
        this.state.sort = str;
        this.accessAPI();
    }

    reset = () => {
      this.setState({
        data: [],
        total: 0,
        api: "https://api.relievepoverty.me/v1/news?page=",
        page: 1,
        query: "",
        sort: "sort_by=state",
        reverse: "",
        filters: {},
        reset: true
      });
    }

    handlePageClick = (data) =>{
        this.state.page = data.selected + 1;
        this.accessAPI()
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
      this.getJSON(api).then(response => {
          this.setState(JSON.parse(JSON.stringify(response)))
      })
    }

    render(){
        let pageSize = 12.0;
        let result =(
            <>
              <Jumbotron title={"Read Articles About Poverty in the US"} description={"Our news sources include The New York Times, CNN and others."} search={this.handleSearch} modelName={"news"} filters={[]} prompt={"blah"}/>
              <div className="container-fluid fss">
                  <div className="row fss-bar">
                <div className="col-md-4 d-flex flex-column">
                {prompt &&
                <NativeSelects reset={this.state.reset} data={["Associated Press", "ABC News", "CNN", "The New York Times", "The Huffington Post"]} prompt={"Filter by Source"} onChange={this.handleFilterSource}></NativeSelects>
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
                <NativeSelects reset={this.state.reset} data={this.sorts} prompt={"Sort By"} onChange={this.handleSort}></NativeSelects>
                }
                </div>
                <div className="col-md-4 d-flex flex-column"></div>
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
                      <NewsCard image={obj.image} title={obj.title} source={obj.source} id={obj.id} published_date={obj.published_date} state={obj.state} author={obj.author} query={this.state.query}/>
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
          this.accessAPI();
        }
        this.state.reset = false;
        return result;
    }
}

export default News;
