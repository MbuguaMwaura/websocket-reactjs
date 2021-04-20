It is client application for chat application. 
Client makes request to websocket broker which is written in spring and establish full-duplex two way communication.

To start the project.
1. Clone the repository
2. npm install
    to install the package dependencies specified in package.json
3. npm start
     to start the node server

there are two main routes in the app
 1. /forum - to list all the forums . Here you can click on a forum profile pic and get to the chat page
 2. /chat/{id} - this is the chat page that contains the discussion chat. The id is essentially to fetch all the relevant data.


Code explanation is included in my article : 
https://helptechcommunity.wordpress.com/2020/01/28/websocket-chat-application-using-spring-boot-and-react-js/
