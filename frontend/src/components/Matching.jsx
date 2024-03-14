import {withCookies} from "react-cookie";
import {Box, Button, Card, Container, Grid, Link, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiURL} from "../App";

const Matching = (props) => {
    const [favoriteList, setFavoriteList] = useState([])
    const [approachedMeList, setApproachedMeList] = useState([])
    const [matchingList, setMatchingList] = useState([])
    const [matchingUserProfileList, setMatchingUserProfileList] = useState([])

    // 自分がLIKEを押した人
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

    // 自分にLIKEを押してくれた人
    const getApproachedMe = () => {
        axios.get(`${apiURL}/api/approached_me/`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                setApproachedMeList(res.data.map(item => item.approaching))
            })
            .catch(error => {
                console.log(error)
            })
    }

    // 両想いのユーザーのProfile
    const matchingProfile = () => {
        const queryString = matchingList.map(id => `user_ids=${id}`).join('&');
        const getMatchingUrl = `${apiURL}/api/favorite_profile?${queryString}`;

        axios.get(getMatchingUrl, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                setMatchingUserProfileList(res.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getFavorite()
        getApproachedMe()

        // 両想いの人のフィルタリング
        setMatchingList(favoriteList.filter(element => approachedMeList.includes(element)))
    }, [approachedMeList]);

    useEffect(() => {
        matchingProfile()
    }, [matchingList]);

    return(
        <Container>
            <Box sx={{my:4}}>
                <Typography variant="h4" component="h4" gutterBottom>
                    マッチングが成立した人
                </Typography>

                {matchingUserProfileList.map((profile, index) => (
                    <Card sx={{my:4, maxWidth: 400}} key={index}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={6}>
                                <Typography sx={{my:4, mx:4}}>
                                    {profile.last_name} {profile.first_name}さん
                                </Typography>
                            </Grid>
                            <Grid item xa={6}>
                                <Typography sx={{my:4, mx:4}}>
                                    <Link href={`/dm/${profile.user}`}>
                                        <Button>DM</Button>
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                ))}

            </Box>

            <Box sx={{ mt: 2 }}>
                <Link href="/home">
                    <Button variant="outlined">Homeに戻る</Button>
                </Link>
            </Box>
        </Container>
    )
}

export default withCookies(Matching)