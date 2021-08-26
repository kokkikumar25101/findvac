// React Basic and Bootstrap
// import React, { Component } from 'react';
import  React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Button, Input, Card, CardBody, CardImg } from 'reactstrap';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import { listVaccinationCenters } from '../../graphql/queries';
// import { onCreateWish } from '../../graphql/subscriptions';
import {createVaccinationCenter } from '../../graphql/mutations';

// class WishWall extends Component {
function FileUpload(props) {
    

    const [centers, setCenters] = useState([])

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
            <Form onSubmit={handleFileUpload} className="rounded shadow p-4">
                <Row>                             
                    <Col md="12">
                        <FormGroup className="position-relative">
                            <Label>Upload File :</Label>
                            <Input type="file" className="form-control-file" id="fileupload"/>
                        </FormGroup>                                                                               
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <input type="submit" id="submit" name="send" className="submitBnt btn btn-primary" value="Apply Now"/>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
export default FileUpload;

