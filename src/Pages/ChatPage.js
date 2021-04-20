import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import '../App.css';
import { Col, Row, Container, Button,Form } from 'react-bootstrap';
import '../css/MessageStyle.css';
import TopBarComponent from '../components/TopBarComponent';
import DiscussionComponent from '../components/DiscussionComponent'
import { name } from 'react-lorem-ipsum';
import { FiMessageSquare } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import '../App.css';
import axios from "axios";
var randomColor = require('randomcolor');
const apiUrl = "http://localhost:8080"
const token = "b529c4ee-a335-451b-9ec9-2698843f640d"

class Chat extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            messages:[],
            typedMessage: "",
            name: "",
            title:"",
            discussion:"",
            tags:[],
            commentNumber: 0,
            creatorName:"",
            discussionId:0,
            conversationColor:null
        }
    }

    componentDidMount(){
        this.getDiscussionItem()
    }
    
    getDiscussionItem(){
        if(this.state.title.length === 0){
            const pathArray = this.props.location.pathname.split("/");
            const discussionId = pathArray[pathArray.length - 1];
            axios
            .get(
              apiUrl+"/api/forum/topic/"+discussionId,{ headers: {"Authorization" : `Bearer ${token}`}}
            )
            .then(res => {
                console.log(res.data.topic)
                this.setState({
                    title : res.data.data.topic,
                    discussion : res.data.data.description,
                    creatorName: res.data.data.creator.name,
                    discussionId : discussionId,         
                    tags: res.data.data.forumTags
                })
                // console.log(this.state.tags)
            })
            .then(
                axios.get(apiUrl+"/api/forum/forum-comments/"+discussionId,{ headers: {"Authorization" : `Bearer ${token}`}})
                    .then(res => {
                        console.log(res)
                        this.setState({
                            messages: res.data.data,
                      
                        })
                    })
                ).then(this.getCommentNumber())
        }
    }

    getCommentNumber(){
        const pathArray = this.props.location.pathname.split("/");
        const discussionId = pathArray[pathArray.length - 1];
        axios
        .get(
          apiUrl+"/api/forum/comment-number/"+discussionId,{ headers: {"Authorization" : `Bearer ${token}`}}
        )
        .then(res => {
      
            this.setState({
            
                commentNumber:res.data.data,
                
            })
            // console.log(this.state.tags)
        })
    }

    createDiscussionItem(){
            const data  = {
                "topic":"Imports are thriving",
                "description":"Ba",
                "tags":["finance"]
            }
            axios
            .post(
              apiUrl+"/api/forum/create-discussion",data,{ headers: {"Authorization" : `Bearer ${token}`}}
            )
            .then(res => {
                this.setState({
                    
                })
                // console.log(this.state.tags)
            })
        
    }

    getCurrentUser(){
        if(this.state.name.length === 0){
            const username = localStorage.getItem("username")
            if(username != null && username.length > 0){
                this.setState({ name: username });
            }else{
                this.setState({ name: name('female') });
            }
        }
        if(this.state.conversationColor == null){
            this.setState({ conversationColor: randomColor() });
    
        }
  
    }
    displayTags = () => {
        var tags = this.state.tags 
        if(tags!== undefined){
            return (
            
                <div className="comments">
                    {tags.map((tag,index) => {
                        if(index < 3)
                               return (
                                
                                    <div className="tag__background" style={{background:randomColor()}}>
                                        <p className="tag__text">{tag.tag}</p>
                                    </div> 
            
                            )
                    })}
                </div>
            ); 
        }
     
    }

    setName = (name) => {
        console.log(name);
        this.setState({ name: name });
    };

    sendMessage = () => {
        const pathArray = this.props.location.pathname.split("/");
        const discussionId = pathArray[pathArray.length - 1];

        this.clientRef.sendMessage('/wit/user-all', JSON.stringify({
            commentText: this.state.typedMessage,
            forumTopicId: discussionId
        }));
    };

    getCommentsNumber = () =>{
        
    }

    displayMessages = () => {
        let style = {background:this.state.conversationColor}
        if(this.state.messages!== undefined){
          
            return (
           
                <div>
                    {this.state.messages.map((msg,index) =>  {

                        return (
                            <div className="card__comment spacing__top">
                                        <Row noGutters="true">
                                            <Col md={2}>
                                    
                                                <div className="profile__icon__small" style={style}>
                                                    {/* <p className="profile__text">{msg.commenterName[0]}</p> */}
                                                </div>
                                            </Col>
                                            <Col md={10} className="align-items-center">
                                                <p className="spacing__top__smalll">{msg.commenter.name}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className="">
                                                    <p>{msg.commentText}</p>
                                                </div>  
                                            </Col>
                                        </Row>
                                        <hr className="hr__spacing"/>
                                        {/* <div className="comments__layout">
                                            <BiMessageSquareDetail className="icon__top__spacing"/>
                                            <p className="reply">Reply</p>
                                        </div> */}
                          
                                       
                            </div>
                            )
                    })}
                </div>
            );
        }
  
    };

    render() {
        this.getCurrentUser()
    
        const title = this.state.title
        const commentNumber = this.state.commentNumber
        const discussion = this.state.discussion
        const creatorName = this.state.creatorName
        return (
            <div>
                <TopBarComponent />
                <h1 className="forum__heading">
                    Community Discussion
                </h1>
                <Container>

                    <Row>
                        <Col md={10}>
                            <div className="card d-flex align-items-center">
                                <div className="card-body title__container">
                                    <div className="title__container">
                                        <h4 className="title__text">{title}</h4>
                                        <div>{this.displayTags()}</div>
                                    </div>
                                </div>
                                <div className="card-body">
                                <Row>
                                    <Col md={3}>
                                    <div className="profile__icon__large" >
                                        <p className="profile__text large__text">{creatorName}</p>
                                    </div>
                                    </Col>
                                    <Col md={9}>
                                        <p>
                                            Conversations by {creatorName}
                                        </p>
                                        <div className="">
                                                <p>{discussion}</p>
                                            
                                        </div>
                                        <Form className="form__size spacing__top">
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Control as="textarea" rows={4} placeholder="Type here to reply" onChange={(event) => {
                                               this.setState({typedMessage: event.target.value});
                                           }}/>
                                            </Form.Group>
                                        </Form>
                                        <Button  onClick={this.sendMessage}className="green__button">Post Comment</Button>
                                        <div className="comments__layout">
                                                <FiMessageSquare className="icon__top__spacing"/>
                                                <p>{commentNumber} </p>
                                        </div>
                                        <div >
                                            {this.displayMessages()}
                                        </div>
                                        
                                    </Col>
                                 </Row>
                                 
                                </div>
                            </div>
                        </Col>
                        <Col md={2}>
                            <DiscussionComponent />
                        </Col>


                    </Row>




                </Container>
                <SockJsClient url={`http://localhost:8080/wit-forum/?access_token=${token}`}
                    topics={['/discussion/comment']}
                    onConnect={() => {
                        console.log("connected")
                    }}
                    onDisconnect={() => {
                        console.log("Disconnected");
                    }}
                    onMessage={(msg) => {
              
                        var jobs = this.state.messages;
                        console.log(jobs)
                        jobs.unshift(msg.data);
                        this.setState({ messages: jobs });
                        this.getCommentNumber()
            
                    }}
                    ref={(client) => {
                        this.clientRef = client
                    }} />
            </div>
        )
    }
}

export default Chat;