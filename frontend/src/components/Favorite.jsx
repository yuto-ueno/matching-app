import { withCookies } from "react-cookie";
import {Button, Link} from "@mui/material";
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
        <>
            <h1>LIKEした人</h1>

            <div>
                {favoriteProfileList.map((profile, index) => (
                    <div key={index}>
                        <p>名前：{profile.last_name} {profile.first_name}</p>
                        <p>年齢：{profile.age}</p>
                        <p>性別：{profile.sex}</p>
                        <p>趣味：{profile.hobby}</p>
                        <hr/>
                    </div>
                ))}
            </div>

            <Link href="/home">
                <Button>Homeに戻る</Button>
            </Link>
        </>
    )
}

export default withCookies(Favorite)