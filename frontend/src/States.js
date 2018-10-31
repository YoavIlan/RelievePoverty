import React, { Component } from 'react';
import StatesCard from './shared-components/StatesCard';
import Jumbotron from './shared-components/Jumbotron';
import ReactPaginate from 'react-paginate';
import fetch from 'node-fetch';
import './Paginate.css'


class States extends Component{
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
        await this.getJSON('https://api.relievepoverty.me/v1/states?page=1').then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    handlePageClick = (data) =>{
        let selected = data.selected + 1;
        this.getJSON('https://api.relievepoverty.me/v1/states?page='+selected).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    render(){
        let pageSize = 12.0;
        return(
            <>
              <Jumbotron title={"Learn More About Poverty by State in the U.S."} description={"Facts and figures of poverty in all 50 states"}/>
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
