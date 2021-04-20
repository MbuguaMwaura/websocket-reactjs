import React, { Component } from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';
import '../App.css';
import { BsChatSquare, BsStar } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
class DiscussionComponent extends Component {

    render() {
        return (
            <div className="card d-flex align-items-center">
            <div className="card-body">
            
                <div className="spacing__top">

                    <Row>
                        <Col md={2}>
                            <BsChatSquare />
                        </Col>
                        <Col>
                            <p className="side__card__item">
                                All discussions
                           </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <BsStar />
                        </Col>
                        <Col>
                            <p className="side__card__item">
                                Following
                        </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <AiOutlineTags />
                        </Col>
                        <Col>
                            <p className="side__card__item">
                                Tags
                        </p>
                        </Col>
                    </Row>

                </div>



            </div>
        </div>
        )
    }
}

export default DiscussionComponent;
