import {  FormControl, Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";
import Message from "./Message";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
  
  ]);
  const [username, setUsername] = useState("");
  //listener
  useEffect(() => {
    // run one when the app componet load
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({id:doc.id, message: doc.data()})));
      });
  }, []);

  useEffect(() => {
    // run code here
    // if its blank insiude [] , this code runs ONce when the app component load
    //  const name = prompt('please enter your name');
    setUsername(prompt("please enter your name"));
  }, []); // conditions

  const sendMessage = (event) => {
    // all the logic to send the code here
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    

    
    // setMessages([...messages, {username:username, text:input}]);
    setInput("");
  };;
  console.log();
  return (
    <div className="app">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=100&h=100"
        alt=""
      />
      <h1>FaceBook Clone Messenger</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          {/* <InputLabel>Enter a message</InputLabel> */}
          <Input
            className="app__formInput"
            placeholder="Enter your message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            {" "}
            <SendIcon />
          </IconButton>
        </FormControl>
        {/* button */}
      </form>

      {/* message themselves */}

      <FlipMove>
        <div className="app__Message">
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))}
        </div>
      </FlipMove>
    </div>
  );
}

export default App;

// https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=512&h=512
