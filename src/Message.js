import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import moment from "moment";

import "./Message.css";
const Message =  forwardRef(({ username, message },ref) =>{
  // check userfname
  const isUser = (username === message.username);
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && ` ${message.username || "Unknown User"}: `}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
      <div className={isUser? "message__timeInfo":"message__timeInfo"}>
        <small>
          {" "}
          {moment.unix(message.timestamp).format("MMMM Do, h:mma")}
        </small>
      </div>
    </div>
  );
})

export default Message;
