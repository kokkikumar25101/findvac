// React Basic and Bootstrap
// import React, { Component } from 'react';
import  React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Media, Table, FormGroup, Label, Button, Input, Card, CardBody, CardImg } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
// import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Amplify from '@aws-amplify/core';
// import { listVaccinationCenters } from '../../graphql/queries';
import ClassicApp from "./map/app.js";


//Import Icons
import FeatherIcon from 'feather-icons-react';


// import {Auth} from 'aws-amplify';
import '@aws-amplify/ui/dist/style.css';
import { withAuthenticator, SignOut } from 'aws-amplify-react';


// class WishWall extends Component {
function Section({centers}) {
    const history = useHistory()
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState({});
    const [selectedCenterId, setSelectedCenterId] = useState('');

    // const [centers, setCenters] = useState([])

    // const loadVacCenters = async () => {
    //     // debugger
    //     API.graphql(graphqlOperation(listVaccinationCenters)).then(result => {
    //       var listCenters = result.data.listVaccinationCenters.items;
    //       console.log(listCenters.length)
    //     //   if(listVaccinationCenters.length > 0 ){
    //     //     listWishs = listWishs.sort(compare)
    //     //   }
    //     //   debugger
    //     setCenters(listCenters)
    //     })
    // }
    
    // const getUser = async () => {
    //     try{
    //         await Auth.currentAuthenticatedUser().then(user => {
    //             if(user.attributes.email == 'rajakumar.tu@gmail.com'){
    //                 setAdmin(true) 
    //             }
    //             return user
    //         }).catch(error => {
    //             // debugger
    //             console.log('Error Loading User')
    //             // history.push('/auth')
    //         })
    //     } catch (err) {
    //         console.log('error get user ..', err)
    //     }
    //     return {}
    // };


    useEffect(() => {
        // loadVacCenters()
        // getUser().then(user => {
        //     if(user){
        //         setUser(user)
        //     }
        // });
      }, []);

    return (
        <>
        { centers ? (
            <React.Fragment>
                <section className="section">
                    <ClassicApp centers={centers} />
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
    centers: PropTypes.array.isRequired
  };
  
  function mapStateToProps(state, ownProps) {
    return {
        centers: state.center.dataList
    };
  }
  
  const mapDispatchToProps = {
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Section);