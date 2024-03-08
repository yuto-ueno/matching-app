import React, {useState}  from 'react';
import axios from 'axios';
import {Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material'
import { apiURL } from '../App'
import {withCookies} from "react-cookie";

// ユーザーの新規登録
const CreateUser = (props) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const createUser = (event) => {
        event.preventDefault();

        let form_data = new FormData();

        form_data.append('email', email);
        form_data.append('password', password);

        const postUri = `${apiURL}/api/users/create`;

        axios.post(postUri, form_data, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then( response => {
            // 認証
            const certificationUri = `${apiURL}/authen/jwt/create`;
            axios.post(certificationUri, form_data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then( response => {
                    props.cookies.set('token', response.data.access)
                    console.log("success")
                    window.location.href="/profile";
                })
                .catch( () => {
                    console.log("certification error");
                });

        })
        .catch( () => {
          console.log("error");
        });
  }

  return(
    <Container maxWidth="xs">
      <Box sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
      }}
      >

        <Typography component="h2" variant="h5">
          新規登録
        </Typography>

        <Box component="form" noValidate sx={{mt:1}} onSubmit={createUser}>
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
              onChange={(e) => {setEmail(e.target.value)}}
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

          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt:3, mb:2}}
          >
              新規登録
          </Button>

          <Button variant="text" href="/login" sx={{ mt: 1 }}>
            ログインはこちら
          </Button>

          <Typography component="h2" variant="h5">
          パスワードは8文字以上、同じメールアドレスはだめ。あとで、エラーが起きないような工夫をする！
          </Typography>

        </Box>

      </Box>
    </Container>
   )

 }

export default withCookies(CreateUser)