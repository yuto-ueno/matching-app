import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { apiURL } from "../App";
import { withCookies } from "react-cookie";

// ユーザーのログイン処理
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();

    let form_data = new FormData();

    form_data.append("email", email);
    form_data.append("password", password);

    const postUri = `${apiURL}/authen/jwt/create`;

    axios
      .post(postUri, form_data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        props.cookies.set("token", response.data.access);
        // console.log("success")
        window.location.href = "/home";
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h2" variant="h5">
          ログイン
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={login}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            values={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            ログイン
          </Button>

          <Button variant="text" href="/" sx={{ mt: 1 }}>
            新規登録はこちら
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default withCookies(Login);
