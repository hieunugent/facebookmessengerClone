import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";
import Message from "./Message";
import firebase from "firebase";
function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    // { username: "henry", text: "hello" },
    // { username: "Hary", text: "hi there" },
  ]);
  const [username, setUsername] = useState("");
  //listener
  useEffect(()=> {
     // run one when the app componet load 
      db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot  => {
        setMessages(snapshot.docs.map(doc => doc.data()))
      })
  },[])

  useEffect(() => {
    // run code here
    // if its blank insiude [] , this code runs ONce when the app component load
    //  const name = prompt('please enter your name');
    setUsername(prompt("please enter your name"));

  }, []); // conditions

  const sendMessage = (event) => {
    // all the logic to send the code here
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username:username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    // setMessages([...messages, {username:username, text:input}]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Hello Programmer</h1>
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            {" "}
            Send message
          </Button>
        </FormControl>
        {/* button */}
      </form>

      {/* message themselves */}
      {messages.map((message) => (
        <Message username={username} message={message} />
      ))}
    </div>
  );
}

export default App;

// https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=512&h=512
