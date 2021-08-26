import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { logoutUserRemoveAttributes } from "../../redux/actions/authActions";
import { loadCenters } from "../../redux/actions/centerActions";
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import Auth from '@aws-amplify/auth';

//Import images
// import logodark from "../../assets/images/logo-light.png";
// import logodark from "../../assets/images/aish-shyam-logo-blue-1.svg";
import logolight from "../../assets/images/findvac_white.png";

// class Topbar extends Component {
export function Topbar({
    locationPathName,
    logoutUserRemoveAttributes,
    loadCenters,
    ...props
    }) {
    // const defaultUserAttributes = {
    //     'username' : '',
    //     'attributes' : { 
    //         'email' : '',
    //         'family_name' : '' ,
    //         'given_name' : ''
    //     }
    // }
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const [navLinks, setNavLinks] = useState([
        //Note : each child and nested child must have unique id
        { id : 1, title : "Home", link : "/index" },
        { id : 2, title : "Centers", link : "/viewCenters"},
        { id : 3, title : "Contact", link : "/contact"},
        // { id : 4, title : "Gallery", link : "/#", isMegaMenu : true, isOpenSubMenu : false,
        //     child : [
        //         { id : 1, title : "Couple Memories", link : "/video-gallery" }
        //     ]
        // }
    ]);
    const [saving, setSaving] = useState(false);
    const history = useHistory();
    
    // const toggleLine = toggleLine.bind(this);
    // this.openBlock.bind(this);
    // this.openNestedBlock.bind(this);

    const getUser = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            // if(user.attributes.email == 'rajakumar.tu@gmail.com'){
            //     setAdmin(true)
            // }
            return user;
        } catch (err) {
            console.log('error get user ..', err)
        }
        return {};
    };
    const loadAllData = async () => {
        await loadCenters()
    };

    useEffect(() => {
        var matchingMenuItem = null;
        var ul = document.getElementById("top-menu");
        var items = ul.getElementsByTagName("a");
        loadAllData()
        getUser().then(user => {
            console.log(user)
            // debugger;
            setUser(user)
        });

        for (var i = 0; i < items.length; ++i) {
            //  debugger;
            if (locationPathName === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
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
    async function handleLogout(event) {
        await Auth.signOut().then(user => {
            // logoutUserRemoveAttributes()
            console.log('Logout Succesful')
            history.push("/");
            getUser().then(user => {
                console.log(user)
                // debugger;
                setUser(user)
            }).catch(error => {
                console.log(error)
                setUser({})
            });
            // this.setState({ user })
            // Alert.alert('Signed In Successful!')
        }).catch(err => {
            console.log('Error when signing out: ', err)
            // Alert.alert('Error when signing in: ', err)
        })
    }
    const handleLogin = (event) => {
        console.log('Login')
        history.push("/auth");
    }

    // const handleLogout = (event) => {
    //     console.log('Logout')
    //     logoutUserRemoveAttributes({})
    //     history.push("/auth-login");
    // }

    const toggleLine = () => {
        // this.setState(prevState => ({  isOpen: !prevState.isOpen }));
        setIsOpen(! isOpen)
    }

    // componentDidMount() {
    //      var matchingMenuItem = null;
    //      var ul = document.getElementById("top-menu");
    //      var items = ul.getElementsByTagName("a");
         
    //      for (var i = 0; i < items.length; ++i) {
    //         //  debugger;
    //          if (this.props.locationPathName === items[i].pathname) {
    //              matchingMenuItem = items[i];
    //              break;
    //          }
    //      }
    //      if (matchingMenuItem) {
    //         this.activateParentDropdown(matchingMenuItem);
    //      }
    //  }
 
    const activateParentDropdown = (item) => {
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
        var tmpLinks = navLinks;
        tmpLinks.map((tmpLink) =>
        //Match level 2 id
           tmpLink.id === level2_id ?
                tmpLink.isOpenSubMenu = !tmpLink.isOpenSubMenu
            :
                false 
            
        )
        setNavLinks(tmpLinks);
    }

    const openNestedBlock = (level2_id, level3_id) => {
        var tmpLinks = navLinks;
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
        // this.setState({navLinks : tmpLinks});
        setNavLinks(tmpLinks);
    }

    // render() {
        return (
            <React.Fragment>
                <header id="topnav" className="defaultscroll sticky">
                    <Container>
                        <div>
                            <Link className="logo" to="/index">
                                <img src={logolight} id="brandLogo" height="40" alt=""/>
                            </Link>
                        </div> 
                        <div className="buy-button">
                        {/* <a href="/wish-wall" target="_blank" rel="noopener noreferrer" id="buyButton" className="btn btn-primary">Login</a> */}
                            {/* { Object.keys(user).length === 0 ? (  */}
                            { Object.entries(user).length === 0 ? (
                                <a onClick={handleLogin} target="_blank" rel="noopener noreferrer" id="buyButton" className="btn btn-primary">Login</a>
                            ) : (
                                <>
                                    {/* <Link to="/home">
                                        Welcome : 
                                    </Link>
                                    {user.username} */}
                                    <a onClick={handleLogout} target="_blank" rel="noopener noreferrer" id="buyButton" className="btn btn-primary">
                                    Logout
                                    </a>
                                </>
                            )}
                            
                        </div>
                        <div className="menu-extras">
                            <div className="menu-item">
                                <Link to="#" onClick={ toggleLine } className={isOpen ? "navbar-toggle open" : "navbar-toggle" } >
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div id="navigation" style={{ display : isOpen ? "block" : "none" }}>
                            <ul className="navigation-menu" id="top-menu">
                                {
                                    navLinks.map((navLink, key) => 
                                    navLink.child ?
                                        <li className="has-submenu" key={key}>
                                            {/* child item(menu Item) - Level 1 */}
                                            <Link to={navLink.link} onClick={(event) => {  event.preventDefault(); openBlock(navLink.id) } } >{navLink.title}</Link>
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
                                                                            <Link to={childArray.link} onClick={(event) => {  event.preventDefault(); openNestedBlock(navLink.id, childArray.id) } }> {childArray.title}{" "}{childArray.isNew ? <span className="badge badge-danger rounded">V 2.2</span> : null }</Link>
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
    // }
}

Topbar.propTypes = {
    auth: PropTypes.object.isRequired,
    locationPathName: PropTypes.string.isRequired,
    logoutUserRemoveAttributes: PropTypes.func.isRequired,
    loadCenters: PropTypes.func.isRequired
  };
  
  function mapStateToProps(state, ownProps) {
    return {
      auth: state.auth
    };
  }
  
  const mapDispatchToProps = {
    logoutUserRemoveAttributes,
    loadCenters
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Topbar);
  
// export default withRouter(Topbar);