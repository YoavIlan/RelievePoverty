import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import StatesCard from './src/shared-components/StatesCard';
import States from './src/States';

import NewsCard from './src/shared-components/NewsCard';
import News from './src/News';

import CharitiesCard from './src/shared-components/CharitiesCard'
import Charities from './src/Charities'

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

    // @Uriel@
    it('shows reset button', async () => {
        const wrapper = await shallow(<States />);
        const reset = wrapper.find("#reset");
        expect(reset.length).toBe(1);
    });

    // @Uriel@
    it('shows search field', async () => {
        const wrapper = await shallow(<States />);
        const statesSearch = wrapper.find(".search-bar");
        expect(statesSearch.length).toBe(1);
    });

    // @Yoav@
    it('renders Texas when searching for it', async () =>{
        const wrapper = await shallow(<States />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({query: "q=Texas"});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(1);
    });

    // @Yoav@
    it('filters by median income correctly', async () =>{
        const wrapper = await shallow(<States />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "median_income_low" : "median_income_low=40000", "median_income_high": "median_income_high=50000"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(10);
    });

    // @Yoav@
    it('filters by poverty rate correctly', async () =>{
        const wrapper = await shallow(<States />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "below_poverty_rate_low" : "below_poverty_rate_low=05", "below_poverty_rate_high": "below_poverty_rate_high=10"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(6);
    });

    // @Yoav@
    it('filters by child poverty rate correctly', async () =>{
        const wrapper = await shallow(<States />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "child_poverty_rate_low" : "child_poverty_rate_low=05", "child_poverty_rate_high": "child_poverty_rate_high=15"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(18);
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

    // @Uriel@
    it('shows reset button', async () => {
        const wrapper = await shallow(<Charities />);
        const reset = wrapper.find("#reset");
        expect(reset.length).toBe(1);
    });

    // @Uriel@
    it('shows search field', async () => {
        const wrapper = await shallow(<Charities />);
        const charitiesSearch = wrapper.find(".search-bar");
        expect(charitiesSearch.length).toBe(1);
    });

    // @Yoav@
    it('renders correct responses on search', async () =>{
        const wrapper = await shallow(<Charities />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({query: "q=Pine"});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(3);
    });

    // @Yoav@
    it('filters by affiliation correctly', async () =>{
        const wrapper = await shallow(<Charities />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "affiliation" : "affiliation=Central"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(2);
    });

    // @Yoav@
    it('filters by State correctly', async () =>{
        const wrapper = await shallow(<Charities />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "state" : "state=Alabama"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(1);
    });

    // @Yoav@
    it('filters by tax code correctly', async () =>{
        const wrapper = await shallow(<Charities />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "tax_classification" : "tax_classification=501(c)(8)"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(1);
    });

    // @Yoav@
    it('filters by rating correctly', async () =>{
        const wrapper = await shallow(<Charities />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "rating" : "rating=2"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(6);
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

    // @Uriel@
    it('shows reset button', async () => {
        const wrapper = await shallow(<News />);
        const reset = wrapper.find("#reset");
        expect(reset.length).toBe(1);
    });

    // @Uriel@
    it('shows search field', async () => {
        const wrapper = await shallow(<News />);
        const newsSearch = wrapper.find(".search-bar");
        expect(newsSearch.length).toBe(1);
    });

    // @Yoav@
    it('renders correct responses on search', async () =>{
        const wrapper = await shallow(<News />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({query: "q=million"});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(15);
    });

    // @Yoav@
    it('filters by source correctly', async () =>{
        const wrapper = await shallow(<News />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "source" : "source=The Huffington Post"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(3);
    });

    // @Yoav@
    it('filters by date correctly', async () =>{
        const wrapper = await shallow(<News />);
        const inst = wrapper.instance();
        await inst.componentWillMount();
        inst.setState({filters: { "date" : "date=past_month"}});
        await inst.accessAPI();
        expect(wrapper.state().total).toEqual(44);
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
        expect(actualState.html()).toBe("<li><b>State:</b> <span><span class=\"\">Texas</span></span></li>");
    });

    // @Colin@
    it('renders CharitiesCard image', () => {
        const wrapper = shallow(<CharitiesCard id="5" median_income="10" name="Charity" state="Texas" image="my_image"/>);
        const actualState = wrapper.find("img").first();
        expect(actualState.html()).toBe("<img class=\"card-img-top d-flex\" src=\"my_image\" alt=\"Card\"/>");
    });
});
