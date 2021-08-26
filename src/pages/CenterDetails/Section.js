// React Basic and Bootstrap
// import React, { Component } from 'react';
import  React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Button, Input, Card, CardBody, CardImg,  
    Nav, 
    NavItem, 
    NavLink,
    TabContent, 
    TabPane, 
} from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import Auth from '@aws-amplify/auth';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import FileUpload from "./FileUpload";
import VacCentersDetails from "./VacCentersDetails";
import ClassicApp from "./map/app.js";
import classnames from 'classnames';
//Import Icons
import FeatherIcon from 'feather-icons-react';

//Import components
import PageBreadcrumb from "../../components/Shared/PageBreadcrumb";
import PageSearchSidebar from "../../components/Shared/PageSearchSidebar";
import CommentsBox from "../../components/Shared/CommentsBox";

// import { listWishs } from '../../graphql/queries';
// import { onCreateWish } from '../../graphql/subscriptions';
// import {createWish, deleteWish, updateWish} from '../../graphql/mutations';

// import {Auth} from 'aws-amplify';
import '@aws-amplify/ui/dist/style.css';
import { withAuthenticator, SignOut } from 'aws-amplify-react';
import API, { graphqlOperation } from '@aws-amplify/api';
// import images
import blog01 from '../../assets/images/blog/01.jpg';
import blog03 from '../../assets/images/blog/03.jpg';
import blog04 from '../../assets/images/blog/04.jpg';
import blog07 from '../../assets/images/blog/07.jpg';
import blog08 from '../../assets/images/blog/08.jpg';

// Client Images
import client1 from '../../assets/images/client/01.jpg';
import client2 from '../../assets/images/client/02.jpg';
import client3 from '../../assets/images/client/03.jpg';
import client4 from '../../assets/images/client/04.jpg';
import WishesBox from '../../components/Shared/WishesBox';


import {createVaccinationCenter } from '../../graphql/mutations';

// class WishWall extends Component {
function Section({centers, centersMap}) {

    let { displayType } = useParams();
    const history = useHistory()
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState({});
    const [successMsg, setSuccessMsg] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    debugger;
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab)
        }
    }

    const handleAddVacCenter = (inputData) => {
        for(let input of inputData) {
            console.log(input)
            API.graphql(graphqlOperation(createVaccinationCenter, { input : input }))
        }
      }

    const getUser = async () => {
        try{
            await Auth.currentAuthenticatedUser().then(user => {
                if(user.attributes.email == 'rajakumar.tu@gmail.com'){
                    setAdmin(true) 
                }
                if(user.attributes.email == 'kavin@kannan.io'){
                    setAdmin(true) 
                }
                return user
            }).catch(error => {
                // debugger
                console.log('Error Loading User')
                // history.push('/auth')
            })
        } catch (err) {
            console.log('error get user ..', err)
        }
        return {}
    };

    useEffect(() => {
        console.log('coponent loaded')
        getUser().then(user => {
            if(user){
                setUser(user)
            }
        });
        return () => {
        }
    }, []);

        return (
            <>
            { centers ? (
                // <>
                //     {displayType === "maps" ? (
                //         <>
                //             <React.Fragment>
                //                 <section className="section">
                //                     <ClassicApp centers={centers} centersMap={centersMap}/>
                //                 </section>
                //             </React.Fragment>  
                //         </>
                //     ) : (
                //         <React.Fragment>
                //             <section className="section">
                //                 {admin ? (
                //                     <FileUpload />
                //                 ):<></>}
                //                 <VacCentersDetails  centers={centers} centersMap={centersMap}/>
                //             </section>
                //         </React.Fragment>
                //     )}
                // </>
                <React.Fragment>
                    <section className="section">
                    <div className="component-wrapper rounded shadow">
                        <div className="p-4 border-bottom">
                            <h4 className="title mb-0"> Nav Tabs </h4>
                        </div>

                        <div className="p-4">
                            <Row>
                                <Col lg={12}>
                                    <Nav pills justified className="flex-column flex-sm-row rounded" id="pills-tab" role="tablist">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' }) +" rounded"}
                                                onClick={() => { toggleTab('1'); }}
                                            >
                                                <div className="text-center pt-1 pb-1">
                                                    <h4 className="title font-weight-normal mb-0">Center Details</h4>
                                                </div>
                                            </NavLink>
                                        </NavItem>

                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '2' }) +" rounded"}
                                                onClick={() => { toggleTab('2'); }}
                                            >
                                                <div className="text-center pt-1 pb-1">
                                                    <h4 className="title font-weight-normal mb-0">Locate Center</h4>
                                                </div>
                                            </NavLink>
                                        </NavItem>
                                        {/* <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '3' }) +" rounded"}
                                                onClick={() => { toggleTab('3'); }}
                                            >
                                                <div className="text-center pt-1 pb-1">
                                                    <h4 className="title font-weight-normal mb-0">Service</h4>
                                                </div>
                                            </NavLink>
                                        </NavItem> */}
                                    </Nav>
                                </Col>
                            </Row>
                            <Row className="pt-2">
                                <Col xs="12">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1" className="p-3">
                                            {admin ? (
                                                <FileUpload handleAddVacCenter={handleAddVacCenter} />
                                            ):<></>}
                                            <VacCentersDetails  centers={centers} centersMap={centersMap} toggleTab={toggleTab} />
                                        </TabPane>
                                        <TabPane tabId="2" className="p-3">
                                            <ClassicApp centers={centers} centersMap={centersMap}/>
                                        </TabPane>
                                        {/* <TabPane tabId="3" className="p-3">
                                        <p className="text-muted mb-0">You can combine all the Landrick templates into a single one, you can take a component from the Application theme and use it in the Website.</p>
                                        </TabPane> */}
                                    </TabContent>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    </section>
                </React.Fragment>
            ) : (
                <h1>Loading...</h1>
            )}
            </>
        );
    }
// export default Section;
Section.propTypes = {
    centers: PropTypes.array.isRequired,
    centersMap: PropTypes.object.isRequired
    };
    
    function mapStateToProps(state, ownProps) {
      return {
          centers: state.center.dataList,
          centersMap: state.center.dataMap
      };
    }
    
    const mapDispatchToProps = {
    };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Section);