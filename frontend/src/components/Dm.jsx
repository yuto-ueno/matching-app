import { withCookies } from "react-cookie";
import { Button, Link } from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../App";
import axios from "axios";

const Dm = (props) => {
  const { userId } = useParams();
  const [friendName, setFriendName] = useState("");
  const [messages, setMessages] = useState([]); // Combined messages state
  const [input, setInput] = useState("")

  useEffect(() => {
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

    fetchData();
  }, [userId]);

  const message = (event) => {
    event.preventDefault();
    let form_data = new FormData();

    form_data.append("message", input);
    form_data.append("receiver", userId)

    axios.post(`${apiURL}/api/dm-message/`, form_data, {
      headers:{
        Authorization: `JWT ${props.cookies.get("token")}`,
      }
    })
        .then(res => {
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

    fetchData();
    setInput("")
        })
        .catch(error => {
          console.log("e")
        })
  }

  return (
      <>
        <h1>{friendName}さんとのメッセージ</h1>

        <div>
          {messages.map((message, index) => (
              <div key={index}>
                <p>{message.isSent ? "あなた：" : `${friendName}：`}{message.message}</p>
                <hr/>
              </div>
          ))}
        </div>

        <form onSubmit={message}>
          <label>メッセージ</label>
          <textarea
              id="message"
              name="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">送信</button>
        </form>

        <Link href="/home">
          <Button>Homeに戻る</Button>
        </Link>
      </>
  );
};

export default withCookies(Dm);
