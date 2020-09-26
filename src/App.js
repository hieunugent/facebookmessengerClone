import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { Button, Link } from "@material-ui/core";
import { FormControl, Input } from "@material-ui/core";
import "./App.css";
import db from "./firebase";
// import Message from "./Message";
import { Card, CardContent, Typography } from "@material-ui/core";
// import React, { forwardRef } from "react";
import moment from "moment";

import "./Message.css";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import wallpaper from "./wallpaper.png";
import EmailIcon from "@material-ui/icons/Email";
// React fireabse hook declearation
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  const signInWithFaceBook =()=> {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <>
      <div className="app__login">
        <header className="app__header">
          <img
            className="app__logo"
            src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=100&h=100"
            alt=""
          />{" "}
          <h1>FaceBook Room Clone Messenger</h1>
          <SignOut />
        </header>
        <div className="app__landing">
          <div className="wallpaper">
            <img src={wallpaper} alt="" />
          </div>
          <div className="app__signInform">
            <button className="app__SignInBtnFace" onClick={signInWithFaceBook}>
              {" "}
              <h3> Log in with FaceBook</h3>
              <img
                src="https://w7.pngwing.com/pngs/933/615/png-transparent-social-media-facebook-computer-icons-logo-facebook-blue-text-rectangle.png"
                alt=""
              />
            </button>
            <button className="app__SignInBtn" onClick={signInWithGoogle}>
              {" "}
              <h3> Sign in with Google</h3>
              <img
                src="https://www.schemecolor.com/wp-content/uploads/google-gmail-logo.png"
                alt=""
              />
            </button>
            <p>made by Henry Nguyen</p>
            <a href="https://www.linkedin.com/in/henryhieutrungnguyenucla">
              <img
                src="https://www.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-linkedin-circle-512.png"
                alt=""
                width="50px"
                height="50px"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
function SignOut() {
  return (
    auth.currentUser && (
      <Button  color="primary" variant="contained" className="app__SignOutBtn" onClick={() => auth.signOut()}>
        Sign Out
      </Button>
    )
  );
}
function Chatroom() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  // const [username, setUsername] = useState("");
  const dummy = useRef();
  // const messagesRef = firestore.collection('messages');
  // const query = messagesRef.orderBy("createdAt").limit(25);

  //listener
  useEffect(() => {
    // run one when the app componet load
    db.collection("messages")
      .orderBy("createAt", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  // useEffect(() => {
  //   // run code here
  //   // if its blank insiude [] , this code runs ONce when the app component load
  //   //  const name = prompt('please enter your name');
  //   setUsername(prompt("please enter your name"));
  // }, []); // conditions

  const sendMessage = async (event) => {
    // all the logic to send the code here
    event.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await  db.collection("messages").add({
      message: input,
      // username: username,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    // setMessages([...messages, {username:username, text:input}]);
    setInput("");
    
    dummy.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  console.log();
  return (
    <div className="app">
      <div className="app__section1">
        <header className="app__header">
          <img
            className="app__logo"
            src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=100&h=100"
            alt=""
          />{" "}
          <h1>FaceBook Room Clone Messenger</h1>
          <SignOut />
        </header>
      </div>
      {/* <h2>Welcome {username}</h2> */}

      {/* message themselves */}

      <FlipMove>
        <div className="app__section2">
          <main>
            {messages.map(({ id, message }) => (
              <Message
                key={id}
                // username={username}
                message={message}
              />
            ))}{" "}
            <span ref={dummy}></span>
          </main>
        </div>
      </FlipMove>

      <div className="app__section3">
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
      </div>
    </div>
  );
}
function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="">
      <section>{user ? <Chatroom /> : <SignIn />}</section>
    </div>
  );
}
const Message = forwardRef((props, ref) => {
  // check userfname
  const {uid, photoURL, message, createAt } = props.message;
  const isUser = uid === auth.currentUser.uid;
  console.log(uid);
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <div className={`message__display ${isUser && "message__displayUser"}`}>
        <div>
          <img
            className="message__avatar"
            src={photoURL}
            alt="avatar"
            width="40px"
            height="40px"
          />
        </div>
        <div>
          <Card className={isUser ? "message__userCard" : "message__guestCard"}>
            <CardContent>
              <Typography color="white" variant="h5" component="h2">
                {message}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className={isUser ? "message__timeInfo" : "message__timeInfo"}>
        <small> {moment.unix(createAt).format("MMMM Do, h:mma")}</small>
      </div>
    </div>
  );
});
export default App;

// https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=512&h=512
