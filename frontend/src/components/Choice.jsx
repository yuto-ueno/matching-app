import { withCookies } from "react-cookie";
import {apiURL} from "../App";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Container, Grid, Link, Paper, Typography} from "@mui/material";

const Choice = (props) => {
    const [otherProfileList, setOtherProfileList] = useState([]);
    const [favoriteList, setFavoriteList] = useState([])

    const getOtherProfile = () => {
        axios.get(`${apiURL}/api/other_profile`, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                setOtherProfileList(res.data)
                console.log(res.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getFavorite = () => {
         axios.get(`${apiURL}/api/my_favorite/`, {
                    headers:{
                        'Authorization': `JWT ${props.cookies.get('token')}`
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        setFavoriteList(res.data.map(item => item.approached))
                    })
                    .catch(error => {
                        console.log(error)
                    })
    }

    const handleLike = (profile) => {
        axios.post(`${apiURL}/api/my_favorite/`, {"approached":profile.user}, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                getFavorite()
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getOtherProfile()
        getFavorite()
    }, []);

    const handleDelete = (profile) => {
        axios.delete(`${apiURL}/api/delete_favorite?approached=${profile.user}`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                getFavorite()
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    気になる人にLIKEボタンを押そう！
                </Typography>
                {otherProfileList.map((profile, index) => (
                    <Paper key={index} sx={{ p: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">
                                    {profile.last_name} {profile.first_name}さん
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <ul>
                                    <li>年齢：{profile.age}歳</li>
                                    <li>性別：{profile.sex}</li>
                                    <li>趣味：{profile.hobby}</li>
                                </ul>
                            </Grid>
                            <Grid item xs={6}>
                                {favoriteList.includes(profile.user) ? (
                                    <div>
                                        <Typography variant="body1">LIKEボタンを押したよ！</Typography>
                                        <Button variant="outlined" onClick={() => handleDelete(profile)}>
                                            LIKEを取り消す
                                        </Button>
                                    </div>
                                ) : (
                                    <Button variant="contained" onClick={() => handleLike(profile)}>
                                        LIKE
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                <Box sx={{ mt: 2 }}>
                    <Link href="/home">
                        <Button variant="outlined">Homeに戻る</Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    )
}

export default withCookies(Choice)