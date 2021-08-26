import React, { useState, useReducer } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup, Button, Card, CardBody, Alert } from 'reactstrap';
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

const initialFormState = {
  username: '', password: '', email: '', confirmationCode: ''
}

function reducer(state, action) {
  switch(action.type) {
    case 'updateFormState':
      return {
        ...state, [action.e.target.name]: action.e.target.value
      }
    default:
      return state
  }
}

export default function Form() {
    const [formType, updateFormType] = useState('signIn')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [formState, updateFormState] = useReducer(reducer, initialFormState)
    const history = useHistory();

    async function signUp({ username, password, firstname, lastname }, phoneNumber, updateFormType) {
        await Auth.signUp({
        username, 
        password, 
        attributes: {
            email : username,
            name : firstname,
            family_name : lastname,
            phone_number : '+'+phoneNumber
        }
        })
        console.log('sign up success!')
        updateFormType('confirmSignUp')
    }
    
    async function confirmSignUp({ username, confirmationCode }, updateFormType) {

        await Auth.confirmSignUp(username, confirmationCode)
        console.log('confirm sign up success!')
        // history.goBack()
        history.goBack()
        // updateFormType('signIn')
    }
    
    async function signIn({ username, password }) {
        await Auth.signIn(username, password)
        console.log('sign in success!')
        history.goBack()
    }


    // const handleLoginError = (error) => {
    //     setLoginErrorMessage(error)
    // }

    // const pageRedirect = (url) => {
    //     if(url == ''){
    //     history.goBack()
    //     }else{
    //     history.push(url)
    //     }
    // } 

  function renderForm() {
    switch(formType) {
      case 'signUp':
        return (
          <SignUp
            signUp={() => signUp(formState, phoneNumber, updateFormType)}
            updateFormType={(value) => updateFormType(value)}
            setPhoneNumber={(value) => setPhoneNumber(value)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'confirmSignUp':
        return (
          <ConfirmSignUp
            confirmSignUp={() => confirmSignUp(formState, updateFormType)}
            updateFormType={(value) => updateFormType(value)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'signIn':
        return (
          <SignIn
            signIn={() => signIn(formState)}
            updateFormType={(value) => updateFormType(value)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      default:
        return null
    }
  }
  

  return (
    <div>
      <div>
        {renderForm(formState)}
      </div>
      {
        formType === 'signUp' && (
          <p style={styles.footer}>
            Already have an account? <span
              style={styles.anchor}
              onClick={() => updateFormType('signIn')}
            >Sign In</span>
          </p>
        )
      }
      {
        formType === 'signIn' && (
          <p style={styles.footer}>
            Need an account? <span
              style={styles.anchor}
              onClick={() => updateFormType('signUp')}
            >Sign Up</span>
          </p>
        )
      }
    </div>
  )
}

function ConfirmSignUp(props) {
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
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
                                      <h4 className="mb-4">Confirm User</h4>  
                                      <Alert color="danger" isOpen={loginErrorMessage == '' ? false : true} toggle={()=>{ setLoginErrorMessage('') }} >
                                            <>
                                                {loginErrorMessage}
                                            </>
                                        </Alert>
                                  </div>
                                  {/* <Alert color="info" isOpen={this.state.successMsg} toggle={()=>{ this.setState({successMsg : !this.state.successMsg}) }}>
                                    Data sended successfully.
                                    </Alert> */}
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
                                                      onChange={e => {e.persist();props.updateFormState(e)}}
                                                      validate={{
                                                          required: {value: true, errorMessage: "Please enter your email"},
                                                          pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                                      }}
                                                  />
                                              </FormGroup>
                                          </Col>

                                          <Col lg="12">
                                              <FormGroup className="position-relative">
                                                  <Label htmlFor="password">OTP / Confirmation Code <span className="text-danger">*</span></Label>
                                                  <i><FeatherIcon icon="lock" className="fea icon-sm icons" /></i>
                                                  <AvField 
                                                      type="password" 
                                                      className="form-control pl-5" 
                                                      name="confirmationCode" 
                                                      id="confirmationCode" 
                                                      onChange={e => {e.persist();props.updateFormState(e)}}
                                                      placeholder="Enter Confirmation Code" 
                                                      required
                                                      errorMessage=""
                                                      validate={{
                                                          required: {value: true, errorMessage: "Please enter Confirmation Code"},
                                                          // minLength: {value: 6, errorMessage: 'Your password must be between 6 and 8 characters'},
                                                          // maxLength: {value: 16, errorMessage: 'Your password must be between 6 and 8 characters'}
                                                      }}
                                                  />
                                              </FormGroup>
                                          </Col>

                                          {/* <Col lg="12">
                                              <div className="d-flex justify-content-between">
                                                  <FormGroup>
                                                      <div className="custom-control custom-checkbox">
                                                          <Input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                          <Label className="custom-control-label" htmlFor="customCheck1">Remember me</Label>
                                                      </div>
                                                  </FormGroup>
                                                  <p className="forgot-pass mb-0"><Link to="auth-re-password" className="text-dark font-weight-bold">Forgot password ?</Link></p>
                                              </div>
                                          </Col> */}
                                          <Col lg="12" className="mb-0">
                                              <Button color="primary" block  onClick={() => props.confirmSignUp().catch(error => {
                                                setLoginErrorMessage(error.message)
                                                console.log('error signing up..', error)
                                                })
                                               } >Confirm User</Button>
                                          </Col>
                                          {/* <Col lg="12" className="mt-4 text-center">
                                              <h6>Or Login With</h6>
                                              <ul className="list-unstyled social-icon mb-0 mt-3">
                                                  <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="facebook" className="fea icon-sm fea-social" /></i></Link></li>
                                                  <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="github" className="fea icon-sm fea-social" /></i></Link></li>
                                                  <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="twitter" className="fea icon-sm fea-social" /></i></Link></li>
                                                  <li className="list-inline-item"><Link to="#" className="rounded"><i><FeatherIcon icon="gitlab" className="fea icon-sm fea-social" /></i></Link></li>
                                              </ul>
                                          </Col> */}
                                          <Col xs="12" className="text-center">
                                              <p className="mb-0 mt-3"><small className="text-dark mr-2">Don't have an account ?</small> <Link to="#" onClick={() => props.updateFormType('signUp')} className="text-dark font-weight-bold">Sign Up</Link></p>
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


function SignUp(props) {
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
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
                                  <Alert color="danger" isOpen={loginErrorMessage == '' ? false : true} toggle={()=>{ setLoginErrorMessage('') }} >
                                        <>
                                            {loginErrorMessage}
                                        </>
                                    </Alert>
                              <AvForm className="login-form mt-4">
                                  <Row>
                                  <Col md="6">
                                          <FormGroup className="position-relative">
                                              <Label htmlFor="firstname">First name <span className="text-danger">*</span></Label>
                                              <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                              <AvField type="text" className="form-control pl-5" name="firstname" id="firstname" placeholder="First Name" 
                                                  onChange={e => {e.persist();props.updateFormState(e)}} 
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
                                                  onChange={e => {e.persist();props.updateFormState(e)}} 
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
                                                  onChange={e => {e.persist();props.updateFormState(e)}} 
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
                                              {/* <AvField type="text" className="form-control pl-5" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone Number" onChange={e => {e.persist();props.updateFormState(e)}} required
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
                                                  onChange={phone => props.setPhoneNumber(phone)}
                                                  // onChange={e => {props.updateFormState(e)}} 
                                                  required />
                                          </FormGroup>
                                      </Col>
                                      <Col md="12">
                                          <FormGroup className="position-relative">
                                              <Label htmlFor="password">Password<span className="text-danger">*</span></Label>
                                              <i><FeatherIcon icon="lock" className="fea icon-sm icons" /></i>
                                              <AvField type="text" className="form-control pl-5" name="password" id="password" placeholder="Enter password" 
                                                  // onChange={value => setPassword(value)}
                                                  onChange={e => {e.persist();props.updateFormState(e)}} 
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
                                          <Button color="primary" block  onClick={() => props.signUp().catch(error => {
                                              setLoginErrorMessage(error.message)
                                              console.log('error signing up..', error)
                                            })
                                        } >Register</Button>
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
                                          <p className="mb-0 mt-3"><small className="text-dark mr-2">Already have an account ?</small> <Link to="#" onClick={() => props.updateFormType('signIn')} className="text-dark font-weight-bold">Sign In</Link></p>
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

function SignIn(props) {
    const [loginErrorMessage, setLoginErrorMessage] = useState('')

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
                                        <Alert color="danger" isOpen={loginErrorMessage == '' ? false : true} toggle={()=>{ setLoginErrorMessage('') }} >
                                            <>
                                                {loginErrorMessage}
                                            </>
                                        </Alert>
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
                                                      onChange={(e) => {e.persist();props.updateFormState(e)}}
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
                                                      type="password" 
                                                      className="form-control pl-5" 
                                                      name="password" 
                                                      id="password" 
                                                      // onChange={e => {e.persist();updateFormState(e)}}
                                                      onChange={e => {e.persist();props.updateFormState(e)}}
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
                                              <Button color="primary" block  onClick={() => {
                                                  props.signIn().catch(error => {
                                                    setLoginErrorMessage(error.message)
                                                    console.log('error signing up..', error)
                                                  })
                                              }} >Sign in</Button>
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
                                              <p className="mb-0 mt-3"><small className="text-dark mr-2">Don't have an account ?</small> <Link to="#" onClick={() => props.updateFormType('signUp')} className="text-dark font-weight-bold">Sign Up</Link></p>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 45,
    marginTop: 8,
    width: 300,
    maxWidth: 300,
    padding: '0px 8px',
    fontSize: 16,
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid rgba(0, 0, 0, .3)'
  },
  button: {
    backgroundColor: '#006bfc',
    color: 'white',
    width: 316,
    height: 45,
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
    cursor: 'pointer',
    border:'none',
    outline: 'none',
    borderRadius: 3,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, .3)',
  },
  footer: {
    fontWeight: '600',
    padding: '0px 25px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  anchor: {
    color: '#006bfc',
    cursor: 'pointer'
  }
}