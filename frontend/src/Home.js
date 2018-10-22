import React, { Component } from 'react';
import Navbar from './shared-components/Navbar'
import Jumbotron from './shared-components/Jumbotron'
import { Carousel } from "react-responsive-carousel";


class Home extends Component {
    render() {
        return (
            <div>
            <Navbar />
            <Jumbotron title='Learn more about poverty in the U.S.'/>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <Carousel>
      
    <div class="carousel-item active">
                {/* <iframe src="https://createaclickablemap.com/map.php?&id=74893&maplocation=false&online=true" width="100%" height="112%" style="border: none;"></iframe> */}
    {/* <script>if (window.addEventListener){ window.addEventListener("message", function(event) { if(event.data.length >= 22) { if( event.data.substr(0, 22) == "__MM-LOCATION.REDIRECT") {window.location = event.data.substr(22); } } }, false) } else if (window.attachEvent){ window.attachEvent("message", function(event) { if( event.data.length >= 22) { if ( event.data.substr(0, 22) == "__MM-LOCATION.REDIRECT") { window.location = event.data.substr(22); } } }, false) } </script> */}
                <div class="carousel-caption d-none d-md-block">
                    <h2 align="center"><a href="states.html" style="color:black"> States </a> </h2>
                    <p align="center" style= {color :'black'}> Learn how poverty impacts any of the 50 states in the US </p>
                </div>

    </div>
    <div class="carousel-item">
        <img class="d-block w-100" src="img/Charities.jpg" alt="Second slide"/>
                <div class="carousel-caption d-none d-md-block">
                    <h2 align="center"><a href="charities.html" style="color:white"> Charities </a> </h2>
                    <p align="center"> Learn how to get involved with charities that aid poverty  </p>
                </div>

    </div>
    <div class="carousel-item">
        <img class="d-block w-100" src="img/News.jpeg" alt="Third slide"/>
                <div class="carousel-caption d-none d-md-block">
                    <h2 align="center"><a href="news.html" style="color:white"> News </a> </h2>
                    <p align="center"> Recent news on issues involving poverty in the US </p>
                </div>
    </div>
  </Carousel>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
            </div>

        );
    }
}

export default Home;