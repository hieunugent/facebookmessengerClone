import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import Message from "./Message";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = (event) => {
    // all the logic to send the code here
    event.preventDefault();
    setMessages([...messages, input]);
    setInput("");
    console.log(messages);
  };

  return (
    <div className="App">
      <h1>Hello Programmer</h1>
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
        <Message text={message}/>
        
      ))}
    </div>
  );
}

export default App;

// https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=512&h=512
