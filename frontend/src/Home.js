import React, { Component } from 'react';
import Navbar from './shared-components/Navbar'
import Jumbotron from './shared-components/Jumbotron'
import  Carousel  from "./shared-components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import USAMap from "react-usa-map";

class Home extends Component {
    state_dict = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming'}

    mapHandler = (event) => {
        let state = this.state_dict[event.target.dataset.name];
        console.log(state);
    };

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