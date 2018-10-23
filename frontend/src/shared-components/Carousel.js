import React from "react";
import { Carousel } from "react-responsive-carousel";
import {Charities} from './../img/Charities.jpg';
const usMap = {
    height: '100%',
    width: '100%',
}
export default () => (
  <Carousel autoPlay>
    <div style = {usMap}>
      <iframe src="https://createaclickablemap.com/map.php?&id=74893&maplocation=false&online=true" height="100%"></iframe>
      <p className="legend">States</p>
    </div>
    <div>
      <img className="d-block w-100" src={require('./../img/Charities.jpg')} alt="Second slide"/>
      <p className="legend">Charities</p>
    </div>
    <div>
      <img className="d-block w-100" src={require('./../img/News.jpg')} alt="Third slide"/>
      <p className="legend">News</p>
    </div>
  </Carousel>
);
