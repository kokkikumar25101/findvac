import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { loadLoginUserAttributes } from "../../redux/actions/userActions";
import PropTypes from "prop-types";

//Import images
// import logodark from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/aish-shyam-logo-blue-1.svg";

// class Topbar extends Component {
    export function ManageCoursePage({
        user,
        locationPathName,
        loadLoginUserAttributes,
        ...props
      }) {
        const [isOpen, setIsOpen] = useState(false);
        const [navLinks, setNavLinks] = useState([
            //Note : each child and nested child must have unique id
            { id : 1, title : "Home", link : "/index" },
            { id : 2, title : "Wedding Video", link : "/video-live", isNew : false},
            { id : 3, title : "Wishes", link : "/wish-wall"},
            { id : 4, title : "Gallery", link : "/#", isMegaMenu : true, isOpenSubMenu : false,
                child : [
                    { id : 1, title : "Couple Memories", link : "/video-gallery" }
                ]
            }
        ]);
        const [saving, setSaving] = useState(false);
      
        // const toggleLine = toggleLine.bind(this);
        this.openBlock.bind(this);
        this.openNestedBlock.bind(this);

        useEffect(() => {

        }, []);

    // constructor(props) {
        // super(props);
        // this.state = { 
        //     isOpen : false, 
        //     navLinks : [
        //         //Note : each child and nested child must have unique id
        //         { id : 1, title : "Home", link : "/index" },
        //         { id : 2, title : "Wedding Video", link : "/video-live", isNew : false},
        //         { id : 3, title : "Wishes", link : "/wish-wall"},
        //         { id : 4, title : "Gallery", link : "/#", isMegaMenu : true, isOpenSubMenu : false,
        //             child : [
        //                 { id : 1, title : "Couple Memories", link : "/video-gallery" }
        //             ]
        //         }
        //     ]
        //  };
        // this.toggleLine = this.toggleLine.bind(this);
        // this.openBlock.bind(this);
        // this.openNestedBlock.bind(this);
        
    // }

    const toggleLine = () => {
        // this.setState(prevState => ({  isOpen: !prevState.isOpen }));
        setIsOpen(! isOpen)
    }

    componentDidMount() {
         var matchingMenuItem = null;
         var ul = document.getElementById("top-menu");
         var items = ul.getElementsByTagName("a");
         
         for (var i = 0; i < items.length; ++i) {
            //  debugger;
             if (this.props.locationPathName === items[i].pathname) {
                 matchingMenuItem = items[i];
                 break;
             }
         }
         if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
         }
     }
 
    activateParentDropdown = (item) => {
          const parent = item.parentElement;
          if (parent) {
              parent.classList.add('active'); // li
              const parent1 = parent.parentElement;
              parent1.classList.add('active'); // li
              if (parent1) {
                  const parent2 = parent1.parentElement;
                  parent2.classList.add('active'); // li
                  if (parent2) {
                    const parent3 = parent2.parentElement;
                    parent3.classList.add('active'); // li
                    if (parent3) {
                        const parent4 = parent3.parentElement;
                        parent4.classList.add('active'); // li
                 }
             }
         }
    }
    }

    const openBlock = (level2_id) => {
        var tmpLinks = this.state.navLinks;
        tmpLinks.map((tmpLink) =>
        //Match level 2 id
           tmpLink.id === level2_id ?
                tmpLink.isOpenSubMenu = !tmpLink.isOpenSubMenu
            :
                false 
            
        )
        this.setState({navLinks : tmpLinks});
    }

    const openNestedBlock = (level2_id, level3_id) => {
        var tmpLinks = this.state.navLinks;
        tmpLinks.map((tmpLink) =>
        //Match level 2 id
           tmpLink.id === level2_id ?
                tmpLink.child.map((tmpchild) =>
                    //if level1 id is matched then match level 3 id
                    tmpchild.id === level3_id ?
                        //if id is matched then update status(level 3 sub menu will be open)
                        tmpchild.isOpenNestedSubMenu = !tmpchild.isOpenNestedSubMenu
                    :
                        tmpchild.isOpenNestedSubMenu = false
                )
            :
                false 
            
        )
        this.setState({navLinks : tmpLinks});
    }

    render() {
        return (
            <React.Fragment>
                <header id="topnav" className="defaultscroll sticky">
                    <Container>
                        <div>
                            <Link className="logo" to="/index">
                                <img src={logodark} id="brandLogo" height="40" alt=""/>
                            </Link>
                        </div> 
                        <div className="buy-button">
                        {/* <a href="/wish-wall" target="_blank" rel="noopener noreferrer" id="buyButton" className="btn btn-primary">Login</a> */}
                            <a onClick={this.handleClick} target="_blank" rel="noopener noreferrer" id="buyButton" className="btn btn-primary">Login</a>
                        </div>
                        <div className="menu-extras">
                            <div className="menu-item">
                                <Link to="#" onClick={ this.toggleLine } className={this.state.isOpen ? "navbar-toggle open" : "navbar-toggle" } >
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div id="navigation" style={{ display : this.state.isOpen ? "block" : "none" }}>
                            <ul className="navigation-menu" id="top-menu">
                                {
                                    this.state.navLinks.map((navLink, key) => 
                                    navLink.child ?
                                        <li className="has-submenu" key={key}>
                                            {/* child item(menu Item) - Level 1 */}
                                            <Link to={navLink.link} onClick={(event) => {  event.preventDefault(); this.openBlock(navLink.id) } } >{navLink.title}</Link>
                                            <span className="menu-arrow"></span>
                                                {
                                                    navLink.isMegaMenu ?
                                                    // if menu is mega menu(2 columns grid)
                                                    <ul className={ navLink.isOpenSubMenu ? "submenu megamenu open" : "submenu megamenu" }  >
                                                        <li>
                                                            <ul>
                                                                {
                                                                    navLink.child.map((item, childKey) =>
                                                                        item.id < 12 ?
                                                                        <li key={childKey}>
                                                                            <Link to={item.link}>{item.title}</Link>
                                                                        </li>
                                                                        : null
                                                                    )
                                                                }
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <ul>
                                                                {
                                                                    navLink.child.map((item, childKey) =>
                                                                    item.id < 22 && item.id > 11 ?
                                                                        <li key={childKey}>
                                                                            <Link to={item.link}>{item.title}{item.isNew ? <span className="badge badge-danger rounded ml-2">v 2.2</span> : null}</Link>
                                                                        </li>
                                                                        : null
                                                                    )
                                                                }
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <ul>
                                                                {
                                                                    navLink.child.map((item, childKey) =>
                                                                    item.id > 21 ?
                                                                        <li key={childKey}>
                                                                            <Link to={item.link}>{item.title}{item.isOnePage ? <span className="badge badge-warning rounded ml-2">Onepage</span> : null}</Link>
                                                                        </li>
                                                                        : null
                                                                    )
                                                                }
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                :
                                                    // if menu is not mega menu(1grid)
                                                    <ul  className={ navLink.isOpenSubMenu ? "submenu open" : "submenu" }  >
                                                            {
                                                                navLink.child.map((childArray, childKey) =>
                                                                    childArray.nestedChild ?
                                                                    // sub menu item - Level 2
                                                                        <li className="has-submenu" key={childKey}>
                                                                            <Link to={childArray.link} onClick={(event) => {  event.preventDefault(); this.openNestedBlock(navLink.id, childArray.id) } }> {childArray.title}{" "}{childArray.isNew ? <span className="badge badge-danger rounded">V 2.2</span> : null }</Link>
                                                                            <span className="submenu-arrow"></span>
                                                                            <ul className={ childArray.isOpenNestedSubMenu ? "submenu open" : "submenu" }>
                                                                                {
                                                                                    childArray.nestedChild.map((nestedChildArray, nestedKey) =>
                                                                                        // nested sub menu item - Level 3
                                                                                        <li key={nestedKey}><Link to={nestedChildArray.link}>{nestedChildArray.title}{" "}{nestedChildArray.isNewPage ? <span className="badge badge-primary rounded">NEW</span> : null }</Link></li>
                                                                                    )
                                                                                }
                                                                            </ul>
                                                                        </li>
                                                                    :
                                                                        <li key={childKey}><Link to={childArray.link}>{childArray.title}</Link></li>
                                                                )
                                                            }
                                                    </ul>
                                                }
                                                
                                        </li>
                                    :
                                        <li key={key}><Link to={navLink.link}>{navLink.title}{navLink.isNew ? <span className="badge badge-danger rounded ml-2">Live</span> : null}</Link></li>
                                    )
                                }
                            </ul>
                            <div className="buy-menu-btn d-none">
                                <a href="/wish-wall" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Login</a>
                            </div>
                        </div>
                    </Container>
                </header>
            </React.Fragment>
        );
    }
}

Topbar.propTypes = {
    user: PropTypes.object.isRequired,
    locationPathName: PropTypes.string.isRequired,
    loadLoginUserAttributes: PropTypes.func.isRequired
  };
  
  function mapStateToProps(state, ownProps) {
    return {
      user: state.user,
    };
  }
  
  const mapDispatchToProps = {
    loadLoginUserAttributes
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Topbar);
  
// export default withRouter(Topbar);