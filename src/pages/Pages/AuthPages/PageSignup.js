// React Basic and Bootstrap
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup, Button, Card, CardBody } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from "react-redux";
import { loadLoginUserAttributes } from "../../../redux/actions/userActions";
import PropTypes from "prop-types";
import Auth from '@aws-amplify/auth';
import { useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

//Import Icons
import FeatherIcon from 'feather-icons-react';

// import images
import signup from '../../../assets/images/user/signup.png';

// class PageSignUp extends Component {
const PageSignUp = (props) => {
    
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const history = useHistory();

    const updateFormState = (e) => {
        switch(e.target.name) {
            case 'username':
                setUserName(e.target.value)
                console.log('username')
                break;
            case 'password':
                setPassword(e.target.value)
                console.log('password')
                break;
            case 'firstname':
                setFirstName(e.target.value)
                console.log('password')
                break;
            case 'lastname':
                setLastName(e.target.value)
                console.log('password')
                break;
            case 'phoneNumber':
                setPhoneNumber(e.target.value)
                console.log('password')
                break;
            default:
                console.log('default')
        }
    }

    async function signIn() {
        await Auth.signIn(username, password).then(user => {
            loadLoginUserAttributes(user)
            console.log('Login Succesful')
            console.log(user)
            history.goBack()
            // this.setState({ user })
            // Alert.alert('Signed In Successful!')
        }).catch(err => {
            console.log('Error when signing in: ', err)
            // Alert.alert('Error when signing in: ', err)
        })
    }

    async function signUp() {
        try {
            const authData = {
                username, 
                password, 
                attributes: { 
                    email : username,
                    name : firstname,
                    family_name : lastname,
                    phone_number : '+'+phoneNumber
                }
            }
            console.log(authData)
            await Auth.signUp(authData)
            console.log('sign up success!')
            // updateFormType('confirmSignUp')
        } catch (err) {
            console.log('error signing up..', err)
        }
    }

    return ( 

        <React.Fragment>
            <div className="back-to-home rounded d-none d-sm-block">
                <Link to="/" className="btn btn-icon btn-soft-primary"><i><FeatherIcon icon="home" className="icons" /></i></Link>
            </div>
            <section className="bg-home d-flex align-items-center">
                <Container>
                    <Row className="align-items-center">
                        <Col lg="7" md="6">
                            <div className="mr-lg-5">   
                                <img src={signup} className="img-fluid d-block mx-auto" alt=""/>
                            </div>
                        </Col>
                        <Col lg="5" md="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <Card className="login_page shadow rounded border-0">
                                <CardBody>
                                    <h4 className="card-title text-center">Signup</h4>  
                                <AvForm className="login-form mt-4">
                                    <Row>
                                    <Col md="6">
                                            <FormGroup className="position-relative">
                                                <Label htmlFor="firstname">First name <span className="text-danger">*</span></Label>
                                                <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                                <AvField type="text" className="form-control pl-5" name="firstname" id="firstname" placeholder="First Name" onChange={e => {e.persist();updateFormState(e)}} required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "Please enter first name"},
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup className="position-relative">
                                                <Label htmlFor="lastname">Last name <span className="text-danger">*</span></Label>
                                                <i><FeatherIcon icon="user-check" className="fea icon-sm icons" /></i>
                                                <AvField type="text" className="form-control pl-5" name="lastname" id="lastname" placeholder="Last Name" onChange={e => {e.persist();updateFormState(e)}} required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "Please enter first name"},
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="12">
                                            <FormGroup className="position-relative">
                                                <Label htmlFor="email">Your Email <span className="text-danger">*</span></Label>
                                                <i><FeatherIcon icon="mail" className="fea icon-sm icons" /></i>
                                                <AvField type="text" className="form-control pl-5" name="username" id="username" placeholder="Enter Email" onChange={e => {e.persist();updateFormState(e)}} required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "Please enter your email"},
                                                        pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="12">
                                            <FormGroup className="position-relative">
                                                <Label htmlFor="phoneNumber">Phone Number <span className="text-danger">*</span></Label>
                                                <i><FeatherIcon icon="phone" className="fea icon-sm icons" /></i>
                                                {/* <AvField type="text" className="form-control pl-5" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone Number" onChange={e => {e.persist();updateFormState(e)}} required
                                                    errorMessage=""
                                                    // validate={{
                                                    //     required: {value: true, errorMessage: "Please enter your phone number"},
                                                    //     pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                                    // }}
                                                    validate={{tel: true}}
                                                /> */}
                                                <PhoneInput
                                                    className="form-control pl-5" name="phoneNumber" id="phoneNumber" 
                                                    placeholder="Enter phone number"
                                                    value={phoneNumber}
                                                    // onChange={setPhoneNumber} 
                                                    onChange={phone => setPhoneNumber(phone)}
                                                    required />
                                            </FormGroup>
                                        </Col>
                                        <Col md="12">
                                            <FormGroup className="position-relative">
                                                <Label htmlFor="password">Password<span className="text-danger">*</span></Label>
                                                <i><FeatherIcon icon="lock" className="fea icon-sm icons" /></i>
                                                <AvField type="text" className="form-control pl-5" name="password" id="password" placeholder="Enter password" onChange={e => {e.persist();updateFormState(e)}} required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "Please enter Password"},
                                                        minLength: {value: 6, errorMessage: 'Your password must be between 6 and 8 characters'},
                                                        maxLength: {value: 16, errorMessage: 'Your password must be between 6 and 8 characters'}
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md="12">
                                            <FormGroup className="position-relative">
                                                <Label htmlFor="confirmpassword">Confirm Password<span className="text-danger">*</span></Label>
                                                <i><FeatherIcon icon="lock" className="fea icon-sm icons" /></i>
                                                <AvField type="password" className="form-control pl-5" name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" required
                                                    errorMessage=""
                                                    validate={{
                                                        required: {value: true, errorMessage: "Please enter Password"},
                                                        minLength: {value: 6, errorMessage: 'Your password must be between 6 and 8 characters'},
                                                        maxLength: {value: 16, errorMessage: 'Your password must be between 6 and 8 characters'}
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>

                                        {/* <Col md="12">
                                            <FormGroup>
                                                <div className="custom-control custom-checkbox">
                                                    <Input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                    <Label className="custom-control-label" htmlFor="customCheck1">I Accept <Link to="#" className="text-primary">Terms And Condition</Link></Label>
                                                </div>
                                            </FormGroup>
                                        </Col> */}
                                        <Col md="12" className="mb-0">
                                            {/* <Button color="primary" block>Register</Button> */}
                                            <Button color="primary" block  onClick={() => signUp()} >Register</Button>
                                        </Col>
                                        {/* <Col md="12" className="mt-4 text-center">
                                            <h6>Or Signup With</h6>
                                            <ul className="list-unstyled social-icon mb-0 mt-3">
                                                <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="facebook" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="github" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="twitter" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded"><i><FeatherIcon icon="gitlab" className="fea icon-sm fea-social" /></i></Link></li>
                                            </ul>
                                        </Col> */}
                                        <Col xs="12" className="text-center">
                                            <p className="mb-0 mt-3"><small className="text-dark mr-2">Already have an account ?</small> <Link to="/page-login" className="text-dark font-weight-bold">Sign Up</Link></p>
                                        </Col>
                                    </Row>
                                </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}
// export default PageSignUp;
PageSignUp.propTypes = {
    user: PropTypes.object.isRequired,
    // loadLoginUserAttributes: PropTypes.func.isRequired
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
  )(PageSignUp);