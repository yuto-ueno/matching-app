import React, {useState}  from 'react';
import axios from 'axios';
import {Box, Button, Container, Grid, Link, TextField, Typography} from '@mui/material'
import { apiURL } from '../App'
import {withCookies} from "react-cookie";

const Auth = (props) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginFunction, setLoginFunction ] = useState(true);

    const auth = (event) => {
        event.preventDefault();

        let form_data = new FormData();

        form_data.append('email', email);
        form_data.append('password', password);

        const postUri = loginFunction ? `${apiURL}/authen/jwt/create` : `${apiURL}/api/users/create`;

        axios.post(postUri, form_data, {
            headers: {
                'Content-Type': 'application/json'
            },
        })

        .then( response => {
            props.cookies.set('token', response.data.access)
            window.location.href="/home";
        })

        .catch( () => {
          console.log("error")
          alert("EmailかPasswordが違います");
        });
  }

  const changeFunction = () => {
    setLoginFunction(!loginFunction)
    setEmail("")
    setPassword("")
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
          {loginFunction ? 'ログイン' : '新規登録'}
        </Typography>

        <Box component="form" noValidate sx={{mt:1}} onSubmit={auth}>
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
              {loginFunction ? 'ログイン' : 'サインイン'}
          </Button>

          <Grid item>
              <Link to="#" variant="body2" onClick={changeFunction} style={{ cursor: 'pointer' }}>
                {loginFunction ? '新規登録' : 'ログイン'}
              </Link>
          </Grid>

        </Box>

      </Box>
    </Container>
   )

 }

export default withCookies(Auth)