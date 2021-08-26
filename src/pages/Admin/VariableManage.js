// React Basic and Bootstrap
// import React, { Component } from 'react';
import  React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Button, Input, Card, CardBody, CardImg } from 'reactstrap';

import {API, Auth, graphqlOperation} from 'aws-amplify';

//Import Icons
import FeatherIcon from 'feather-icons-react';

//Import components
import PageBreadcrumb from "../../components/Shared/PageBreadcrumb";
import PageSearchSidebar from "../../components/Shared/PageSearchSidebar";
import CommentsBox from "../../components/Shared/CommentsBox";

import { listWishs } from '../../graphql/queries';
import { onCreateWish } from '../../graphql/subscriptions';
import {createWish, deleteWish, updateWish} from '../../graphql/mutations';

// import {Auth} from 'aws-amplify';
import '@aws-amplify/ui/dist/style.css';
import { withAuthenticator, SignOut } from 'aws-amplify-react';

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


// class WishWall extends Component {
function WishWall(props) {

    const [wish, setWish] = useState('')
    const [user, setUser] = useState({
        'attributes' : { 
            'email' : '',
            'family_name' : '' ,
            'given_name' : ''
        }
    });
    const [wishes, setWishes] = useState([
        // { id : 1, userName : "Lorenzo Peterson", date : "15th August, 2019", time : "01:25 pm", wish : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour" },
        // { id : 2, userName : "Tammy Camacho", date : "16th August, 2019", time : "02:05 pm", wish : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour" },
        // { id : 3,  userName : "Tammy Camacho", date : "17th August, 2019", time : "04:03 pm", wish : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
        //     // replies : [
        //     //     { id : 1, image: client4, name : "Calvin Camacho", date : "18th August, 2019", time : "05:55 pm", desc : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour" },
        //     // ]
        // },
    ]);
    // const [successMsg, setSuccessMsg] = useState(false);

    const getUser = async () => {
        const user = await Auth.currentAuthenticatedUser();
        return user;
    };
    
    // useEffect(() => {
    //     const createWishListener = API.graphql(graphqlOperation(onCreateWish, {owner: user.username})).subscribe({
    //         next : wishData => {
    //           const newWish = wishData.value.data.onCreateWish
    //           // const prevNotes = notes.filter(note => note.id !== newNote.id)
    //           console.log(newWish)
    //           var updatedWishes = [...wishes, newWish]
    //           // debugger;
    //           if(updatedWishes.length > 0 ){
    //             //   debugger;
    //             updatedWishes = updatedWishes.sort(compare)
    //           }
    //           setWishes(updatedWishes)
    //         }
    //       });

    //     return () => {
    //         // debugger;
    //         createWishListener.unsubscribe();
    //         // deleteNoteListener.unsubscribe();
    //         // updateNoteListener.unsubscribe();
    //     }
    // }, [wishes, user]);

    useEffect(() => {
        loadWishes()
        getUser().then(user => {
            // console.log(user)
            // debugger;
            setUser(user)
        });

        document.body.classList = "";
        window.addEventListener("scroll", scrollNavigation, true);
        return () => {
            window.removeEventListener("scroll",scrollNavigation, true);
        }
    }, []);

    const scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById('topnav').classList.add('nav-sticky');
        }
        else {
            document.getElementById('topnav').classList.remove('nav-sticky');
        }
    }

    const loadWishes = async () => {
        // const queryParams = {
        //     createdAt,
        //     sortDirection: 'DESC',
        //   }; 
        API.graphql(graphqlOperation(listWishs)).then(result => {
          var listWishs = result.data.listWishs.items;
          if(listWishs.length > 0 ){
            listWishs = listWishs.sort(compare)
          }
          setWishes(listWishs)
        })
    }

    const handleChangeWish = event => {
        // console.log(event.target.value);
        setWish(event.target.value)
      }

    // const formatDate = date => {
    //     // var todayTime = new Date(date),
    //     var month = date.getMonth();
    //     var day = date.getDate();
    //     var year = date.getFullYear();
    //     return day + " " + monthArray[month] + " " + year;
    // }
    
    // const formatTime = date => {
    //     // var todayTime = new Date(date),
    //     var hour = date.getHours();
    //     var minute = date.getMinutes();
    //     return hour + ":" + minute;
    // }

    const getCreatedDateTime = () => {
        var current_date = new Date()
        const dateTimeFormat = new Intl.DateTimeFormat('en', { 
            year: 'numeric', 
            month: 'long', 
            day: '2-digit',
            hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
            }) 
        const [
            { value: month },,
            { value: day },,
            { value: year },,
            { value: hour },,
            { value: minute },,
            { value: second },,
            
            ] = dateTimeFormat .formatToParts(current_date ) 
        
        const formatedDate = `${day}-${month}-${year } ${hour}:${minute}:${second}`
        return formatedDate
    }

    const handleAddWish = async event => {
        event.preventDefault()
        // if (hasExistingNote()) {
        //   console.log('note updated !');
        //   handleUpdateNote()
        // } else {
        const createdDatetime = getCreatedDateTime()
        // debugger;
        const input = {
            userName : user.attributes.name,
            email : user.attributes.email,
            createdDatetime : createdDatetime,
            // time : formatTime(current_date),
            wish
        }
        //   console.log(input);
        API.graphql(graphqlOperation(createWish, { input : input }))
        // }
      }

        return (
            <React.Fragment>
                {/* breadcrumb */}
                {/* <PageBreadcrumb pathItems = {this.state.pathItems}>
                    <h2> Wish Wall </h2>
                        <ul className="list-unstyled mt-4">
                            <li className="list-inline-item h6 user text-muted mr-2"><i className="mdi mdi-account"></i> Please leave your wishes here </li>
                        </ul>
                </PageBreadcrumb> */}
                <React.Fragment>
                    <section className="bg-half bg-light d-table w-100">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg="12" className="text-center">
                                    <div className="page-next-level">
                                        { props.title ? <h4 className="title"> {props.title}</h4> : null }
                                        { props.children ? props.children : null }
                                        <h2> Wish Wall </h2>
                                            <ul className="list-unstyled mt-4">
                                                <li className="list-inline-item h6 user text-muted mr-2"><i className="mdi mdi-account"></i> Please leave your wishes here </li>
                                            </ul>
                                    </div>
                                </Col>  
                            </Row>
                        </Container> 
                    </section>
                </React.Fragment>

                <section className="section">
                    <Container>
                        {/* <Row>
                            <Col> */}
                                    <Card className="shadow rounded border-0 mt-4">
                                        <CardBody>
                                        <h5 className="card-title mb-0">Send Wishes :</h5>
                                        <Alert color="primary" isOpen={successMsg} toggle={()=>{ setSuccessMsg(!successMsg) }}>
                                            Data sended successfully.
                                        </Alert>
                                        <Form onSubmit={handleAddWish} className="mt-3">
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label>Your Wish</Label>
                                                        <i><FeatherIcon icon="message-circle" className="fea icon-sm icons" /></i>
                                                        <textarea id="message" placeholder="Your Wish" rows="5" name="message" className="form-control pl-5" value={wish} onChange={handleChangeWish} required></textarea>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label>Name <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                                        <Input id="name" name="name" type="text" placeholder="Name" className="form-control pl-5" value={user.attributes.name} readOnly required/>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label>Your Email <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="mail" className="fea icon-sm icons" /></i>
                                                        <Input id="email" type="email" placeholder="Email" name="email" className="form-control pl-5" value={user.attributes.email} readOnly required/>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <div className="send">
                                                    <Button type="submit" className="btn btn-primary w-100">Send Message</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                        </CardBody>
                                    </Card>

                                    {/* comments */}
                                    <WishesBox wishes={wishes} user={user} />
                            {/* </Col>

                        </Row> */}
                    </Container>
                </section>
            </React.Fragment>
        );
    }
// }
const signUpConfig = {
    header: 'Create an Account',
    hideAllDefaults: true,
    defaultCountryCode: '91',
    signUpFields: [
      {
        label: 'First Name',
        key: 'name',
        required: true,
        displayOrder: 1,
        type: 'string'
      },
      {
        label: 'Last Name',
        key: 'family_name',
        required: true,
        displayOrder: 2,
        type: 'string'
      },
      {
        label: 'Email',
        key: 'username',
        required: true,
        displayOrder: 3,
        type: 'string'
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 3,
        type: 'password'
      },
      {
        label: 'Phone number',
        key: 'phone_number',
        required: true,
        displayOrder: 5,
        type: 'string'
      }
    ]
  };
// export default WishWall;
export default withAuthenticator(WishWall, { 
    includeGreetings: false ,
    signUpConfig
  });
