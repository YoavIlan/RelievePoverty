import React, { Component } from 'react';
import CharitiesCard from './shared-components/CharitiesCard';

class Charities extends Component{
    render(){
        return(
            <CharitiesCard title={'foo'} description={'bar'} image={require('./img/evan.jpg')}/>
        )
    }
}

export default Charities;