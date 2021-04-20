
import React, { Component } from 'react';
import TopBarComponent from '../components/TopBarComponent';
import { Col, Row, Image, Container, Button } from 'react-bootstrap';
import ForumTopic from "../components/ForumTopic"
import CreateDiscussion from "../components/CreateDiscussionComponent"
import '../App.css';
import { BsChatSquare, BsStar } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from "axios";
const apiUrl = "http://localhost:8080";
const token = "d9f56ab4-d7ef-433b-b3f1-0749e20f7322"
var randomColor = require('randomcolor');

class ForumList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isForumList:true,
            title:"Chat Forum",
            topics:[],
            conversationColor:null
        }
    }
    componentDidMount(){
        // this.loginUser()
        axios
            .get(
              apiUrl+"/api/forum/topics", { headers: {"Authorization" : `Bearer ${token}`}}
            )
            .then(res => {
                this.setState({
                    topics:res.data.data
                })
            });
            if(this.state.conversationColor == null){
                this.setState({ conversationColor: randomColor() });
        
            }
    }
    loginUser(){
        var bodyFormData = new FormData();
        bodyFormData.append('grant_type', 'password');
        bodyFormData.append('client_id', 'wit_android_app');
        bodyFormData.append('client_secret', 'QBhd$Txm42n3q@');
        bodyFormData.append('username', 'alex@gmail.com');
        bodyFormData.append('password', 'Pass1234*');
        axios
        .post(
          apiUrl+"/oauth/token", bodyFormData,{'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json'}
        )
        .then(res => {
            console.log(res)
        });
       
    }

    handleClick(e){
        this.nextPath("/chat/"+e)
    }
    nextPath(path) {
        this.props.history.push(path);
        
    }
    startDiscussion(){
        this.setState({
            isForumList: !this.state.isForumList
        });
        if(!this.state.isForumList){
            this.setState({
                title: "Chat Forum"
            });
        }else{
            this.setState({
                title: "New Discussion"
            });
        }
    }
    displayComments = (comments) => {
        let style = {background:this.state.conversationColor}
        console.log(comments)
        return (
            
            <div className="comments">
                {comments.map((comment,index) => {
                    if(index < 3)
                           return (
                            
                                <div className="profile__icon__small" style={style}>
                                    <p className="profile__text">{comment.commenterName[0]}</p>
                                </div> 
        
                        )
                })}
            </div>
        );   
    }
    displayTags = (tags) => {
        let style = {background:this.state.conversationColor}
        console.log(tags)
        if(tags != undefined){
            return (
            
                <div className="comments">
                    {tags.map((tag,index) => {
                        if(index < 3)
                               return (
                                
                                    <div className="tag__background" style={{background:randomColor()}}>
                                        <p className="tag__text">{tag}</p>
                                    </div> 
            
                            )
                    })}
                </div>
            ); 
        }
     
    }

    displayTopics = () => {

        return (
        
            <div className="forum">
                {this.state.topics.map((topic,index) => {
                           return (
                            <div key={index}>
                                <div className="card d-flex align-items-center spacing__top">
                                    <div className="card-body" onClick = {this.handleClick.bind(this, topic.id)}>
                                    
                                            <Row>
                                                <Col md={3}>
                                                <div className="profile__icon__large" >
                                                    <p className="profile__text large__text">{topic.creator.name}</p>
                                                </div>
                                                </Col>
                                                <Col md={6} >
                                                
                                                        <p>
                                                            Conversations by {topic.creator.name}
                                                        </p>
                                                        <h3>
                                                            {topic.topic}
                                                        </h3>
                                                        <div className="tags">
                                                            { this.displayTags(topic.tags)}
                                                        </div>
                                                        <div className="topic_description">
                                                            {topic.description}
                                                        </div>
                                                     
                                                
                                                    
                                                  
                                                </Col>
                                                <Col md={3} >
                                                <div className="comments">
                                                         {/* {this.displayComments(topic.forum_comments)} */}
                                                </div>
                                                <div className="comments__layout">
                                                    <BiMessageSquareDetail className="icon__top__spacing"/>
                                                    <p className="reply"> Comments</p>
                                                </div>
                                                </Col>
                                                
                                            </Row>

                                            
                                   
                                    </div>
                                </div>
                
            
                            </div>
                        )
                })}
            </div>
        );
    }

    render() {
        const isForumList = this.state.isForumList;
        const title = this.state.title;
        const history =  this.props.history;
            return (
                <div>
                    <TopBarComponent />
                    <h1 className="forum__heading">
                        {title}
                    </h1>
                
                   
                             <Row>
                            {isForumList &&
                             <Col md={10}>
                                 {this.displayTopics()}
                             </Col>
                            }
                            {!isForumList &&
                                 <Col md={10}>
                                <CreateDiscussion history={history}/>
                                </Col>
                            }
                             <Col md={2}>
                                 <div className="card d-flex align-items-center">
                                     <div className="card-body">
                                         <Row>
                                         {isForumList &&
                                             <Col>
                                                 <Button onClick={() => this.startDiscussion()} className="blue__button">Start a Discussion</Button>
                                             </Col>
                                        }{!isForumList &&
                                            <Col>
                                                 <Button onClick={() => this.startDiscussion()} className="dark__button">View All Discussions</Button>
                                             </Col> 
                                        }
                                         </Row>
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
                             </Col>
                         </Row>
                        
                        
                       
    
    
                </div>
            )
    
       
    }
}
export default ForumList;