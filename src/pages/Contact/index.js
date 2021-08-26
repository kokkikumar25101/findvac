import React, { Component } from 'react';

//Import Components
import Section from "./Section";

import logolight from "../../assets/images/findvac_white.png";
import logodark from "../../assets/images/findvac_blue2.png";


class Index extends Component {

    componentDidMount() {
        document.body.classList = "";
        document.getElementById('top-menu').classList.add('nav-blue');
        document.getElementById('buyButton').className="btn btn-blue";
        document.getElementById('brandLogo').src=logodark;
        window.addEventListener("scroll", this.scrollNavigation, true);
    }
  
    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }
     
    scrollNavigation = () => {
          var doc = document.documentElement;
          var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
          if(top > 80)
          {
               document.getElementById('topnav').classList.add('nav-sticky');
          }
          else
          {
            document.getElementById('topnav').classList.remove('nav-sticky');
          }
    }

    render() {
        return (
            <React.Fragment>

            {/* import Section */}
            <Section/>

            </React.Fragment>
        );
    }
}

export default Index;