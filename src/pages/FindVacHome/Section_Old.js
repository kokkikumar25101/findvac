import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

//Import Slick Slider
import Slider from "react-slick";
import Countdown from 'react-countdown-now';

//Import Slick Slider CSS
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

//Import Images
import bg1 from "../../assets/images/wedding/pic6.JPG";
import bg2 from "../../assets/images/wedding/pic1.jpg";
import bg3 from "../../assets/images/wedding/pic2.jpg";
import bg4 from "../../assets/images/wedding/pic3.jpg";
import bg5 from "../../assets/images/wedding/pic4.JPG";
import bg6 from "../../assets/images/wedding/pic5.jpg";

const Completionist = () => <Link to="/video-live" className="btn btn-warning mt-2 mr-2" ><i className="mdi mdi-ticket"></i> View Wedding Video</Link>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a complete state
        return <Completionist />;
    } else {
        // Render a countdown
        return <React.Fragment>
            <div className="count-down">
                <span className="count-number">{days}</span>
                <span className="count-head position-relative d-block">Days</span></div>
            <div className="count-down">
                <span className="count-number">{hours}</span>
                <span className="count-head position-relative d-block">Hours</span>
            </div> <div className="count-down">
                <span className="count-number">{minutes}</span>
                <span className="count-head position-relative d-block">Minutes</span>
            </div> <div className="count-down">
                <span className="count-number">{seconds}</span>
                <span className="count-head position-relative d-block">Seconds</span>
            </div>
        </React.Fragment>
    }
};

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [
                { image : bg2, class : "slider-rtl-2", titleLine1 : "New Accessories ", titleLine2 : "Collections", desc : "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.", link : "#" },
                { image : bg3, class : "slider-rtl-3", titleLine1 : "Headphones ", titleLine2 : "Speaker", desc : "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.", link : "#" },
                { image : bg1, class : "slider-rtl-1", titleLine1 : "Modern Furniture, ", titleLine2 : "Armchair", desc : "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.", link : "#" },
                { image : bg4, class : "slider-rtl-4", titleLine1 : "New Accessories ", titleLine2 : "Collections", desc : "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.", link : "#" },
                { image : bg5, class : "slider-rtl-5", titleLine1 : "Headphones ", titleLine2 : "Speaker", desc : "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.", link : "#" },
                { image : bg6, class : "slider-rtl-6", titleLine1 : "Modern Furniture, ", titleLine2 : "Armchair", desc : "Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.", link : "#" },
            
            ]
        }
    }

    componentDidMount(){
        var e1=document.getElementsByClassName("slick-slide");
        var cssAllStyles = "min-height: 100vh; background-color: #000000; background-position: center; background-repeat: no-repeat; background-size: cover; background-attachment: fixed;"
        for(var i=0; i<6; i++){
            if(i===0)
                e1[i].style.background = `url(${bg2})`;
                e1[i].style.backgroundSize = 'cover'
                // e1[i].style.height = `url(${bg2}) no-repeat center center auto`;
            if(i===1)
                e1[i].style.background = `url(${bg3}) center center`;
                e1[i].style.backgroundSize = 'cover'
            if(i===2)
                e1[i].style.background = `url(${bg1}) center center`;
                e1[i].style.backgroundSize = 'cover'
            if(i===3)
                e1[i].style.background = `url(${bg4}) center center`;
                e1[i].style.backgroundSize = 'cover'
            if(i===4)
                e1[i].style.background = `url(${bg5})`;
                e1[i].style.backgroundSize = 'cover'
            if(i===5)
                e1[i].style.background = `url(${bg6}) center center`;
                e1[i].style.backgroundSize = 'cover'
        }
    }
    
    render() {
        var settings = {
            autoplay:true,
            infinite: true,
            autoplaySpeed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade : true,
            draggable : true,
            pauseOnHover: true
          };
        return (
            <React.Fragment>
                    <section className="main-slider">
                        <Slider className="slides" {...settings}>
                            {
                                this.state.items.map((item, key) =>
                                    <li key={key} className={"bg-slider d-flex align-items-center " + item.class} style={{ background: `url(${item.image}) no-repeat center center ` , backgroundSize : 'cover' }}>
                                        <Container>
                                            <Row className="align-items-center mt-5">
                                                <Col lg={7} md={7} className="slider-desc">
                                                <div className="title-heading">
                                                    <h4 className="text-success mb-3">30th August, 2020</h4>
                                                    <h1 className="display-4 title-dark text-white font-weight-bold mb-3">Aishu Weds Shyam</h1>
                                                    <p className="para-desc title-dark mx-auto text-light">Venue: Green Meadows Resort, Chennai</p>

                                                    <Row>
                                                        <Col md="12" className="text-center">
                                                            <div id="eventdown">
                                                            <Countdown
                                                                date={'2020-07-30T07:30:00'}
                                                                // date={Date.now() + 36000000}
                                                                renderer={renderer}
                                                            />
                                                    </div>
                                                        </Col>
                                                    </Row>

                                                    <div className="mt-4 pt-2">
                                                        <Link to="/wish-wall" className="btn btn-success mt-2 mr-2" ><i className="mdi mdi-ticket"></i>Send Wishes</Link>
                                                    </div>
                                                </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </li>
                                )
                            }
                    </Slider>
                </section>
            </React.Fragment>
        );
    }
}

export default Section;