import React, { Component } from 'react';
import { Col, Row, Image, Container } from 'react-bootstrap';
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';
import '../App.css';
class ForumTopic extends Component {

    render() {
        return (
            <div>
                <div className="card d-flex align-items-center">
                    <div className="card-body">
                    
                            <Row>
                                <Col md={3}>
                                    <Avatar className="round__image" gender="female" className="avatar" width="150" height="150" alt="Avatar" />
                                </Col>
                                <Col md={6}>
                                    <p>
                                        Conversations by Anne
                                    </p>
                                    <h3>
                                        How to export Bananas
                                     </h3>
                                     <div className="topic_description">
                                     <LoremIpsum  p={1} />
                                     </div>
                                  
                                </Col>
                                <Col md={3}>
                                    <Avatar gender="female" className="avatar" width="50" height="50" alt="Avatar" />
                                </Col>
                            </Row>
                   
                    </div>
                </div>


            </div>
        )
    }
}

export default ForumTopic;
