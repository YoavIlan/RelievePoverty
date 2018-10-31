import React, { Component } from 'react';
import Jumbotron from './shared-components/Jumbotron'
import  Carousel  from "./shared-components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron title={'Learn more about poverty in the U.S.'}/>
                <Carousel/>
            </div>
        );
    }
}

export default Home;