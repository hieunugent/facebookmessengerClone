import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import moment from "moment";

import "./Message.css";
import { auth } from "firebase";




  const Message =  forwardRef(({ uid,photoURL, message },ref) =>{
  // check userfname
  const isUser = uid === auth.currentUser.uid;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser &&
              ` ${
                photoURL ||
                "https://api.adorable.io/avatars/23/abott@adorable.png"
              }: `}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
      <div className={isUser ? "message__timeInfo" : "message__timeInfo"}>
        <small>
          {" "}
          {moment.unix(message.timestamp).format("MMMM Do, h:mma")}
        </small>
      </div>
    </div>
  );
})

export default Message;
