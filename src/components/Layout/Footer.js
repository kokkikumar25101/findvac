import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Input, Label } from 'reactstrap';

//Import Icons
import FeatherIcon from 'feather-icons-react';

// import images
import americanEx from '../../assets/images/payments/american-ex.png';
import discover from '../../assets/images/payments/discover.png';
import masterCard from '../../assets/images/payments/master-card.png';
import paypal from '../../assets/images/payments/paypal.png';
import visa from '../../assets/images/payments/visa.png';

//Import Images
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        grid1 : [
            { title : "About us", link : "/page-aboutus" },
            { title : "Services", link : "/page-services" },
            { title : "Team", link : "/page-team" },
            { title : "Pricing", link : "/page-pricing" },
            { title : "Project", link : "/page-work" },
            { title : "Careers", link : "/page-jobs" },
            { title : "Blog", link : "/page-blog" },
            { title : "Login", link : "/page-cover-login" },
        ],
        grid2 : [
            { title : "Terms of Services", link : "/page-terms" },
            { title : "Privacy Policy", link : "/page-privacy" },
            { title : "Documentation", link : "/documentation" },
            { title : "Changelog", link : "/changelog" },
            { title : "Components", link : "/components" },
        ]
    };
  }

  render() {
    return (
        // <></>
      <React.Fragment>
        
        <footer className="footer footer-bar">
            <Container className="text-center">
                <Row className="align-items-center">
                    <Col sm="6">
                        <div className="text-sm-left">
                            {/* <p className="mb-0">© 2020-21 Loftbox Develop by <a href="https://themesbrand.com/" target="_blank"  rel="noopener noreferrer" className="text-success">Themesbrand</a>.</p> */}
                            <p className="mb-0">© 2020-21 Loftbox </p>
                        </div>
                    </Col>

                    {/* <Col sm="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <ul className="list-unstyled text-sm-right mb-0">
                            <li className="list-inline-item mr-1"><Link to=""><img src={americanEx} className="avatar avatar-ex-sm" title="American Express" alt=""/></Link></li>
                            <li className="list-inline-item mr-1"><Link to=""><img src={discover} className="avatar avatar-ex-sm" title="Discover" alt=""/></Link></li>
                            <li className="list-inline-item mr-1"><Link to=""><img src={masterCard} className="avatar avatar-ex-sm" title="Master Card" alt=""/></Link></li>
                            <li className="list-inline-item mr-1"><Link to=""><img src={paypal} className="avatar avatar-ex-sm" title="Paypal" alt=""/></Link></li>
                            <li className="list-inline-item mr-1"><Link to=""><img src={visa} className="avatar avatar-ex-sm" title="Visa" alt=""/></Link></li>
                        </ul>
                    </Col> */}
                </Row>
            </Container>
        </footer>        
      </React.Fragment>
    );
  }
}

export default Footer;
