import {
    Card,
    CardActions,
    CardContent,
    Container,
    Box,
    TextField,
  } from "@mui/material";
  import AccountCircle from "@mui/icons-material/AccountCircle";
  import SendIcon from "@mui/icons-material/Send";
  import { io } from "socket.io-client";
  import app_config from "../config";
  import { useEffect, useState } from "react";
  import "./chat.css";
  import clsx from "clsx";
import { deepOrange } from "@mui/material/colors";
import Chip from '@mui/material/Chip';
import { connect } from "formik";
  
  const Chat = () => {
    const url = app_config.api_url;
  
    const [socket, setSocket] = useState(io(url, { autoConnect: false }));
  
    const [message, setMessage] = useState("");
     
    const getuser =()=>{
      const user= sessionStorage.getItem("user")
      if(user)
      {
        return JSON.parse(user);
      }
      else{
        return null;
      }
    }
    const [currentUser, setCurrentUser] = useState(getuser())
  
    const [messageList, setMessageList] = useState([
      { text: "hello how are you", sent: false, created: new Date() },
      { text: "What about your job?", sent: true, created: new Date() },
      { text: "searching", sent: false, created: new Date() },
    ]);
  
    useEffect(() => {
      socket.connect();
      console.log(getuser());
    }, []);
  
  
    socket.on("recmsg", (data) => {
      console.log(data);
      let tempList = [...messageList, data];
  
      setMessageList(tempList);
    });
  
    const sendMessage = () => {
      const msgObj = { text: message, sent: true, created: new Date(), name: currentUser.name };
      console.log(msgObj);
      socket.emit("sendmsg", msgObj);
  
      let tempList = [...messageList, msgObj];
  
      setMessageList(tempList);
    };
  
    const displayMessages = () => {
      return messageList.map((message) => (
        <>
        <p className={clsx("message", message.sent ? "sent" : "rec")}>
          {message.text}
        </p>
        
        </>
      ));
    };
  
    return (
      <Container>
        <h1>Chat Component</h1>
        <hr />
  
        <div className="chat-area">
          <Card>
            <CardContent className="message-area">
              <p className="text-center">

            <Chip label={"Logged in as " + currentUser.name} />
              </p>
              {displayMessages()}
            </CardContent>
            <CardActions>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  id="chat-input"
                  label="Write your message here"
                  variant="standard"
                  className="w-100"
                />
                <SendIcon
                  onClick={sendMessage}
                  sx={{
                    color: "action.active",
                    mr: 1,
                    my: 0.5,
                    mx:20,
                    fontSize: "2rem",
                  }}
                />
              </Box>
            </CardActions>
          </Card>
        </div>
      </Container>
    );
  };
  
  export default Chat;