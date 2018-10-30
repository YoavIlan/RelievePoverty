import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactPaginate from 'react-paginate';

import StatesCard from './src/shared-components/StatesCard';
import StateInstance from './src/StateInstance';
import States from './src/States';

import NewsCard from './src/shared-components/NewsCard';
import NewsInstance from './src/NewsInstance';
import News from './src/News';

import CharitiesCard from './src/shared-components/CharitiesCard'
import CharityInstance from './src/CharityInstance'
import Charities from './src/Charities'

import AboutCard from './src/shared-components/AboutCard';
import About from './src/About';

import Jumbotron from './src/shared-components/Jumbotron';

configure({ adapter: new Adapter() });
// var assert = require('assert');
//
// var state_card = require('./src/shared-components/StatesCard');
// var states = require('./src/States');
// var state_instance = require('./src/StateInstance');
//
// var charity_card = require('./src/shared-components/CharitiesCard');
// var charities = require('./src/Charities');
// var charity_instance = require('./src/CharityInstance');
//
// var news_card = require('./src/shared-components/NewsCard');
// var news = require('./src/News');
// var news_instance = require('./src/NewsInstance');

describe('<States />', () => {
    // @Yoav@
    it('renders 50 total states', async () =>{
        const wrapper = await shallow(<States />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        expect(wrapper.state().total).toEqual(50);
    });
});

describe('<Charities />', () =>{
    // @Yoav@
    it('renders correct number of charities', async () => {
        const wrapper = await shallow(<Charities />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        expect(wrapper.state().total).toEqual(301);
    });
});

describe('<News />', () =>{
    // @Yoav@
    it('renders correct number of news articles', async () => {
        const wrapper = await shallow(<News />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        expect(wrapper.state().total).toEqual(237);
    });
});

describe('<Jumbotron />', () => {
    // @Yoav@
    it('renders expected jumbotron title', () =>{
        const title = "this is the title";
        const wrapper = shallow(<Jumbotron title={title}/>);
        const actualTitle = wrapper.find(".jumbotron-heading");
        expect(actualTitle.text()).toBe(title);
    });

    // @Yoav@
    it('renders expected jumbotron description', () =>{
        const title = "this is the title";
        const desc = "this is the description";
        const wrapper = shallow(<Jumbotron title={title} description={desc}/>);
        const actualDescription = wrapper.find(".lead");
        expect(actualDescription.text()).toBe(desc);
    });
});

