import React, {Component} from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './css/MessageStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameComponent from "./components/NameComponent";
import Chat from "./Pages/ChatPage";
import ForumList from "./Pages/ForumList";
import {Route,BrowserRouter as Router} from 'react-router-dom';

class App extends Component {



    render() {
        return (
            <Router>
                <Route path="/chat" component={Chat}/>
                <Route path="/forum" component={ForumList}/>
            </Router>
        )
    }
}

export default App;