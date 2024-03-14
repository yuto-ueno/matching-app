import { withCookies } from "react-cookie";
import {Box, Button, Card, Container, Grid, Link, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiURL} from "../App";

const Favorite = (props) => {
    const [favoriteList, setFavoriteList] = useState([])
    const [favoriteProfileList, setFavoriteProfileList] = useState([]);

    const getFavorite = () => {
        axios.get(`${apiURL}/api/my_favorite/`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                setFavoriteList(res.data.map(item => item.approached))
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getFavoriteProfile = () => {
        const queryString = favoriteList.map(id => `user_ids=${id}`).join('&');
        const getFavoriteUrl = `${apiURL}/api/favorite_profile?${queryString}`;

        axios.get(getFavoriteUrl, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setFavoriteProfileList(res.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getFavorite()
        getFavoriteProfile()
    }, [favoriteList]);

    return(
        <Container maxWidth="md">
            <Box sx={{my:4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    LIKEした人
                </Typography>
            </Box>

            {favoriteProfileList.map((profile, index) => (
                <Card sx={{my:4}}>
                    <Typography sx={{my:4, mx:4}}>
                        {profile.last_name} {profile.first_name}さん
                    </Typography>
                </Card>
            ))}

            <Box sx={{ mt: 2 }}>
                <Link href="/home">
                    <Button variant="outlined">Homeに戻る</Button>
                </Link>
            </Box>
        </Container>
    )
}

export default withCookies(Favorite)