import React, { Component } from 'react';
import { Card, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';

class WishesBox extends Component {
    render() {
        return (
            <React.Fragment>
                                    <Card className="shadow rounded border-0 mt-4">
                                        <CardBody>
                                        <h5 className="card-title mb-0">Wishes :</h5>
                                        <ul className="media-list list-unstyled mb-0">
                                            {
                                                this.props.wishes.map((wish, key) =>
                                                    <li key={key} className="mt-4">
{/* userName: String!
  email: String!
  date: String!
  time: String!
  wish: String */}
                                                    <div className="d-flex justify-content-between">
                                                        <div className="media align-items-center">
                                                            {/* <Link className="pr-3" to="#">
                                                                <img src={comment.image} className="img-fluid avatar avatar-md-sm rounded-circle shadow" alt="img"/>
                                                            </Link> */}
                                                            <div className="commentor-detail">
                                                                <h6 className="mb-0"><Link to="#" className="text-dark media-heading">{wish.userName}</Link></h6>
                                                                <small className="text-muted">{wish.createdDatetime.split(" ")[0].replace("-", " ")} at {wish.createdDatetime.split(" ")[1]}</small>
                                                            </div>
                                                        </div>
                                                        {/* { user.attributes.email == } */}
                                                        {/* <Link to="#" className="text-muted"><i className="mdi mdi-reply"></i> Delete</Link> */}
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className="text-muted font-italic p-3 bg-light rounded">" {wish.wish} "</p>
                                                    </div>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                        </CardBody>
                                    </Card>
            </React.Fragment>
        );
    }
}

export default WishesBox;