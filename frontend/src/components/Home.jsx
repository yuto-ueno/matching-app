import React, { useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { apiURL } from '../App';
import {Box, Button, Container, Grid, Link, Paper, Typography} from '@mui/material'

const Home = (props) => {
    const [myProfileList, setMyProfileList] = useState([]);
    const editProfileDirectory = "/profile/edit"

    // 自分のプロファイルの取得
    useEffect(() => {
        axios.get(`${apiURL}/api/profile`, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setMyProfileList(res.data);
            })
            .catch(error => {
                console.error(error);
            });
        }, [props.cookies]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Home
                </Typography>
                <Paper sx={{ p: 2 }}>
                    {myProfileList.map((profile, index) => (
                        <Grid container key={index}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h2">
                                    こんにちは {profile.last_name} {profile.first_name}さん
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Link href={editProfileDirectory}>
                                    <Button variant="outlined">プロフィール編集</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    ))}
                </Paper>
                <Box sx={{ mt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Link href="/choice">
                                <Button variant="contained" fullWidth>仲間探し</Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Link href="/matching">
                                <Button variant="contained" fullWidth>マッチング成立</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt:4 }}>
                    <Grid>
                        <Link href="/login">
                            <Button variant="outlined" fullWidth>ログアウト</Button>
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default withCookies(Home);
