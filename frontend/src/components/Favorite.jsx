import { withCookies } from "react-cookie";
import {Button, Link} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiURL} from "../App";

const Favorite = (props) => {
    const [favoriteList, setFavoriteList] = useState([])
    const [otherProfileList, setOtherProfileList] = useState([]);

    useEffect(() => {
        axios.get(`${apiURL}/api/my_favorite/`, {
            headers:{
                'Authorization': `JWT ${props.cookies.get('token')}`
            }
        })
            .then(res => {
                setFavoriteList(res.data.map(item => item.approached))
            })
            .catch(error => {
                console.log("error")
            })
    }, []);

    useEffect(() => {
        const queryString = favoriteList.map(id => `user_ids=${id}`).join('&');
        const url = `${apiURL}/api/favorite_profile?${queryString}`;

        axios.get(url, {
            headers: {
                'Authorization': `JWT ${props.cookies.get('token')}`
                }
            })
            .then(res => {
                setOtherProfileList(res.data)
                //console.log("success")

            })
            .catch(error => {
                console.error('Error');
            });
        }, [favoriteList]);

    return(
        <>
            <h1>LIKEした人</h1>

            <div>
                {otherProfileList.map((profile, index) => (
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