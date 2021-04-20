import React, { Component } from 'react';
import { Col, Row, Image, Container,Form,Button } from 'react-bootstrap';
import { LoremIpsum, Avatar,name } from 'react-lorem-ipsum';
import '../App.css';
import axios from "axios";
const apiUrl = "http://localhost:8080"
class CreateDiscussion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discussionTitle:"",
            discussionText:"",
            tags:"",
            history:null
        }
    }
    nextPath(path) {
        this.props.history.push(path);
    }

    createDiscussion(){
        const username = name('female')
        const discussionTitle = this.state.discussionTitle
        const discussionText = this.state.discussionText

        if(discussionTitle.length > 0 && discussionText.length>0){
            axios
            .post(
              apiUrl+"/create-discussion",{
                "createrName" : username,
                "topic" : this.state.discussionTitle,
                "description" : this.state.discussionText,
                "tags": this.state.tags
              }
            )
            .then(res => {
                localStorage.setItem('username', username)
                this.nextPath('/chat/'+res.data.id) 
            });
    
           
        }else{
            alert("please fill in all fields")
        } 
    }
    handleDiscussionTitle(e){
        this.setState({
            discussionTitle:e.target.value
        });
    }
    handleDiscussionText(e){
        this.setState({
            discussionText:e.target.value
        });
    }
    handleDiscussionTags(e){
        this.setState({
            tags:e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="card d-flex align-items-center">
                    <div className="card-body">

                    <Form className="form__size">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Discussion Title</Form.Label>
                            <Form.Control type="text" placeholder="name@example.com" onChange={e => this.handleDiscussionTitle(e)}/>
                        </Form.Group>
                        
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="Add a tag (comma separate each tag)" onChange={e => this.handleDiscussionTags(e)}/>
                        </Form.Group>
                        
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Discussion</Form.Label>
                            <Form.Control as="textarea" rows={4} onChange={e => this.handleDiscussionText(e)}/>
                        </Form.Group>
                    </Form>
                    <Button onClick={() => this.createDiscussion()} className="green__button">Create Discussion</Button>
                    </div>
                </div>


            </div>
        )
    }
}

export default CreateDiscussion;
