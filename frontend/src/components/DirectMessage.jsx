import { withCookies } from "react-cookie";
import {Box, Button, Divider, Grid, Link, List, ListItem, TextField, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../App";
import axios from "axios";

const DirectMessage = (props) => {
  const { userId } = useParams();
  const [friendName, setFriendName] = useState("");
  const [messages, setMessages] = useState([]); // Combined messages state
  const [input, setInput] = useState("")

  const fetchData = async () => {
      try {
        const friendResponse = await axios.get(`${apiURL}/api/favorite_profile?user_ids=${userId}`, {
          headers: {
            Authorization: `JWT ${props.cookies.get("token")}`,
          },
        });

        setFriendName(friendResponse.data[0].last_name);

        const sentMessagesResponse = await axios.get(`${apiURL}/api/dm-message?receiver_id=${userId}`, {
          headers: {
            Authorization: `JWT ${props.cookies.get("token")}`,
          },
        });

        const receivedMessagesResponse = await axios.get(`${apiURL}/api/dm-inbox?sender_id=${userId}`, {
          headers: {
            Authorization: `JWT ${props.cookies.get("token")}`,
          },
        });

        // Combine messages with proper sender identification
        const combinedMessages = [
          ...sentMessagesResponse.data.map((message) => ({ ...message, isSent: true })),
          ...receivedMessagesResponse.data.map((message) => ({ ...message, isSent: false })),
        ];

        // Sort messages chronologically by 'created_at' field
        combinedMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        setMessages(combinedMessages);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchData().then(r => console.log(r));
  }, [userId]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const form_data = new FormData();

    form_data.append("message", input);
    form_data.append("receiver", userId);

    axios.post(`${apiURL}/api/dm-message/`, form_data, {
      headers:{
        Authorization: `JWT ${props.cookies.get("token")}`,
      }
    })
        .then(res => {
          console.log(res.data)
          fetchData().then(r => console.log(r));
          setInput("")
        })
        .catch(error => {
          console.log("e")
        })
  }

  const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  header: {
    padding: "16px",
    backgroundColor: "#f5f5f5",
  },
  messageList: {
    flex: 1,
    overflow: "scroll",
  },
  message: {
    padding: "8px 16px",
    maxWidth: "80%",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
  },
  myMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  inputArea: {
    padding: "16px",
  },
  input: {
    width: "95%",
    padding: "8px 16px",
    borderRadius: "10px",
    // border: "1px solid #ccc",
  },
  button: {
    marginRight: "10px",
  },
};

  return (
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography variant="h6">{friendName}さんとのメッセージ</Typography>
        </Box>
        <Box sx={styles.messageList}>
          <List>
            {messages.map((message, index) => (
                <ListItem key={index}>
                  <Box  sx={styles.message} className={message.isSent ? styles.myMessage : ""}>
                    {message.isSent ? "あなた：" : `${friendName}：`}{message.message}
                  </Box>
                  <Divider />
                </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={styles.inputArea}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={10}>
             <TextField
              id="message"
              name="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={styles.input}
              multiline
              rows={1}
          />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" type="submit" sx={styles.button} onClick={handleSendMessage}>
              送信
            </Button>
          </Grid>
          </Grid>
        </Box>
        <Box sx={{ padding: "16px" }}>
          <Link href="/home">
            <Button variant="outlined">Homeに戻る</Button>
          </Link>
        </Box>
      </Box>
  );
};

export default withCookies(DirectMessage);
