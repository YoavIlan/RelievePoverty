import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
    it('renders 50 total states', () =>{
        const states_page = shallow(<States />);
        expect(states_page.state().total).toEqual(50);
    });
});