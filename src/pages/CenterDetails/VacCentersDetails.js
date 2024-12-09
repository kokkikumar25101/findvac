// React Basic and Bootstrap
// import React, { Component } from 'react';
import  React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import XLSX from 'xlsx';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Button, Input, Card, CardBody, CardImg, Table } from 'reactstrap';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateSelectedLocateCenter } from "../../redux/actions/centerActions";

// import API, { graphqlOperation } from '@aws-amplify/api';
// import Auth from '@aws-amplify/auth';
// import Amplify from '@aws-amplify/core';

// import { listVaccinationCenters } from '../../graphql/queries';
// import { onCreateWish } from '../../graphql/subscriptions';
// import aws_exports from '../../aws-exports';
// Amplify.configure(aws_exports)
// Amplify.configure({
//     ...aws_exports,
//     Analytics: {
//       disabled: true,
//     },
//   });


// class WishWall extends Component {
function FileUpload({centers, centersMap, toggleTab, updateSelectedLocateCenter}) {
    
    const [searchValue, setSearchValue] = useState('')
    // const [centers, setCenters] = useState([])
    // const history = useHistory();

    useEffect(() => {
        // debugger;
        console.log('component loaded')
        // loadVacCenters()
        // getUser().then(user => {
        //     // console.log(user)
        //     // debugger;
        //     if(user){
        //         setUser(user)
        //     }
        // });

        // document.body.classList = "";
        // window.addEventListener("scroll", scrollNavigation, true);
        return () => {
            // window.removeEventListener("scroll",scrollNavigation, true);
        }
    }, []);
    
    // useEffect(() => {
    //     debugger
    //     setCenters(centerDataList)
    // }, [centerDataList]);
    // const scrollNavigation = () => {
    //     var doc = document.documentElement;
    //     var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    //     if (top > 80) {
    //         document.getElementById('topnav').classList.add('nav-sticky');
    //     }
    //     else {
    //         document.getElementById('topnav').classList.remove('nav-sticky');
    //     }
    // }


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

    const gotoCenterLocation = (centerId) => {
        let selectedCenterObj = centersMap[parseInt(centerId)]
        console.log('centerId : '+centerId)
        updateSelectedLocateCenter(selectedCenterObj)
        // history.push("/viewCenters/maps/"+centerId);
        toggleTab("2")
    }


    // const processExcel = (data) => {
    //     const workbook = XLSX.read(data, {type: 'binary'});
    //     const firstSheet = workbook.SheetNames[0];
    //     const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    //     // loadVacCenters()
    //     console.log(excelRows);
    //     console.log(centers.length);
    //     handleAddVacCenter(excelRows)
    //     // loadVacCenters()
    //     console.log(centers.length);
    // }

    return (
        <>
        <Container>
            <Row>
                <Col xs="12">
                    <div className="border-bottom">
                        <Row>
                            <Col lg="9" md="8">
                                <div className="section-title">
                                    <h4 className="title mb-2">All Vaccination Centers</h4>
                                    <p className="text-muted mb-0">Most Relevance Centers</p>
                                </div>
                            </Col>
        
                            <Col lg="3" md="4" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <div className="form custom-form">
                                    <FormGroup>
                                        <Input 
                                            type="text" 
                                            className="border rounded" 
                                            name="searchCenterField" 
                                            id="searchCenterField" 
                                            placeholder="Search Center..."
                                            value={searchValue} 
                                            onChange={e => setSearchValue(e.target.value)} 
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col className="mt-4 pt-2" id="tables">
                    <div className="component-wrapper rounded shadow">
                        {/* <div className="p-4 border-bottom">
                            <h4 className="title mb-0"> Table </h4>
                        </div> */}

                        <div className="p-4">
                            <div className="table-responsive bg-white shadow rounded">
                                <Table className="mb-0 table-center">
                                    <thead>
                                        <tr>
                                        {/* <th scope="col">#</th>
                                        <th scope="col">Hospital Id</th> */}
                                        <th scope="col">Hospital Name</th>
                                        <th scope="col">State</th>
                                        {/* <th scope="col">District</th> */}
                                        <th scope="col">Address</th>
                                        {/* <th scope="col">Pincode</th> */}
                                        <th scope="col">Public/Pvt</th>
                                        <th scope="col">MD/COE Name</th>
                                        <th scope="col">Contact No</th>
                                        <th scope="col">Email</th>
                                        {/* <th scope="col">Latitude</th>
                                        <th scope="col">Longitude</th>
                                        <th scope="col">Vac Count</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        centers.filter(center => {
                                            if (!searchValue) return true
                                            if (center.hospitalName.toUpperCase().includes(searchValue.toUpperCase()) || 
                                                center.state.toUpperCase().includes(searchValue.toUpperCase()) || 
                                                center.address.toUpperCase().includes(searchValue.toUpperCase()) ||
                                                center.mdCeoName.toUpperCase().includes(searchValue.toUpperCase())) {
                                              return true
                                            }
                                          }).map((center, key) =>
                                        <tr key={center.id}>
                                            <th scope="row" hidden>{center.id}</th>
                                            {/* <td>{center.hospitalId}</td> */}
                                            <td onClick={()=>gotoCenterLocation(center.id)} >{center.hospitalName}</td>
                                            <td>{center.state}</td>
                                            {/* <td>{center.district}</td> */}
                                            <td>{center.address}</td>
                                            {/* <td>{center.pincode}</td> */}
                                            <td>{center.ownershipType}</td>
                                            <td>{center.mdCeoName}</td>
                                            <td>{center.contactNo}</td>
                                            <td>{center.mdCeoEmail}</td>
                                            {/* <td>{center.latitude}</td>
                                            <td>{center.longitude}</td>
                                            <td>{center.estimatedVaccinePerDay}</td> */}
                                        </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
            
        </>
    );
}
// export default FileUpload;

FileUpload.propTypes = {
    centers: PropTypes.array.isRequired,
    centersMap: PropTypes.object.isRequired,
    updateSelectedLocateCenter: PropTypes.func.isRequired,
    toggleTab: PropTypes.func.isRequired
  };
  
  function mapStateToProps(state, ownProps) {
    return {
        // centers: state.center.dataList
    };
  }
  
  const mapDispatchToProps = {
    updateSelectedLocateCenter
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FileUpload);