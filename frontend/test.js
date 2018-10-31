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

describe('<NewsCard />', () => {
    // @Colin@
    it('renders NewCard image', () => {
        const wrapper = shallow(<NewsCard title="test" published_date="12/24/18" image="./img/colin.jpg" id={1} source="Nowhere" state="Texas" author="Me"/>);
        const actualImage = wrapper.find("img");
        expect(actualImage.html()).toBe("<img class=\"card-img-top d-flex\" src=\"./img/colin.jpg\" alt=\"Card cap\"/>");
    });
});

describe('<StatesCard />', () => {
    // @Colin@
    it('renders StatesCard rank at 19', () => {
        const wrapper = shallow(<StatesCard median_income="1" rank={19}/>);
        const actualRank = wrapper.find("p").first();
        expect(actualRank.html()).toBe("<p>19th out of 50 states for its poverty rate</p>");
    });

    // @Colin@
    it('renders StatesCard rank at 1', () => {
        const wrapper = shallow(<StatesCard median_income="1" rank={1}/>);
        const actualRank = wrapper.find("p").first();
        expect(actualRank.html()).toBe("<p>1st out of 50 states for its poverty rate</p>");
    });
});



describe('<CharitiesCard />', () => {
    // @Colin@
    it('renders CharitiesCard state', () => {
        const wrapper = shallow(<CharitiesCard id="5" median_income="10" name="Charity" state="Texas"/>);
        const actualState = wrapper.find("li").first();
        expect(actualState.html()).toBe("<li><b>State:</b> Texas</li>");
    });

    // @Colin@
    it('renders CharitiesCard image', () => {
        const wrapper = shallow(<CharitiesCard id="5" median_income="10" name="Charity" state="Texas" image="my_image"/>);
        const actualState = wrapper.find("img").first();
        expect(actualState.html()).toBe("<img class=\"card-img-top d-flex\" src=\"my_image\" alt=\"Card\"/>");
    });
});
