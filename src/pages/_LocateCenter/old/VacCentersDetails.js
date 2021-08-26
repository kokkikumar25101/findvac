// React Basic and Bootstrap
// import React, { Component } from 'react';
import  React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Button, Input, Card, CardBody, CardImg, Table } from 'reactstrap';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import { listVaccinationCenters } from '../../graphql/queries';
// import { onCreateWish } from '../../graphql/subscriptions';
import {createVaccinationCenter } from '../../graphql/mutations';

// class WishWall extends Component {
function FileUpload(props) {

    const [centers, setCenters] = useState([])

    useEffect(() => {
        console.log('coponent loaded')
        loadVacCenters()
        return () => {
        }
    }, []);

    

    const loadVacCenters = async () => {
        // debugger
        API.graphql(graphqlOperation(listVaccinationCenters)).then(result => {
          var listCenters = result.data.listVaccinationCenters.items;
          console.log(listCenters.length)
        //   if(listVaccinationCenters.length > 0 ){
        //     listWishs = listWishs.sort(compare)
        //   }
        //   debugger
        setCenters(listCenters)
        })
    }

    const handleAddVacCenter = (inputData) => {
        for(let input of inputData) {
            console.log(input)
            API.graphql(graphqlOperation(createVaccinationCenter, { input : input }))
        }
      }

    const processExcel = (data) => {
        const workbook = XLSX.read(data, {type: 'binary'});
        const firstSheet = workbook.SheetNames[0];
        const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
        loadVacCenters()
        console.log(excelRows);
        console.log(centers.length);
        // handleAddVacCenter(excelRows)
        loadVacCenters()
        console.log(centers.length);
    }

    const handleFileUpload = async event => {
        event.preventDefault()
        console.log('handleFileUpload')
        const fileUpload = (document.getElementById('fileupload'));
        const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            let fileName = fileUpload.files[0].name;
            if (typeof (FileReader) !== 'undefined') {
                const reader = new FileReader();
                if (reader.readAsBinaryString) {
                    reader.onload = (e) => {
                        processExcel(reader.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                }
            } else {
                console.log("This browser does not support HTML5.");
            }
        } else {
            console.log("Please upload a valid Excel file.");
        }
      }

    return (
        <>
        <Container>
            <Row>
                <Col xs="12">
                    <div className="border-bottom">
                        <Row>
                            <Col lg="9" md="8">
                                <div className="section-title">
                                    <h4 className="title mb-2">All Jobs</h4>
                                    <p className="text-muted mb-0">Most Relevance Job</p>
                                </div>
                            </Col>
        
                            <Col lg="3" md="4" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <div className="form custom-form">
                                    <FormGroup>
                                        <Label>Types of jobs :</Label>
                                        <select className="form-control custom-select" id="Sortbylist-job">
                                            <option>All Jobs</option>
                                            <option>Full Time</option>
                                            <option>Part Time</option>
                                            <option>Remote</option>
                                            <option>Work From Home</option>
                                        </select>
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
                        <div className="p-4 border-bottom">
                            <h4 className="title mb-0"> Table </h4>
                        </div>

                        <div className="p-4">
                            <div className="table-responsive bg-white shadow rounded">
                                <Table className="mb-0 table-center">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Hospital Id</th>
                                        <th scope="col">Hospital Name</th>
                                        <th scope="col">State</th>
                                        {/* <th scope="col">District</th> */}
                                        <th scope="col">Address</th>
                                        <th scope="col">Pincode</th>
                                        <th scope="col">Public/Pvt</th>
                                        <th scope="col">MD/COE Name</th>
                                        <th scope="col">Contact No</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Latitude</th>
                                        <th scope="col">Longitude</th>
                                        <th scope="col">Vac Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        centers.map((center, key) =>
                                        <tr>
                                            <th scope="row">{center.id}</th>
                                            <td>{center.hospitalId}</td>
                                            <td>{center.hospitalName}</td>
                                            <td>{center.state}</td>
                                            {/* <td>{center.district}</td> */}
                                            <td>{center.address}</td>
                                            <td>{center.pincode}</td>
                                            <td>{center.ownershipType}</td>
                                            <td>{center.mdCeoName}</td>
                                            <td>{center.contactNo}</td>
                                            <td>{center.mdCeoEmail}</td>
                                            <td>{center.latitude}</td>
                                            <td>{center.longitude}</td>
                                            <td>{center.estimatedVaccinePerDay}</td>
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
export default FileUpload;

