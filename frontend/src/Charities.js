import React, { Component } from 'react';
import CharitiesCard from './shared-components/CharitiesCard';
import Jumbotron from './shared-components/Jumbotron';
import {Grid, Row, Col} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Paginate.css'


class Charities extends Component{
    constructor (props) {
       super(props);

       this.state = {data: [], total: 0}
    }

    getJSON(url) {
        return fetch(url).then(response => {
            return response.json();
        });
    }

    componentWillMount() {
        this.getJSON('https://api.relievepoverty.me/v1/charities?page=1').then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    handlePageClick = (data) =>{
        let selected = data.selected + 1;
        this.getJSON('https://api.relievepoverty.me/v1/charities?page='+selected).then(response => {
            this.setState(JSON.parse(JSON.stringify(response)))
        });
    }

    render(){
        let pageSize = 12.0;
        return(
            <>
              <Jumbotron title={"Learn more about poverty in the U.S."} description={"Charities throughout the US are doing amazing work every single day to combat poverty. Help them accomplish their goals by donating today."}/>
              <div className='album py-5 bg-light listingPage'>
                <div class="container">
                  <div className='row'>
                    {this.state.data.map(obj =>
                      <CharitiesCard image={obj.img} title={obj.name} description={obj.mission} id={obj.id}/>
                    )}
                  </div>
                </div>
                <ReactPaginate className='pagination'
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={<a href="">...</a>}
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
