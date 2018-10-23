import React, { Component } from 'react';
import StatesCard from './shared-components/StatesCard';

class States extends Component{
    render(){
        return(
            <StatesCard image={'http://www.theus50.com/images/state-flags/california-flag.jpg'} state={'California'} rank={1}/>
        )
    }
}

export default States;