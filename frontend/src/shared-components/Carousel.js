import React, { Component } from 'react';
import { Carousel } from "react-responsive-carousel";
import "./styles.css";
import {Link} from 'react-router-dom'

const usMap = {
    height: '100%',
    width: '100%',
}


class CustomCarousel extends Component {
    render(){
      return (
        <div>
        <Carousel showThumbs={false} showStatus={false}>
        <div style = {usMap}>
          <iframe title="map" src="https://createaclickablemap.com/map.php?&id=75691&maplocation=false&online=true" height="100%" width="100%"></iframe>
            <p className="legend">
            <Link to="/states">States</Link>
            </p>
        </div>
        <div>
          <Link to="/charities">
          <img className="d-block w-100" src={require('./../img/Charities.jpg')} alt="Second slide"/>
          </Link>
          <p className="legend">
          <Link to="/charities">Charities</Link>
          </p>
        </div>
        <div>
          <Link to="/news"><img className="d-block w-100" src={require('./../img/News.jpeg')} alt="Third slide"/>
          </Link>
          <p className="legend">
          <Link to="/news">News</Link>
          </p>
        </div>
      </Carousel>
      </div>
        );
    }

    componentDidMount(){
            const script = document.createElement("script");

            script.innerHTML = "if (window.addEventListener){ window.addEventListener(\"message\", function(event) { if(event.data.length >= 22) { if( event.data.substr(0, 22) == \"__MM-LOCATION.REDIRECT\") location = event.data.substr(22); } }, false); } else if (window.attachEvent){ window.attachEvent(\"message\", function(event) { if( event.data.length >= 22) { if ( event.data.substr(0, 22) == \"__MM-LOCATION.REDIRECT\") location = event.data.substr(22); } }, false); } ";
            script.async = true;

            document.body.appendChild(script);
    }
}

export default CustomCarousel;
