import React, { Component } from 'react';
import NewsCard from './shared-components/NewsCard';

class News extends Component{
    render(){
        return(
            <NewsCard title={'Yo!'} description={'Lorem imposum blah blah blah'} image={require('./img/albert.jpg')}/>
        )
    }
}

export default News;