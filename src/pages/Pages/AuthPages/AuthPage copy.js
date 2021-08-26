// React Basic and Bootstrap
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup, Button, Card, CardBody } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from "react-redux";
import { loadLoginUserAttributes, updateAuthLoginState } from "../../../redux/actions/authActions";
import PropTypes from "prop-types";
import Auth from '@aws-amplify/auth';
import { useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import loginImg from '../../../assets/images/user/login.png';
// import images
import signupImg from '../../../assets/images/user/signup.png';

const AuthPage = ({auth, loadLoginUserAttributes, updateAuthLoginState}) => {
    
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirmationCode, setConfirmationCode] = useState('')

    const history = useHistory();

    // const handleUpdateAuthLoginState = (state) => updateAuthLoginState(state)

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
            // console.log(history.last)
            // debugger;
            // history.goBack()
            history.push('/')
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
                    phone_number : '+'+ phoneNumber
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

    async function confirmSignUp() {
        try {
          await Auth.confirmSignUp(username, confirmationCode)
          console.log('confirm sign up success!')
        //   updateFormType('signIn')
        } catch (err) {
          console.log('error signing up..', err)
        }
      }


    function renderForm() {
        switch(auth.loginFormState) {
          case 'signUp':
            return (
              <SignUp
                signUp={() => signUp()}
                updateFormState={(value) => updateFormState(value)}
                updateAuthLoginState={(value) => updateAuthLoginState(value)}
              />
            )
          case 'confirmSignUp':
            return (
              <ConfirmSignUp
                confirmSignUp={() => confirmSignUp()}
                updateFormState={(value) => updateFormState(value)}
                updateAuthLoginState={(value) => updateAuthLoginState(value)}
              />
            )
          case 'signIn':
            return (
              <SignIn
                signIn={() => signIn()}
                updateFormState={(value) => updateFormState(value)}
                updateAuthLoginState={(value) => updateAuthLoginState(value)}
              />
            )
          default:
            return null
        }
      }

    

    return (<>
            {renderForm()}
        </>
    );
}

function ConfirmSignUp({signIn, updateAuthLoginState}) {
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
                                <img src={loginImg} className="img-fluid d-block mx-auto" alt=""/>
                            </div>
                        </Col>
                        <Col lg="5" md="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <Card className="login-page bg-white shadow rounded border-0">
                                <CardBody>
                                    <div className="card-title text-center">
                                        <h4 className="mb-4">Login</h4>  
                                    </div>
                                    <AvForm className="login-form mt-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup className="position-relative">
                                                    <Label htmlFor="email">Your Email <span className="text-danger">*</span></Label>
                                                    <i><FeatherIcon icon="mail" className="fea icon-sm icons" /></i>
                                                    <AvField 
                                                        type="text" 
                                                        className="form-control pl-5" 
                                                        // name="email" 
                                                        // id="email" 
                                                        name='username'
                                                        id='username'
                                                        placeholder="Enter Your Email Address" 
                                                        required
                                                        errorMessage=""
                                                        // onChange={e => {e.persist();updateFormState(e)}}
                                                        validate={{
                                                            required: {value: true, errorMessage: "Please enter your email"},
                                                            pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="12">
                                                <FormGroup className="position-relative">
                                                    <Label htmlFor="password">Password <span className="text-danger">*</span></Label>
                                                    <i><FeatherIcon icon="lock" className="fea icon-sm icons" /></i>
                                                    <AvField 
                                                        type="text" 
                                                        className="form-control pl-5" 
                                                        name="password" 
                                                        id="password" 
                                                        // onChange={e => {e.persist();updateFormState(e)}}
                                                        placeholder="Enter password" 
                                                        required
                                                        errorMessage=""
                                                        validate={{
                                                            required: {value: true, errorMessage: "Please enter Password"},
                                                            minLength: {value: 6, errorMessage: 'Your password must be between 6 and 8 characters'},
                                                            maxLength: {value: 16, errorMessage: 'Your password must be between 6 and 8 characters'}
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="12">
                                                <div className="d-flex justify-content-between">
                                                    <FormGroup>
                                                        <div className="custom-control custom-checkbox">
                                                            <Input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                            <Label className="custom-control-label" htmlFor="customCheck1">Remember me</Label>
                                                        </div>
                                                    </FormGroup>
                                                    <p className="forgot-pass mb-0"><Link to="auth-re-password" className="text-dark font-weight-bold">Forgot password ?</Link></p>
                                                </div>
                                            </Col>
                                            <Col lg="12" className="mb-0">
                                                <Button color="primary" block  onClick={() => signIn()} >Sign in</Button>
                                            </Col>
                                            <Col lg="12" className="mt-4 text-center">
                                                <h6>Or Login With</h6>
                                                <ul className="list-unstyled social-icon mb-0 mt-3">
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="facebook" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="github" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="twitter" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded"><i><FeatherIcon icon="gitlab" className="fea icon-sm fea-social" /></i></Link></li>
                                                </ul>
                                            </Col>
                                            <Col xs="12" className="text-center">
                                                <p className="mb-0 mt-3"><small className="text-dark mr-2">Don't have an account ?</small> <Link onClick={() => updateAuthLoginState('signUp')} className="text-dark font-weight-bold">Sign Up</Link></p>
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

    )}


function SignUp({signUp, updateFormState, updateAuthLoginState}) {
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
                                <img src={signupImg} className="img-fluid d-block mx-auto" alt=""/>
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
                                                <AvField type="text" className="form-control pl-5" name="firstname" id="firstname" placeholder="First Name" 
                                                    onChange={e => {e.persist();updateFormState(e)}} 
                                                    // onChange={value => setFirstName(value)}
                                                    required
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
                                                <AvField type="text" className="form-control pl-5" name="lastname" id="lastname" placeholder="Last Name" 
                                                    onChange={e => {e.persist();updateFormState(e)}} 
                                                    // onChange={value => setLastName(value)}
                                                    required
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
                                                <AvField type="text" className="form-control pl-5" name="username" id="username" placeholder="Enter Email" 
                                                    onChange={e => {e.persist();updateFormState(e)}} 
                                                    // onChange={value => setUserName(value)}
                                                    required
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
                                                    // value={phoneNumber}
                                                    // onChange={setPhoneNumber} 
                                                    // onChange={phone => setPhoneNumber(phone)}
                                                    onChange={e => {e.persist();updateFormState(e)}} 
                                                    required />
                                            </FormGroup>
                                        </Col>
                                        <Col md="12">
                                            <FormGroup className="position-relative">
                                                <Label htmlFor="password">Password<span className="text-danger">*</span></Label>
                                                <i><FeatherIcon icon="lock" className="fea icon-sm icons" /></i>
                                                <AvField type="text" className="form-control pl-5" name="password" id="password" placeholder="Enter password" 
                                                    // onChange={value => setPassword(value)}
                                                    onChange={e => {e.persist();updateFormState(e)}} 
                                                    required
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
                                            <p className="mb-0 mt-3"><small className="text-dark mr-2">Already have an account ?</small> <Link onClick={() => updateAuthLoginState('signIn')} className="text-dark font-weight-bold">Sign In</Link></p>
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
    )}

function SignIn({signIn, updateFormState, updateAuthLoginState}) {
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
                                <img src={loginImg} className="img-fluid d-block mx-auto" alt=""/>
                            </div>
                        </Col>
                        <Col lg="5" md="6" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <Card className="login-page bg-white shadow rounded border-0">
                                <CardBody>
                                    <div className="card-title text-center">
                                        <h4 className="mb-4">Login</h4>  
                                    </div>
                                    <AvForm className="login-form mt-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup className="position-relative">
                                                    <Label htmlFor="email">Your Email <span className="text-danger">*</span></Label>
                                                    <i><FeatherIcon icon="mail" className="fea icon-sm icons" /></i>
                                                    <AvField 
                                                        type="text" 
                                                        className="form-control pl-5" 
                                                        // name="email" 
                                                        // id="email" 
                                                        name='username'
                                                        id='username'
                                                        placeholder="Enter Your Email Address" 
                                                        required
                                                        errorMessage=""
                                                        onChange={(e) => {e.persist();updateFormState(e)}}
                                                        validate={{
                                                            required: {value: true, errorMessage: "Please enter your email"},
                                                            pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="12">
                                                <FormGroup className="position-relative">
                                                    <Label htmlFor="password">Password <span className="text-danger">*</span></Label>
                                                    <i><FeatherIcon icon="lock" className="fea icon-sm icons" /></i>
                                                    <AvField 
                                                        type="text" 
                                                        className="form-control pl-5" 
                                                        name="password" 
                                                        id="password" 
                                                        // onChange={e => {e.persist();updateFormState(e)}}
                                                        onChange={e => {e.persist();updateFormState(e)}}
                                                        placeholder="Enter password" 
                                                        required
                                                        errorMessage=""
                                                        validate={{
                                                            required: {value: true, errorMessage: "Please enter Password"},
                                                            minLength: {value: 6, errorMessage: 'Your password must be between 6 and 8 characters'},
                                                            maxLength: {value: 16, errorMessage: 'Your password must be between 6 and 8 characters'}
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="12">
                                                <div className="d-flex justify-content-between">
                                                    <FormGroup>
                                                        <div className="custom-control custom-checkbox">
                                                            <Input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                            <Label className="custom-control-label" htmlFor="customCheck1">Remember me</Label>
                                                        </div>
                                                    </FormGroup>
                                                    <p className="forgot-pass mb-0"><Link to="auth-re-password" className="text-dark font-weight-bold">Forgot password ?</Link></p>
                                                </div>
                                            </Col>
                                            <Col lg="12" className="mb-0">
                                                <Button color="primary" block  onClick={() => signIn()} >Sign in</Button>
                                            </Col>
                                            <Col lg="12" className="mt-4 text-center">
                                                <h6>Or Login With</h6>
                                                <ul className="list-unstyled social-icon mb-0 mt-3">
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="facebook" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="github" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="twitter" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded"><i><FeatherIcon icon="gitlab" className="fea icon-sm fea-social" /></i></Link></li>
                                                </ul>
                                            </Col>
                                            <Col xs="12" className="text-center">
                                                <p className="mb-0 mt-3"><small className="text-dark mr-2">Don't have an account ?</small> <Link to="#" onClick={() => updateAuthLoginState('signUp')} className="text-dark font-weight-bold">Sign Up</Link></p>
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
    )}

AuthPage.propTypes = {
    auth: PropTypes.object.isRequired,
    // loginFormState: PropTypes.string.isRequired,
    loadLoginUserAttributes: PropTypes.func.isRequired,
    updateAuthLoginState: PropTypes.func.isRequired,
  };
  
  function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        loginFormState: state.loginFormState
    };
  }
  
  const mapDispatchToProps = {
    loadLoginUserAttributes,
    updateAuthLoginState
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthPage);