import React, { Component } from 'react';
import { Carousel } from "react-responsive-carousel";
import "./styles.css";
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
          <iframe src="https://createaclickablemap.com/map.php?&id=75610&maplocation=false&online=true" height="100%" width="100%"></iframe>
          <p className="legend">States</p>
        </div>
        <div>
          <img className="d-block w-100" src={require('./../img/Charities.jpg')} alt="Second slide"/>
          <p className="legend">Charities</p>
        </div>
        <div>
          <img className="d-block w-100" src={require('./../img/News.jpeg')} alt="Third slide"/>
          <p className="legend">News</p>
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
